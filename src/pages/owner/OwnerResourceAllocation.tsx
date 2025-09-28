
import React from 'react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { teamMembers, projects } from '@/lib/mock-data';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

// --- Helper Functions ---

// Get a list of months for table headers
const getMonthHeaders = () => {
  const months = [];
  const today = new Date();
  for (let i = -2; i <= 3; i++) { // Show 2 past months, current, and 3 future months
    const date = new Date(today.getFullYear(), today.getMonth() + i, 1);
    months.push({ 
      name: date.toLocaleString('default', { month: 'short' }),
      year: date.getFullYear(),
      dateObj: date
    });
  }
  return months;
};

const monthHeaders = getMonthHeaders();

// Calculate utilization for a member in a specific month
const calculateMonthlyUtilization = (member, monthDate) => {
  const memberName = member.name;
  const activeProjects = projects.filter(p => {
    const projectStartDate = new Date(p.startDate);
    const projectEndDate = new Date(p.endDate);
    return (
      p.team.includes(memberName) &&
      projectStartDate <= new Date(monthDate.getFullYear(), monthDate.getMonth() + 1, 0) &&
      projectEndDate >= monthDate
    );
  });
  return activeProjects;
};

const getUtilizationColor = (count) => {
  if (count === 0) return 'bg-gray-100';
  if (count === 1) return 'bg-green-200';
  if (count === 2) return 'bg-yellow-200';
  return 'bg-red-300'; // 3 or more projects
};

// --- Components ---

const OwnerResourceAllocation = () => {
  return (
    <div className="p-4 md:p-8">
      <h1 className="text-3xl font-bold mb-2">Resource Allocation</h1>
      <p className="text-gray-500 mb-8">Visualize team member workload and project allocation over time.</p>

      <Card>
        <CardHeader>
          <CardTitle>Monthly Allocation View</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="sticky left-0 bg-card z-10 w-[250px]">Team Member</TableHead>
                {monthHeaders.map(m => (
                  <TableHead key={`${m.name}-${m.year}`} className="text-center">{m.name} '{m.year.toString().slice(-2)}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map(member => {
                const totalActiveProjects = projects.filter(p => p.team.includes(member.name) && p.status === 'In Progress').length;
                return (
                  <TableRow key={member.id}>
                    <TableCell className="sticky left-0 bg-card z-10 font-medium w-[250px]">
                      <div className="flex items-center">
                        <Avatar className="h-9 w-9 mr-3">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p>{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.role}</p>
                        </div>
                      </div>
                    </TableCell>
                    {monthHeaders.map(month => {
                      const activeProjects = calculateMonthlyUtilization(member, month.dateObj);
                      const utilizationCount = activeProjects.length;
                      const colorClass = getUtilizationColor(utilizationCount);

                      return (
                        <TableCell key={`${member.id}-${month.name}`} className="text-center p-0">
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <div className={`h-full w-full min-w-[80px] flex items-center justify-center ${colorClass}`}>
                                <span className="font-bold text-gray-700">{utilizationCount}</span>
                              </div>
                            </TooltipTrigger>
                            <TooltipContent>
                              {utilizationCount > 0 ? (
                                <ul>
                                  {activeProjects.map(p => <li key={p.id}>{p.name}</li>)}
                                </ul>
                              ) : (
                                <p>No active projects</p>
                              )}
                            </TooltipContent>
                          </Tooltip>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerResourceAllocation;
