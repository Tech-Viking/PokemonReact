import React, { useContext } from 'react';
import { FavoritesContext } from '../../context/FavoritesContext';
import PokemonList from '../../components/PokemonList/PokemonList';
import styles from './Favorites.module.css';
const Favorites = () => {
    const { favorites } = useContext(FavoritesContext);
  
    if(favorites.length === 0){
    return <h2 style={{textAlign: 'center', marginTop: '30px'}}> No hay pokemon favoritos marcados</h2>
    }
    return (
     <div className={styles.container}>
        <h1>Favorites</h1>
            <PokemonList pokemons={favorites} />
       </div>
    );
};

export default Favorites;