"use client";

import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Score.module.css';

const Score = () => {
  const { teamAScore, teamBScore, teamAName, teamBName, currentQuarter } = useScore();
  const [localTeamAScore, setLocalTeamAScore] = useState(teamAScore);
  const [localTeamBScore, setLocalTeamBScore] = useState(teamBScore);
  const [localTeamAName, setLocalTeamAName] = useState(teamAName);
  const [localTeamBName, setLocalTeamBName] = useState(teamBName);
  const [localCurrentQuarter, setLocalCurrentQuarter] = useState(currentQuarter);

  useEffect(() => {
    setLocalTeamAScore(teamAScore);
    setLocalTeamBScore(teamBScore);
    setLocalTeamAName(teamAName);
    setLocalTeamBName(teamBName);
    setLocalCurrentQuarter(currentQuarter);

    const handleStorageChange = (event) => {
      if (event.key === 'teamAScore') {
        setLocalTeamAScore(parseInt(event.newValue, 10) || 0);
      }
      if (event.key === 'teamBScore') {
        setLocalTeamBScore(parseInt(event.newValue, 10) || 0);
      }
      if (event.key === 'teamAName') {
        setLocalTeamAName(event.newValue || "Team A");
      }
      if (event.key === 'teamBName') {
        setLocalTeamBName(event.newValue || "Team B");
      }
      if (event.key === 'currentQuarter') {
        setLocalCurrentQuarter(event.newValue || "");
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [teamAScore, teamBScore, teamAName, teamBName, currentQuarter]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Scoreboard</h1>
      <div className={styles.scoreSection}>
        <h2>{localTeamAName} : {localTeamAScore}</h2>
        <h2>{localTeamBName} : {localTeamBScore}</h2>
        <h2>Quarter: {localCurrentQuarter}</h2>
      </div>
    </div>
  );
};

export default Score;
