"use client";

import React from 'react';
import { useScore } from '../../context/StoreContext'; // Importing the custom hook to access the score context
import styles from '../../styles/Score.module.css'; // Importing CSS module for Score styling
import styles1 from '../../styles/Result.module.css'; // Importing CSS module for Result styling

const Score = () => {
  // Destructuring values from the score context
  const { 
    teamAScore, 
    teamBScore, 
    teamAName, 
    teamBName, 
    teamALogo,  
    teamBLogo,  
    teamAFouls, 
    teamBFouls, 
    currentQuarter,
    currentTime,
    currentRound,
    matchEnded
  } = useScore();

  // Determine if the match is a draw
  const isDraw = teamAScore === teamBScore;

  // Determine the winner based on the scores
  const winner = teamAScore > teamBScore 
    ? { name: teamAName, logo: teamALogo } 
    : teamBScore > teamAScore
    ? { name: teamBName, logo: teamBLogo }
    : null;

  // Component to display team information (name, logo, score, and fouls)
  const TeamDisplay = ({ name, logo, score, fouls }) => (
    <div className={styles.team}>
      <h2>{name}</h2>
      <div className={styles.logoContainer}>
        <img src={logo} alt={`${name} Logo`} className={styles.teamLogo} />
      </div>
      <h3>{score}</h3>
      <p>Fouls: {fouls}</p>
    </div>
  );

  return (
    <div className={styles1.container}>
      {matchEnded ? (
        // Display match result if the match has ended
        <div className={styles1.resultSection}>
          {isDraw ? (
            // Display draw message and logos if the match is drawn
            <>
              <h2 className={styles1.headingSecondary}>Match Drawn!</h2>
              <div className={styles1.drawLogos}>
                <img src={teamALogo} alt={`${teamAName} Logo`} className={styles1.teamLogo} />
                <img src={teamBLogo} alt={`${teamBName} Logo`} className={styles1.teamLogo} />
              </div>
            </>
          ) : (
            // Display winner's name and logo if there is a winner
            <>
              <h2 className={styles1.headingSecondary}>{winner.name} Wins!</h2>
              <img src={winner.logo} alt={`${winner.name} Logo`} className={styles1.teamLogo} />
            </>
          )}
          {/* Display final scores */}
          <h3 className={styles1.scores}>
            {teamAScore} - {teamBScore}
          </h3>
        </div>
      ) : (
        // Display live match details if the match is ongoing
        <div className={styles.container}>
          {/* Display current round */}
          <div className={styles.roundSection}>
            <h2>{currentRound}</h2>
          </div>
          <div className={styles.boxedSection}>
            {/* Container for teams and middle section (timer and quarter) */}
            <div className={styles.teamsContainer}>
              <TeamDisplay 
                name={teamAName}
                logo={teamALogo}
                score={teamAScore}
                fouls={teamAFouls}
              />
  
              {/* Middle section for timer and current quarter */}
              <div className={styles.middleSection}>
                <div className={styles.timerSection}>
                  <h3 id="timerHeader">TIME</h3>
                  <div className={styles.timerValue}>{currentTime}</div>
                </div>
                <div className={styles.quarterSection}>
                  <h2>{currentQuarter}</h2>
                </div>
              </div>
  
              <TeamDisplay 
                name={teamBName}
                logo={teamBLogo}
                score={teamBScore}
                fouls={teamBFouls}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Score;
