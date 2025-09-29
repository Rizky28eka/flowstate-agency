import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTeamData, TeamMemberSummary } from '@/lib/team-lead';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Users, BarChart, AlertCircle, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const TeamMemberCard = ({ member }: { member: TeamMemberSummary }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={member.avatar} alt={member.name} />
          <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle>{member.name}</CardTitle>
          <CardDescription>{member.role}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Utilization</span>
            <span>{member.utilization}%</span>
          </div>
          <Progress value={member.utilization} />
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="text-center p-2 rounded-md bg-muted">
            <p className="font-semibold">{member.completedTasksThisWeek}</p>
            <p className="text-xs text-muted-foreground">Completed This Week</p>
          </div>
          <div className={cn("text-center p-2 rounded-md", member.overdueTasksCount > 0 ? "bg-destructive/20" : "bg-muted")}>
            <p className={cn("font-semibold", member.overdueTasksCount > 0 && "text-destructive")}>{member.overdueTasksCount}</p>
            <p className="text-xs text-muted-foreground">Overdue Tasks</p>
          </div>
        </div>
        <Button variant="outline" className="w-full" onClick={() => navigate(`/dashboard/owner/teams/${member.id}`)}>
          View Profile <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

const TeamLeadTeam = () => {
  // Assume the logged-in Team Lead is 'Sarah Wilson' for this demo
  const currentTeamLeadName = 'Sarah Wilson';

  const teamData = useMemo(() => getTeamData(currentTeamLeadName), [currentTeamLeadName]);

  const teamStats = useMemo(() => {
    const teamSize = teamData.length;
    if (teamSize === 0) return { teamSize: 0, avgUtilization: 0, totalOverdue: 0 };
    const avgUtilization = teamData.reduce((sum, m) => sum + m.utilization, 0) / teamSize;
    const totalOverdue = teamData.reduce((sum, m) => sum + m.overdueTasksCount, 0);
    return { teamSize, avgUtilization: avgUtilization.toFixed(0), totalOverdue };
  }, [teamData]);

  const kpiData = [
    { title: 'Team Size', value: teamStats.teamSize, icon: Users },
    { title: 'Average Utilization', value: `${teamStats.avgUtilization}%`, icon: BarChart },
    { title: 'Total Overdue Tasks', value: teamStats.totalOverdue, icon: AlertCircle, critical: teamStats.totalOverdue > 0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Team Dashboard</h1>
        <p className="text-muted-foreground">Performance and workload overview for your direct reports.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className={cn("h-4 w-4 text-muted-foreground", kpi.critical && "text-destructive")} />
            </CardHeader>
            <CardContent>
              <div className={cn("text-2xl font-bold", kpi.critical && "text-destructive")}>{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamData.map(member => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default TeamLeadTeam;
