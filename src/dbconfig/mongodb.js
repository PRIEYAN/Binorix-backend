const mongoose = require("mongoose");
require('dotenv').config();

const mongoURL = process.env.MONGOURL;

const connectDB = async () => {
    try {
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("MongoDB connection error:", err);
        process.exit(1);
    }
};

module.exports = connectDB;
