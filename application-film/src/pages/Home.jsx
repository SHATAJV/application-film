import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Importez useNavigate
import axios from 'axios';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import useFavorites from '../components/useFavorites';

function Home() {
  const [films, setFilms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [message, setMessage] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Toutes');
  const [searchQuery, setSearchQuery] = useState(''); // Ajout de l'état pour la recherche

  const location = useLocation();
  const navigate = useNavigate(); // Utilisez useNavigate pour naviguer
  const queryParams = new URLSearchParams(location.search);
  const urlCategory = queryParams.get('category');

  useEffect(() => {
    axios.get('http://localhost:5000/films')
      .then(res => {
        setFilms(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur API:', err);
        setLoading(false);
      });
  }, []);

  // Met à jour la catégorie sélectionnée quand l'URL change
  useEffect(() => {
    if (urlCategory) {
      setSelectedCategory(urlCategory);
    } else {
      setSelectedCategory('Toutes');
    }
  }, [urlCategory]);

  const handleFavorite = (film) => {
    const isFavorite = favorites.some(fav => fav.id === film.id);
    if (isFavorite) {
      removeFavorite(film.id);
      setMessage('Film retiré des favoris.');
    } else {
      addFavorite(film);
      setMessage('Film ajouté aux favoris!');
    }
  };

  if (loading) return <p>Chargement...</p>;

  // Filtrage par catégorie
  const filteredFilmsByCategory = selectedCategory === 'Toutes'
    ? films
    : films.filter(film => film.category === selectedCategory);

  // Filtrage par nom de film
  const filteredFilms = filteredFilmsByCategory.filter(film =>
    film.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction pour gérer la redirection vers les détails du film
  const handleViewDetails = (filmId) => {
    navigate(`/films/${filmId}`); // Redirige vers la page du film
  };

  return (
    <div className="container">
      <h1>Liste des films {selectedCategory !== 'Toutes' && `- ${selectedCategory}`}</h1>

      {/* Barre de recherche */}
      <div>
        <input
          type="text"
          placeholder="Rechercher un film..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {message && <p>{message}</p>}

      <div className="film-list">
        {filteredFilms.map(film => (
          <div className="film-card" key={film.id}>
            <img src={film.image} alt={film.title} />
            <h3>{film.title}</h3>
            <p>{film.category}</p>

            {/* Remplacer le Link par un bouton pour "Voir détails" */}
            <button className="detail-btn" onClick={() => handleViewDetails(film.id)}>
              Voir Détails
            </button>

            <button
              onClick={() => handleFavorite(film)}
              className="favorite-btn"
              aria-label="Ajouter aux favoris"
            >
              {favorites.some(fav => fav.id === film.id) ? (
                <FaHeart className="fav-filled" />
              ) : (
                <FaRegHeart className="fav-empty" />
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
