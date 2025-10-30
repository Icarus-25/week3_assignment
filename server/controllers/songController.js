/*
 * Song Controller
 * Handles HTTP requests for Song resources
 */

const db = require('../models');
const Song = db.Song;

/**
 * List all songs
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function ListSongs(req, res) {
    try {
        const songs = await Song.findAll();
        res.json(songs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve songs' });
    }
}

/**
 * Get a specific song by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function GetSong(req, res) {
    try {
        const songId = req.params.id;
        const song = await Song.findByPk(songId);

        if (!song) {
            return res.status(404).json({ error: 'Song not found' });
        }

        res.json(song);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

/**
 * Create a new song
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function CreateSong(req, res) {
    try {
        console.log('CreateSong called with body:', req.body);

        if (!req.body || !req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const song = await Song.create({
            title: req.body.title.trim(),
            artist: req.body.artist ? req.body.artist.trim() : null,
            yearReleased: req.body.yearReleased ? parseInt(req.body.yearReleased, 10) : null
        });

        res.status(201).json(song);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Export controller methods
module.exports = {
    ListSongs,
    GetSong,
    CreateSong
};
