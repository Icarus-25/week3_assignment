/*
 * Song Controller
 * Handles HTTP requests for Song resources
 */

const Song = require('../models/Song');

/**
 * List all songs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function ListSongs(req, res) {
    try {
        const songs = Song.List();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve songs' });
    }
}

/**
 * Get a specific song by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function GetSong(req, res) {
    try {
        const songId = req.params.id;
        const song = Song.GetById(songId);

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Create a new song
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function CreateSong(req, res) {
    try {
        // Log incoming request for debugging
        console.log('CreateSong called with body:', req.body);

        // Validate request body
        if (!req.body || !req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const song = Song.Create(req.body);
        res.status(201).json(song);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Export controller methods
module.exports = {
    ListSongs,
    GetSong,
    CreateSong
};
