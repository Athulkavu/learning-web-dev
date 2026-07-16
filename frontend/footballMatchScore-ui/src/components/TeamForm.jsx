import React, { useState } from 'react';

export default function TeamForm({ onAddTeam }) {
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onAddTeam(name);
    setName('');
  };

  return (
    <div>
      <h3>Add Team Form</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Enter Team Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />
        <button type="submit">Add Team</button>
      </form>
    </div>
  );
}
