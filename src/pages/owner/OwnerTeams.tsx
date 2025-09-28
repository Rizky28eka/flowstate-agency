import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Search, Plus, UserPlus, Mail, Phone, MapPin, Calendar, Award, TrendingUp, Clock, Target } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";

const OwnerTeams = () => {
  const [currentPath, setCurrentPath] = useState("/teams");
  const [searchTerm, setSearchTerm] = useState("");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  const departments = [
    {
      id: "creative",
      name: "Creative Team",
      description: "Brand design, visual identity, and creative direction",
      members: 12,
      lead: "Sarah Wilson",
      utilization: 87,
      satisfaction: 4.6,
      projects: 18,
      budget: "$450,000"
    },
    {
      id: "development",
      name: "Development Team", 
      description: "Web development, mobile apps, and technical solutions",
      members: 8,
      lead: "Mike Johnson",
      utilization: 92,
      satisfaction: 4.4,
      projects: 15,
      budget: "$380,000"
    },
    {
      id: "strategy",
      name: "Strategy Team",
      description: "Business strategy, market research, and consulting",
      members: 5,
      lead: "Emma Davis",
      utilization: 78,
      satisfaction: 4.8,
      projects: 8,
      budget: "$220,000"
    },
    {
      id: "account",
      name: "Account Management",
      description: "Client relationships, project coordination, and business development",
      members: 7,
      lead: "Tom Rodriguez",
      utilization: 85,
      satisfaction: 4.5,
      projects: 12,
      budget: "$280,000"
    }
  ];

  const teamMembers = [
    {
      id: 1,
      name: "Sarah Wilson",
      role: "Creative Director",
      department: "Creative Team",
      email: "sarah.wilson@agencyflow.com",
      phone: "+1 (555) 123-4567",
      location: "New York, NY",
      joinDate: "2022-01-15",
      status: "Active",
      utilization: 89,
      projects: 4,
      rating: 4.8,
      skills: ["Brand Design", "Art Direction", "Team Leadership"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 2,
      name: "Mike Johnson",
      role: "Lead Developer",
      department: "Development Team",
      email: "mike.johnson@agencyflow.com",
      phone: "+1 (555) 234-5678",
      location: "San Francisco, CA",
      joinDate: "2021-08-20",
      status: "Active",
      utilization: 95,
      projects: 3,
      rating: 4.6,
      skills: ["React", "Node.js", "System Architecture"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 3,
      name: "Emma Davis",
      role: "Strategy Lead",
      department: "Strategy Team",
      email: "emma.davis@agencyflow.com",
      phone: "+1 (555) 345-6789",
      location: "Chicago, IL",
      joinDate: "2022-03-10",
      status: "Active",
      utilization: 82,
      projects: 2,
      rating: 4.9,
      skills: ["Business Strategy", "Market Research", "Data Analysis"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 4,
      name: "Tom Rodriguez",
      role: "Account Director",
      department: "Account Management",
      email: "tom.rodriguez@agencyflow.com",
      phone: "+1 (555) 456-7890",
      location: "Austin, TX",
      joinDate: "2021-11-05",
      status: "Active",
      utilization: 88,
      projects: 5,
      rating: 4.7,
      skills: ["Client Relations", "Project Management", "Business Development"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 5,
      name: "Lisa Chen",
      role: "Senior Designer",
      department: "Creative Team",
      email: "lisa.chen@agencyflow.com",
      phone: "+1 (555) 567-8901",
      location: "Los Angeles, CA",
      joinDate: "2022-06-12",
      status: "Active",
      utilization: 91,
      projects: 3,
      rating: 4.5,
      skills: ["UI/UX Design", "Prototyping", "Design Systems"],
      avatar: "/api/placeholder/40/40"
    },
    {
      id: 6,
      name: "Alex Thompson",
      role: "Full Stack Developer",
      department: "Development Team",
      email: "alex.thompson@agencyflow.com",
      phone: "+1 (555) 678-9012",
      location: "Seattle, WA",
      joinDate: "2023-02-28",
      status: "Active",
      utilization: 87,
      projects: 2,
      rating: 4.4,
      skills: ["JavaScript", "Python", "Database Design"],
      avatar: "/api/placeholder/40/40"
    }
  ];

  const getUtilizationColor = (utilization: number) => {
    if (utilization >= 90) return "text-red-600";
    if (utilization >= 80) return "text-green-600";
    if (utilization >= 70) return "text-amber-600";
    return "text-gray-600";
  };

  return (
    <div className="min-h-screen bg-background flex">
      <RoleSidebar 
        role="OWNER" 
        currentPath={currentPath}
        onNavigate={handleNavigate}
      />

      <div className="flex-1 flex flex-col">
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Team Management</h1>
                  <p className="text-sm text-muted-foreground">Manage departments, team members, and performance</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Invite Member
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Department
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 overflow-auto">
          {/* Team Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Team Members</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">32</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Departments</CardTitle>
                <Target className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4</div>
                <p className="text-xs text-muted-foreground">Fully operational</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Avg Utilization</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">86%</div>
                <p className="text-xs text-muted-foreground">+2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Satisfaction</CardTitle>
                <Award className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">4.6/5</div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {departments.map((dept) => (
                  <Card key={dept.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-xl">{dept.name}</CardTitle>
                          <CardDescription className="mt-2">{dept.description}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Team Lead</p>
                            <p className="font-medium">{dept.lead}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Members</p>
                            <p className="font-medium">{dept.members} people</p>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-muted-foreground">Active Projects</p>
                            <p className="font-medium">{dept.projects}</p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Annual Budget</p>
                            <p className="font-medium">{dept.budget}</p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Utilization</span>
                            <span className={getUtilizationColor(dept.utilization)}>
                              {dept.utilization}%
                            </span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${dept.utilization}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Award className="w-4 h-4 text-amber-600" />
                            <span className="text-sm">Satisfaction: {dept.satisfaction}/5.0</span>
                          </div>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="members" className="space-y-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    placeholder="Search team members..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button variant="outline">Filter</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member) => (
                  <Card key={member.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start space-x-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback>
                            {member.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                          <Badge variant="secondary" className="mt-1">
                            {member.department}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Mail className="w-4 h-4" />
                          <span>{member.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          <span>{member.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          <span>{member.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>Joined {new Date(member.joinDate).toLocaleDateString()}</span>
                        </div>

                        <div className="grid grid-cols-2 gap-4 pt-2">
                          <div>
                            <p className="text-sm text-muted-foreground">Utilization</p>
                            <p className={`font-medium ${getUtilizationColor(member.utilization)}`}>
                              {member.utilization}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Projects</p>
                            <p className="font-medium">{member.projects}</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Award className="w-4 h-4 text-amber-600" />
                          <span className="text-sm">Rating: {member.rating}/5.0</span>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map((skill, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>

                        <div className="flex space-x-2 pt-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            View Profile
                          </Button>
                          <Button size="sm" className="flex-1">
                            Edit
                          </Button>
                        </div>
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
                    <CardDescription>Productivity and efficiency metrics by department</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {departments.map((dept) => (
                        <div key={dept.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-medium">{dept.name}</h4>
                            <span className="text-sm text-muted-foreground">
                              {dept.members} members
                            </span>
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <p className="text-muted-foreground">Utilization</p>
                              <p className={`font-medium ${getUtilizationColor(dept.utilization)}`}>
                                {dept.utilization}%
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Satisfaction</p>
                              <p className="font-medium">{dept.satisfaction}/5.0</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Projects</p>
                              <p className="font-medium">{dept.projects}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Team Metrics</CardTitle>
                    <CardDescription>Overall team performance indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Average Utilization</span>
                        <span className="font-bold text-green-600">86%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Employee Satisfaction</span>
                        <span className="font-bold text-blue-600">4.6/5.0</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Retention Rate</span>
                        <span className="font-bold text-purple-600">94.2%</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Training Hours/Month</span>
                        <span className="font-bold">12.5 hrs</span>
                      </div>
                      <div className="flex justify-between items-center p-3 border rounded-lg">
                        <span>Internal Promotions</span>
                        <span className="font-bold text-green-600">23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="org-chart" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Organization Chart</CardTitle>
                  <CardDescription>Company structure and reporting relationships</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-96 bg-muted/30 rounded-lg flex items-center justify-center">
                    <p className="text-muted-foreground">Organization Chart Visualization</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default OwnerTeams;