const bcrypt = require('bcrypt');
const Patient = require('../../models/patientDB');
const { generateToken } = require('../../utils/jwt');

const patientAuthService = {
    async signup(patientData) {
        let { name, PhoneNumber, email, password, dob, gender, address, otherDetails } = patientData;

        if (!name || !PhoneNumber || !email || !password || !dob || !gender || !address) {
            throw new Error("All fields are required");
        }

        // Validate password is not empty
        if (!password || password.trim() === '') {
            throw new Error("Password cannot be empty");
        }

        // Convert DOB from DD/MM/YYYY to Date object
        if (typeof dob === 'string' && dob.includes('/')) {
            const [day, month, year] = dob.split('/');
            dob = new Date(`${year}-${month}-${day}`);
        } else {
            dob = new Date(dob);
        }

        const existingPatient = await Patient.findOne({ email });
        if (existingPatient) {
            throw new Error("Patient already exists, please login");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newPatient = new Patient({
            name,
            PhoneNumber,
            email,
            password: hashedPassword,
            dob,
            gender,
            address,
            otherDetails: otherDetails || ''
        });

        await newPatient.save();

        const token = generateToken({ name, PhoneNumber, email });
        return { message: "Patient registered successfully", token };
    },

    async login(loginData) {
        const { email, password } = loginData;
        
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const patient = await Patient.findOne({ email: email }).select('+password');
        if (!patient) {
            throw new Error("Patient not found");
        }

        if (!patient.password) {
            throw new Error("Invalid patient data - password missing");
        }

        const isPasswordValid = await bcrypt.compare(password, patient.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = generateToken({ name: patient.name, PhoneNumber: patient.PhoneNumber, email: patient.email });
        return { message: "Login successful", token };
    }
};

module.exports = patientAuthService;
