// src/context/FavoritesContext.js
import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (user) => {
    const isExist = favorites.find(fav => fav.id === user.id);
    if (isExist) {
      setFavorites(favorites.filter(fav => fav.id !== user.id)); // Varsa çıkar
    } else {
      setFavorites([...favorites, user]); // Yoksa ekle
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

