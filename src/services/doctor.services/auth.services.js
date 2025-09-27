const bcrypt = require('bcrypt');
const Doctor = require('../../models/doctorDB');
const Hospital = require('../../models/hospitalDB');
const { generateToken, verifyToken } = require('../../utils/jwt');

const doctorAuthService = {
    async signup(doctorData) {
        const { name, PhoneNumber, email, NMR_Number, password, hospital, specialization, availability } = doctorData;
        
        if (!name || !PhoneNumber || !email || !NMR_Number || !password || !hospital || !specialization || !availability) {
            throw new Error("All fields are required...");
        }

        const existingDoctor = await Doctor.findOne({ email: email, hospital: hospital });
        if (existingDoctor) {
            throw new Error("Doctor already exists, please login");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newDoctor = new Doctor({
            name,
            PhoneNumber: PhoneNumber,
            email,
            nmrNumber: NMR_Number,
            password: hashedPassword,
            hospital,
            specialization,
            availability: availability,
            createdAt: new Date()
        });

        await newDoctor.save();
        
        const token = generateToken({ PhoneNumber, email });
        return { message: "Doctor registered successfully", token };
    },

    async login(loginData) {
        const { email, password, hospitalName } = loginData;
        
        if (!email || !password || !hospitalName) {
            throw new Error("All fields are required");
        }

        const existingDoctor = await Doctor.findOne({ email: email, hospital: hospitalName });
        if (!existingDoctor) {
            throw new Error("Doctor not found or hospital name does not match");
        }

        const doctor = await Doctor.findOne({ email }).select('+password');
        if (!doctor) {
            throw new Error("Doctor not found");
        }

        const isPasswordValid = await bcrypt.compare(password, doctor.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect password");
        }

        const PhoneNumber = doctor.PhoneNumber;
        const token = generateToken({ PhoneNumber, email });
        return { message: "Login successful", token };
    },

    async getHospitals() {
        const hospitalNames = await Hospital.find({}, { name: 1, _id: 0 });
        return {
            message: "Hospital names fetched successfully",
            hospitalNames
        };
    },

    async getDoctorDetails(token) {
        const decoded = verifyToken(token);
        if (!decoded) {
            throw new Error("invalid token");
        }

        const doctorDetails = await Doctor.findOne({ email: decoded.email });
        if (!doctorDetails) {
            throw new Error("no doctors found");
        }

        return { message: "Doctor found !", doctor: doctorDetails };
    }
};

module.exports = doctorAuthService;
