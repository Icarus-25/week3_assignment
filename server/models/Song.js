/*
 * Song Model
 * In-memory data store for songs with CRUD operations
 */

// Private storage
const _songs = [];
let _nextId = 1;

/**
 * List all songs in the store
 * @returns {Array} Array of song objects
 */
function List() {
    return _songs;
}

/**
 * Get a song by its ID
 * @param {number|string} id - The ID of the song to find
 * @returns {Object|null} Song object if found, null otherwise
 */
function GetById(id) {
    if (!id) {
        throw new Error('ID is required');
    }
    return _songs.find((song) => String(song.id) === String(id)) || null;
}

/**
 * Create a new song
 * @param {Object} data - The song data
 * @param {string} data.title - Song title
 * @param {string} data.artist - Song artist
 * @param {number} [data.yearReleased] - Year the song was released
 * @returns {Object} Created song object
 * @throws {Error} If title is missing
 */
function Create(data) {
    // Validate required fields
    if (!data || !data.title) {
        throw new Error('Title is required');
    }

    const song = {
        id: _nextId++,
        title: data.title.trim(),
        artist: data.artist ? data.artist.trim() : '',
        yearReleased: data.yearReleased ? parseInt(data.yearReleased, 10) : null
    };

    _songs.push(song);
    return song;
}

    // Export public methods
module.exports = { List, GetById, Create };
