import { createContext, useContext, useState, useEffect } from 'react';

// Contexte pour partager les favoris
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    const storedFavorites = localStorage.getItem('favorites');
    return storedFavorites ? JSON.parse(storedFavorites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (film) => {
    setFavorites(prevFavorites => [...prevFavorites, film]);
  };

  const removeFavorite = (id) => {
    setFavorites(prevFavorites => prevFavorites.filter(f => f.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export default function useFavorites() {
  return useContext(FavoritesContext);
}
