"use client";

import React from 'react';
import { useScore } from '../../context/StoreContext';
import styles from '../../styles/Score.module.css';
import styles1 from '../../styles/Result.module.css';

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

  const isDraw = teamAScore === teamBScore;
  const winner = teamAScore > teamBScore 
    ? { name: teamAName, logo: teamALogo } 
    : teamBScore > teamAScore
    ? { name: teamBName, logo: teamBLogo }
    : null;

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
        <div className={styles1.resultSection}>
          {isDraw ? (
            <>
              <h2 className={styles1.headingSecondary}>Match Drawn!</h2>
              <div className={styles1.drawLogos}>
                <img src={teamALogo} alt={`${teamAName} Logo`} className={styles1.teamLogo} />
                <img src={teamBLogo} alt={`${teamBName} Logo`} className={styles1.teamLogo} />
              </div>
            </>
          ) : (
            <>
              <h2 className={styles1.headingSecondary}>{winner.name} Wins!</h2>
              <img src={winner.logo} alt={`${winner.name} Logo`} className={styles1.teamLogo} />
            </>
          )}
          <h3 className={styles1.scores}>
            {teamAScore} - {teamBScore}
          </h3>
        </div>
      ) : (
        <div className={styles.container}>
          {/* Round Section */}
          <div className={styles.roundSection}>
            <h2>{currentRound}</h2>
          </div>
          <div className={styles.boxedSection}>
            {/* Team Names and Logos */}
            <div className={styles.teamsContainer}>
              <TeamDisplay 
                name={teamAName}
                logo={teamALogo}
                score={teamAScore}
                fouls={teamAFouls}
              />
  
              {/* Timer and Quarter */}
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