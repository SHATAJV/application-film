// src/App.jsx
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import FilmDetail from './pages/FilmDetails';
import Navbar from './components/Navbar';
import Favorites from './pages/Favorites';
import './App.css';

function App() {
  const [selectedCategory, setSelectedCategory] = useState('');

  return (
    <>
      <Navbar onCategoryChange={setSelectedCategory} />
      <Routes>
        <Route path="/" element={<Home categoryFilter={selectedCategory} />} />
        <Route path="/films/:id" element={<FilmDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
