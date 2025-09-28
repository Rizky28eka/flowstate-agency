
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, UserPlus, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Clock, Target, BarChart3, CheckCircle } from "lucide-react";
import { useState, useMemo } from "react";
import { departments, teamMembers as initialTeamMembers } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";
import { Link } from "react-router-dom";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const HireMemberForm = ({ onAddMember }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [departmentId, setDepartmentId] = useState('');

    const handleSubmit = () => {
        if (!name || !email || !role || !departmentId) return;
        const newMember = {
            id: Math.max(...initialTeamMembers.map(m => m.id)) + 1,
            name,
            email,
            role,
            departmentId,
            department: departments.find(d => d.id === departmentId)?.name || 'N/A',
            status: 'Active',
            joinDate: new Date().toISOString().split('T')[0],
            utilization: 0,
            projects: 0,
            rating: 0,
            skills: ['New Hire'],
            avatar: '/api/placeholder/40/40',
        };
        onAddMember(newMember);
    };

    return (
        <div className="grid gap-4 py-4">
            <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} />
            <Input placeholder="Email Address" type="email" value={email} onChange={e => setEmail(e.target.value)} />
            <Input placeholder="Role / Position" value={role} onChange={e => setRole(e.target.value)} />
            <Select onValueChange={setDepartmentId}><SelectTrigger><SelectValue placeholder="Select a department" /></SelectTrigger><SelectContent>{departments.map(d => <SelectItem key={d.id} value={d.id}>{d.name}</SelectItem>)}</SelectContent></Select>
            <DialogFooter><DialogClose asChild><Button onClick={handleSubmit}>Hire Member</Button></DialogClose></DialogFooter>
        </div>
    );
};

const OwnerTeams = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);

  const handleAddMember = (newMember) => {
    setTeamMembers(prev => [newMember, ...prev]);
  };

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-500";
    if (utilization >= 75) return "text-green-500";
    return "text-amber-500";
  };

  const filteredTeamMembers = useMemo(() => teamMembers.filter(member => {
    const term = searchTerm.toLowerCase();
    return term === "" ||
      member.name.toLowerCase().includes(term) ||
      member.role.toLowerCase().includes(term) ||
      member.skills.some(skill => skill.toLowerCase().includes(term));
  }), [teamMembers, searchTerm]);

  const avgUtilization = useMemo(() => (teamMembers.reduce((sum, member) => sum + member.utilization, 0) / teamMembers.length).toFixed(0), [teamMembers]);
  const avgSatisfaction = useMemo(() => (teamMembers.reduce((sum, member) => sum + member.rating, 0) / teamMembers.length).toFixed(1), [teamMembers]);

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Total Team Members</CardTitle><Users className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{teamMembers.length}</div><p className="text-xs text-muted-foreground">+3 this month</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Departments</CardTitle><Target className="h-4 w-4 text-muted-foreground" /></CardHeader><CardContent><div className="text-2xl font-bold">{departments.length}</div><p className="text-xs text-muted-foreground">Fully operational</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Avg Utilization</CardTitle><TrendingUp className="h-4 w-4 text-green-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{avgUtilization}%</div><p className="text-xs text-muted-foreground">+2% from last month</p></CardContent></Card>
        <Card><CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2"><CardTitle className="text-sm font-medium">Team Satisfaction</CardTitle><Award className="h-4 w-4 text-amber-600" /></CardHeader><CardContent><div className="text-2xl font-bold">{avgSatisfaction}/5</div><p className="text-xs text-muted-foreground">Latest survey results</p></CardContent></Card>
      </div>

      <Tabs defaultValue="members" className="space-y-6">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="org-chart">Org Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">{/* ... Department content ... */}</TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1"><Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" /><Input placeholder="Search by name, role, or skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/></div>
            <Dialog><DialogTrigger asChild><Button><UserPlus className="w-4 h-4 mr-2" /> Hire New Member</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Hire New Team Member</DialogTitle><DialogDescription>Fill in the details to add a new member to the team.</DialogDescription></DialogHeader><HireMemberForm onAddMember={handleAddMember} /></DialogContent></Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                 <CardHeader><div className="flex items-center space-x-4"><Avatar className="w-16 h-16"><AvatarImage src={member.avatar} alt={member.name} /><AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar><div className="flex-1"><CardTitle className="text-lg">{member.name}</CardTitle><CardDescription>{member.role}</CardDescription><Badge variant="secondary" className="mt-1">{member.department}</Badge></div></div></CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">{member.skills.slice(0, 4).map((skill, index) => (<Badge key={index} variant="outline" className="text-xs">{skill}</Badge>))}</div>
                    <div className="space-y-2 pt-2"><div className="flex justify-between text-sm"><span>Utilization</span><span className={`font-medium ${getUtilizationColor(member.utilization)}`}>{member.utilization}%</span></div><Progress value={member.utilization} /></div>
                    <div className="flex items-center justify-between text-sm"><div className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>{member.projects} Active Projects</span></div><div className="flex items-center space-x-2"><Award className="w-4 h-4 text-amber-500" /><span>Rating: {member.rating}/5.0</span></div></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">{/* ... Performance content ... */}</TabsContent>
        <TabsContent value="org-chart" className="space-y-6">{/* ... Org Chart content ... */}</TabsContent>
      </Tabs>
    </main>
  );
};

export default OwnerTeams;
