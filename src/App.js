// src/App.js
import React, { useState } from 'react';
import PokemonList from './components/PokemonList';
import PokemonTypeFilter from './components/PokemonTypeFilter';

function App() {
    const [filterType, setFilterType] = useState('');

    const handleFilterChange = (type) => {
        setFilterType(type);
    };

    return (
        <div className="App">
            <h1>Pokédex</h1>
            <PokemonTypeFilter onFilterChange={handleFilterChange} />
            <PokemonList filterType={filterType} />
        </div>
    );
}

export default App;