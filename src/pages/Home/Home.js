import React, { useState, useEffect, useRef } from 'react';
import PokemonList from '../../components/PokemonList/PokemonList';
import styles from './Home.module.css';
import { fetchAllPokemons, fetchPokemonDetails } from '../../services/pokemonService';
import PokemonDetails from '../../components/PokemonDetails/PokemonDetails';
import PokemonTypeFilter from '../../components/PokemonTypeFilter/PokemonTypeFilter';
import { Link } from 'react-router-dom'
function Home() {
    const [filterType, setFilterType] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [allPokemons, setAllPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [selectedPokemonPosition, setSelectedPokemonPosition] = useState(null);

    const pokemonsPerPage = 20;

    useEffect(() => {
    const loadPokemons = async () => {
        try{
        setLoading(true);
        const pokemons = await fetchAllPokemons();
        const pokemonWithDetails = await Promise.all(pokemons.map(async (pokemon) => {
            const details = await fetchPokemonDetails(pokemon.url);
            return {
                ...pokemon,
                details
            };
        }));
        setAllPokemons(pokemonWithDetails);
        setError(null);
        } catch (error) {
            console.error("Failed to load all pokemons:", error);
            setError("Failed to load pokemons");
        } finally{
        setLoading(false);
        }
    }
        loadPokemons();
    }, []);

    const handleFilterChange = (type) => {
        setFilterType(type);
        setCurrentPage(1); // Resetea la pagina cuando cambia el tipo
    };
    
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value.toLowerCase());
        setCurrentPage(1); //Resetea la pagina cuando cambia la busqueda
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
        
    const handlePokemonSelect = (pokemon, elementRef) =>{
        setSelectedPokemon(pokemon)
        setSelectedPokemonPosition(elementRef.current.getBoundingClientRect()) // Obtener la posicion del elemento seleccionado
    }
    const handleCloseDetails = () => {
            setSelectedPokemon(null);
            setSelectedPokemonPosition(null);
    };
    
    let filteredPokemons = allPokemons;
        
    if (filterType) {
            filteredPokemons = filteredPokemons.filter((pokemon) =>
                pokemon.details.types.some((type) => type.type.name === filterType)
            );
    }
    if (searchQuery){
            filteredPokemons = filteredPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchQuery)
            );
    }
    
    const offset = (currentPage - 1) * pokemonsPerPage;
    const paginatedPokemons = filteredPokemons.slice(offset, offset + pokemonsPerPage);

    if (loading) {
        return <div>Loading Pokemons...</div>;
    }
    if(error) {
        return <div>Failed to load pokemons</div>
    }
    return (
        <div className={styles.container}>
             <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                  <h1>Pokédex</h1>
                  <div style={{display: 'flex', gap: '10px'}}>
                     <Link to="/favorites">Favorites</Link>
                     <Link to="/compare">Compare</Link>
                  </div>
                   
            </div>
            {selectedPokemon && (
                
                    <PokemonDetails pokemon={selectedPokemon} position={selectedPokemonPosition} onClose={handleCloseDetails}/>
                
            )}
            <input
                type="text"
                placeholder="Search Pokémon by name..."
                value={searchQuery}
                onChange={handleSearchChange}
                className="mb-4 p-2 border rounded block w-full"
                />
            <PokemonTypeFilter onFilterChange={handleFilterChange} />
            <PokemonList 
            pokemons={paginatedPokemons}
            onPokemonSelect={handlePokemonSelect}
            />
            <div className='flex justify-center mt-4'>
                <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
                className="px-4 py-2 mr-2 bg-gray-300 rounded hover:bg-gray-400 disabled:bg-gray-200 disabled:cursor-not-allowed">
                Anterior
                </button>
                <button
                onClick={() => handlePageChange(currentPage + 1)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">
                Siguiente
                </button>
            </div>
        </div>
    );
}

export default Home;
