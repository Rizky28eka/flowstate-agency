import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeamGoals } from '@/lib/goals';
import { goals as allGoals } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlusCircle, Target, CheckCircle, AlertTriangle } from 'lucide-react';

const GoalRow = ({ goal }: { goal: (typeof allGoals)[0] }) => {
  const navigate = useNavigate();
  
  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
    'On Track': 'default',
    'At Risk': 'destructive',
    'Completed': 'secondary',
  };

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/team-lead/goals/${goal.id}`)}
    >
      <TableCell className="font-medium">{goal.title}</TableCell>
      <TableCell className="hidden sm:table-cell">{goal.owner}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Progress value={goal.progress} className="h-2 w-24" />
          <span className="text-muted-foreground text-xs">{goal.progress.toFixed(0)}%</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-right">{goal.endDate}</TableCell>
      <TableCell className="text-right">
        <Badge variant={statusVariant[goal.status] || 'outline'}>{goal.status}</Badge>
      </TableCell>
    </TableRow>
  );
};

const TeamLeadGoals = () => {
  // Assume the logged-in Team Lead is 'Sarah Wilson' for this demo
  const currentTeamLeadName = 'Sarah Wilson';
  const teamGoals = useMemo(() => getTeamGoals(currentTeamLeadName), [currentTeamLeadName]);

  const stats = useMemo(() => {
    const onTrack = teamGoals.filter(g => g.status === 'On Track').length;
    const atRisk = teamGoals.filter(g => g.status === 'At Risk').length;
    return { total: teamGoals.length, onTrack, atRisk };
  }, [teamGoals]);

  const kpiData = [
    { title: 'Total Goals', value: stats.total, icon: Target },
    { title: 'On Track', value: stats.onTrack, icon: CheckCircle },
    { title: 'At Risk', value: stats.atRisk, icon: AlertTriangle, critical: stats.atRisk > 0 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Goals</h1>
          <p className="text-muted-foreground">Set and track objectives for your team members.</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Set New Goal
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={`h-4 w-4 ${kpi.critical ? 'text-destructive' : 'text-muted-foreground'}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${kpi.critical ? 'text-destructive' : ''}`}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Team Goals</CardTitle>
          <CardDescription>A list of all goals assigned to your team members.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Goal</TableHead>
                <TableHead className="hidden sm:table-cell">Owner</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead className="hidden md:table-cell text-right">Target Date</TableHead>
                <TableHead className="text-right">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamGoals.map(goal => <GoalRow key={goal.id} goal={goal} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeamLeadGoals;
