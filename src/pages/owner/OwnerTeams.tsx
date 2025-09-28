
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, UserPlus, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Clock, Target, BarChart3, CheckCircle } from "lucide-react";
import { useState } from "react";
import { departments, teamMembers } from "@/lib/mock-data";
import { Progress } from "@/components/ui/progress";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid } from "recharts";

const OwnerTeams = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-500";
    if (utilization >= 75) return "text-green-500";
    return "text-amber-500";
  };

  const filteredTeamMembers = teamMembers.filter(member => {
    const searchTermLower = searchTerm.toLowerCase();
    return searchTermLower === "" ||
      member.name.toLowerCase().includes(searchTermLower) ||
      member.role.toLowerCase().includes(searchTermLower) ||
      member.email.toLowerCase().includes(searchTermLower);
  });

  const avgUtilization = (teamMembers.reduce((sum, member) => sum + member.utilization, 0) / teamMembers.length).toFixed(0);
  const avgSatisfaction = (teamMembers.reduce((sum, member) => sum + member.rating, 0) / teamMembers.length).toFixed(1);

  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMembers.length}</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Departments</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{departments.length}</div>
            <p className="text-xs text-muted-foreground">Fully operational</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgUtilization}%</div>
            <p className="text-xs text-muted-foreground">+2% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Satisfaction</CardTitle>
            <Award className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgSatisfaction}/5</div>
            <p className="text-xs text-muted-foreground">Latest survey results</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="space-y-6">
        <TabsList>
          <TabsTrigger value="departments">Departments</TabsTrigger>
          <TabsTrigger value="members">Team Members</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="org-chart">Org Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept) => (
                  <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{dept.name}</CardTitle>
                          <CardDescription className="mt-2 text-xs">{dept.description}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">Edit</Button>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div><p className="text-muted-foreground">Team Lead</p><p className="font-medium">{dept.lead}</p></div>
                            <div><p className="text-muted-foreground">Members</p><p className="font-medium">{dept.members} people</p></div>
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm"><span>Utilization</span><span className={getUtilizationColor(dept.utilization)}>{dept.utilization}%</span></div>
                            <Progress value={dept.utilization} />
                        </div>
                        <div className="flex items-center space-x-2 text-sm"><Award className="w-4 h-4 text-amber-500" /><span>Satisfaction: {dept.satisfaction}/5.0</span></div>
                    </CardContent>
                  </Card>
                ))}
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Department Size</CardTitle>
                    <CardDescription>Number of members per department</CardDescription>
                </CardHeader>
                <CardContent>
                    <ChartContainer className="h-80 w-full" config={{}}>
                        <BarChart data={departments} layout="vertical" margin={{ left: 20 }}>
                            <CartesianGrid horizontal={false} />
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" tickLine={false} axisLine={false} />
                            <ChartTooltip content={<ChartTooltipContent />} />
                            <Bar dataKey="members" fill="hsl(var(--primary) / 0.8)" radius={4} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="members" className="space-y-6">
          <div className="flex items-center space-x-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input placeholder="Search by name, role, or skill..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10"/>
            </div>
            <Button><UserPlus className="w-4 h-4 mr-2" /> Hire New Member</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTeamMembers.map((member) => (
              <Card key={member.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <CardTitle className="text-lg">{member.name}</CardTitle>
                      <CardDescription>{member.role}</CardDescription>
                      <Badge variant="secondary" className="mt-1">{member.department}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-1">
                      {member.skills.slice(0, 4).map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-xs">{skill}</Badge>
                      ))}
                    </div>
                    <div className="space-y-2 pt-2">
                        <div className="flex justify-between text-sm"><span>Utilization</span><span className={`font-medium ${getUtilizationColor(member.utilization)}`}>{member.utilization}%</span></div>
                        <Progress value={member.utilization} />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2"><CheckCircle className="w-4 h-4 text-green-500" /><span>{member.projects} Active Projects</span></div>
                        <div className="flex items-center space-x-2"><Award className="w-4 h-4 text-amber-500" /><span>Rating: {member.rating}/5.0</span></div>
                    </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Department Performance</CardTitle>
                <CardDescription>Productivity and satisfaction metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer className="h-80 w-full" config={{}}>
                    <BarChart data={departments} margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="utilization" fill="hsl(var(--primary) / 0.7)" name="Utilization %" />
                        <Bar dataKey="satisfaction" fill="hsl(var(--primary) / 0.4)" name="Satisfaction /5" />
                    </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Overall Team Metrics</CardTitle>
                <CardDescription>Key performance indicators for the entire team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="p-3 border rounded-lg flex justify-between items-center"><span>Avg. Utilization</span><span className="font-bold text-green-600">{avgUtilization}%</span></div>
                  <div className="p-3 border rounded-lg flex justify-between items-center"><span>Employee Satisfaction</span><span className="font-bold text-blue-600">{avgSatisfaction}/5.0</span></div>
                  <div className="p-3 border rounded-lg flex justify-between items-center"><span>Retention Rate</span><span className="font-bold text-purple-600">94.2%</span></div>
                  <div className="p-3 border rounded-lg flex justify-between items-center"><span>Avg. Training Hours/Month</span><span className="font-bold">12.5 hrs</span></div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="org-chart" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Organization Chart</CardTitle>
              <CardDescription>Company structure and reporting lines</CardDescription>
            </CardHeader>
            <CardContent className="p-10 flex justify-center overflow-x-auto">
                <div className="flex flex-col items-center space-y-8">
                    <div className="p-4 bg-primary/10 border-2 border-primary rounded-lg text-center">
                        <h3 className="font-bold text-primary">CEO / Owner</h3>
                    </div>
                    <div className="flex space-x-12">
                        {departments.map(dept => (
                            <div key={dept.id} className="flex flex-col items-center space-y-4">
                                <div className="w-px h-8 bg-muted-foreground"></div>
                                <div className="p-3 bg-secondary rounded-lg text-center w-40">
                                    <h4 className="font-semibold">{dept.name}</h4>
                                    <p className="text-xs text-muted-foreground">{dept.lead}</p>
                                </div>
                                <div className="w-px h-4 bg-muted-foreground"></div>
                                <div className="text-sm text-muted-foreground">{dept.members} members</div>
                            </div>
                        ))}
                    </div>
                </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default OwnerTeams;
