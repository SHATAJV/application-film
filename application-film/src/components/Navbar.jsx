import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null); // Référence pour le menu déroulant
  const categories = ['Action', 'Comédie', 'Drame', 'Science-fiction', 'Romance'];

  // Fermer le dropdown si on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // Fermer le menu si on clique en dehors
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  // Lorsque l'utilisateur clique sur une catégorie
  const handleCategoryClick = (category) => {
    setIsDropdownOpen(false); // Fermer le menu après la sélection de la catégorie
    navigate(`/?category=${category}`); // Rediriger vers la page avec la catégorie sélectionnée
  };

  // Toggle pour ouvrir/fermer le dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Films</Link>
        <ul className="navbar-links">
          <li><Link className="navbar-link" to="/">Accueil</Link></li>
          <li className="navbar-link" ref={dropdownRef}>
            <button onClick={toggleDropdown}>
              Catégories
            </button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                {categories.map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => handleCategoryClick(cat)} // Sélectionner une catégorie
                      className="navbar-link"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li><Link className="navbar-link" to="/favorites">Favoris</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
