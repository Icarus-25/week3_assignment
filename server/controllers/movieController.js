/*
 * Movie Controller
 * Handles HTTP requests for Movie resources
 */

const Movie = require('../models/Movie');

/**
 * List all movies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function ListMovies(req, res) {
    try {
        const movies = Movie.List();
        res.json(movies);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve movies' });
    }
}

/**
 * Get a specific movie by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function GetMovie(req, res) {
    try {
        const movieId = req.params.id;
        const movie = Movie.GetById(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Create a new movie
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function CreateMovie(req, res) {
    try {
        // Log incoming request for debugging
        console.log('CreateMovie called with body:', req.body);

        // Validate request body
        if (!req.body || !req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const movie = Movie.Create(req.body);
        res.status(201).json(movie);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Export controller methods
module.exports = {
    ListMovies,
    GetMovie,
    CreateMovie
};
