/*
 * Book Model
 * In-memory data store for books with CRUD operations
 */

// Private storage
const _books = [];
let _nextId = 1;

/**
 * List all books in the store
 * @returns {Array} Array of book objects
 */
function List() {
    return _books;
}

/**
 * Get a book by its ID
 * @param {number|string} id - The ID of the book to find
 * @returns {Object|null} Book object if found, null otherwise
 */
function GetById(id) {
    if (!id) {
        throw new Error('ID is required');
    }
    return _books.find((book) => String(book.id) === String(id)) || null;
}

/**
 * Create a new book
 * @param {Object} data - The book data
 * @param {string} data.title - Book title
 * @param {string} data.author - Book author
 * @param {number} [data.yearPublished] - Year the book was published
 * @returns {Object} Created book object
 * @throws {Error} If title is missing
 */
function Create(data) {
    // Validate required fields
    if (!data || !data.title) {
        throw new Error('Title is required');
    }

    const book = {
        id: _nextId++,
        title: data.title.trim(),
        author: data.author ? data.author.trim() : '',
        yearPublished: data.yearPublished ? parseInt(data.yearPublished, 10) : null
    };

    _books.push(book);
    return book;
}

    // Export public methods
module.exports = { List, GetById, Create };
