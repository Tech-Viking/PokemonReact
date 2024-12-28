import React, { useRef, useContext } from 'react';
import styles from './PokemonList.module.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { FavoritesContext } from '../../context/FavoritesContext';
import { CompareContext } from '../../context/CompareContext';
const PokemonList = ({ pokemons, onPokemonSelect }) => {
const { toggleFavorite, isFavorite } = useContext(FavoritesContext);
const { selectPokemon, pokemon1, pokemon2 } = useContext(CompareContext);

return (
  <ul className={styles.list}>
      {pokemons.map((pokemon) => {
      const elementRef = useRef(null);
      const isPokemon1Selected = pokemon1 && pokemon1.details.id === pokemon.details.id;
      const isPokemon2Selected = pokemon2 && pokemon2.details.id === pokemon.details.id;

      return(
          <li className={styles.listItem} key={pokemon.name} onClick={() => onPokemonSelect(pokemon, elementRef)} ref={elementRef}>
              <h2>{pokemon.details.id}. {pokemon.name}</h2>
              <LazyLoadImage
              src={pokemon.details.sprites.front_default}
              alt={pokemon.details.name}
              effect="blur"
              />
               <div style={{display: 'flex', gap: '5px', alignItems: 'center'}}>
                  <p>
                      <strong>Types:</strong>{' '}
                      {pokemon.details.types.map((type) => type.type.name).join(', ')}
                  </p>
              
              <button
                      onClick={(event) => {
                      event.stopPropagation();
                      toggleFavorite(pokemon);
                      }}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '20px', color: isFavorite(pokemon) ? 'red' : 'gray'}}
                  >
                  {isFavorite(pokemon) ? '❤️' : '🤍'}
              </button>
               <button onClick={(event) => {
                      event.stopPropagation();
                      selectPokemon(pokemon, 1)
                  }}
                   className={`${styles.compareButton} ${isPokemon1Selected ? styles.selectedCompare1 : ''}`}
                  >
                      Compare 1
              </button>
              <button
                  onClick={(event) => {
                      event.stopPropagation();
                      selectPokemon(pokemon, 2)
                  }}
                  className={`${styles.compareButton} ${isPokemon2Selected ? styles.selectedCompare2 : ''}`}
                  >
                      Compare 2
              </button>
          </div>
          </li>
      )
      })}
  </ul>
  );
};

export default PokemonList;