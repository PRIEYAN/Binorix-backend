const bcrypt = require('bcrypt');
const Hospital = require('../../models/hospitalDB');
const { generateToken } = require('../../utils/jwt');

const hospitalAuthService = {
    async signup(hospitalData) {
        const {
            name,
            registrationNumber,
            establishmentYear,
            email,
            PhoneNumber,
            websiteLink,
            location,
            password
        } = hospitalData;

        if (!name || !registrationNumber || !PhoneNumber || !establishmentYear || !email || !websiteLink || !location || !password) {
            throw new Error("All fields are required.");
        }

        const existingHospital = await Hospital.findOne({ registrationNumber });
        if (existingHospital) {
            throw new Error("Hospital with this registration number already exists.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newHospital = new Hospital({
            name,
            registrationNumber,
            establishmentYear,
            email,
            PhoneNumber,
            websiteLink,
            location,
            password: hashedPassword
        });

        await newHospital.save();

        const token = generateToken({ registrationNumber, name });
        return { message: "Hospital registered successfully.", token };
    },

    async login(loginData) {
        const { email, password } = loginData;

        if (!email || !password) {
            throw new Error("Email and password are required.");
        }

        const hospital = await Hospital.findOne({ email }).select('+password');

        if (!hospital) {
            throw new Error("Invalid email or password.");
        }

        const isMatch = await bcrypt.compare(password, hospital.password);
        if (!isMatch) {
            throw new Error("Invalid email or password.");
        }

        const token = generateToken(
            { registrationNumber: hospital.registrationNumber, name: hospital.name }
        );

        return { token, message: "Login successful." };
    }
};

module.exports = hospitalAuthService;
