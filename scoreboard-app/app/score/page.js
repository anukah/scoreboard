"use client";

import React, { useState, useEffect } from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Score.module.css';

const Score = () => {
  const { 
    teamAScore, 
    teamBScore, 
    teamAName, 
    teamBName, 
    teamAFouls, 
    teamBFouls, 
    currentQuarter,
    currentTime,
    currentRound
  } = useScore();
  
  const [localTeamAScore, setLocalTeamAScore] = useState(teamAScore);
  const [localTeamBScore, setLocalTeamBScore] = useState(teamBScore);
  const [localTeamAName, setLocalTeamAName] = useState(teamAName);
  const [localTeamBName, setLocalTeamBName] = useState(teamBName);
  const [localTeamAFouls, setLocalTeamAFouls] = useState(teamAFouls);
  const [localTeamBFouls, setLocalTeamBFouls] = useState(teamBFouls);
  const [localCurrentQuarter, setLocalCurrentQuarter] = useState(currentQuarter);
  const [localCurrentTime, setLocalCurrentTime] = useState(currentTime);
  const [localCurrentRound, setLocalCurrentRound] = useState(currentRound);

  useEffect(() => {
    setLocalTeamAScore(teamAScore);
    setLocalTeamBScore(teamBScore);
    setLocalTeamAName(teamAName);
    setLocalTeamBName(teamBName);
    setLocalTeamAFouls(teamAFouls);
    setLocalTeamBFouls(teamBFouls);
    setLocalCurrentQuarter(currentQuarter);
    setLocalCurrentTime(currentTime);
    setLocalCurrentRound(currentRound);
  }, [teamAScore, teamBScore, teamAName, teamBName, teamAFouls, teamBFouls, currentQuarter, currentTime, currentRound]);

  useEffect(() => {
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
      if (event.key === 'teamAFouls') {
        setLocalTeamAFouls(parseInt(event.newValue, 10) || 0);
      }
      if (event.key === 'teamBFouls') {
        setLocalTeamBFouls(parseInt(event.newValue, 10) || 0);
      }
      if (event.key === 'currentQuarter') {
        setLocalCurrentQuarter(event.newValue || "");
      }
      if (event.key === 'currentTime') {
        setLocalCurrentTime(event.newValue || "00:00");
      }
      if (event.key === 'currentRound') {
        setLocalCurrentRound(event.newValue || "");
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.roundSection}>
        <h2>{localCurrentRound}</h2>
      </div>
      <div className={styles.timerSection}>
        <h2>Time: {localCurrentTime}</h2>
      </div>
      <div className={styles.scoreSectionContainer}>
        <div className={styles.scoreSection}>
          <h2>{localTeamAName}</h2>
          <h3>{localTeamAScore}</h3>
          <p>Fouls: {localTeamAFouls}</p>
        </div>
        <div className={styles.scoreSection}>
          <h2>{localTeamBName}</h2>
          <h3>{localTeamBScore}</h3>
          <p>Fouls: {localTeamBFouls}</p>
        </div>
      </div>
      <div className={styles.quarterSection}>
        <h2>Quarter: {localCurrentQuarter}</h2>
      </div>
    </div>
  );
};

export default Score;
