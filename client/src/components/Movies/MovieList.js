/*
 * Movie List Component
 * Displays a list of movies and handles selection
 */

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieForm from './MovieForm';

function MovieList() {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    async function FetchMovies() {
        try {
            setIsLoading(true);
            setError(null);

            const response = await axios.get('http://localhost:5000/api/movies');
            setMovies(response.data);
        } catch (err) {
            console.error('Error fetching movies:', err);
            setError('Failed to load movies. Please try again.');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        FetchMovies();
    }, []);

    function HandleMovieSelect(movie) {
        setSelectedMovie(movie);
    }

    function HandleCloseDetail() {
        setSelectedMovie(null);
    }

    function HandleMovieCreated() {
        FetchMovies();
    }

    return (
        <div>
            <h2>Movies</h2>

            <MovieForm onCreated={HandleMovieCreated} />

            {error && <div className="error-message">{error}</div>}

            {isLoading ? (
                <div>Loading movies...</div>
            ) : (
                <ul>
                    {movies.map((movie) => (
                        <li key={movie.id}>
                            <button onClick={() => HandleMovieSelect(movie)}>
                                {movie.title}
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            {selectedMovie && (
                <div className="movie-detail">
                    <h3>{selectedMovie.title}</h3>
                    <p>Director: {selectedMovie.director || 'Not specified'}</p>
                    <p>Year: {selectedMovie.yearReleased || 'Not specified'}</p>
                    <button onClick={HandleCloseDetail}>Close</button>
                </div>
            )}
        </div>
    );
}

export default MovieList;
