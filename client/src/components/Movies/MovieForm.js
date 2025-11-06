/*
 * Movie Form Component
 * Provides form interface for creating new movies
 */

import React, { useState } from 'react';
import axios from 'axios';

function MovieForm({ onCreated }) {
  // Form state initialization
  const [formData, setFormData] = useState({
    title: '',
    director: '',
    yearReleased: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  function HandleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }

  // Reset form
  function ResetForm() {
    setFormData({ title: '', director: '', yearReleased: '' });
  }

  // Submit handler
  async function HandleSubmit(event) {
    event.preventDefault();

    if (!formData.title || !formData.title.trim()) {
      alert('Title is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        title: formData.title.trim(),
        director: formData.director ? formData.director.trim() : '',
        yearReleased: formData.yearReleased ? parseInt(formData.yearReleased, 10) : null
      };

      const response = await axios.post('/api/movies', payload);

      ResetForm();

      if (onCreated) {
        onCreated(response.data);
      }

      alert('Movie created successfully!');
    } catch (error) {
      console.error('Error creating movie:', error);
      const message = error.response?.data?.error || error.message;
      alert('Failed to create movie: ' + message);
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
        name="director"
        value={formData.director}
        onChange={HandleInputChange}
        placeholder="Director"
        disabled={isSubmitting}
      />

      <input
        name="yearReleased"
        value={formData.yearReleased}
        onChange={HandleInputChange}
        placeholder="Year Released"
        type="number"
        disabled={isSubmitting}
      />

      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Adding...' : 'Add Movie'}
      </button>
    </form>
  );
}

export default MovieForm;

