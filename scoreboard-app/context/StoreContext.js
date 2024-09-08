"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context with default values
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(""); // Add this state

  // Sync score and question state with localStorage
  useEffect(() => {
    const storedTeamAScore = localStorage.getItem('teamAScore');
    const storedTeamBScore = localStorage.getItem('teamBScore');
    const storedQuestion = localStorage.getItem('currentQuestion');
    
    if (storedTeamAScore) {
      setTeamAScore(parseInt(storedTeamAScore, 10));
    }
    if (storedTeamBScore) {
      setTeamBScore(parseInt(storedTeamBScore, 10));
    }
    if (storedQuestion) {
      setCurrentQuestion(storedQuestion);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('teamAScore', teamAScore);
    localStorage.setItem('teamBScore', teamBScore);
    localStorage.setItem('currentQuestion', currentQuestion);
  }, [teamAScore, teamBScore, currentQuestion]);

  return (
    <ScoreContext.Provider value={{ teamAScore, setTeamAScore, teamBScore, setTeamBScore, currentQuestion, setCurrentQuestion }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  return useContext(ScoreContext);
};
