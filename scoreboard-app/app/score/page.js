"use client";

import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Score.module.css';

const Score = () => {
  const { teamAScore, teamBScore, currentQuestion } = useScore();
  const [localTeamAScore, setLocalTeamAScore] = useState(teamAScore);
  const [localTeamBScore, setLocalTeamBScore] = useState(teamBScore);
  const [localCurrentQuestion, setCurrentQuestion] = useState(currentQuestion);

  useEffect(() => {
    setLocalTeamAScore(teamAScore);
    setLocalTeamBScore(teamBScore);
    setCurrentQuestion();

    const handleStorageChange = (event) => {
      if (event.key === 'teamAScore') {
        setLocalTeamAScore(parseInt(event.newValue, 10) || 0);
      }
      if (event.key === 'teamBScore') {
        setLocalTeamBScore(parseInt(event.newValue, 10) || 0);
      }
      if (event.key === 'currentQuestion') {
        setCurrentQuestion(event.newValue || "");
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
        <h2>Current Question: {localCurrentQuestion}</h2>
      </div>
    </div>
  );
};

export default Score;
