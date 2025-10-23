/*
 * Main Application Component
 * Renders the media library interface with books, movies, and songs
 */

import React from 'react';
import './App.css';

// Import media list components
import BookList from './components/Books/BookList';
import MovieList from './components/Movies/MovieList';
import SongList from './components/Songs/SongList';

// Layout style constants
const GRID_STYLES = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    padding: '1rem'
};

function App() {
    return (
        <div className="App">
            <header>
                <h1>Media Library</h1>
            </header>

            <main style={GRID_STYLES}>
                <section>
                    <BookList />
                </section>

                <section>
                    <MovieList />
                </section>

                <section>
                    <SongList />
                </section>
            </main>
        </div>
    );
}

export default App;
