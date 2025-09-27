const bcrypt = require('bcrypt');
const Pharmacy = require('../../models/pharmacyDB');
const { generateToken } = require('../../utils/jwt');

const pharmacyAuthService = {
    async signup(pharmacyData) {
        const { name, PhoneNumber, email, password, location, retailLicense } = pharmacyData;
        
        if (!name || !PhoneNumber || !email || !password || !location || !retailLicense) {
            throw new Error("All fields are required !");
        }

        const existingPharmacy = await Pharmacy.findOne({ email: email });
        if (existingPharmacy) {
            throw new Error("Pharmacy already exists, please login");
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newPharmacy = new Pharmacy({
            name,
            PhoneNumber: PhoneNumber,
            email,
            password: hashedPassword,
            location,
            retailLicenceNumber: retailLicense
        });

        await newPharmacy.save();
        const token = generateToken({ name, PhoneNumber, email });
        return { message: "Pharmacy registered successfully", token };
    },

    async login(loginData) {
        const { email, password } = loginData;
        
        if (!email || !password) {
            throw new Error("Email and password are required");
        }

        const pharmacy = await Pharmacy.findOne({ email }).select('+password');
        if (!pharmacy) {
            throw new Error("Pharmacy not found");
        }

        const isPasswordValid = await bcrypt.compare(password, pharmacy.password);
        if (!isPasswordValid) {
            throw new Error("Invalid password");
        }

        const token = generateToken({ name: pharmacy.name, PhoneNumber: pharmacy.PhoneNumber, email: pharmacy.email });
        return { message: "Login successful", token };
    }
};

module.exports = pharmacyAuthService;
