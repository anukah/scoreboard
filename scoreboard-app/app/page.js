"use client";

import React from 'react';
import { useScore } from '../context/StoreContext';
import styles from '../styles/Home.module.css';

const Home = () => {
  const { teamAScore, setTeamAScore, teamBScore, setTeamBScore, teamAName, setTeamAName, teamBName, setTeamBName, setCurrentQuarter } = useScore();

  const handleTeamANameChange = (e) => {
    setTeamAName(e.target.value);
  };

  const handleTeamBNameChange = (e) => {
    setTeamBName(e.target.value);
  };

  const handleResetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
  };

  const handleSetQuarter = (Quarter) => {
    setCurrentQuarter(Quarter);
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
          />
          <h2>{teamAName}: {teamAScore}</h2>
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
        </div>
        <div className={styles.teamSection}>
          <input
            type="text"
            value={teamBName}
            onChange={handleTeamBNameChange}
            placeholder="Enter Team B Name"
          />
          <h2>{teamBName}: {teamBScore}</h2>
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
        </div>
        <div className={styles.resetSection}>
          <button
            className={styles.button}
            onClick={handleResetScores}
          >
            Reset Scores
          </button>
        </div>
        <div className={styles.QuarterSection}>
          <button className={styles.button} onClick={() => handleSetQuarter("Q1")}>Q1</button>
          <button className={styles.button} onClick={() => handleSetQuarter("Q2")}>Q2</button>
          <button className={styles.button} onClick={() => handleSetQuarter("Q3")}>Q3</button>
          <button className={styles.button} onClick={() => handleSetQuarter("Q4")}>Q4</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
