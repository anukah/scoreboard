"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context with default values
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");
  const [currentQuarter, setCurrentQuarter] = useState("");

  // Sync state with localStorage
  useEffect(() => {
    const storedTeamAScore = localStorage.getItem('teamAScore');
    const storedTeamBScore = localStorage.getItem('teamBScore');
    const storedTeamAName = localStorage.getItem('teamAName');
    const storedTeamBName = localStorage.getItem('teamBName');
    const storedCurrentQuarter = localStorage.getItem('currentQuarter');
    
    if (storedTeamAScore) setTeamAScore(parseInt(storedTeamAScore, 10));
    if (storedTeamBScore) setTeamBScore(parseInt(storedTeamBScore, 10));
    if (storedTeamAName) setTeamAName(storedTeamAName);
    if (storedTeamBName) setTeamBName(storedTeamBName);
    if (storedCurrentQuarter) setCurrentQuarter(storedCurrentQuarter);
  }, []);

  useEffect(() => {
    localStorage.setItem('teamAScore', teamAScore);
    localStorage.setItem('teamBScore', teamBScore);
    localStorage.setItem('teamAName', teamAName);
    localStorage.setItem('teamBName', teamBName);
    localStorage.setItem('currentQuarter', currentQuarter);
  }, [teamAScore, teamBScore, teamAName, teamBName, currentQuarter]);

  return (
    <ScoreContext.Provider 
      value={{ 
        teamAScore, 
        setTeamAScore, 
        teamBScore, 
        setTeamBScore, 
        teamAName, 
        setTeamAName, 
        teamBName, 
        setTeamBName,
        currentQuarter,
        setCurrentQuarter 
      }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => {
  return useContext(ScoreContext);
};
