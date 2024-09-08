"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context with default values
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");
  const [teamAFouls, setTeamAFouls] = useState(0);
  const [teamBFouls, setTeamBFouls] = useState(0);
  const [currentQuarter, setCurrentQuarter] = useState("");

  // Sync state with localStorage
  useEffect(() => {
    const storedTeamAScore = localStorage.getItem('teamAScore');
    const storedTeamBScore = localStorage.getItem('teamBScore');
    const storedTeamAName = localStorage.getItem('teamAName');
    const storedTeamBName = localStorage.getItem('teamBName');
    const storedTeamAFouls = localStorage.getItem('teamAFouls');
    const storedTeamBFouls = localStorage.getItem('teamBFouls');
    const storedCurrentQuarter = localStorage.getItem('currentQuarter');
    
    if (storedTeamAScore) setTeamAScore(parseInt(storedTeamAScore, 10));
    if (storedTeamBScore) setTeamBScore(parseInt(storedTeamBScore, 10));
    if (storedTeamAName) setTeamAName(storedTeamAName);
    if (storedTeamBName) setTeamBName(storedTeamBName);
    if (storedTeamAFouls) setTeamAFouls(parseInt(storedTeamAFouls, 10));
    if (storedTeamBFouls) setTeamBFouls(parseInt(storedTeamBFouls, 10));
    if (storedCurrentQuarter) setCurrentQuarter(storedCurrentQuarter);
  }, []);

  useEffect(() => {
    localStorage.setItem('teamAScore', teamAScore);
    localStorage.setItem('teamBScore', teamBScore);
    localStorage.setItem('teamAName', teamAName);
    localStorage.setItem('teamBName', teamBName);
    localStorage.setItem('teamAFouls', teamAFouls);
    localStorage.setItem('teamBFouls', teamBFouls);
    localStorage.setItem('currentQuarter', currentQuarter);
  }, [teamAScore, teamBScore, teamAName, teamBName, teamAFouls, teamBFouls, currentQuarter]);

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
        teamAFouls, 
        setTeamAFouls, 
        teamBFouls, 
        setTeamBFouls,
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
