import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import RecentPage from './pages/RecentPage';
import ViewPage from './pages/ViewPage';
import './App.css'

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/recent" element={<RecentPage />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/view/:id" element={<ViewPage />} />
      </Routes>
    </Router>
  )
}

export default App