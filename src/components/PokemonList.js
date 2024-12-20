import React, { useState, useEffect } from 'react';
     import { fetchPokemonList, fetchPokemonDetails } from '../services/pokemonService';
     
     const PokemonList = ({ filterType }) => {
        const [pokemonList, setPokemonList] = useState([]);
        const [loading, setLoading] = useState(true);
        
        useEffect(() => {
            const loadPokemon = async () => {
                try{
                setLoading(true);
                const data = await fetchPokemonList(20, 0)
                const pokemonWithDetails = await Promise.all(data.results.map(async (pokemon) => {
                    const details = await fetchPokemonDetails(pokemon.url);
                    return {
                        ...pokemon,
                        details
                    };
                }));
                
                let filteredPokemons = pokemonWithDetails;
                if (filterType){
                    filteredPokemons = pokemonWithDetails.filter((pokemon) =>
                        pokemon.details.types.some((type) => type.type.name === filterType)
                    );
                }
                setPokemonList(filteredPokemons);
                } catch(error){
                    console.error("Failed to load Pokemon", error);
                } finally{
                setLoading(false);
                }
            };
                loadPokemon();
            }, [filterType]);
            
        if (loading) {
            return <div>Loading Pokémon...</div>;
        }
        
        return (
            <ul className="list-none p-0">
            {pokemonList.map((pokemon) => (
                <li key={pokemon.name} className="bg-gray-100 mb-4 p-4 rounded shadow flex items-center md:flex-row flex-col text-center md:text-left">
                    <img src={pokemon.details.sprites.front_default} alt={pokemon.name} className="w-20 mr-4 mb-2 md:mb-0" />
                    <div>
                        <h2 className="text-xl font-semibold mb-1 text-gray-700">{pokemon.details.id}. {pokemon.name}</h2>
                         <p className="text-sm text-gray-500">
                        <strong>Types:</strong>{' '}
                        {pokemon.details.types.map((type) => type.type.name).join(', ')}
                       </p>
                    </div>
                </li>
            ))}
            </ul>
        );
        };
     export default PokemonList;
