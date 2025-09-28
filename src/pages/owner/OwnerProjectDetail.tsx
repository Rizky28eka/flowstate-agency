
import { useParams } from "react-router-dom";
import { projects, tasks, teamMembers } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, Users, Clock, Target, CheckCircle, Edit, Trash2, Plus } from "lucide-react";

const OwnerProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === id);
  const projectTasks = tasks.filter(t => t.projectId === id);

  if (!project) {
    return <div className="p-8">Project not found.</div>;
  }

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
    <main className="flex-1 px-6 py-8 overflow-auto bg-muted/20">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <div>
          <p className="text-sm text-muted-foreground">Project / {project.name}</p>
          <h1 className="text-3xl font-bold text-foreground mt-1">{project.name}</h1>
          <div className="flex items-center space-x-2 mt-2">
            <Badge className={getStatusColor(project.status)}>{project.status}</Badge>
            <Badge className={getPriorityColor(project.priority)}>{project.priority} Priority</Badge>
            <span className="text-sm text-muted-foreground">for {project.client}</span>
          </div>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
            <Button variant="outline"><Edit className="w-4 h-4 mr-2"/> Edit Project</Button>
            <Button variant="destructive"><Trash2 className="w-4 h-4 mr-2"/> Delete Project</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.progress}%</div>
            <Progress value={project.progress} className="mt-2"/>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Budget</CardTitle></CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{project.budget}</div>
            <p className="text-xs text-muted-foreground">{project.spent} spent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Timeline</CardTitle></CardHeader>
          <CardContent>
            <div className="text-lg font-bold">{new Date(project.startDate).toLocaleDateString()} - {new Date(project.endDate).toLocaleDateString()}</div>
            <p className="text-xs text-muted-foreground">Last updated: {project.lastUpdate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm font-medium">Project Manager</CardTitle></CardHeader>
          <CardContent className="flex items-center space-x-2">
            <Avatar className="w-8 h-8"><AvatarFallback>{project.manager.charAt(0)}</AvatarFallback></Avatar>
            <span className="font-semibold">{project.manager}</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <Card>
                <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{project.description}</p></CardContent>
            </Card>

            {/* Tasks */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tasks ({projectTasks.length})</CardTitle>
                    <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/>Add Task</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                    {projectTasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center space-x-3">
                                <CheckCircle className={`w-5 h-5 ${task.status === 'Completed' ? 'text-green-500' : 'text-muted-foreground'}`} />
                                <div>
                                    <p className="font-medium">{task.title}</p>
                                    <p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={`text-sm font-semibold ${task.priority === 'High' ? 'text-red-500' : ''}`}>{task.priority}</p>
                                <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                            </div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Team & Stakeholders */}
        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {project.team.map(name => {
                        const member = teamMembers.find(m => m.name === name);
                        return (
                            <div key={name} className="flex items-center space-x-3">
                                <Avatar className="w-9 h-9">
                                    {member && <AvatarImage src={member.avatar} />}
                                    <AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-semibold">{name}</p>
                                    <p className="text-sm text-muted-foreground">{member?.role}</p>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Tags</CardTitle></CardHeader>
                <CardContent className="flex flex-wrap gap-2">
                    {project.tags.map(tag => <Badge key={tag} variant="secondary">{tag}</Badge>)}
                </CardContent>
            </Card>
        </div>
      </div>
    </main>
  );
};

export default OwnerProjectDetail;
