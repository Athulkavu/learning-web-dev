import React from 'react';
import { Link } from 'react-router-dom';

export default function MatchList({ matches }) {
  return (
    <div>
      <h3>Matches Table</h3>
      <table border="1">
        <thead>
          <tr>
            <th>Match Title</th>
            <th>Teams</th>
            <th>Scores</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {matches.map(m => (
            <tr key={m._id}>
              <td>{m.title}</td>
              <td>{m.team1_id?.name || 'Deleted Team'} vs {m.team2_id?.name || 'Deleted Team'}</td>
              <td>{m.team1_score} - {m.team2_score}</td>
              <td>{m.matchOver ? 'Finished' : 'Live'}</td>
              <td>
                <Link to={`/matches/${m._id}`}>View Match </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
