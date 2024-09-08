"use client";

import React, { useState, useEffect } from 'react';
import { useScore } from '../context/StoreContext';
import styles from '../styles/Home.module.css';

const Home = () => {
  const { 
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
    setCurrentQuarter, 
    setCurrentTime,
    round,
    setRound
  } = useScore();

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleStartStop = () => {
    setIsTimerRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    setCurrentTime(formatTime(timer));
  }, [timer, setCurrentTime]);

  const handleTeamANameChange = (e) => {
    setTeamAName(e.target.value);
  };

  const handleTeamBNameChange = (e) => {
    setTeamBName(e.target.value);
  };

  const handleRoundChange = (e) => {
    setRound(e.target.value);
  };

  const handleResetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setTeamAFouls(0);
    setTeamBFouls(0);
  };

  const handleSetQuarter = (quarter) => {
    setCurrentQuarter(quarter);
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Control Panel</h1>
      <div className={styles.controlSection}>
        <div className={styles.teamSection}>
          <input
            type="text"
            value={teamAName}
            onChange={handleTeamANameChange}
            placeholder="Enter Team A Name"
            className={styles.input}
          />
          <h2>{teamAName} Score: {teamAScore}</h2>
          <button
            className={styles.button}
            onClick={() => setTeamAScore(teamAScore + 1)}
          >
            + 
          </button>
          <button
            className={styles.button}
            onClick={() => setTeamAScore(teamAScore - 1)}
            disabled={teamAScore === 0}
          >
            - 
          </button>
          <h2>{teamAName} Fouls: {teamAFouls}</h2>
          <button
            className={styles.button}
            onClick={() => setTeamAFouls(teamAFouls + 1)}
          >
            Foul 
          </button>
          <button
            className={styles.button}
            onClick={() => setTeamAFouls(teamAFouls - 1)}
            disabled={teamAFouls === 0}
          >
            Undo Foul 
          </button>
        </div>
        <div className={styles.teamSection}>
          <input
            type="text"
            value={teamBName}
            onChange={handleTeamBNameChange}
            placeholder="Enter Team B Name"
            className={styles.input}
          />
          <h2>{teamBName} Score: {teamBScore}</h2>
          <button
            className={styles.button}
            onClick={() => setTeamBScore(teamBScore + 1)}
          >
            + 
          </button>
          <button
            className={styles.button}
            onClick={() => setTeamBScore(teamBScore - 1)}
            disabled={teamBScore === 0}
          >
            - 
          </button>
          <h2>{teamBName} Fouls: {teamBFouls}</h2>
          <button
            className={styles.button}
            onClick={() => setTeamBFouls(teamBFouls + 1)}
          >
            Foul 
          </button>
          <button
            className={styles.button}
            onClick={() => setTeamBFouls(teamBFouls - 1)}
            disabled={teamBFouls === 0}
          >
            Undo Foul 
          </button>
        </div>
        <div className={styles.resetSection}>
          <button
            className={styles.button}
            onClick={handleResetScores}
          >
            Reset Scores and Fouls
          </button>
        </div>
        <div className={styles.quarterSection}>
          <button className={styles.button} onClick={() => handleSetQuarter("Q1")}>Q1</button>
          <button className={styles.button} onClick={() => handleSetQuarter("Q2")}>Q2</button>
          <button className={styles.button} onClick={() => handleSetQuarter("Q3")}>Q3</button>
          <button className={styles.button} onClick={() => handleSetQuarter("Q4")}>Q4</button>
        </div>
        <div className={styles.timerSection}>
          <h2>Timer: {formatTime(timer)}</h2>
          <button className={styles.button} onClick={handleStartStop}>
            {isTimerRunning ? 'Stop' : 'Start'}
          </button>
          <button className={styles.button} onClick={handleReset}>
            Reset
          </button>
        </div>
        <div className={styles.roundSection}>
          <input
            type="text"
            value={round}
            onChange={handleRoundChange}
            placeholder="Enter the Round"
            className={styles.input}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
