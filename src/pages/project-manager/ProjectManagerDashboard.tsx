import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { FolderKanban, Users, Clock, TriangleAlert as AlertTriangle, CheckCircle } from "lucide-react";
import { projects, tasks } from "@/lib/mock-data";

const ProjectManagerDashboard = () => {
  const navigate = useNavigate();

  // Assume the logged-in PM is 'Sarah Wilson' for this demo
  const currentPmName = 'Sarah Wilson';

  const { 
    myProjects, 
    myTasks, 
    teamMemberCount, 
    overdueTasks, 
    onTimeDeliveryRate, 
    upcomingDeadlines 
  } = useMemo(() => {
    const myProjects = projects.filter(p => p.manager === currentPmName);
    const myProjectIds = myProjects.map(p => p.id);
    const myTasks = tasks.filter(t => myProjectIds.includes(t.projectId));

    const uniqueTeamMembers = new Set();
    myProjects.forEach(p => {
      p.team.forEach(member => uniqueTeamMembers.add(member));
    });

    const overdueTasks = myTasks.filter(t => new Date(t.dueDate) < new Date() && t.status !== "Completed");

    const completedTasks = myTasks.filter(t => t.status === "Completed" && t.completedDate);
    const onTimeTasks = completedTasks.filter(t => new Date(t.completedDate) <= new Date(t.dueDate)).length;
    const onTimeRate = completedTasks.length > 0 ? (onTimeTasks / completedTasks.length) * 100 : 100;

    const upcomingDeadlines = myProjects.filter(p => {
      const daysUntilDeadline = Math.ceil((new Date(p.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
      return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
    });

    return {
      myProjects,
      myTasks,
      teamMemberCount: uniqueTeamMembers.size,
      overdueTasks,
      onTimeDeliveryRate: onTimeRate,
      upcomingDeadlines
    };
  }, [currentPmName]);

  return (
    <>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">My Projects</CardTitle>
            <FolderKanban className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{myProjects.length}</div>
            <p className="text-xs text-muted-foreground">{myProjects.filter(p => p.status === "In Progress").length} active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamMemberCount}</div>
            <p className="text-xs text-muted-foreground">Across my projects</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overdue Tasks</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{overdueTasks.length}</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{onTimeDeliveryRate.toFixed(0)}%</div>
            <p className="text-xs text-muted-foreground">This quarter</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Active Projects */}
        <Card>
          <CardHeader>
            <CardTitle>Active Projects</CardTitle>
            <CardDescription>Projects currently under your management</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {myProjects.filter(p => p.status !== "Completed").map((project) => (
                <div key={project.id} className="border rounded-lg p-4 cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/project/${project.id}`)}>
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-medium">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'Review' ? 'bg-purple-100 text-purple-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Due: {new Date(project.endDate).toLocaleDateString()}</span>
                      <span>{project.team.length} team members</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines & Overdoses</CardTitle>
            <CardDescription>Projects and tasks that need attention.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingDeadlines.map((project) => {
                const daysLeft = Math.ceil((new Date(project.endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                return (
                  <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg cursor-pointer hover:bg-muted/50" onClick={() => navigate(`/project/${project.id}`)}>
                    <div>
                      <p className="font-medium">{project.name}</p>
                      <p className="text-sm text-muted-foreground">{project.client}</p>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${daysLeft <= 3 ? 'text-red-600' : 'text-amber-600'}`}>
                        {daysLeft} days left
                      </p>
                      <p className="text-xs text-muted-foreground">{project.progress}% complete</p>
                    </div>
                  </div>
                );
              })}
              
              {overdueTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50 cursor-pointer hover:bg-red-50/50" onClick={() => navigate(`/project/${task.projectId}/tasks`)}>
                  <div>
                    <p className="font-medium text-red-800">{task.title}</p>
                    <p className="text-sm text-red-600">Overdue since {task.dueDate}</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Review
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

export default ProjectManagerDashboard;