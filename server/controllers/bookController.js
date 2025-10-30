/*
 * Book Controller
 * Handles HTTP requests for Book resources
 */

const db = require('../models');
const Book = db.Book;

/**
 * List all books
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function ListBooks(req, res) {
    try {
        const books = await Book.findAll();
        res.json(books);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve books' });
    }
}

/**
 * Get a specific book by ID
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function GetBook(req, res) {
    try {
        const bookId = req.params.id;
        const book = await Book.findByPk(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.json(book);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

/**
 * Create a new book
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 */
async function CreateBook(req, res) {
    try {
        console.log('CreateBook called with body:', req.body);

        if (!req.body || !req.body.title) {
            return res.status(400).json({ error: 'Title is required' });
        }

        const book = await Book.create({
            title: req.body.title.trim(),
            author: req.body.author ? req.body.author.trim() : null,
            yearPublished: req.body.yearPublished ? parseInt(req.body.yearPublished, 10) : null
        });

        res.status(201).json(book);
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
}

// Export controller methods
module.exports = {
    ListBooks,
    GetBook,
    CreateBook
};
