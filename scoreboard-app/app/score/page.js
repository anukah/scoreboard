"use client";

import React from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Score.module.css';

const Score = () => {
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

  const winner = teamAScore > teamBScore 
    ? { name: teamAName, logo: teamALogo } 
    : { name: teamBName, logo: teamBLogo };

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
    <div className={styles.container}>
      {matchEnded ? (
        <div className={styles.resultSection}>
          <h2 className={styles.headingSecondary}>{winner.name} Wins!</h2>
          <img src={winner.logo} alt={`${winner.name} Logo`} className={styles.teamLogo} />
          <h3 className={styles.scores}>
            {teamAScore} - {teamBScore}
          </h3>
        </div>
      ) : (
        <div>
          <div className={styles.roundSection}>
            <h2>{currentRound}</h2>
          </div>
          <div className={styles.boxedSection}>
            <div className={styles.teamsContainer}>
              <TeamDisplay 
                name={teamAName}
                logo={teamALogo}
                score={teamAScore}
                fouls={teamAFouls}
              />
              <div className={styles.middleSection}>
                <div className={styles.timerSection}>
                  <h2 id='timerHeader'>TIME <br />{currentTime}</h2>
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