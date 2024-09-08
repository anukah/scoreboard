"use client";

import React from 'react';
import { useScore } from '../context/StoreContext';
import styles from '../styles/Home.module.css';

const Home = () => {
  const { teamAScore, setTeamAScore, teamBScore, setTeamBScore, setCurrentQuestion } = useScore();

  const handleQuestionClick = (question) => {
    setCurrentQuestion(question);
  };

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
        <div className={styles.questionSection}>
          <button className={styles.button} onClick={() => handleQuestionClick('Q1')}>
            Q1
          </button>
          <button className={styles.button} onClick={() => handleQuestionClick('Q2')}>
            Q2
          </button>
          <button className={styles.button} onClick={() => handleQuestionClick('Q3')}>
            Q3
          </button>
          <button className={styles.button} onClick={() => handleQuestionClick('Q4')}>
            Q4
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
