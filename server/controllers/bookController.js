/*
 * Book Controller
 * Handles HTTP requests for Book resources
 */

const Book = require('../models/Book');

/**
 * List all books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function ListBooks(req, res) {
    try {
        const books = Book.List();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
}

/**
 * Get a specific book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function GetBook(req, res) {
    try {
        const bookId = req.params.id;
        const book = Book.GetById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

/**
 * Create a new book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
function CreateBook(req, res) {
    try {
        // Log incoming request for debugging
        console.log('CreateBook called with body:', req.body);

        // Validate request body
        if (!req.body || !req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const book = Book.Create(req.body);
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Export controller methods
module.exports = {
    ListBooks,
    GetBook,
    CreateBook
};
