import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MatchList from './MatchList';
import MatchForm from './MatchForm';

export default function MatchesContainer() {
  const [matches, setMatches] = useState([]);
  const [teams, setTeams] = useState([]);

  const fetchData = async () => {
    try {
      // Axios requests run simultaneously using Promise.all
      const [matchRes, teamRes] = await Promise.all([
        axios.get('http://localhost:3356/api/matches'),
        axios.get('http://localhost:3356/api/teams')
      ]);
      setMatches(matchRes.data);
      setTeams(teamRes.data);
    } catch (err) {
      console.error('Error loading data', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreateMatch = async (matchData) => {
    try {
      await axios.post('http://localhost:3356/api/matches', matchData);
      fetchData();
    } catch (err) {
      console.error('Error creating match', err);
    }
  };

  return (
    <div>
      <h2>Matches Dashboard</h2>
      <MatchForm teams={teams} onCreateMatch={handleCreateMatch} />
      <MatchList matches={matches} />
    </div>
  );
}
