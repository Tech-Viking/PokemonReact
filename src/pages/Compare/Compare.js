import React, { useContext } from 'react';
import { CompareContext } from '../../context/CompareContext';
import styles from './Compare.module.css'

const Compare = () => {
    const { pokemon1, pokemon2 } = useContext(CompareContext);
   
   if (!pokemon1 && !pokemon2){
    return <h2 style={{textAlign: 'center', marginTop: '30px'}}>Selecciona 2 pokemons a comparar</h2>
   }

   if (!pokemon1){
      return <h2 style={{textAlign: 'center', marginTop: '30px'}}>Selecciona un pokemon en el slot 1</h2>
   }
  if (!pokemon2){
     return <h2 style={{textAlign: 'center', marginTop: '30px'}}>Selecciona un pokemon en el slot 2</h2>
    }
    return (
        <div className={styles.container}>
          <h1>Comparación de Pokémon</h1>
           <div className={styles.content}>
            <div className={styles.pokemon}>
              <h2>{pokemon1.details.name}</h2>
              <img src={pokemon1.details.sprites.front_default} alt={pokemon1.details.name}/>
              <ul>
                  {pokemon1.details.stats.map(stat => (
                    <li key={stat.stat.name}>
                       <strong>{stat.stat.name}:</strong> {stat.base_stat}
                    </li>
                  ))}
               </ul>
             </div>
            <div className={styles.pokemon}>
                <h2>{pokemon2.details.name}</h2>
               <img src={pokemon2.details.sprites.front_default} alt={pokemon2.details.name}/>
                 <ul>
                     {pokemon2.details.stats.map(stat => (
                          <li key={stat.stat.name}>
                             <strong>{stat.stat.name}:</strong> {stat.base_stat}
                          </li>
                     ))}
               </ul>
             </div>
           </div>
       </div>
     );
};

export default Compare;