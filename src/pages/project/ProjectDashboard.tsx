
import { useOutletContext } from "react-router-dom";
import type { Project } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, Flag, Users } from "lucide-react";

interface ProjectContext {
  project: Project;
}

const ProjectDashboard = () => {
  const { project } = useOutletContext<ProjectContext>();

  const stats = [
    { title: "Status", value: project.status, icon: <Flag className="h-4 w-4 text-muted-foreground" /> },
    { title: "Budget", value: project.budget, icon: <DollarSign className="h-4 w-4 text-muted-foreground" /> },
    { title: "Time Remaining", value: '25 Days', icon: <Clock className="h-4 w-4 text-muted-foreground" /> }, // Placeholder
    { title: "Team Size", value: project.team.length, icon: <Users className="h-4 w-4 text-muted-foreground" /> },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle>Project Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold">Description</h3>
              <p className="text-sm text-muted-foreground">{project.description}</p>
            </div>
            <div>
              <h3 className="font-semibold">Progress</h3>
              <div className="flex items-center gap-2">
                <Progress value={project.progress} className="w-[60%]" />
                <span className="text-sm font-medium">{project.progress}%</span>
              </div>
            </div>
            <div>
              <h3 className="font-semibold">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle>Team Members</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {project.team.map(memberName => (
              <div key={memberName} className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={`/api/placeholder/40/40`} />
                  <AvatarFallback>{memberName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{memberName}</p>
                  {/* Placeholder for role */}
                  <p className="text-sm text-muted-foreground">Developer</p> 
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProjectDashboard;
