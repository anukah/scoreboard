"use client";

import React, { createContext, useState, useContext, useEffect } from 'react';

// Create a context with default values
const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamAName, setTeamAName] = useState("Team A");
  const [teamBName, setTeamBName] = useState("Team B");
  const [teamALogo, setTeamALogo] = useState("/images/team-logos/uop.png"); // Default logo path
  const [teamBLogo, setTeamBLogo] = useState("/images/team-logos/uom.png"); // Default logo path
  const [teamAFouls, setTeamAFouls] = useState(0);
  const [teamBFouls, setTeamBFouls] = useState(0);
  const [currentQuarter, setCurrentQuarter] = useState("");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [currentRound, setCurrentRound] = useState(""); // Ensure this is set correctly

  // Sync state with localStorage
  useEffect(() => {
    const storedTeamAScore = localStorage.getItem('teamAScore');
    const storedTeamBScore = localStorage.getItem('teamBScore');
    const storedTeamAName = localStorage.getItem('teamAName');
    const storedTeamBName = localStorage.getItem('teamBName');
    const storedTeamALogo = localStorage.getItem('teamALogo');
    const storedTeamBLogo = localStorage.getItem('teamBLogo');
    const storedTeamAFouls = localStorage.getItem('teamAFouls');
    const storedTeamBFouls = localStorage.getItem('teamBFouls');
    const storedCurrentQuarter = localStorage.getItem('currentQuarter');
    const storedCurrentTime = localStorage.getItem('currentTime');
    const storedRound = localStorage.getItem('currentRound');
    
    if (storedTeamAScore) setTeamAScore(parseInt(storedTeamAScore, 10));
    if (storedTeamBScore) setTeamBScore(parseInt(storedTeamBScore, 10));
    if (storedTeamAName) setTeamAName(storedTeamAName);
    if (storedTeamBName) setTeamBName(storedTeamBName);
    if (storedTeamALogo) setTeamALogo(storedTeamALogo);
    if (storedTeamBLogo) setTeamBLogo(storedTeamBLogo);
    if (storedTeamAFouls) setTeamAFouls(parseInt(storedTeamAFouls, 10));
    if (storedTeamBFouls) setTeamBFouls(parseInt(storedTeamBFouls, 10));
    if (storedCurrentQuarter) setCurrentQuarter(storedCurrentQuarter);
    if (storedCurrentTime) setCurrentTime(storedCurrentTime);
    if (storedRound) setCurrentRound(storedRound);
  }, []);

  useEffect(() => {
    localStorage.setItem('teamAScore', teamAScore);
    localStorage.setItem('teamBScore', teamBScore);
    localStorage.setItem('teamAName', teamAName);
    localStorage.setItem('teamBName', teamBName);
    localStorage.setItem('teamALogo', teamALogo);
    localStorage.setItem('teamBLogo', teamBLogo);
    localStorage.setItem('teamAFouls', teamAFouls);
    localStorage.setItem('teamBFouls', teamBFouls);
    localStorage.setItem('currentQuarter', currentQuarter);
    localStorage.setItem('currentTime', currentTime);
    localStorage.setItem('currentRound', currentRound);
  }, [teamAScore, teamBScore, teamAName, teamBName, teamALogo, teamBLogo, teamAFouls, teamBFouls, currentQuarter, currentTime, currentRound]);

  return (
    <ScoreContext.Provider value={{
      teamAScore, setTeamAScore,
      teamBScore, setTeamBScore,
      teamAName, setTeamAName,
      teamBName, setTeamBName,
      teamALogo, setTeamALogo,  // New state for Team A logo
      teamBLogo, setTeamBLogo,  // New state for Team B logo
      teamAFouls, setTeamAFouls,
      teamBFouls, setTeamBFouls,
      currentQuarter, setCurrentQuarter,
      currentTime, setCurrentTime,
      round: currentRound, setRound: setCurrentRound
    }}>
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);
