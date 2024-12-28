import React, { createContext, useState } from 'react';

export const CompareContext = createContext();

export const CompareProvider = ({ children }) => {
    const [pokemon1, setPokemon1] = useState(null);
    const [pokemon2, setPokemon2] = useState(null);

    const selectPokemon = (pokemon, slot) => {
      if (slot === 1) {
        setPokemon1(pokemon);
      } else if (slot === 2) {
        setPokemon2(pokemon);
      }
    };

    const resetCompare = () => {
      setPokemon1(null);
      setPokemon2(null);
    };

    return (
    <CompareContext.Provider value={{ pokemon1, pokemon2, selectPokemon, resetCompare }}>
        {children}
    </CompareContext.Provider>
    );
};