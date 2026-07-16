import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav>
      <h1>Football Match Score Dashboard</h1>
      <ul>
        <li><Link to="/teams">Teams</Link></li>
        <li><Link to="/matches">Matches</Link></li>
      </ul>
    </nav>
  );
}


