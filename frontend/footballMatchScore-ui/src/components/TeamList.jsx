import React from 'react';

export default function TeamList({ teams, onDeleteTeam }) {
  return (
    <div>
      <h3>Team List</h3>
      <ul>
        {teams.map(team => (
          <li key={team._id}>
            {team.name} 
            <button onClick={() => onDeleteTeam(team._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
