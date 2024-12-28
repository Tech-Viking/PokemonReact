    import React from 'react';
    import styles from './PokemonDetails.module.css'

    const PokemonDetails = ({ pokemon, position, onClose }) => {
        if (!pokemon || !position) {
            return null;
        }
        
        return (
            
            <div className={styles.backdrop} >
                <div
                className={styles.container}
                style={{
                    top: position.top,
                    left: position.left,
                    width: position.width,
                }}
                >
                  
                    <div className={styles.header}>
                         <h2 className={styles.title}>{pokemon.details.name}</h2>
                         <button onClick={onClose} className={styles.closeButton}>x</button>
                    </div>
                   
                    <div className={styles.content}>
                        <img src={pokemon.details.sprites.front_default} alt={pokemon.details.name} className={styles.image} />
                         <div className={styles.info}>
                             <p><strong>Number:</strong> {pokemon.details.id}</p>
                            <p><strong>Types:</strong> {pokemon.details.types.map((type) => type.type.name).join(', ')}</p>
                            
                            <h3>Stats</h3>
                            <ul>
                                {pokemon.details.stats.map((stat) => (
                                    <li key={stat.stat.name}>
                                        <strong>{stat.stat.name}:</strong> {stat.base_stat}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
              </div>
        );
    };
    
    export default PokemonDetails;