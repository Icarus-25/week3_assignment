/*
 * Song Form Component
 * Provides form interface for creating new songs
 */

import React, { useState } from 'react';
import axios from 'axios';

function SongForm({ onCreated }) {
  const [formData, setFormData] = useState({
    title: '',
    artist: '',
    yearReleased: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  function HandleInputChange(event) {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function ResetForm() {
    setFormData({ title: '', artist: '', yearReleased: '' });
  }

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
        artist: formData.artist ? formData.artist.trim() : '',
        yearReleased: formData.yearReleased ? parseInt(formData.yearReleased, 10) : null
      };

      const response = await axios.post('http://localhost:5000/api/songs', payload);

      ResetForm();

      if (onCreated) {
        onCreated(response.data);
      }

      alert('Song created successfully!');
    } catch (error) {
      console.error('Error creating song:', error);
      const message = error.response?.data?.error || error.message;
      alert('Failed to create song: ' + message);
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
        name="artist"
        value={formData.artist}
        onChange={HandleInputChange}
        placeholder="Artist"
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
        {isSubmitting ? 'Adding...' : 'Add Song'}
      </button>
    </form>
  );
}

export default SongForm;
