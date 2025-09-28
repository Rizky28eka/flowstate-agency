import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderKanban, Search, Plus, Filter, Calendar, Users } from "lucide-react";
import { useState } from "react";
import { projects } from "@/lib/mock-data";
import { Link } from "react-router-dom";

const ProjectManagerProjects = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const myProjects = projects.filter(p => p.manager === "Sarah Wilson" || p.manager === "Tom Rodriguez");

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-amber-100 text-amber-800";
      case "Review": return "bg-purple-100 text-purple-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Project Portfolio</h2>
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

      <Tabs defaultValue="grid" className="space-y-6">
        <TabsList>
          <TabsTrigger value="grid">Grid View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
        </TabsList>

        <TabsContent value="grid">
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search projects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {myProjects.map((project) => (
              <Link to={`/dashboard/project-manager/projects/${project.id}`} key={project.id}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{project.name}</CardTitle>
                        <CardDescription>{project.client}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
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
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="list">
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
                      <th className="text-left p-3 font-medium">Due Date</th>
                      <th className="text-left p-3 font-medium">Team</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myProjects.map((project) => (
                      <tr key={project.id} className="border-b hover:bg-muted/50">
                        <td className="p-3">
                          <Link to={`/dashboard/project-manager/projects/${project.id}`} className="font-medium hover:underline">
                            {project.name}
                          </Link>
                          <div className="text-sm text-muted-foreground">{project.client}</div>
                        </td>
                        <td className="p-3">
                          <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
                        </td>
                        <td className="p-3">
                          <div className="flex items-center space-x-2">
                            <Progress value={project.progress} className="w-20" />
                            <span className="text-sm">{project.progress}%</span>
                          </div>
                        </td>
                        <td className="p-3">{project.budget}</td>
                        <td className="p-3">{new Date(project.endDate).toLocaleDateString()}</td>
                        <td className="p-3">{project.team.length} members</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="kanban">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {["Planning", "In Progress", "Review", "Completed"].map((status) => (
              <div key={status} className="bg-muted/50 rounded-lg">
                <div className="p-4 border-b">
                  <h3 className="font-semibold">{status}</h3>
                  <p className="text-sm text-muted-foreground">
                    {myProjects.filter(p => p.status === status).length} projects
                  </p>
                </div>
                <div className="p-4 space-y-4">
                  {myProjects
                    .filter(project => project.status === status)
                    .map((project) => (
                      <Card key={project.id} className="bg-card hover:shadow-md transition-shadow cursor-grab">
                        <CardContent className="p-4">
                          <h4 className="font-medium text-sm mb-2">{project.name}</h4>
                          <p className="text-xs text-muted-foreground mb-3">{project.client}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-semibold">{project.progress}%</span>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3 text-muted-foreground" />
                              <span className="text-xs">{project.team.length}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};

export default ProjectManagerProjects;