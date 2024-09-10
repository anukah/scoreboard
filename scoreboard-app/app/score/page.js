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
    teamALogo,  // Added for dynamic logo
    teamBLogo,  // Added for dynamic logo
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
  const [localTeamALogo, setLocalTeamALogo] = useState(teamALogo);  // Added for local logo state
  const [localTeamBLogo, setLocalTeamBLogo] = useState(teamBLogo);  // Added for local logo state
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
    setLocalTeamALogo(teamALogo);  // Update local logo state
    setLocalTeamBLogo(teamBLogo);  // Update local logo state
    setLocalTeamAFouls(teamAFouls);
    setLocalTeamBFouls(teamBFouls);
    setLocalCurrentQuarter(currentQuarter);
    setLocalCurrentTime(currentTime);
    setLocalCurrentRound(currentRound);
  }, [teamAScore, teamBScore, teamAName, teamBName, teamALogo, teamBLogo, teamAFouls, teamBFouls, currentQuarter, currentTime, currentRound]);

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
      if (event.key === 'teamALogo') {
        setLocalTeamALogo(event.newValue || "/images/team-logos/uop.png"); // Update logo from storage
      }
      if (event.key === 'teamBLogo') {
        setLocalTeamBLogo(event.newValue || "/images/team-logos/uom.png"); // Update logo from storage
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
      {/* Round Section */}
      <div className={styles.roundSection}>
        <h2>{localCurrentRound}</h2>
      </div>
      <div className={styles.boxedSection}>
        {/* Team Names and Logos */}
        <div className={styles.teamsContainer}>
          <div className={styles.team}>
            <h2>{localTeamAName}</h2>
            <div className={styles.logoContainer}>
              {/* Team A Logo */}
              <img src={localTeamALogo} alt={`${localTeamAName} Logo`} className={styles.teamLogo} />
            </div>
            <h3>{localTeamAScore}</h3>
            <p>Fouls: {localTeamAFouls}</p> {/* Added Team A Fouls */}
          </div>
  
          {/* Timer and Quarter */}
          <div className={styles.middleSection}>
            <div className={styles.timerSection}>
              <h2 id='timerHeader'>TIME <br></br>{localCurrentTime}</h2>
            </div>
            <div className={styles.quarterSection}>
              <h2>{localCurrentQuarter}</h2>
            </div>
          </div>
  
          <div className={styles.team}>
            <h2>{localTeamBName}</h2>
            <div className={styles.logoContainer}>
              {/* Team B Logo */}
              <img src={localTeamBLogo} alt={`${localTeamBName} Logo`} className={styles.teamLogo} />
            </div>
            <h3>{localTeamBScore}</h3>
            <p>Fouls: {localTeamBFouls}</p> {/* Added Team B Fouls */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Score;
