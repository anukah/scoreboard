"use client";
import React, { useState, useEffect } from 'react';
import { useScore } from '../context/StoreContext';
import { Button, Card, CardContent, TextField, Grid2, Typography } from '@mui/material';

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

  const handleSetQuarter = (quarter) => {
    setCurrentQuarter(quarter);
  };
  return(
  <div className="p-8 max-w-4xl mx-auto">
      <Typography variant="h3" component="h1" gutterBottom>
        Control Panel
      </Typography>
      <Grid2 container spacing={4}>
        {/* Round Input */}
        <Grid2 item xs={12}>
          <TextField
            label="Round"
            value={round}
            onChange={handleRoundChange}
            fullWidth
            margin="normal"
          />
        </Grid2>
        {/* Team A Card */}
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <TextField
                label="Team A Name"
                value={teamAName}
                onChange={handleTeamANameChange}
                fullWidth
                margin="normal"
              />
              <Typography variant="h5" gutterBottom>{teamAName} Score: {teamAScore}</Typography>
              <Button variant="contained" color="primary" onClick={() => setTeamAScore(teamAScore + 1)} fullWidth>
                +
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setTeamAScore(teamAScore - 1)} 
                disabled={teamAScore === 0} 
                fullWidth 
                sx={{ mt: 2 }}
              >
                -
              </Button>
              <Typography variant="h5" gutterBottom>{teamAName} Fouls: {teamAFouls}</Typography>
              <Button variant="contained" color="error" onClick={() => setTeamAFouls(teamAFouls + 1)} fullWidth>
                Foul
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => setTeamAFouls(teamAFouls - 1)} 
                disabled={teamAFouls === 0} 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Undo Foul
              </Button>
            </CardContent>
          </Card>
        </Grid2>
        
        {/* Team B Card */}
        <Grid2 item xs={12} md={6}>
          <Card>
            <CardContent>
              <TextField
                label="Team B Name"
                value={teamBName}
                onChange={handleTeamBNameChange}
                fullWidth
                margin="normal"
              />
              <Typography variant="h5" gutterBottom>{teamBName} Score: {teamBScore}</Typography>
              <Button variant="contained" color="primary" onClick={() => setTeamBScore(teamBScore + 1)} fullWidth>
                +
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => setTeamBScore(teamBScore - 1)} 
                disabled={teamBScore === 0} 
                fullWidth 
                sx={{ mt: 2 }}
              >
                -
              </Button>
              <Typography variant="h5" gutterBottom>{teamBName} Fouls: {teamBFouls}</Typography>
              <Button variant="contained" color="error" onClick={() => setTeamBFouls(teamBFouls + 1)} fullWidth>
                Foul
              </Button>
              <Button 
                variant="contained" 
                color="error" 
                onClick={() => setTeamBFouls(teamBFouls - 1)} 
                disabled={teamBFouls === 0} 
                fullWidth 
                sx={{ mt: 2 }}
              >
                Undo Foul
              </Button>
            </CardContent>
          </Card>
        </Grid2>
        
        {/* Reset Button */}
        <Grid2 item xs={12}>
          <Button 
            variant="outlined" 
            color="error" 
            onClick={handleResetScores} 
            fullWidth
          >
            Reset Scores and Fouls
          </Button>
        </Grid2>
        
        {/* Quarter Buttons */}
        <Grid2 item xs={12} container spacing={2}>
          <Grid2 item xs={3}>
            <Button variant="outlined" onClick={() => handleSetQuarter("Q1")} fullWidth>Q1</Button>
          </Grid2>
          <Grid2 item xs={3}>
            <Button variant="outlined" onClick={() => handleSetQuarter("Q2")} fullWidth>Q2</Button>
          </Grid2>
          <Grid2 item xs={3}>
            <Button variant="outlined" onClick={() => handleSetQuarter("Q3")} fullWidth>Q3</Button>
          </Grid2>
          <Grid2 item xs={3}>
            <Button variant="outlined" onClick={() => handleSetQuarter("Q4")} fullWidth>Q4</Button>
          </Grid2>
        </Grid2>
        
        {/* Timer and Control */}
        <Grid2 item xs={12} className="text-center">
          <Typography variant="h4" component="h2" gutterBottom>
            Timer: {formatTime(timer)}
          </Typography>
          <Button variant="contained" color="primary" onClick={handleStartStop}>
            {isTimerRunning ? 'Stop' : 'Start'}
          </Button>
          <Button variant="outlined" onClick={handleReset} sx={{ ml: 2 }}>
            Reset
          </Button>
        </Grid2>
      </Grid2>
    </div>
  );
};

export default Home;