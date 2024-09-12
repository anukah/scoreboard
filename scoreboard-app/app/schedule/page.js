"use client";
import React, { useState, useEffect } from 'react';
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const MatchTable = ({ title, matches, onStatusChange }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Match Number</TableHead>
              <TableHead>Teams</TableHead>
              <TableHead>Group</TableHead>
              <TableHead>Round</TableHead>
              <TableHead className="text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell className="text-center">{match.matchNumber}</TableCell>
                <TableCell>{match.teams.join(' vs ')}</TableCell>
                <TableCell>{match.group}</TableCell>
                <TableCell>{match.round}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant={match.status === 'To Be Played' ? 'destructive' : 'success'}
                    onClick={() => onStatusChange(match.matchNumber)}
                    className="w-full"
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
};

const EditDialog = ({ open, onOpenChange, onSave, currentStatus }) => {
  const [newStatus, setNewStatus] = useState(currentStatus);

  useEffect(() => {
    setNewStatus(currentStatus);
  }, [currentStatus]);

  const handleSave = () => {
    onSave(newStatus);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white dark:bg-gray-800">
        <DialogHeader>
          <DialogTitle>Edit Match Status</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newStatus" className="text-right">
              New Status
            </Label>
            <Select value={newStatus} onValueChange={setNewStatus}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select new status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="To Be Played">To Be Played</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="Postponed">Postponed</SelectItem>
                <SelectItem value="Cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleSave}>Save Status</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default function SchedulePage() {
  const currentDate = new Date().toDateString();
  const [matches, setMatches] = useState(() => {
    const savedMatches = localStorage.getItem('matches');
    return savedMatches ? JSON.parse(savedMatches) : {
      men: [
        { teams: ['PER', 'SEA'], group: 'D', matchNumber: 1, round: 'Group Stage', status: 'To Be Played' },
        { teams: ['KEL', 'VAV'], group: 'D', matchNumber: 2, round: 'Group Stage', status: 'To Be Played' },
        // ... (rest of the men's matches)
      ],
      women: [
        { teams: ['MOR', 'SEA'], group: 'D', matchNumber: 3, round: 'Group Stage', status: 'To Be Played' },
        { teams: ['PER', 'COL'], group: 'D', matchNumber: 4, round: 'Group Stage', status: 'To Be Played' },
        // ... (rest of the women's matches)
      ]
    };
  });
  const [editingMatch, setEditingMatch] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('matches', JSON.stringify(matches));
  }, [matches]);

  const handleStatusChange = (gender, matchNumber) => {
    const match = matches[gender].find(m => m.matchNumber === matchNumber);
    setEditingMatch({ gender, matchNumber, currentStatus: match.status });
    setIsDialogOpen(true);
  };

  const handleSaveChanges = (newStatus) => {
    if (editingMatch) {
      const { gender, matchNumber } = editingMatch;
      setMatches(prevMatches => ({
        ...prevMatches,
        [gender]: prevMatches[gender].map(match => 
          match.matchNumber === matchNumber
            ? { ...match, status: newStatus }
            : match
        )
      }));
    }
    setIsDialogOpen(false);
    setEditingMatch(null);
  };

  const sortedMatches = {
    men: [...matches.men].sort((a, b) => a.matchNumber - b.matchNumber),
    women: [...matches.women].sort((a, b) => a.matchNumber - b.matchNumber)
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Match Schedule - {currentDate}</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
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
      <EditDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen} 
        onSave={handleSaveChanges} 
        currentStatus={editingMatch?.currentStatus || ''}
      />
    </div>
  );
}