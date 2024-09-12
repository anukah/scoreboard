
"use client";
import React, { useState, useEffect, useCallback } from 'react';
import { useScore } from '../context/StoreContext';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Schedule from '../app/schedule/page';  // Ensure this path is correct

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
    teamAScore, updateTeamAScore, teamBScore, updateTeamBScore,
    teamAName, updateTeamAName, teamBName, updateTeamBName,
    teamALogo, updateTeamALogo, teamBLogo, updateTeamBLogo,
    teamAFouls, updateTeamAFouls, teamBFouls, updateTeamBFouls,
    updateCurrentQuarter, updateCurrentTime, currentRound, updateCurrentRound,
    endMatch, resetMatch
  } = useScore();

  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [timer, setTimer] = useState(0);
  const [selectedQuarter, setSelectedQuarter] = useState('Q1');
  const [isScheduleVisible, setIsScheduleVisible] = useState(false);

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

  const handleRoundChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value)) {
      updateCurrentRound(value);
    }
  };

  const handleQuarterChange = (newQuarter) => {
    setSelectedQuarter(newQuarter);
    updateCurrentQuarter(newQuarter);
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

  const toggleScheduleVisibility = () => setIsScheduleVisible(prev => !prev);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#d9d4d8] p-2">
      <Card className="w-full max-w-6xl shadow-lg">
        <CardHeader>
          <h1 className="text-2xl font-bold text-center text-gray-800">Scoreboard Controls</h1>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <Input
              value={currentRound}
              onChange={handleRoundChange}
              placeholder="Round"
              className="bg-white"
            />
            
            <div className="flex items-center justify-center">
              <ToggleGroup type="single" value={selectedQuarter} onValueChange={handleQuarterChange}>
                {['Q1', 'Q2', 'Q3', 'Q4'].map((quarter) => (
                  <ToggleGroupItem key={quarter} value={quarter} 
                    className={`px-2 py-1 text-xs ${selectedQuarter === quarter ? 'bg-yellow-400 text-white' : 'bg-gray-200'}`}>
                    {quarter}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            
            <div className="flex items-center justify-center space-x-2">
              <span className="text-xl font-bold">{formatTime(timer)}</span>
              <Button
                onClick={handleStartStop}
                className={`py-1 px-2 ${isTimerRunning ? 'bg-[#541212]' : 'bg-[#b24230]'}`}
              >
                {isTimerRunning ? 'Stop' : 'Start'}
              </Button>
              <Button
                onClick={handleReset}
                className="py-1 px-2 bg-[#541212]"
              >
                Reset
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {['A', 'B'].map((teamLetter) => (
              <Card key={`team-${teamLetter}`} className="p-4">
                <CardHeader>
                  <h2 className="text-lg font-semibold text-center">
                    Team {teamLetter}: {teamLetter === 'A' ? teamAName : teamBName}
                  </h2>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-5 gap-1 mb-2">
                    {teamData.map((team, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        onClick={() => handleTeamSelect(index, teamLetter === 'A')}
                        className={`py-1 text-xs ${teamLetter === 'A' && teamAName === team.name || teamLetter === 'B' && teamBName === team.name ? 'bg-[#b24230] text-white' : 'bg-white text-gray-800 hover:bg-[#b24230] hover:text-white'}`}
                      >
                        {team.name}
                      </Button>
                    ))}
                  </div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">Score: {teamLetter === 'A' ? teamAScore : teamBScore}</span>
                    <div>
                      <Button
                        onClick={() => handleScoreChange(teamLetter, 1)}
                        className="mr-1 bg-[#b24230]"
                      >
                        +
                      </Button>
                      <Button
                        onClick={() => handleScoreChange(teamLetter, -1)}
                        className="bg-[#b24230]"
                      >
                        -
                      </Button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">Fouls: {teamLetter === 'A' ? teamAFouls : teamBFouls}</span>
                    <div>
                      <Button
                        onClick={() => handleFoulChange(teamLetter, 1)}
                        className="mr-1 bg-[#541212]"
                      >
                        Foul
                      </Button>
                      <Button
                        onClick={() => handleFoulChange(teamLetter, -1)}
                        className="bg-[#541212]"
                      >
                        Undo
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="flex justify-center space-x-2 mt-4">
            <Button
              onClick={() => {
                updateTeamAScore(0);
                updateTeamBScore(0);
                updateTeamAFouls(0);
                updateTeamBFouls(0);
              }}
              className="bg-[#541212]"
            >
              Reset Scores/Fouls
            </Button>
            <Button
              onClick={endMatch}
              className="bg-[#e39937]"
            >
              End Match
            </Button>
            <Button
              onClick={resetMatch}
              className="bg-[#505fd1]"
            >
              Reset Match
            </Button>
          </div>
          
          <div className="flex justify-center mt-4">
            <Button onClick={toggleScheduleVisibility} className="bg-[#b24230] text-white">Toggle Schedule</Button>
          </div>
          
          {isScheduleVisible && <Schedule />}
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
