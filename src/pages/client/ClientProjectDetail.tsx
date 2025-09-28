import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Users, MessageSquare, Download, CheckCircle, Clock } from "lucide-react";

const ClientProjectDetail = () => {
  const { id } = useParams();
  
  // Mock project data for client view
  const project = {
    id: "PRJ-001",
    name: "Website Redesign",
    description: "Complete website overhaul with modern design and improved user experience",
    status: "In Progress",
    progress: 75,
    startDate: "2024-10-15",
    endDate: "2024-12-15",
    manager: "Sarah Wilson",
    team: [
      { name: "Sarah Wilson", role: "Project Manager", avatar: "/api/placeholder/40/40" },
      { name: "Lisa Chen", role: "UI/UX Designer", avatar: "/api/placeholder/40/40" },
      { name: "Mike Johnson", role: "Developer", avatar: "/api/placeholder/40/40" },
      { name: "Alex Thompson", role: "Developer", avatar: "/api/placeholder/40/40" }
    ],
    phase: "Development",
    deliverables: [
      { name: "Wireframes", status: "Completed", date: "2024-11-01" },
      { name: "Visual Designs", status: "Completed", date: "2024-11-15" },
      { name: "Frontend Development", status: "In Progress", date: "2024-12-10" },
      { name: "Backend Integration", status: "Pending", date: "2024-12-20" },
      { name: "Testing & QA", status: "Pending", date: "2024-12-25" }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-100 text-green-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Pending": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <p className="text-muted-foreground mt-1">{project.description}</p>
          <Badge className="mt-2 bg-blue-100 text-blue-800">{project.status}</Badge>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline">
            <MessageSquare className="w-4 h-4 mr-2" />
            Message Team
          </Button>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Download Files
          </Button>
        </div>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-2">{project.progress}%</div>
            <Progress value={project.progress} />
            <p className="text-xs text-muted-foreground mt-2">Current phase: {project.phase}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              <p className="text-sm"><strong>Started:</strong> {new Date(project.startDate).toLocaleDateString()}</p>
              <p className="text-sm"><strong>Due:</strong> {new Date(project.endDate).toLocaleDateString()}</p>
              <p className="text-xs text-muted-foreground">
                {Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Project Team</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex -space-x-2">
              {project.team.slice(0, 4).map((member, index) => (
                <Avatar key={index} className="w-8 h-8 border-2 border-white">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-2">{project.team.length} team members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Deliverables */}
        <Card>
          <CardHeader>
            <CardTitle>Project Deliverables</CardTitle>
            <CardDescription>Key milestones and deliverables</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.deliverables.map((deliverable, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    {deliverable.status === "Completed" ? (
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    ) : deliverable.status === "In Progress" ? (
                      <Clock className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Clock className="w-5 h-5 text-gray-400" />
                    )}
                    <div>
                      <p className="font-medium">{deliverable.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {deliverable.status === "Completed" ? "Completed" : "Due"}: {new Date(deliverable.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getStatusColor(deliverable.status)}>{deliverable.status}</Badge>
                    {deliverable.status === "Completed" && (
                      <Button variant="outline" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Team & Communication */}
        <Card>
          <CardHeader>
            <CardTitle>Project Team</CardTitle>
            <CardDescription>Your dedicated project team</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.team.map((member, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{member.name}</p>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <MessageSquare className="w-3 h-3 mr-1" />
                    Message
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ClientProjectDetail;