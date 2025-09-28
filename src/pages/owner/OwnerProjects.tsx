
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FolderKanban, Search, Plus, Filter, Calendar, DollarSign, Users, Clock, Eye, MoveHorizontal as MoreHorizontal, GanttChartSquare } from "lucide-react";
import { useState } from "react";
import { projects } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "react-router-dom";

const OwnerProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

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

  const filteredProjects = projects.filter(project => {
    const searchTermLower = searchTerm.toLowerCase();
    const matchesSearch = searchTermLower === "" ||
      project.name.toLowerCase().includes(searchTermLower) ||
      project.client.toLowerCase().includes(searchTermLower) ||
      project.manager.toLowerCase().includes(searchTermLower);

    const matchesStatus = statusFilter === "all" || 
      project.status.toLowerCase() === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      {/* Project Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredProjects.length}</div>
            <p className="text-xs text-muted-foreground">matching current filters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projects.filter(p => p.status === "In Progress").length}</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${projects.reduce((sum, project) => sum + parseFloat(project.budget.replace(/[^0-9.-]+/g," ")), 0).toLocaleString()}</div>
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
            placeholder="Search by name, client, manager..."
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
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Create Project
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription>Fill in the details below to create a new project.</DialogDescription>
            </DialogHeader>
            {/* Add form here */}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="grid" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="grid" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => (
              <Link to={`/projects/${project.id}`} key={project.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer flex flex-col h-full">
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
                    <div className="flex space-x-2 pt-2">
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                      <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-1 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                      {project.description}
                    </p>
                    
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <Progress value={project.progress} />
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

                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <div className="flex items-center space-x-2">
                          <Users className="w-4 h-4" />
                          <span>{project.team.length} members</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(project.endDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list" className="space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted/50">
                    <tr className="border-b">
                      <th className="text-left p-3 font-medium">Project</th>
                      <th className="text-left p-3 font-medium">Status</th>
                      <th className="text-left p-3 font-medium">Progress</th>
                      <th className="text-left p-3 font-medium">Budget</th>
                      <th className="text-left p-3 font-medium">Manager</th>
                      <th className="text-left p-3 font-medium">Due Date</th>
                      <th className="text-right p-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredProjects.map((project) => (
                      <tr key={project.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <Link to={`/projects/${project.id}`} className="font-medium hover:underline">{project.name}</Link>
                          <div className="text-sm text-muted-foreground">{project.client}</div>
                        </td>
                        <td className="p-3"><Badge className={getStatusColor(project.status)}>{project.status}</Badge></td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Progress value={project.progress} className="w-24" />
                            <span className="text-sm text-muted-foreground">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3">
                          <div className="font-medium">{project.budget}</div>
                          <div className="text-sm text-muted-foreground">{project.spent} spent</div>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Avatar className="w-6 h-6">
                              <AvatarFallback>{project.manager.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span>{project.manager}</span>
                          </div>
                        </td>
                        <td className="p-3">{new Date(project.endDate).toLocaleDateString()}</td>
                        <td className="p-3 text-right">
                          <Button variant="ghost" size="sm"><MoreHorizontal className="w-4 h-4" /></Button>
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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
            {["Planning", "In Progress", "Review", "Completed"].map((status) => (
              <div key={status} className="bg-muted/50 rounded-lg">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">{status}</h3>
                  <p className="text-sm text-muted-foreground">
                    {filteredProjects.filter(p => p.status === status).length} projects
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  {filteredProjects
                    .filter(project => project.status === status)
                    .map((project) => (
                      <Card key={project.id} className="bg-card hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2">{project.name}</h4>
                          <p className="text-xs text-muted-foreground mb-3">{project.client}</p>
                          <div className="flex items-center justify-between mb-3">
                            <Badge className={getPriorityColor(project.priority)}>{project.priority}</Badge>
                            <span className="text-xs font-semibold">{project.progress}%</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                                <Users className="w-4 h-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{project.team.length}</span>
                            </div>
                            <Avatar className="w-6 h-6">
                              <AvatarFallback>{project.manager.charAt(0)}</AvatarFallback>
                            </Avatar>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Project Timeline</CardTitle>
                    <CardDescription>Visual overview of project durations and overlaps.</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="p-6 overflow-x-auto">
                        <div className="relative min-w-[800px]">
                            {/* Months header */}
                            <div className="flex border-b">
                                {["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"].map(m => 
                                    <div key={m} className="w-32 text-center py-2 font-medium text-sm border-r">{m} '24</div>
                                )}
                            </div>
                            {/* Projects */}
                            <div className="mt-4 space-y-3">
                                {filteredProjects.slice(0, 10).map((p, index) => {
                                    const startMonth = new Date(p.startDate).getMonth();
                                    const endMonth = new Date(p.endDate).getMonth();
                                    const duration = endMonth - startMonth + 1;
                                    return (
                                        <div key={p.id} className="relative h-10 flex items-center" style={{ top: `${index * 2.75}rem`}}>
                                            <div 
                                                className="absolute bg-primary/80 h-8 rounded-md flex items-center px-3"
                                                style={{ left: `${startMonth * 8}rem`, width: `${duration * 8}rem` }}
                                            >
                                                <p className="text-xs font-medium text-primary-foreground truncate">{p.name}</p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </main>
  );
};


export default OwnerProjects;
