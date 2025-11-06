/*
 * Song List Component
 * Displays a list of songs and handles selection
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SongForm from './SongForm';

function SongList() {
    const [songs, setSongs] = useState([]);
    const [selectedSong, setSelectedSong] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function FetchSongs() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get('/api/songs');
            setSongs(response.data);
        } catch (err) {
            console.error('Error fetching songs:', err);
            setError('Failed to load songs. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        FetchSongs();
    }, []);

    function HandleSongSelect(song) {
        setSelectedSong(song);
    }

    function HandleCloseDetail() {
        setSelectedSong(null);
    }

    function HandleSongCreated() {
        FetchSongs();
    }

    return (
        <div>
            <h2>Songs</h2>

            <SongForm onCreated={HandleSongCreated} />

            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <div>Loading songs...</div>
            ) : (
                <ul>
                    {songs.map((song) => (
                        <li key={song.id}>
                            <button onClick={() => HandleSongSelect(song)}>
                                {song.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {selectedSong && (
                <div className="song-detail">
                    <h3>{selectedSong.title}</h3>
                    <p>Artist: {selectedSong.artist || 'Not specified'}</p>
                    <p>Year: {selectedSong.yearReleased || 'Not specified'}</p>
                    <button onClick={HandleCloseDetail}>Close</button>
                </div>
            )}
        </div>
    );
}

export default SongList;
