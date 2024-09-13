"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

// MatchTable component to display matches in a table format
const MatchTable = React.memo(({ title, matches, onStatusChange }) => {
  return (
    <div className="flex flex-col h-full">
      {/* Table title */}
      <h2 className="text-4xl font-bold sm:text-5xl lg:text-6xl xl:text-7xl mb-4">{title}</h2>
      
      {/* Table body, scrollable if content overflows */}
      <div className="flex-grow overflow-y-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              {/* Table headers */}
              <TableHead className="text-center whitespace-nowrap p-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Match Number</TableHead>
              <TableHead className="whitespace-nowrap p-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Teams</TableHead>
              <TableHead className="whitespace-nowrap p-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Group</TableHead>
              <TableHead className="whitespace-nowrap p-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Round</TableHead>
              <TableHead className="text-center whitespace-nowrap p-4 text-xl sm:text-2xl lg:text-3xl xl:text-4xl">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Mapping through matches and rendering rows */}
            {matches.map((match) => (
              <TableRow key={match.matchNumber} className="hover:bg-gray-100 dark:hover:bg-gray-800 h-[4.5vh]">
                {/* Match details */}
                <TableCell className="text-center p-4 text-lg sm:text-xl lg:text-2xl xl:text-3xl">{match.matchNumber}</TableCell>
                <TableCell className="p-4 text-lg sm:text-xl lg:text-2xl xl:text-3xl">{match.teams.join(' vs ')}</TableCell>
                <TableCell className="p-4 text-lg sm:text-xl lg:text-2xl xl:text-3xl">{match.group}</TableCell>
                <TableCell className="p-4 text-lg sm:text-xl lg:text-2xl xl:text-3xl">{match.round}</TableCell>
                <TableCell className="text-center p-4">
                  {/* Button to change match status */}
                  <Button
                    variant={match.status === 'To Be Played' ? 'destructive' : 'success'}
                    onClick={() => onStatusChange(match.matchNumber)}
                    className="w-full text-lg sm:text-xl lg:text-2xl xl:text-3xl py-2 px-4"
                  >
                    {match.status}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
});

// EditDialog component to edit the status of a match
const EditDialog = React.memo(({ open, onOpenChange, onSave, currentStatus }) => {
  const [newStatus, setNewStatus] = useState(currentStatus); // Local state for the new status

  useEffect(() => {
    setNewStatus(currentStatus); // Update local state when currentStatus changes
  }, [currentStatus]);

  const handleSave = useCallback(() => {
    onSave(newStatus); // Call onSave callback with the new status
  }, [onSave, newStatus]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault(); // Prevent default form submission
    handleSave(); // Call handleSave on form submission
  }, [handleSave]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {/* Dialog content */}
      <DialogContent className="max-w-[80vw] bg-white dark:bg-gray-800">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle className="text-3xl sm:text-4xl lg:text-5xl">Edit Match Status</DialogTitle>
          </DialogHeader>
          <div className="grid gap-8 py-8">
            <div className="grid grid-cols-4 items-center gap-8">
              {/* Input for new status */}
              <Label htmlFor="newStatus" className="text-right text-2xl sm:text-3xl lg:text-4xl">
                New Status
              </Label>
              <Input
                id="newStatus"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="col-span-3 text-2xl sm:text-3xl lg:text-4xl p-4"
              />
            </div>
          </div>
          <DialogFooter>
            {/* Save button */}
            <Button type="submit" className="text-2xl sm:text-3xl lg:text-4xl py-4 px-8">Save Status</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
});

// Initial matches data
const initialMatches = {
  men: [
    { teams: ['PER', 'SEA'], group: 'D', matchNumber: 1, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['KEL', 'VAV'], group: 'D', matchNumber: 2, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['RUH', 'WAY'], group: 'C', matchNumber: 5, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SJP', 'UVA'], group: 'C', matchNumber: 6, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['JAF', 'RAJ'], group: 'B', matchNumber: 8, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['COL', 'EST'], group: 'A', matchNumber: 10, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['PER', 'VAV'], group: 'D', matchNumber: 12, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['KEL', 'SEA'], group: 'D', matchNumber: 13, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['RUH', 'UVA'], group: 'C', matchNumber: 16, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SJP', 'WAY'], group: 'C', matchNumber: 17, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SAB', 'RAJ'], group: 'B', matchNumber: 19, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['MOR', 'EST'], group: 'A', matchNumber: 21, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['VAU', 'SEA'], group: 'D', matchNumber: 23, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['PER', 'KEL'], group: 'D', matchNumber: 24, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['UVA', 'WAY'], group: 'C', matchNumber: 27, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['RUH', 'SJP'], group: 'C', matchNumber: 28, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SAB', 'JAF'], group: 'B', matchNumber: 30, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['MOR', 'COL'], group: 'A', matchNumber: 32, round: 'Group Stage', status: 'To Be Played' }
  ],
  women: [
    { teams: ['MOR', 'VAV'], group: 'D', matchNumber: 3, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['PER', 'COL'], group: 'D', matchNumber: 4, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['EST', 'UVA'], group: 'C', matchNumber: 7, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['RUH', 'WAY'], group: 'B', matchNumber: 9, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['KEL', 'RAJ'], group: 'A', matchNumber: 11, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['MOR', 'COL'], group: 'D', matchNumber: 14, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['PER', 'VAV'], group: 'D', matchNumber: 15, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SJP', 'UVA'], group: 'C', matchNumber: 18, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['JAF', 'WAY'], group: 'B', matchNumber: 20, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SAB', 'RAJ'], group: 'A', matchNumber: 22, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['COL', 'VAV'], group: 'D', matchNumber: 25, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['MOR', 'PER'], group: 'D', matchNumber: 26, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['EST', 'SJP'], group: 'C', matchNumber: 29, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['JAF', 'RUH'], group: 'B', matchNumber: 31, round: 'Group Stage', status: 'To Be Played' },
    { teams: ['SAB', 'KEL'], group: 'A', matchNumber: 33, round: 'Group Stage', status: 'To Be Played' }
  ]
};

// Main component for the schedule page
export default function SchedulePage() {
  const [matches, setMatches] = useState(initialMatches); // State for storing matches
  const [editingMatch, setEditingMatch] = useState(null); // State for the match being edited
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for the edit dialog visibility

  useEffect(() => {
    // Load saved matches from localStorage when the component mounts
    const savedMatches = localStorage.getItem('matches');
    if (savedMatches) {
      setMatches(JSON.parse(savedMatches));
    }
  }, []);

  useEffect(() => {
    // Save matches to localStorage whenever they change
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  // Function to handle match status change
  const handleStatusChange = useCallback((gender, matchNumber) => {
    const match = matches[gender].find(m => m.matchNumber === matchNumber); // Find the match by matchNumber
    setEditingMatch({ gender, matchNumber, currentStatus: match.status }); // Set the match to be edited
    setIsDialogOpen(true); // Open the edit dialog
  }, [matches]);

  // Function to save the changes after editing match status
  const handleSaveChanges = useCallback((newStatus) => {
    if (editingMatch) {
      const { gender, matchNumber } = editingMatch; // Extract gender and matchNumber from the editing match
      setMatches(prevMatches => ({
        ...prevMatches,
        [gender]: prevMatches[gender].map(match => 
          match.matchNumber === matchNumber
            ? { ...match, status: newStatus } // Update the match status
            : match
        )
      }));
    }
    setIsDialogOpen(false); // Close the edit dialog
    setEditingMatch(null); // Reset the editing match state
  }, [editingMatch]);

  // Sorting matches by match number
  const sortedMatches = useMemo(() => ({
    men: [...matches.men].sort((a, b) => a.matchNumber - b.matchNumber),
    women: [...matches.women].sort((a, b) => a.matchNumber - b.matchNumber)
  }), [matches]);

  return (
    <div className="flex flex-col h-screen p-8">
      {/* Main title */}
      <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 text-center">Group Match Schedule</h1>
      
      {/* Grid layout for displaying matches */}
      <div className="flex-grow grid grid-cols-1 2xl:grid-cols-2 gap-8 overflow-hidden">
        <MatchTable 
          title="Men's Matches" 
          matches={sortedMatches.men} 
          onStatusChange={(matchNumber) => handleStatusChange('men', matchNumber)} 
        />
        <MatchTable 
          title="Women's Matches" 
          matches={sortedMatches.women} 
          onStatusChange={(matchNumber) => handleStatusChange('women', matchNumber)} 
        />
      </div>

      {/* Dialog for editing match status */}
      <EditDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSaveChanges} 
        currentStatus={editingMatch?.currentStatus || ''}
      />
    </div>
  );
}
