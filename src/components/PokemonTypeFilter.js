import React, { useState, useEffect } from 'react';
    import { fetchPokemonTypes } from '../services/pokemonService';

    const PokemonTypeFilter = ({ onFilterChange }) => {
    const [types, setTypes] = useState([]);
    const [selectedType, setSelectedType] = useState('');

    useEffect(() => {
        const loadTypes = async () => {
            try {
                const fetchedTypes = await fetchPokemonTypes();
                setTypes(fetchedTypes);
            } catch (error) {
                console.error("Failed to load types", error);
            }
        };
        loadTypes();
    }, []);

    const handleTypeChange = (event) => {
        const type = event.target.value;
        setSelectedType(type);
        onFilterChange(type);
    };

        return (
            <select value={selectedType} onChange={handleTypeChange}>
                <option value="">All Types</option>
            {types.map((type) => (
                    <option key={type.name} value={type.name}>
                        {type.name}
                    </option>
                ))}
            </select>
        );
    };

    export default PokemonTypeFilter;