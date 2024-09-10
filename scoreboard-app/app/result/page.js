"use client";

import React from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Result.module.css';

const Result = () => {
  const { teamAScore, teamBScore, teamAName, teamALogo, teamBName, teamBLogo } = useScore();

  if (teamAScore === teamBScore) {
    return (
      <div className={styles.container}>
        <div className={styles.resultSection}>
          <h2 className={styles.headingSecondary}>Match Drawn!</h2>
          <div className={`${styles.logoContainer} ${styles.drawLogos}`}>
          <img src={teamALogo} alt={`${teamAName} Logo`} className={styles.teamLogo} />
          <img src={teamBLogo} alt={`${teamBName} Logo`} className={styles.teamLogo} />
          </div>
          <h3 className={styles.scores}>
            {teamAScore} - {teamBScore}
          </h3>
        </div>
      </div>
    );
  }

  const winner = teamAScore > teamBScore ? { name: teamAName, logo: teamALogo } : { name: teamBName, logo: teamBLogo };

  return (
    <div className={styles.container}>
      <div className={styles.resultSection}>
        <h2 className={styles.headingSecondary}>{winner.name} Wins!</h2>
        <img src={winner.logo} alt={`${winner.name} Logo`} className={styles.teamLogo} />
        <h3 className={styles.scores}>
          {teamAScore} - {teamBScore}
        </h3>
      </div>
    </div>
  );
};

export default Result;
