import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function FilmDetail() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/films')
      .then(res => {
        const filmTrouve = res.data.find(f => parseInt(f.id) === parseInt(id));
        setFilm(filmTrouve);
        setLoading(false);
      })
      .catch(err => {
        console.error('Erreur lors du chargement du film :', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (!film) return <p>Film non trouvé</p>;

  return (
    <div className="container">
      <div className="film-detail">
        <img src={film.image} alt={film.title} />
        <h2>{film.title}</h2>
        <p><strong>Catégorie :</strong> {film.category}</p>
        <p><strong>Description :</strong> {film.description}</p>
        <p><strong>Note :</strong> {film.rating} ⭐</p>
        <Link to="/" className="back-link">← Retour</Link>
      </div>
    </div>
  );
}

export default FilmDetail;
