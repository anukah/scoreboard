"use client";

import React, { useState, useEffect } from 'react';
import { useScore } from '../context/StoreContext';
import { Button, Card, CardContent, Typography, ToggleButton, ToggleButtonGroup, Grid2, TextField } from '@mui/material';
import styles from '../styles/Home.module.css';

const Home = () => {
  // Destructure and import state and functions from ScoreContext
  const { 
    teamAScore, setTeamAScore, 
    teamBScore, setTeamBScore, 
    teamAName, setTeamAName, 
    teamBName, setTeamBName, 
    teamALogo, setTeamALogo, 
    teamBLogo, setTeamBLogo, 
    teamAFouls, setTeamAFouls, 
    teamBFouls, setTeamBFouls, 
    setCurrentQuarter, setCurrentTime,
    round, setRound
  } = useScore();

  // Local state for the timer and selected quarter
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');

  // Effect to handle the timer functionality
  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000); // Increase timer every second
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval); // Clear interval when timer is stopped
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  // Start/Stop button handler
  const handleStartStop = () => {
    setIsTimerRunning(prev => !prev);
  };

  // Reset timer button handler
  const handleReset = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  // Function to format time from seconds to "mm:ss"
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Effect to update current time in ScoreContext
  useEffect(() => {
    setCurrentTime(formatTime(timer));
  }, [timer, setCurrentTime]);

  // Team data with names and logo paths
  const teamData = [
    { name: "EST", logo: "/images/team-logos/est.png" },
    { name: "JAF", logo: "/images/team-logos/jaf.png" },
    { name: "KEL", logo: "/images/team-logos/kel.png" },
    { name: "RAJ", logo: "/images/team-logos/raj.png" },
    { name: "RUH", logo: "/images/team-logos/ruh.png" },
    { name: "SAB", logo: "/images/team-logos/sab.png" },
    { name: "SEU", logo: "/images/team-logos/seu.png" },
    { name: "SJP", logo: "/images/team-logos/sjp.png" },
    { name: "UOC", logo: "/images/team-logos/uoc.png" },
    { name: "UOM", logo: "/images/team-logos/uom.png" },
    { name: "UOP", logo: "/images/team-logos/uop.png" },
    { name: "UVA", logo: "/images/team-logos/uva.png" },
    { name: "WAY", logo: "/images/team-logos/way.png" },
    { name: "VAV", logo: "/images/team-logos/vav.png" }
  ];

  // Handle team selection and update team name and logo
  const handleTeamSelect = (teamIndex, isTeamA) => {
    const team = teamData[teamIndex];
    if (isTeamA) {
      setTeamAName(team.name);
      setTeamALogo(team.logo);
    } else {
      setTeamBName(team.name);
      setTeamBLogo(team.logo);
    }
  };

  // Handle round input change
  const handleRoundChange = (e) => {
    setRound(e.target.value);
  };

  // Handle resetting scores and fouls
  const handleResetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setTeamAFouls(0);
    setTeamBFouls(0);
  };

  // Handle quarter selection
  const handleQuarterChange = (event, newQuarter) => {
    if (newQuarter !== null) {
      setSelectedQuarter(newQuarter);
      setCurrentQuarter(newQuarter);
    }
  };

  return (
    <div className={styles.container}>
      {/* Control Panel Heading */}
      <Grid2 container spacing={5} className={styles.gridItem}
      style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        textAlign: 'center',
        color:"black"
      }}>
        <Grid2 item xs={12} className={styles.centeredGridItem}>
          <Typography variant="h3" component="h1" className={styles.heading}>
            Scoreboard Controls
          </Typography>
        </Grid2>
      </Grid2>

      {/* Round Input */}
      <Grid2 container spacing={5} className={styles.gridItem}>
        <Grid2 size={12}>
          <TextField
            margin='normal'
            fullWidth
            label="Round"
            value={round}
            onChange={handleRoundChange}
          />
        </Grid2>
      </Grid2>
      
      {/* Team Selection for Team A */}
      <Grid2 container spacing={2} className={styles.gridItem}>
        <Grid2 item xs={12}>
          <Typography variant="h6" align="center">
            Team A:
          </Typography>
        </Grid2>
        {teamData.map((team, index) => (
          <Grid2 key={index} item xs={3}>
            <Button 
              variant="outlined" 
              fullWidth
              onClick={() => handleTeamSelect(index, true)}>
              {team.name}
            </Button>
          </Grid2>
        ))}
      </Grid2>

      {/* Team Selection for Team B */}
      <Grid2 container spacing={2} className={styles.gridItem}>
        <Grid2 item xs={12}>
          <Typography variant="h6" align="center">
            Team B:
          </Typography>
        </Grid2>
        {teamData.map((team, index) => (
          <Grid2 key={index} item xs={3}>
            <Button 
              variant="outlined" 
              fullWidth
              onClick={() => handleTeamSelect(index, false)}>
              {team.name}
            </Button>
          </Grid2>
        ))}
      </Grid2>
      
      <Grid2 container spacing={5} className={styles.gridItem}>
        <Grid2 size={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" className={styles.cardTitle}>{teamAName} Score: {teamAScore}</Typography>
              <Button variant="outlined" color="primary" onClick={() => setTeamAScore(teamAScore + 1)} className={styles.button}>
                +
              </Button>
              <Button 
                variant="outlined" 
                color="primary"
                onClick={() => setTeamAScore(teamAScore - 1)} 
                disabled={teamAScore === 0} 
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                -
              </Button>
              <Typography variant="h5" className={styles.cardTitle}>{teamAName} Fouls: {teamAFouls}</Typography>
              <Button variant="outlined" color="error" onClick={() => setTeamAFouls(teamAFouls + 1)} className={`${styles.button} ${styles.buttonError}`}>
                Foul
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => setTeamAFouls(teamAFouls - 1)} 
                disabled={teamAFouls === 0} 
                className={`${styles.button} ${styles.buttonError}`}
              >
                Undo Foul
              </Button>
            </CardContent>
          </Card>
        </Grid2>
        
        <Grid2 size={6}>
          <Card className={styles.card}>
            <CardContent>
              <Typography variant="h5" className={styles.cardTitle}>{teamBName} Score: {teamBScore}</Typography>
              <Button variant="outlined" color="primary" onClick={() => setTeamBScore(teamBScore + 1)} className={styles.button}>
                +
              </Button>
              <Button 
                variant="outlined" 
                color="primary" 
                onClick={() => setTeamBScore(teamBScore - 1)} 
                disabled={teamBScore === 0} 
                className={`${styles.button} ${styles.buttonPrimary}`}
              >
                -
              </Button>
              <Typography variant="h5" className={styles.cardTitle}>{teamBName} Fouls: {teamBFouls}</Typography>
              <Button variant="outlined" color="error" onClick={() => setTeamBFouls(teamBFouls + 1)} className={`${styles.button} ${styles.buttonError}`}>
                Foul
              </Button>
              <Button 
                variant="outlined" 
                color="error" 
                onClick={() => setTeamBFouls(teamBFouls - 1)} 
                disabled={teamBFouls === 0} 
                className={`${styles.button} ${styles.buttonError}`}
              >
                Undo Foul
              </Button>
            </CardContent>
          </Card>
        </Grid2>
      </Grid2>
      
      <Grid2 container spacing={5} className={styles.gridItem}>
        {/* Quarter Toggle Button Group */}
        <Grid2 size={3}>
          <ToggleButtonGroup
            value={selectedQuarter}
            exclusive
            onChange={handleQuarterChange}
            fullWidth
          >
            <ToggleButton value="Q1">Q1</ToggleButton>
            <ToggleButton value="Q2">Q2</ToggleButton>
            <ToggleButton value="Q3">Q3</ToggleButton>
            <ToggleButton value="Q4">Q4</ToggleButton>
          </ToggleButtonGroup>
        </Grid2>

        {/* Timer and Start/Stop Buttons */}
        <Grid2 size={4}>
          <Typography variant="h4" component="h2" gutterBottom className={styles.timerSection}>
            Timer: {formatTime(timer)}
          </Typography>
          <Button variant="outlined" color="primary" onClick={handleStartStop} fullWidth>
            {isTimerRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="outlined" color="error" onClick={handleReset} fullWidth sx={{ mt: 2 }}>
            Reset
          </Button>
        </Grid2>

        {/* Reset Scores and Fouls Button */}
        <Grid2 size={4} className={styles.gridItem}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleResetScores} 
            fullWidth
            className={styles.buttonError}
          >
            Reset Scores and Fouls
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );  
};

export default Home;
