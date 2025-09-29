import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { teamMembers, departments } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Users, Briefcase, BarChart, Search, PlusCircle } from 'lucide-react';

const TeamMemberRow = ({ member }: { member: (typeof teamMembers)[0] }) => {
  const navigate = useNavigate();

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/owner/teams/${member.id}`)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-muted-foreground hidden sm:table-cell">{member.email}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">{member.department}</TableCell>
      <TableCell className="hidden lg:table-cell">{member.role}</TableCell>
      <TableCell className="hidden sm:table-cell">
        <div className="flex items-center gap-2">
          <Progress value={member.utilization} className="h-2 w-20" />
          <span className="text-muted-foreground text-xs">{member.utilization}%</span>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell text-center">{member.projects}</TableCell>
      <TableCell>
        <Badge variant={member.status === 'Active' ? 'default' : 'secondary'}>{member.status}</Badge>
      </TableCell>
    </TableRow>
  );
};

const OwnerTeams = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  const filteredMembers = useMemo(() => {
    return teamMembers.filter(m => {
      const searchMatch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.role.toLowerCase().includes(searchTerm.toLowerCase());
      const departmentMatch = departmentFilter === 'all' || m.departmentId === departmentFilter;
      return searchMatch && departmentMatch;
    });
  }, [searchTerm, departmentFilter]);

  const teamStats = useMemo(() => {
    const totalMembers = teamMembers.length;
    const avgUtilization = teamMembers.reduce((sum, m) => sum + m.utilization, 0) / totalMembers;
    return { totalMembers, avgUtilization: avgUtilization.toFixed(0), departmentCount: departments.length };
  }, []);

  const kpiData = [
    { title: 'Total Team Members', value: teamStats.totalMembers, icon: Users },
    { title: 'Departments', value: teamStats.departmentCount, icon: Briefcase },
    { title: 'Average Utilization', value: `${teamStats.avgUtilization}%`, icon: BarChart },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Team Management</h1>
          <p className="text-muted-foreground">Oversee your organization's members and departments.</p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Member
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>All Team Members</CardTitle>
            <CardDescription>A list of all members in your organization. Click a row for details.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search name or role..." 
                className="pl-8 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Departments" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Departments</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Member</TableHead>
                <TableHead className="hidden md:table-cell">Department</TableHead>
                <TableHead className="hidden lg:table-cell">Role</TableHead>
                <TableHead className="hidden sm:table-cell">Utilization</TableHead>
                <TableHead className="hidden md:table-cell text-center">Projects</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMembers.map(m => <TeamMemberRow key={m.id} member={m} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerTeams;