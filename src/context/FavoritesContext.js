import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(() => {
      try {
          const storedFavorites = localStorage.getItem('favorites');
          return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
        console.error("Error al leer los favoritos del localStorage", error)
           return [];
        }
  });
    
   useEffect(() => {
     try{
       localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch(error){
        console.error("Error al guardar los favoritos del localStorage", error)
      }
   }, [favorites]);


  const toggleFavorite = (pokemon) => {
    setFavorites((prevFavorites) => {
    const isFavorite = prevFavorites.some((fav) => fav.details.id === pokemon.details.id);

      if (isFavorite) {
        return prevFavorites.filter((fav) => fav.details.id !== pokemon.details.id);
      } else {
        return [...prevFavorites, pokemon];
      }
    });
  };

  const isFavorite = (pokemon) => favorites.some((fav) => fav.details.id === pokemon.details.id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};