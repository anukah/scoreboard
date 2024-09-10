"use client";
import React, { useState, useEffect } from 'react';
import { useScore } from '../context/StoreContext';
import { Button, Card, CardContent, TextField, Typography, ToggleButton, ToggleButtonGroup, Grid2} from '@mui/material';
import styles from '../styles/Home.module.css'
const Home = () => {
  const { 
    teamAScore, 
    setTeamAScore, 
    teamBScore, 
    setTeamBScore, 
    teamAName, 
    setTeamAName, 
    teamBName, 
    setTeamBName, 
    teamAFouls, 
    setTeamAFouls, 
    teamBFouls, 
    setTeamBFouls, 
    setCurrentQuarter, 
    setCurrentTime,
    round,
    setRound
  } = useScore();

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0); // Timer in seconds
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');

  useEffect(() => {
    let interval;

    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1);
      }, 1000);
    } else if (!isTimerRunning && timer !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isTimerRunning, timer]);

  const handleStartStop = () => {
    setIsTimerRunning(prev => !prev);
  };

  const handleReset = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  useEffect(() => {
    setCurrentTime(formatTime(timer));
  }, [timer, setCurrentTime]);

  const handleTeamANameChange = (e) => {
    setTeamAName(e.target.value);
  };

  const handleTeamBNameChange = (e) => {
    setTeamBName(e.target.value);
  };

  const handleRoundChange = (e) => {
    setRound(e.target.value);
  };

  const handleResetScores = () => {
    setTeamAScore(0);
    setTeamBScore(0);
    setTeamAFouls(0);
    setTeamBFouls(0);
  };

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
      
      {/* Team A and Team B Cards */}
      <Grid2 container spacing={5} className={styles.gridItem}>
        <Grid2 size={6}>
          <Card className={styles.card}>
            <CardContent>
              <TextField
                label="Team A Name"
                value={teamAName}
                onChange={handleTeamANameChange}
                fullWidth
                margin="normal"
              />
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
              <TextField
                label="Team B Name"
                value={teamBName}
                onChange={handleTeamBNameChange}
                fullWidth
                margin="normal"
              />
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