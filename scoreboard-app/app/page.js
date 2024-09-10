"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useScore } from '../context/StoreContext';
import { Button, Typography, ToggleButton, ToggleButtonGroup, Grid2, TextField } from '@mui/material';

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

const Home = () => {
  const { 
    teamAScore, updateTeamAScore,
    teamBScore, updateTeamBScore,
    teamAName, updateTeamAName,
    teamBName, updateTeamBName,
    teamALogo, updateTeamALogo,
    teamBLogo, updateTeamBLogo,
    teamAFouls, updateTeamAFouls,
    teamBFouls, updateTeamBFouls,
    updateCurrentQuarter, updateCurrentTime,
    currentRound, updateCurrentRound,
    endMatch, resetMatch
  } = useScore();

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => setTimer(prev => prev + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  useEffect(() => {
    updateCurrentTime(formatTime(timer));
  }, [timer, updateCurrentTime]);

  const formatTime = useCallback((seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }, []);

  const handleStartStop = () => setIsTimerRunning(prev => !prev);
  const handleReset = () => {
    setIsTimerRunning(false);
    setTimer(0);
  };

  const handleEndMatch = () => {
    endMatch();
    setIsTimerRunning(false);
  };

  const handleTeamSelect = useCallback((teamIndex, isTeamA) => {
    const team = teamData[teamIndex];
    if (isTeamA) {
      updateTeamAName(team.name);
      updateTeamALogo(team.logo);
    } else {
      updateTeamBName(team.name);
      updateTeamBLogo(team.logo);
    }
  }, [updateTeamAName, updateTeamALogo, updateTeamBName, updateTeamBLogo]);

  const handleRoundChange = (e) => updateCurrentRound(e.target.value);

  const handleResetScores = () => {
    updateTeamAScore(0);
    updateTeamBScore(0);
    updateTeamAFouls(0);
    updateTeamBFouls(0);
  };

  const handleQuarterChange = (event, newQuarter) => {
    if (newQuarter !== null) {
      setSelectedQuarter(newQuarter);
      updateCurrentQuarter(newQuarter);
    }
  };

  const handleScoreChange = useCallback((team, change) => {
    const updateScore = team === 'A' ? updateTeamAScore : updateTeamBScore;
    const currentScore = team === 'A' ? teamAScore : teamBScore;
    updateScore(Math.max(0, currentScore + change));
  }, [updateTeamAScore, updateTeamBScore, teamAScore, teamBScore]);

  const handleFoulChange = useCallback((team, change) => {
    const updateFouls = team === 'A' ? updateTeamAFouls : updateTeamBFouls;
    const currentFouls = team === 'A' ? teamAFouls : teamBFouls;
    updateFouls(Math.max(0, currentFouls + change));
  }, [updateTeamAFouls, updateTeamBFouls, teamAFouls, teamBFouls]);

  return (
    <div className="flex flex-col items-center justify-center p-4 min-h-screen bg-[#d9d4d8]">
      <Grid2 container spacing={2} alignItems="center" justifyContent="center">
        
        <Grid2 size={12} className="text-center mb-4 border border-gray-300 rounded-lg p-3 bg-white">
          <Typography variant="h4" component="h1" className="font-bold text-2xl text-gray-800">
            Scoreboard Controls
          </Typography>
        </Grid2>
  
        <Grid2 size={12} className="mb-4">
          <TextField
            margin="dense"
            fullWidth
            label="Round"
            value={currentRound}
            onChange={handleRoundChange}
            className="bg-white border border-gray-300 rounded-lg"
            InputProps={{
              className: "text-gray-800 text-sm"
            }}
          />
        </Grid2>
  
        {['A', 'B'].map((teamLetter) => (
          <Grid2 container spacing={1} key={`team-${teamLetter}`} className="mb-3 border border-gray-300 rounded-lg p-2 bg-white">
            <Grid2 item xs={12} className="text-center">
              <Typography variant="h6" className="font-semibold text-lg text-gray-800">
                Team {teamLetter}:
              </Typography>
            </Grid2>
            <Grid2 container spacing={1} item xs={12} justifyContent="center">
              {teamData.map((team, index) => (
                <Grid2 key={index} item xs={6} sm={3} className="flex justify-center">
                  <ToggleButton
                    value={team.name}
                    selected={teamLetter === 'A' ? teamAName === team.name : teamBName === team.name}
                    onChange={() => handleTeamSelect(index, teamLetter === 'A')}
                    className={`py-1 text-xs w-full border border-gray-300 rounded-lg hover:bg-[#b24230] hover:text-white ${
                      teamLetter === 'A' && teamAName === team.name ? 'bg-[#b24230] text-white' : 
                      teamLetter === 'B' && teamBName === team.name ? 'bg-[#b24230] text-white' : 
                      'bg-white text-gray-800'
                    }`}
                  >
                    {team.name}
                  </ToggleButton>
                </Grid2>
              ))}
            </Grid2>
          </Grid2>
        ))}
  
        {['A', 'B'].map((teamLetter) => {
          const teamName = teamLetter === 'A' ? teamAName : teamBName;
          const teamScore = teamLetter === 'A' ? teamAScore : teamBScore;
          const teamFouls = teamLetter === 'A' ? teamAFouls : teamBFouls;
  
          return (
            <Grid2 item xs={12} md={6} key={`team-${teamLetter}-controls`} className="mb-3 border border-gray-300 rounded-lg p-3 bg-white">
              <div className="flex flex-col items-center">
                <Typography variant="h6" className="font-semibold text-lg text-gray-800 mb-1">
                  {teamName} Score: {teamScore}
                </Typography>
                <div className="flex space-x-1 mb-3">
                  <Button variant="outlined" onClick={() => handleScoreChange(teamLetter, 1)} className="flex-1 py-1 bg-[#b24230] text-white hover:bg-[#541212] text-xs">
                    +
                  </Button>
                  <Button variant="outlined" onClick={() => handleScoreChange(teamLetter, -1)} className="flex-1 py-1 bg-[#b24230] text-white hover:bg-[#541212] text-xs">
                    -
                  </Button>
                </div>
                <Typography variant="h6" className="font-semibold text-lg text-gray-800 mb-1">
                  {teamName} Fouls: {teamFouls}
                </Typography>
                <div className="flex space-x-1">
                  <Button variant="outlined" color="error" onClick={() => handleFoulChange(teamLetter, 1)} className="flex-1 py-1 bg-[#541212] text-white hover:bg-[#b24230] text-xs">
                    Foul
                  </Button>
                  <Button variant="outlined" color="error" onClick={() => handleFoulChange(teamLetter, -1)} className="flex-1 py-1 bg-[#541212] text-white hover:bg-[#b24230] text-xs">
                    Undo Foul
                  </Button>
                </div>
              </div>
            </Grid2>
          );
        })}
  
        <Grid2 container spacing={1} className="mt-3 border border-gray-300 rounded-lg p-3 bg-white">
          <Grid2 size={4} className="mb-3 sm:mb-0">
            <Typography variant="h6" component="h2" gutterBottom className="font-semibold text-lg text-gray-800 mb-1">
              Quarter:
            </Typography>
            <ToggleButtonGroup value={selectedQuarter} exclusive onChange={handleQuarterChange} fullWidth>
              {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
                <ToggleButton
                  key={quarter}
                  value={quarter}
                  className={`text-gray-800 hover:bg-[#b24230] hover:text-white text-xs ${
                    selectedQuarter === quarter ? 'bg-yellow-400 text-white' : 'bg-gray-300'
                  }`}
                >
                  {quarter}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Grid2>
  
          <Grid2 size={4} className="mb-3 sm:mb-0">
            <div className="text-center">
              <Typography variant="h6" component="h2" gutterBottom className="font-semibold text-lg text-gray-800 mb-1">
                Timer: {formatTime(timer)}
              </Typography>
              <Button variant="outlined" onClick={handleStartStop} fullWidth className="py-1 bg-[#b24230] text-white hover:bg-[#541212] text-xs">
                {isTimerRunning ? 'Stop' : 'Start'}
              </Button>
              <Button variant="outlined" onClick={handleReset} fullWidth className="py-1 mt-1 bg-[#541212] text-white hover:bg-[#b24230] text-xs">
                Reset Timer
              </Button>
            </div>
          </Grid2>
  
          <Grid2 size={4}>
            <Button variant="outlined" onClick={handleResetScores} fullWidth className="py-1 bg-[#541212] text-white hover:bg-[#b24230] text-xs">
              Reset Scores and Fouls
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleEndMatch} fullWidth className="py-1 mt-1 bg-[#e39937] text-white hover:bg-[#b24230] text-xs">
              End Match
            </Button>
            <Button variant="outlined" onClick={resetMatch} fullWidth className="py-1 mt-1 bg-[#b24230] text-white hover:bg-[#541212] text-xs">
              Reset Match
            </Button>
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );  
};

export default Home;