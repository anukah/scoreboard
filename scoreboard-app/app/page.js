"use client";

import React from 'react';
import { useScore } from '../context/StoreContext';
import styles from '../styles/Home.module.css';

const Home = () => {
  const { teamAScore, setTeamAScore, teamBScore, setTeamBScore, resetScores } = useScore();

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Control Panel</h1>
      <div className={styles.controlSection}>
        <div className={styles.teamSection}>
          <h2>Team A: {teamAScore}</h2>
          <button
            className={styles.button}
            onClick={() => setTeamAScore(teamAScore + 1)}
          >
            + Team A
          </button>
          <button
            className={styles.button}
            onClick={() => setTeamAScore(teamAScore - 1)}
            disabled={teamAScore === 0}
          >
            - Team A
          </button>
        </div>
        <div className={styles.teamSection}>
          <h2>Team B: {teamBScore}</h2>
          <button
            className={styles.button}
            onClick={() => setTeamBScore(teamBScore + 1)}
          >
            + Team B
          </button>
          <button
            className={styles.button}
            onClick={() => setTeamBScore(teamBScore - 1)}
            disabled={teamBScore === 0}
          >
            - Team B
          </button>
        </div>
        <div className={styles.resetSection}>
          <button
            className={styles.button}
            onClick={resetScores}
          >
            Reset Scores
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
