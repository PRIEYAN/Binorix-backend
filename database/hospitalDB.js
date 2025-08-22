const { randomUUID } = require('crypto');
const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: { type: String, required: true },
    PhoneNumber: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    establishmentYear: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    websiteLink: { type: String },
    location: { type: String, required: true },
    password: { type: String, required: true ,select: false },
},{collection: "hospitalInfo"});

const Hospital = mongoose.model('hospitalInfo', hospitalSchema);

module.exports = Hospital;