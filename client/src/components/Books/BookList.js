/*
 * Book List Component
 * Displays a list of books and handles book selection
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './BookForm';

function BookList() {
    // State initialization
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch books from the server
    async function FetchBooks() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get('/api/books');
            setBooks(response.data);
        } catch (error) {
            console.error('Error fetching books:', error);
            setError('Failed to load books. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    // Select a book for detailed view
    function HandleBookSelect(book) {
        setSelectedBook(book);
    }

    // Close the detailed view
    function HandleCloseDetail() {
        setSelectedBook(null);
    }

    // Load books when component mounts
    useEffect(() => {
        FetchBooks();
    }, []);

    // Handle successful book creation
    function HandleBookCreated() {
        FetchBooks();
    }

    return (
        <div>
            <h2>Books</h2>
            
            <BookForm onCreated={HandleBookCreated} />

            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}

            {isLoading ? (
                <div>Loading books...</div>
            ) : (
                <ul>
                    {books.map((book) => (
                        <li key={book.id}>
                            <button onClick={() => HandleBookSelect(book)}>
                                {book.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {selectedBook && (
                <div className="book-detail">
                    <h3>{selectedBook.title}</h3>
                    <p>Author: {selectedBook.author || 'Not specified'}</p>
                    <p>Year: {selectedBook.yearPublished || 'Not specified'}</p>
                    <button onClick={HandleCloseDetail}>
                        Close
                    </button>
                </div>
            )}
        </div>
    );
}

export default BookList;
