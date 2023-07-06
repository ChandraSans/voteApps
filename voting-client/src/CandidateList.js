import React, { useEffect, useState } from 'react';

const CandidateList = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:3000/candidates');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  const handleVote = async (candidateId) => {
    try {
      const response = await fetch('http://localhost:3000/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidateId })
      });

      const data = await response.json();
      console.log(data.message);
      fetchCandidates();
    } catch (error) {
      console.error('Terjadi kesalahan:', error);
    }
  };

  return (
    <div>
      <h2>Daftar Kandidat</h2>
      {candidates.map(candidate => (
        <div key={candidate.id}>
          <span>{candidate.name}</span>
          <button onClick={() => handleVote(candidate.id)}>Vote</button>
          <span>{candidate.votes} votes</span>
        </div>
      ))}
    </div>
  );
};

export default CandidateList;
