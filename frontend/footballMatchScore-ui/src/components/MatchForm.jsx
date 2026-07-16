import React, { useState } from 'react';

export default function MatchForm({ teams, onCreateMatch }) {
  const [title, setTitle] = useState('');
  const [team1, setTeam1] = useState('');
  const [team2, setTeam2] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !team1 || !team2) return;
    onCreateMatch({ title, team1_id: team1, team2_id: team2 });
    setTitle('');
    setTeam1('');
    setTeam2('');
  };

  const availableForTeam2 = teams.filter(t => t._id !== team1);

  return (
    <div>
      <h3>Create Match Form</h3>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Match Title" 
          value={title} 
          onChange={e => setTitle(e.target.value)} 
          required 
        />

        <select value={team1} onChange={e => { setTeam1(e.target.value); setTeam2(''); }} required>
          <option value="">Select Team 1</option>
          {teams.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
        </select>

        {team1 && (
          <select value={team2} onChange={e => setTeam2(e.target.value)} required>
            <option value="">Select Team 2</option>
            {availableForTeam2.map(t => <option key={t._id} value={t._id}>{t.name}</option>)}
          </select>
        )}

        <button type="submit" disabled={!team1 || !team2}>Add Match</button>
      </form>
    </div>
  );
}
