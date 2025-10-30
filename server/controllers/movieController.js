/*
 * Movie Controller
 * Handles HTTP requests for Movie resources
 */

const db = require('../models');
const Movie = db.Movie;

/**
 * List all movies
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function ListMovies(req, res) {
    try {
        const movies = await Movie.findAll();
        res.json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve movies' });
    }
}

/**
 * Get a specific movie by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function GetMovie(req, res) {
    try {
        const movieId = req.params.id;
        const movie = await Movie.findByPk(movieId);

        if (!movie) {
            return res.status(404).json({ error: 'Movie not found' });
        }

        res.json(movie);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

/**
 * Create a new movie
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function CreateMovie(req, res) {
    try {
        console.log('CreateMovie called with body:', req.body);

        if (!req.body || !req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const movie = await Movie.create({
            title: req.body.title.trim(),
            director: req.body.director ? req.body.director.trim() : null,
            yearReleased: req.body.yearReleased ? parseInt(req.body.yearReleased, 10) : null
        });

        res.status(201).json(movie);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Export controller methods
module.exports = {
    ListMovies,
    GetMovie,
    CreateMovie
};
