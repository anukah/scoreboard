"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create a context to hold the score-related state
const ScoreContext = createContext();

// Provider component to wrap around parts of the app that need access to the score context
export const ScoreProvider = ({ children }) => {
  // Define state variables for team scores, names, logos, fouls, current quarter, time, round, and match status
  const [teamAScore, setTeamAScore] = useState(0);
  const [teamBScore, setTeamBScore] = useState(0);
  const [teamAName, setTeamAName] = useState('Team A');
  const [teamBName, setTeamBName] = useState('Team B');
  const [teamALogo, setTeamALogo] = useState('/images/team-logos/uop.png');
  const [teamBLogo, setTeamBLogo] = useState('/images/team-logos/uop.png');
  const [teamAFouls, setTeamAFouls] = useState(0);
  const [teamBFouls, setTeamBFouls] = useState(0);
  const [currentQuarter, setCurrentQuarter] = useState('Q1');
  const [currentTime, setCurrentTime] = useState('00:00');
  const [currentRound, setCurrentRound] = useState('Round 1');
  const [matchEnded, setMatchEnded] = useState(false);

  // Effect to handle changes to local storage when another tab or window modifies it
  useEffect(() => {
    const handleStorageChange = (e) => {
      switch(e.key) {
        case 'teamAScore':
          setTeamAScore(parseInt(e.newValue, 10) || 0); // Update team A's score
          break;
        case 'teamBScore':
          setTeamBScore(parseInt(e.newValue, 10) || 0); // Update team B's score
          break;
        case 'teamAName':
          setTeamAName(e.newValue || 'Team A'); // Update team A's name
          break;
        case 'teamBName':
          setTeamBName(e.newValue || 'Team B'); // Update team B's name
          break;
        case 'teamALogo':
          setTeamALogo(e.newValue || '/images/team-logos/uop.png'); // Update team A's logo
          break;
        case 'teamBLogo':
          setTeamBLogo(e.newValue || '/images/team-logos/uop.png'); // Update team B's logo
          break;
        case 'teamAFouls':
          setTeamAFouls(parseInt(e.newValue, 10) || 0); // Update team A's fouls
          break;
        case 'teamBFouls':
          setTeamBFouls(parseInt(e.newValue, 10) || 0); // Update team B's fouls
          break;
        case 'currentQuarter':
          setCurrentQuarter(e.newValue || 'Q1'); // Update the current quarter
          break;
        case 'currentTime':
          setCurrentTime(e.newValue || '00:00'); // Update the current time
          break;
        case 'currentRound':
          setCurrentRound(e.newValue || 'Round 1'); // Update the current round
          break;
        case 'matchEnded':
          setMatchEnded(e.newValue === 'true'); // Update the match-ended status
          break;
      }
    };

    // Attach event listener for storage changes
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange); // Cleanup the event listener
  }, []);

  // Effect to synchronize state changes with local storage
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
    localStorage.setItem('matchEnded', matchEnded);
  }, [teamAScore, teamBScore, teamAName, teamBName, teamALogo, teamBLogo, teamAFouls, teamBFouls, currentQuarter, currentTime, currentRound, matchEnded]);

  // Function to update team A's score and synchronize with local storage
  const updateTeamAScore = (score) => {
    setTeamAScore(score);
    localStorage.setItem('teamAScore', score);
  };

  // Function to update team B's score and synchronize with local storage
  const updateTeamBScore = (score) => {
    setTeamBScore(score);
    localStorage.setItem('teamBScore', score);
  };

  // Function to update team A's name and synchronize with local storage
  const updateTeamAName = (name) => {
    setTeamAName(name);
    localStorage.setItem('teamAName', name);
  };

  // Function to update team B's name and synchronize with local storage
  const updateTeamBName = (name) => {
    setTeamBName(name);
    localStorage.setItem('teamBName', name);
  };

  // Function to update team A's logo and synchronize with local storage
  const updateTeamALogo = (logo) => {
    setTeamALogo(logo);
    localStorage.setItem('teamALogo', logo);
  };

  // Function to update team B's logo and synchronize with local storage
  const updateTeamBLogo = (logo) => {
    setTeamBLogo(logo);
    localStorage.setItem('teamBLogo', logo);
  };

  // Function to update team A's fouls and synchronize with local storage
  const updateTeamAFouls = (fouls) => {
    setTeamAFouls(fouls);
    localStorage.setItem('teamAFouls', fouls);
  };

  // Function to update team B's fouls and synchronize with local storage
  const updateTeamBFouls = (fouls) => {
    setTeamBFouls(fouls);
    localStorage.setItem('teamBFouls', fouls);
  };

  // Function to update the current quarter and synchronize with local storage
  const updateCurrentQuarter = (quarter) => {
    setCurrentQuarter(quarter);
    localStorage.setItem('currentQuarter', quarter);
  };

  // Function to update the current time and synchronize with local storage
  const updateCurrentTime = (time) => {
    setCurrentTime(time);
    localStorage.setItem('currentTime', time);
  };

  // Function to update the current round and synchronize with local storage
  const updateCurrentRound = (round) => {
    setCurrentRound(round);
    localStorage.setItem('currentRound', round);
  };

  // Function to end the match and synchronize the status with local storage
  const endMatch = () => {
    setMatchEnded(true);
    localStorage.setItem('matchEnded', 'true');
  };

  // Function to reset the match state and synchronize with local storage
  const resetMatch = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setTeamAFouls(0);
    setTeamBFouls(0);
    setCurrentQuarter('Q1');
    setCurrentTime('00:00');
    setMatchEnded(false);
    
    localStorage.setItem('teamAScore', '0');
    localStorage.setItem('teamBScore', '0');
    localStorage.setItem('teamAFouls', '0');
    localStorage.setItem('teamBFouls', '0');
    localStorage.setItem('currentQuarter', 'Q1');
    localStorage.setItem('currentTime', '00:00');
    localStorage.setItem('matchEnded', 'false');
  };

  // Providing the context with the state and functions
  return (
    <ScoreContext.Provider value={{
      teamAScore,
      teamBScore,
      teamAName,
      teamBName,
      teamALogo,
      teamBLogo,
      teamAFouls,
      teamBFouls,
      currentQuarter,
      currentTime,
      currentRound,
      matchEnded,
      updateTeamAScore,
      updateTeamBScore,
      updateTeamAName,
      updateTeamBName,
      updateTeamALogo,
      updateTeamBLogo,
      updateTeamAFouls,
      updateTeamBFouls,
      updateCurrentQuarter,
      updateCurrentTime,
      updateCurrentRound,
      endMatch,
      resetMatch
    }}>
      {children} {/* Rendering children components */}
    </ScoreContext.Provider>
  );
};

// Custom hook to use the score context
export const useScore = () => useContext(ScoreContext);