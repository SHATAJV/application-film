import React from 'react';
import MovieCard from '../components/moviecard';
import useFavorites from '../components/useFavorites';

function Favorites() {
  const { favorites } = useFavorites();

  return (
    <div className="container">
      <h1>Favoris</h1>
      {favorites.length === 0 ? (
        <p>Aucun film dans vos favoris.</p>
      ) : (
        <div className="film-list">
          {favorites.map(film => (
            <MovieCard key={film.id} movie={film} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
