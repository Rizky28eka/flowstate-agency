import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Eye, Calendar, Users, MessageSquare, Download } from "lucide-react";
import { Link } from "react-router-dom";

const ClientProjects = () => {
  const clientProjects = [
    {
      id: "PRJ-001",
      name: "Website Redesign",
      description: "Complete website overhaul with modern design and improved user experience",
      status: "In Progress",
      progress: 75,
      startDate: "2024-10-15",
      endDate: "2024-12-15",
      manager: "Sarah Wilson",
      team: 4,
      phase: "Development",
      nextMilestone: "Beta Testing",
      milestoneDate: "2024-12-10"
    },
    {
      id: "PRJ-002",
      name: "Brand Identity Refresh",
      description: "Updated brand guidelines, logo refinement, and marketing materials",
      status: "Review",
      progress: 90,
      startDate: "2024-09-01",
      endDate: "2024-11-30",
      manager: "Lisa Chen",
      team: 3,
      phase: "Final Review",
      nextMilestone: "Final Delivery",
      milestoneDate: "2024-12-12"
    },
    {
      id: "PRJ-003",
      name: "Mobile App Development",
      description: "Native mobile application for iOS and Android platforms",
      status: "Planning",
      progress: 25,
      startDate: "2024-11-01",
      endDate: "2025-03-01",
      manager: "Mike Johnson",
      team: 5,
      phase: "Requirements Gathering",
      nextMilestone: "Design Phase",
      milestoneDate: "2024-12-20"
    }
  ];

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
        <h2 className="text-2xl font-bold">My Projects</h2>
        <Button variant="outline">
          <MessageSquare className="w-4 h-4 mr-2" />
          Contact Team
        </Button>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{clientProjects.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
            <Calendar className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {clientProjects.filter(p => p.status === "In Progress").length}
            </div>
            <p className="text-xs text-muted-foreground">Active projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Progress</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {Math.round(clientProjects.reduce((sum, p) => sum + p.progress, 0) / clientProjects.length)}%
            </div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {clientProjects.reduce((sum, p) => sum + p.team, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Working on your projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientProjects.map((project) => (
          <Link to={`/dashboard/client/projects/${project.id}`} key={project.id}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg">{project.name}</CardTitle>
                    <CardDescription className="mt-2">{project.description}</CardDescription>
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
                  <p className="text-xs text-muted-foreground">Current phase: {project.phase}</p>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Project Manager</p>
                    <p className="font-medium">{project.manager}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Team Size</p>
                    <p className="font-medium">{project.team} members</p>
                  </div>
                </div>

                <div className="border-t pt-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs text-muted-foreground">Next Milestone</p>
                      <p className="font-medium text-sm">{project.nextMilestone}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">Due</p>
                      <p className="font-medium text-sm">{new Date(project.milestoneDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ClientProjects;