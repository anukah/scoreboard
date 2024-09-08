"use client";

import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Score.module.css';

const Score = () => {
  const { teamAScore, teamBScore } = useScore();
  const [localTeamAScore, setLocalTeamAScore] = useState(teamAScore);
  const [localTeamBScore, setLocalTeamBScore] = useState(teamBScore);

  useEffect(() => {
    setLocalTeamAScore(teamAScore);
    setLocalTeamBScore(teamBScore);

    const handleStorageChange = (event) => {
      if (event.key === 'teamAScore') {
        setLocalTeamAScore(parseInt(event.newValue) || 0);
      }
      if (event.key === 'teamBScore') {
        setLocalTeamBScore(parseInt(event.newValue) || 0);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [teamAScore, teamBScore]);

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Scoreboard</h1>
      <div className={styles.scoreSection}>
        <h2>Team A Score: {localTeamAScore}</h2>
        <h2>Team B Score: {localTeamBScore}</h2>
      </div>
    </div>
  );
};

export default Score;