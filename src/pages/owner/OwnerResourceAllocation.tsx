import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_TEAM_ALLOCATION } from '@/lib/resource-allocation';
import { departments } from '@/lib/mock-data';
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
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { List, LayoutGrid, Users, Clock, AlertCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const ResourceAllocationCard = ({ member }: { member: (typeof MOCK_TEAM_ALLOCATION)[0] }) => {
  const navigate = useNavigate();
  const utilization = member.capacity > 0 ? (member.currentAllocation / member.capacity) * 100 : 0;

  return (
    <Card 
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={() => navigate(`/dashboard/owner/resource-allocation/${member.id}`)}
    >
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
      <CardContent className="space-y-2">
        <div>
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            <span>Utilization</span>
            <span>{utilization.toFixed(0)}%</span>
          </div>
          <Progress value={utilization} className="h-2" />
        </div>
        <div className="text-sm text-muted-foreground pt-2">
          {member.currentAllocation}h / {member.capacity}h allocated this week
        </div>
      </CardContent>
    </Card>
  );
};

const ResourceAllocationRow = ({ member }: { member: (typeof MOCK_TEAM_ALLOCATION)[0] }) => {
  const navigate = useNavigate();
  const utilization = member.capacity > 0 ? (member.currentAllocation / member.capacity) * 100 : 0;

  return (
    <TableRow 
      className="cursor-pointer"
      onClick={() => navigate(`/dashboard/owner/resource-allocation/${member.id}`)}
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{member.name}</div>
            <div className="text-xs text-muted-foreground">{member.role}</div>
          </div>
        </div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {departments.find(d => d.name.toLowerCase().includes(member.role.toLowerCase().split(' ')[0]))?.name || 'N/A'}
      </TableCell>
      <TableCell>
        <div className="flex items-center gap-2">
          <Progress value={utilization} className="h-2 w-24" />
          <span className="text-muted-foreground text-xs">{utilization.toFixed(0)}%</span>
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell text-right">{member.currentAllocation}h</TableCell>
      <TableCell className="hidden sm:table-cell text-right">{member.capacity}h</TableCell>
    </TableRow>
  );
};

const OwnerResourceAllocation = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const filteredMembers = useMemo(() => {
    return MOCK_TEAM_ALLOCATION.filter(member => {
      const nameMatch = member.name.toLowerCase().includes(searchTerm.toLowerCase());
      const deptMatch = selectedDept === 'all' || (departments.find(d => d.id === selectedDept)?.name.toLowerCase().includes(member.role.toLowerCase().split(' ')[0]));
      return nameMatch && deptMatch;
    });
  }, [searchTerm, selectedDept]);

  const totalCapacity = MOCK_TEAM_ALLOCATION.reduce((sum, m) => sum + m.capacity, 0);
  const totalAllocated = MOCK_TEAM_ALLOCATION.reduce((sum, m) => sum + m.currentAllocation, 0);
  const overallUtilization = totalCapacity > 0 ? (totalAllocated / totalCapacity) * 100 : 0;
  const overallocatedCount = MOCK_TEAM_ALLOCATION.filter(m => m.currentAllocation > m.capacity).length;

  const kpiData = [
    { title: 'Total Team Capacity', value: `${totalCapacity}h`, icon: Users, description: 'Weekly capacity' },
    { title: 'Total Allocated Hours', value: `${totalAllocated}h`, icon: Clock, description: 'Weekly allocation' },
    { title: 'Overall Utilization', value: `${overallUtilization.toFixed(1)}%`, icon: Progress, description: 'Capacity vs Allocation' },
    { title: 'Members Over-allocated', value: overallocatedCount, icon: AlertCircle, description: 'Potential burnout risk' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Resource Allocation</h1>
        <p className="text-muted-foreground">
          Monitor and manage your team's workload and capacity.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <CardTitle>Team Workload</CardTitle>
            <CardDescription>An overview of each team member's current allocation.</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by name..." 
                className="pl-8 w-full md:w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedDept} onValueChange={setSelectedDept}>
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
            <ToggleGroup type="single" value={viewMode} onValueChange={(value) => value && setViewMode(value)} className="hidden lg:flex">
              <ToggleGroupItem value="grid" aria-label="Grid view"><LayoutGrid className="h-4 w-4" /></ToggleGroupItem>
              <ToggleGroupItem value="list" aria-label="List view"><List className="h-4 w-4" /></ToggleGroupItem>
            </ToggleGroup>
          </div>
        </CardHeader>
        <CardContent>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMembers.map(member => (
                <ResourceAllocationCard key={member.id} member={member} />
              ))}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead className="hidden md:table-cell">Department</TableHead>
                  <TableHead>Utilization</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Allocated</TableHead>
                  <TableHead className="hidden sm:table-cell text-right">Capacity</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.map(member => (
                  <ResourceAllocationRow key={member.id} member={member} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerResourceAllocation;