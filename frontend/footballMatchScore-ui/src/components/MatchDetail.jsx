import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function MatchDetail() {
  const { id } = useParams();
  const [match, setMatch] = useState(null);

  const fetchMatch = async () => {
    try {
      const response = await axios.get(`http://localhost:3356/api/matches/${id}`);
      setMatch(response.data);
    } catch (err) {
      console.error('Error fetching match details', err);
    }
  };

  useEffect(() => {
    fetchMatch();
  }, [id]);

  const updateMatchOnBackend = async (payload, useReset = false) => {
    const endpoint = useReset 
      ? `http://localhost:3356/api/matches/${id}?action=reset`
      : `http://localhost:3356/api/matches/${id}?action=update`;

    try {
      // Axios PUT automatically handles empty bodies cleanly if resetting
      await axios.put(endpoint, useReset ? {} : payload);
      fetchMatch();
    } catch (err) {
      console.error('Error updating match data', err);
    }
  };

  if (!match) return <p>Loading match dashboard...</p>;

  const changeScore = (teamNum, direction) => {
    if (match.matchOver) return;
    
    let currentScore = teamNum === 1 ? match.team1_score : match.team2_score;
    let nextScore = direction === 'inc' ? currentScore+1 : currentScore-1;
    if (nextScore < 0) nextScore=0;

    const payload = teamNum === 1 ? { team1_score: nextScore } : { team2_score: nextScore };
    updateMatchOnBackend(payload);
  };

  return (
    <div>
      <Link to="/matches"> -Back to Matches Table</Link>
      <h2>{match.title}</h2>
      <p>Status: {match.matchOver ? 'Match Completed' : 'LIVE'}</p>

      <div>
        <div>
          <h3>{match.team1_id?.name || 'Team 1'}</h3>
          <h1>{match.team1_score}</h1>
          <button onClick={() => changeScore(1, 'inc')} disabled={match.matchOver}>+ Goal</button>
          <button onClick={() => changeScore(1, 'dec')} disabled={match.matchOver}>- Goal</button>
        </div>

        <div>VS</div>

        <div>
          <h3>{match.team2_id?.name || 'Team 2'}</h3>
          <h1>{match.team2_score}</h1>
          <button onClick={() => changeScore(2, 'inc')} disabled={match.matchOver}>+ Goal</button>
          <button onClick={() => changeScore(2, 'dec')} disabled={match.matchOver}>- Goal</button>
        </div>
      </div>

      <div>
        <button onClick={() => updateMatchOnBackend({ matchOver: true })} disabled={match.matchOver}>
          Complete Match
        </button>
        <button onClick={() => updateMatchOnBackend(null, true)}>
          Reset Match
        </button>
      </div>
    </div>
  );
}
