// Main Application Entry Point
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Import database connection
const connectDB = require('./dbconfig/mongodb');

// Import routes
const routes = require('./routes');

// Create Express app
const app = express();

// Middleware
app.use(cors({ exposedHeaders: ['Authorization'] }));
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use(routes);

// Root route
app.get('/', (req, res) => {
    return res.status(200).json({ message: "App running" });
});

module.exports = app;
