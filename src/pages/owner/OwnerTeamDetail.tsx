
import { useParams } from "react-router-dom";
import { departments, teamMembers, projects } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Plus, Users, Briefcase, DollarSign, BarChart, Star, Percent } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Link } from "react-router-dom";

const OwnerTeamDetail = () => {
  const { teamId } = useParams();
  const team = departments.find(d => d.id === teamId);
  const members = teamMembers.filter(m => m.departmentId === teamId);
  // A simple way to associate projects with teams is to see if a team member is on the project
  const teamProjectIds = new Set(teamMembers.filter(m => m.departmentId === teamId).map(m => m.id));
  const teamProjects = projects.filter(p => p.team.some(memberName => members.some(m => m.name === memberName)));


  if (!team) {
    return <div className="p-8">Team not found.</div>;
  }

  const budgetSpentPercentage = (parseFloat(team.spent.replace(/[^0-9.-]+/g,"")) / parseFloat(team.budget.replace(/[^0-9.-]+/g,""))) * 100;

  return (
    <main className="flex-1 px-6 py-8 bg-background">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
        <div className="space-y-1">
            <h1 className="text-3xl font-bold text-foreground">{team.name}</h1>
            <p className="text-muted-foreground max-w-xl">{team.description}</p>
            <p className="text-sm text-muted-foreground">Lead by <span className="font-semibold text-foreground">{team.lead}</span></p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline"><Edit className="w-4 h-4 mr-2"/> Edit Team</Button>
            <Button variant="destructive"><Trash2 className="w-4 h-4 mr-2"/> Delete Team</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Size</CardTitle>
            <Users className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.members} Members</div>
            <p className="text-xs text-muted-foreground">{members.length} active members</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Briefcase className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.projects}</div>
            <p className="text-xs text-muted-foreground">Projects currently managed</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Budget Utilization</CardTitle>
            <DollarSign className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.spent}</div>
            <p className="text-xs text-muted-foreground">of {team.budget} budget</p>
            <Progress value={budgetSpentPercentage} className="mt-2 h-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Team Satisfaction</CardTitle>
            <Star className="w-4 h-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{team.satisfaction} / 5.0</div>
            <p className="text-xs text-muted-foreground">Based on internal surveys</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Team Members */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Team Members ({members.length})</CardTitle>
                    <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/>Add Member</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Utilization</TableHead>
                                <TableHead>Projects</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {members.map(member => (
                                <TableRow key={member.id}>
                                    <TableCell className="font-medium flex items-center space-x-3">
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={member.avatar} />
                                            <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                        </Avatar>
                                        <span>{member.name}</span>
                                    </TableCell>
                                    <TableCell>{member.role}</TableCell>
                                    <TableCell>{member.utilization}%</TableCell>
                                    <TableCell>{member.projects}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Associated Projects */}
            <Card>
                <CardHeader>
                    <CardTitle>Associated Projects</CardTitle>
                    <CardDescription>Projects this team is contributing to</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {teamProjects.map(project => {
                        const projectTeamMembers = members.filter(m => project.team.includes(m.name));
                        return (
                            <Card key={project.id} className="bg-muted/50">
                                <CardHeader>
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <CardTitle className="text-lg">{project.name}</CardTitle>
                                            <CardDescription>for {project.client}</CardDescription>
                                        </div>
                                        <Badge variant="secondary">{project.status}</Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span>Progress</span>
                                            <span className="font-semibold">{project.progress}%</span>
                                        </div>
                                        <Progress value={project.progress} />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-muted-foreground">Project Manager</p>
                                            <p className="font-medium">{project.manager}</p>
                                        </div>
                                        <div>
                                            <p className="text-muted-foreground">Timeline</p>
                                            <p className="font-medium">{new Date(project.endDate).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-muted-foreground text-sm">Team Contribution ({projectTeamMembers.length})</p>
                                        <div className="flex items-center space-x-2 mt-2">
                                            {projectTeamMembers.map(m => (
                                                <Avatar key={m.id} className="w-8 h-8">
                                                    <AvatarImage src={m.avatar} />
                                                    <AvatarFallback>{m.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                                </Avatar>
                                            ))}
                                        </div>
                                    </div>
                                    <Button size="sm" variant="outline" asChild className="mt-4">
                                        <Link to={`/dashboard/owner/projects/${project.id}`}>View Full Project</Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        )
                    })}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Team Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Utilization</span>
                        <span className="font-bold text-lg flex items-center">{team.utilization}% <Percent className="w-4 h-4 ml-1"/></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Avg. Satisfaction</span>
                        <span className="font-bold text-lg flex items-center">{team.satisfaction} <Star className="w-4 h-4 ml-1"/></span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-muted-foreground">Completed Projects</span>
                        <span className="font-bold text-lg flex items-center">{teamProjects.filter(p => p.status === 'Completed').length} <Briefcase className="w-4 h-4 ml-1"/></span>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
};

export default OwnerTeamDetail;
