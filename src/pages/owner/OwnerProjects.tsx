import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, Search, Plus, Filter, Calendar, DollarSign, Users, Clock, Eye, MoveHorizontal as MoreHorizontal } from "lucide-react";
import { RoleSidebar } from "@/components/RoleSidebar";
import { useState } from "react";

const OwnerProjects = () => {
  const [currentPath, setCurrentPath] = useState("/projects");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleNavigate = (path: string) => {
    setCurrentPath(path);
    console.log("Navigate to:", path);
  };

  const projects = [
    {
      id: "PRJ-001",
      name: "TechCorp Brand Redesign",
      client: "TechCorp Inc.",
      status: "In Progress",
      priority: "High",
      progress: 75,
      budget: "$45,000",
      spent: "$33,750",
      startDate: "2024-10-15",
      endDate: "2024-12-15",
      team: ["Sarah W.", "Mike J.", "Emma D."],
      manager: "Sarah Wilson",
      description: "Complete brand identity redesign including logo, guidelines, and marketing materials"
    },
    {
      id: "PRJ-002", 
      name: "E-commerce Platform",
      client: "RetailBrand Co.",
      status: "Planning",
      priority: "Medium",
      progress: 25,
      budget: "$85,000",
      spent: "$12,750",
      startDate: "2024-11-01",
      endDate: "2025-02-28",
      team: ["Tom R.", "Lisa K.", "Alex C.", "Maria L."],
      manager: "Tom Rodriguez",
      description: "Full e-commerce website development with custom CMS and payment integration"
    },
    {
      id: "PRJ-003",
      name: "Mobile App UI/UX",
      client: "FinanceApp Ltd.",
      status: "Review",
      priority: "High",
      progress: 90,
      budget: "$32,000",
      spent: "$28,800",
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      team: ["David K.", "Sophie T."],
      manager: "David Kim",
      description: "Complete mobile application interface design and user experience optimization"
    },
    {
      id: "PRJ-004",
      name: "Marketing Campaign",
      client: "StartupXYZ",
      status: "Completed",
      priority: "Low",
      progress: 100,
      budget: "$25,000",
      spent: "$24,200",
      startDate: "2024-08-15",
      endDate: "2024-10-15",
      team: ["James W.", "Anna B."],
      manager: "James Wilson",
      description: "Digital marketing campaign including social media, content creation, and advertising"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-amber-100 text-amber-800";
      case "Review": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-green-100 text-green-800";
      case "On Hold": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
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
                <FolderKanban className="w-8 h-8 text-primary" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">All Projects</h1>
                  <p className="text-sm text-muted-foreground">Comprehensive project overview and management</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  New Project
                </Button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-6 py-8 overflow-auto">
          {/* Project Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
                <FolderKanban className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">47</div>
                <p className="text-xs text-muted-foreground">+3 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                <Clock className="h-4 w-4 text-amber-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <p className="text-xs text-muted-foreground">In progress</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Value</CardTitle>
                <DollarSign className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1.2M</div>
                <p className="text-xs text-muted-foreground">Combined project value</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Team Utilization</CardTitle>
                <Users className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">87%</div>
                <p className="text-xs text-muted-foreground">Average across teams</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="planning">Planning</SelectItem>
                <SelectItem value="in-progress">In Progress</SelectItem>
                <SelectItem value="review">Review</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="on-hold">On Hold</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Tabs defaultValue="grid" className="space-y-6">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
              <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
            </TabsList>

            <TabsContent value="grid" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <Card key={project.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="space-y-1">
                          <CardTitle className="text-lg">{project.name}</CardTitle>
                          <CardDescription>{project.client}</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="flex space-x-2">
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                        <Badge className={getPriorityColor(project.priority)}>
                          {project.priority}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground line-clamp-2">
                          {project.description}
                        </p>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{project.progress}%</span>
                          </div>
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full" 
                              style={{ width: `${project.progress}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <p className="text-muted-foreground">Budget</p>
                            <p className="font-medium">{project.budget}</p>
                          </div>
                          <div>
                            <p className="text-muted-foreground">Spent</p>
                            <p className="font-medium">{project.spent}</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Users className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {project.team.length} members
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Calendar className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm text-muted-foreground">
                              {new Date(project.endDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Eye className="w-4 h-4 mr-2" />
                            View
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

            <TabsContent value="list" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project List</CardTitle>
                  <CardDescription>Detailed project information in table format</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Project</th>
                          <th className="text-left p-2">Client</th>
                          <th className="text-left p-2">Status</th>
                          <th className="text-left p-2">Progress</th>
                          <th className="text-left p-2">Budget</th>
                          <th className="text-left p-2">Manager</th>
                          <th className="text-left p-2">Due Date</th>
                          <th className="text-left p-2">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {projects.map((project) => (
                          <tr key={project.id} className="border-b hover:bg-muted/50">
                            <td className="p-2">
                              <div>
                                <p className="font-medium">{project.name}</p>
                                <p className="text-sm text-muted-foreground">{project.id}</p>
                              </div>
                            </td>
                            <td className="p-2">{project.client}</td>
                            <td className="p-2">
                              <Badge className={getStatusColor(project.status)}>
                                {project.status}
                              </Badge>
                            </td>
                            <td className="p-2">
                              <div className="flex items-center space-x-2">
                                <div className="w-16 bg-secondary rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${project.progress}%` }}
                                  ></div>
                                </div>
                                <span className="text-sm">{project.progress}%</span>
                              </div>
                            </td>
                            <td className="p-2">
                              <div>
                                <p className="font-medium">{project.budget}</p>
                                <p className="text-sm text-muted-foreground">{project.spent} spent</p>
                              </div>
                            </td>
                            <td className="p-2">{project.manager}</td>
                            <td className="p-2">{new Date(project.endDate).toLocaleDateString()}</td>
                            <td className="p-2">
                              <div className="flex space-x-1">
                                <Button variant="ghost" size="sm">
                                  <Eye className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="kanban" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {["Planning", "In Progress", "Review", "Completed"].map((status) => (
                  <Card key={status}>
                    <CardHeader>
                      <CardTitle className="text-sm font-medium">{status}</CardTitle>
                      <CardDescription>
                        {projects.filter(p => p.status === status).length} projects
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {projects
                          .filter(project => project.status === status)
                          .map((project) => (
                            <div key={project.id} className="p-3 border rounded-lg bg-card hover:shadow-md transition-shadow cursor-pointer">
                              <h4 className="font-medium text-sm mb-1">{project.name}</h4>
                              <p className="text-xs text-muted-foreground mb-2">{project.client}</p>
                              <div className="flex items-center justify-between">
                                <Badge className={getPriorityColor(project.priority)} variant="secondary">
                                  {project.priority}
                                </Badge>
                                <span className="text-xs text-muted-foreground">
                                  {project.progress}%
                                </span>
                              </div>
                            </div>
                          ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default OwnerProjects;