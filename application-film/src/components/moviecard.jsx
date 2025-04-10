import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavorites from './useFavorites';

function MovieCard({ movie }) {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const isFavorite = favorites.some(fav => fav.id === movie.id);

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
  };

  return (
    <div className="film-card">
      <img src={movie.image} alt={movie.title} />
      <h3>{movie.title}</h3>
      <p>{movie.category}</p>
      <Link to={`/films/${movie.id}`} className="btn">Voir détails</Link>
      <button
        onClick={toggleFavorite}
        className="favorite-btn"
        aria-label="Ajouter aux favoris"
      >
        {isFavorite ? (
          <FaHeart className="fav-filled" />
        ) : (
          <FaRegHeart className="fav-empty" />
        )}
      </button>
    </div>
  );
}

export default MovieCard;
