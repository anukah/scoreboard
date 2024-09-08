"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context with default values
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);

  // Sync score state with localStorage
  useEffect(() => {
    const storedTeamAScore = localStorage.getItem('teamAScore');
    const storedTeamBScore = localStorage.getItem('teamBScore');
    
    if (storedTeamAScore) {
      setTeamAScore(parseInt(storedTeamAScore, 10));
    }
    if (storedTeamBScore) {
      setTeamBScore(parseInt(storedTeamBScore, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('teamAScore', teamAScore);
    localStorage.setItem('teamBScore', teamBScore);
  }, [teamAScore, teamBScore]);

  return (
    <ScoreContext.Provider value={{ teamAScore, setTeamAScore, teamBScore, setTeamBScore }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  return useContext(ScoreContext);
};
