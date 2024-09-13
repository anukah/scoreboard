"use client";

import React from 'react';
import { useScore } from '../../context/StoreContext'; // Importing the custom hook to access the score context
import styles from '../../styles/Result.module.css'; // Importing CSS module for styling

const Result = () => {
  // Destructuring the values from the score context
  const { teamAScore, teamBScore, teamAName, teamALogo, teamBName, teamBLogo } = useScore();

  // Conditional rendering: if scores are equal, it's a draw
  if (teamAScore === teamBScore) {
    return (
      <div className={styles.container}>
        {/* Section to display a drawn match */}
        <div className={styles.resultSection}>
          <h2 className={styles.headingSecondary}>Match Drawn!</h2>
          <div className={`${styles.logoContainer} ${styles.drawLogos}`}>
            {/* Displaying both team logos for a draw */}
            <img src={teamALogo} alt={`${teamAName} Logo`} className={styles.teamLogo} />
            <img src={teamBLogo} alt={`${teamBName} Logo`} className={styles.teamLogo} />
          </div>
          {/* Displaying the score */}
          <h3 className={styles.scores}>
            {teamAScore} - {teamBScore}
          </h3>
        </div>
      </div>
    );
  }

  // Determining the winner based on the scores
  const winner = teamAScore > teamBScore ? { name: teamAName, logo: teamALogo } : { name: teamBName, logo: teamBLogo };

  return (
    <div className={styles.container}>
      {/* Section to display the winner */}
      <div className={styles.resultSection}>
        <h2 className={styles.headingSecondary}>{winner.name} Won!</h2>
        {/* Displaying the winning team's logo */}
        <img src={winner.logo} alt={`${winner.name} Logo`} className={styles.teamLogo} />
        {/* Displaying the score */}
        <h3 className={styles.scores}>
          {teamAScore} - {teamBScore}
        </h3>
      </div>
    </div>
  );
};

export default Result;
