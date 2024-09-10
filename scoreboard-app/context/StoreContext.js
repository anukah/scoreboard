"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ScoreContext = createContext();

export const ScoreProvider = ({ children }) => {
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

  useEffect(() => {
    const handleStorageChange = (e) => {
      switch(e.key) {
        case 'teamAScore':
          setTeamAScore(parseInt(e.newValue, 10) || 0);
          break;
        case 'teamBScore':
          setTeamBScore(parseInt(e.newValue, 10) || 0);
          break;
        case 'teamAName':
          setTeamAName(e.newValue || 'Team A');
          break;
        case 'teamBName':
          setTeamBName(e.newValue || 'Team B');
          break;
        case 'teamALogo':
          setTeamALogo(e.newValue || '/images/team-logos/uop.png');
          break;
        case 'teamBLogo':
          setTeamBLogo(e.newValue || '/images/team-logos/uop.png');
          break;
        case 'teamAFouls':
          setTeamAFouls(parseInt(e.newValue, 10) || 0);
          break;
        case 'teamBFouls':
          setTeamBFouls(parseInt(e.newValue, 10) || 0);
          break;
        case 'currentQuarter':
          setCurrentQuarter(e.newValue || 'Q1');
          break;
        case 'currentTime':
          setCurrentTime(e.newValue || '00:00');
          break;
        case 'currentRound':
          setCurrentRound(e.newValue || 'Round 1');
          break;
        case 'matchEnded':
          setMatchEnded(e.newValue === 'true');
          break;
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
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
    localStorage.setItem('matchEnded', matchEnded);
  }, [teamAScore, teamBScore, teamAName, teamBName, teamALogo, teamBLogo, teamAFouls, teamBFouls, currentQuarter, currentTime, currentRound, matchEnded]);

  const updateTeamAScore = (score) => {
    setTeamAScore(score);
    localStorage.setItem('teamAScore', score);
  };

  const updateTeamBScore = (score) => {
    setTeamBScore(score);
    localStorage.setItem('teamBScore', score);
  };

  const updateTeamAName = (name) => {
    setTeamAName(name);
    localStorage.setItem('teamAName', name);
  };

  const updateTeamBName = (name) => {
    setTeamBName(name);
    localStorage.setItem('teamBName', name);
  };

  const updateTeamALogo = (logo) => {
    setTeamALogo(logo);
    localStorage.setItem('teamALogo', logo);
  };

  const updateTeamBLogo = (logo) => {
    setTeamBLogo(logo);
    localStorage.setItem('teamBLogo', logo);
  };

  const updateTeamAFouls = (fouls) => {
    setTeamAFouls(fouls);
    localStorage.setItem('teamAFouls', fouls);
  };

  const updateTeamBFouls = (fouls) => {
    setTeamBFouls(fouls);
    localStorage.setItem('teamBFouls', fouls);
  };

  const updateCurrentQuarter = (quarter) => {
    setCurrentQuarter(quarter);
    localStorage.setItem('currentQuarter', quarter);
  };

  const updateCurrentTime = (time) => {
    setCurrentTime(time);
    localStorage.setItem('currentTime', time);
  };

  const updateCurrentRound = (round) => {
    setCurrentRound(round);
    localStorage.setItem('currentRound', round);
  };

  const endMatch = () => {
    setMatchEnded(true);
    localStorage.setItem('matchEnded', 'true');
  };

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
      {children}
    </ScoreContext.Provider>
  );
};

export const useScore = () => useContext(ScoreContext);