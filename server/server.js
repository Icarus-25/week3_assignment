/*
 * Server Entry Point
 * REST API server with endpoints for Books, Movies, and Songs
 */

// Import dependencies
const express = require('express');
const cors = require('cors');

// Constants
const _port = 5000;
const _apiPrefix = '/api';

// Initialize Express application
const app = express();

// Configure middleware
app.use(cors());
app.use(express.json());

/**
 * Request logger middleware
 * Logs timestamp, HTTP method, and URL for each request
 */
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url } = req;
    
    console.log(`${timestamp} - ${method} ${url}`);
    next();
});

// Import route modules
const bookRoutes = require('./routes/bookRoutes');
const movieRoutes = require('./routes/movieRoutes');
const songRoutes = require('./routes/songRoutes');

// Mount API routes
app.use(`${_apiPrefix}/books`, bookRoutes);
app.use(`${_apiPrefix}/movies`, movieRoutes);
app.use(`${_apiPrefix}/songs`, songRoutes);

/**
 * Health check endpoint
 * Used to verify the server is running
 */
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// Start the server
app.listen(_port, () => {
    console.log(`Server running on port ${_port}`);
});