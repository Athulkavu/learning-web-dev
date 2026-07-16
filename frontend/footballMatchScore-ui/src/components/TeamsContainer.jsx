import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TeamList from './TeamList';
import TeamForm from './TeamForm';

export default function TeamsContainer() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState('');

  const fetchTeams = async () => {
    try {
      const response = await axios.get('http://localhost:3356/api/teams');
      setTeams(response.data);
    } catch (err) {
      setError('Failed to fetch teams');
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleAddTeam = async (name) => {
    setError('');
    try {
      const response = await axios.post('http://localhost:3356/api/teams', { name });
      fetchTeams();
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to add team');
    }
  };

  const handleDeleteTeam = async (id) => {
    try {
      await axios.delete(`http://localhost:3356/api/teams/${id}`);
      fetchTeams();
    } catch (err) {
      setError('Deletion failed');
    }
  };

  return (
    <div>
      <h2>Teams Dashboard</h2>
      {error && <p>{error}</p>}
      <div>
        <TeamList teams={teams} onDeleteTeam={handleDeleteTeam} />
        <TeamForm onAddTeam={handleAddTeam} />
      </div>
    </div>
  );
}
