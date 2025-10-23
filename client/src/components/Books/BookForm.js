/*
 * Book Form Component
 * Provides form interface for creating new books
 */

import React, { useState } from 'react';
import axios from 'axios';

function BookForm({ onCreated }) {
    // Form state initialization
    const [formData, setFormData] = useState({
        title: '',
        author: '',
        yearPublished: ''
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    function HandleInputChange(event) {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    // Reset form to initial state
    function ResetForm() {
        setFormData({
            title: '',
            author: '',
            yearPublished: ''
        });
    }

    // Handle form submission
    async function HandleSubmit(event) {
        event.preventDefault();

        // Validate required fields
        if (!formData.title.trim()) {
            alert('Title is required');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:5000/api/books', {
                title: formData.title.trim(),
                author: formData.author.trim(),
                yearPublished: formData.yearPublished ? parseInt(formData.yearPublished, 10) : null
            });

            ResetForm();
            if (onCreated) {
                onCreated(response.data);
            }
            alert('Book created successfully!');
        } catch (error) {
            console.error('Error creating book:', error);
            const errorMessage = error.response?.data?.error || error.message;
            alert('Failed to create book: ' + errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    }

    return (
        <form onSubmit={HandleSubmit}>
            <input
                name="title"
                value={formData.title}
                onChange={HandleInputChange}
                placeholder="Title"
                disabled={isSubmitting}
            />

            <input
                name="author"
                value={formData.author}
                onChange={HandleInputChange}
                placeholder="Author"
                disabled={isSubmitting}
            />

            <input
                name="yearPublished"
                value={formData.yearPublished}
                onChange={HandleInputChange}
                placeholder="Year Published"
                type="number"
                disabled={isSubmitting}
            />

            <button 
                type="submit"
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Adding...' : 'Add Book'}
            </button>
        </form>
    );
}

export default BookForm;
