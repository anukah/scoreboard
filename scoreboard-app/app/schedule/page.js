'use client';

import React, { useState, useEffect } from 'react';
import { Grid, Typography, Paper, Box, Button, Modal, TextField, Select, MenuItem, FormControl, InputLabel, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

const MatchCard = ({ match, onEdit }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Paper 
      elevation={3} 
      sx={{ 
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
        },
        background: 'linear-gradient(145deg, #ffffff, #f0f0f0)',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold', color: theme.palette.primary.main }}>
        {match.teams[0]} vs {match.teams[1]}
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Group: {match.group}</Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Match: {match.matchNumber}</Typography>
        <Typography variant="body2" sx={{ color: theme.palette.text.secondary }}>Round: {match.round}</Typography>
        <Typography variant="body1" sx={{ mt: 1, fontWeight: 'medium', color: theme.palette.secondary.main }}>Status: {match.status}</Typography>
      </Box>
      <Button 
        variant="contained" 
        onClick={() => onEdit(match)} 
        sx={{ 
          position: 'absolute',
          bottom: 16,
          left: '50%',
          transform: `translateX(-50%) translateY(${isHovered ? '0' : '100%'})`,
          opacity: isHovered ? 1 : 0,
          transition: 'transform 0.3s ease-in-out, opacity 0.3s ease-in-out',
          width: 'calc(100% - 32px)',
          borderRadius: '20px',
        }}
      >
        Edit
      </Button>
    </Paper>
  );
};

const EditModal = ({ open, handleClose, match, handleSave }) => {
  const [editedMatch, setEditedMatch] = useState(null);

  useEffect(() => {
    if (match) {
      setEditedMatch(match);
    }
  }, [match]);

  const handleChange = (e) => {
    if (editedMatch) {
      setEditedMatch({ ...editedMatch, [e.target.name]: e.target.value });
    }
  };

  if (!editedMatch) {
    return null;
  }

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: 400, 
        bgcolor: 'background.paper', 
        boxShadow: 24, 
        p: 4,
        borderRadius: '12px',
      }}>
        <Typography variant="h6" component="h2" gutterBottom sx={{ color: theme.palette.primary.main }}>
          Edit Match
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          name="status"
          label="Status"
          value={editedMatch.status || ''}
          onChange={handleChange}
        />
        <Button 
          onClick={() => handleSave(editedMatch)} 
          variant="contained" 
          sx={{ mt: 2, borderRadius: '20px' }}
        >
          Save Changes
        </Button>
      </Box>
    </Modal>
  );
};

const MatchGrid = ({ title, matches, onEditMatch }) => (
  <Box>
    <Typography variant="h5" gutterBottom sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 3 }}>
      {title}
    </Typography>
    <Grid container spacing={3}>
      {matches.map((match, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <MatchCard match={match} onEdit={onEditMatch} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function SchedulePage() {
  const currentDate = new Date().toDateString();
  const initialMenMatches = [
  { teams: ['PER', 'SEA'], group: 'D', matchNumber: 1, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['KEL', 'VAV'], group: 'D', matchNumber: 2, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['RUH', 'WAY'], group: 'C', matchNumber: 5, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SJP', 'UVA'], group: 'C', matchNumber: 6, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['JAF', 'RAJ'], group: 'B', matchNumber: 9, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['COL', 'EST'], group: 'A', matchNumber: 11, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['PER', 'VAV'], group: 'D', matchNumber: 13, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['KEL', 'SEA'], group: 'D', matchNumber: 14, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['RUH', 'UVA'], group: 'C', matchNumber: 17, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SJP', 'WAY'], group: 'C', matchNumber: 18, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SAB', 'RAJ'], group: 'B', matchNumber: 21, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['MOR', 'EST'], group: 'A', matchNumber: 23, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['VAU', 'SEA'], group: 'D', matchNumber: 25, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['PER', 'KEL'], group: 'D', matchNumber: 26, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['UVA', 'WAY'], group: 'C', matchNumber: 29, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['RUH', 'SJP'], group: 'C', matchNumber: 30, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SAB', 'JAF'], group: 'B', matchNumber: 33, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['MOR', 'COL'], group: 'A', matchNumber: 35, round: 'Group Stage', status: 'To Be Played' }
];
  const initialWomenMatches = [
  { teams: ['MOR', 'SEA'], group: 'D', matchNumber: 3, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['PER', 'COL'], group: 'D', matchNumber: 4, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['EST', 'VAV'], group: 'C', matchNumber: 7, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SJP', 'UVA'], group: 'C', matchNumber: 8, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['RUH', 'WAY'], group: 'B', matchNumber: 10, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['KEL', 'RAJ'], group: 'A', matchNumber: 12, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['MOR', 'COL'], group: 'D', matchNumber: 15, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['PER', 'SEA'], group: 'D', matchNumber: 16, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['EST', 'UVA'], group: 'C', matchNumber: 19, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SJP', 'VAU'], group: 'C', matchNumber: 20, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['JAF', 'WAY'], group: 'B', matchNumber: 22, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SAB', 'RAJ'], group: 'A', matchNumber: 24, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['COL', 'SEA'], group: 'D', matchNumber: 27, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['MOR', 'PER'], group: 'D', matchNumber: 28, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['UVA', 'VAU'], group: 'C', matchNumber: 31, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['EST', 'SJP'], group: 'C', matchNumber: 32, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['JAF', 'RUH'], group: 'B', matchNumber: 34, round: 'Group Stage', status: 'To Be Played' },
  { teams: ['SAB', 'KEL'], group: 'A', matchNumber: 36, round: 'Group Stage', status: 'To Be Played' }
];

  const [menMatches, setMenMatches] = useState(initialMenMatches);
  const [womenMatches, setWomenMatches] = useState(initialWomenMatches);
  const [editingMatch, setEditingMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditMatch = (match) => {
    setEditingMatch(match);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMatch(null);
  };

  const handleSaveChanges = (updatedMatch) => {
    if (!updatedMatch) return;

    const updateMatches = (matches) =>
      matches.map((match) =>
        match.matchNumber === updatedMatch.matchNumber ? updatedMatch : match
      );

    if (menMatches.some((match) => match.matchNumber === updatedMatch.matchNumber)) {
      setMenMatches(updateMatches(menMatches));
    } else {
      setWomenMatches(updateMatches(womenMatches));
    }

    handleCloseModal();
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, p: 3, bgcolor: 'background.default', minHeight: '100vh' }}>
        <Typography variant="h4" gutterBottom align="center" sx={{ color: theme.palette.primary.main, fontWeight: 'bold', mb: 4 }}>
          Match Schedule - {currentDate}
        </Typography>
        <Box sx={{ maxWidth: 1400, margin: '0 auto' }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <MatchGrid title="Men's Matches" matches={menMatches} onEditMatch={handleEditMatch} />
            </Grid>
            <Grid item xs={12} md={6}>
              <MatchGrid title="Women's Matches" matches={womenMatches} onEditMatch={handleEditMatch} />
            </Grid>
          </Grid>
        </Box>
        <EditModal
          open={isModalOpen}
          handleClose={handleCloseModal}
          match={editingMatch}
          handleSave={handleSaveChanges}
        />
      </Box>
    </ThemeProvider>
  );
}