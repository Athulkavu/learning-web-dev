import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import TeamsContainer from './components/TeamsContainer';
import MatchesContainer from './components/MatchesContainer';
import MatchDetail from './components/MatchDetail';

export default function App() {
  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Navigate to="/teams" replace />} />
          <Route path="/teams" element={<TeamsContainer />} />
          <Route path="/matches" element={<MatchesContainer />} />
          <Route path="/matches/:id" element={<MatchDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

