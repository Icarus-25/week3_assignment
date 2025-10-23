/*
 * Movie Model
 * In-memory data store for movies with CRUD operations
 */

// Private storage
const _movies = [];
let _nextId = 1;

/**
 * List all movies in the store
 * @returns {Array} Array of movie objects
 */
function List() {
    return _movies;
}

/**
 * Get a movie by its ID
 * @param {number|string} id - The ID of the movie to find
 * @returns {Object|null} Movie object if found, null otherwise
 */
function GetById(id) {
    if (!id) {
        throw new Error('ID is required');
    }
    return _movies.find((movie) => String(movie.id) === String(id)) || null;
}

/**
 * Create a new movie
 * @param {Object} data - The movie data
 * @param {string} data.title - Movie title
 * @param {string} data.director - Movie director
 * @param {number} [data.yearReleased] - Year the movie was released
 * @returns {Object} Created movie object
 * @throws {Error} If title is missing
 */
function Create(data) {
    // Validate required fields
    if (!data || !data.title) {
        throw new Error('Title is required');
    }

    const movie = {
        id: _nextId++,
        title: data.title.trim(),
        director: data.director ? data.director.trim() : '',
        yearReleased: data.yearReleased ? parseInt(data.yearReleased, 10) : null
    };

    _movies.push(movie);
    return movie;
}

    // Export public methods
module.exports = { List, GetById, Create };
