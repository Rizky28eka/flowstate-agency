import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { projects as initialProjects, tasks as initialTasks, teamMembers } from "@/lib/mock-data";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, DollarSign, Users, Clock, Target, CheckCircle, Edit, Trash2, Plus } from "lucide-react";

// --- Forms ---
const AddTaskForm = ({ onAddTask, projectId }) => {
  const [title, setTitle] = useState('');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = () => {
    if (!title || !assignedTo || !dueDate) return;
    const newTask = {
      id: `TSK-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
      title,
      projectId,
      assignedTo,
      status: 'To Do',
      priority: 'Medium',
      dueDate,
    };
    onAddTask(newTask);
  };

  return (
     <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">Task Title</Label>
        <Input id="title" value={title} onChange={e => setTitle(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="assignee" className="text-right">Assign To</Label>
        <Select onValueChange={setAssignedTo} defaultValue={assignedTo}>
          <SelectTrigger className="col-span-3"><SelectValue placeholder="Select a member" /></SelectTrigger>
          <SelectContent>{teamMembers.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="due-date" className="text-right">Due Date</Label>
        <Input id="due-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="col-span-3" />
      </div>
      <DialogFooter>
        <DialogClose asChild><Button onClick={handleSubmit}>Add Task</Button></DialogClose>
      </DialogFooter>
    </div>
  );
};

const EditProjectForm = ({ project, onEditProject }) => {
    const [name, setName] = useState(project.name);
    const [description, setDescription] = useState(project.description);
    const [manager, setManager] = useState(project.manager);

    const handleSubmit = () => {
        onEditProject({ ...project, name, description, manager });
    };

    return (
        <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">Project Name</Label>
                <Input id="name" value={name} onChange={e => setName(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">Description</Label>
                <Textarea id="description" value={description} onChange={e => setDescription(e.target.value)} className="col-span-3" />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="manager" className="text-right">Project Manager</Label>
                <Select onValueChange={setManager} defaultValue={manager}>
                    <SelectTrigger className="col-span-3"><SelectValue /></SelectTrigger>
                    <SelectContent>{teamMembers.map(m => <SelectItem key={m.id} value={m.name}>{m.name}</SelectItem>)}</SelectContent>
                </Select>
            </div>
            <DialogFooter>
                <DialogClose asChild><Button onClick={handleSubmit}>Save Changes</Button></DialogClose>
            </DialogFooter>
        </div>
    );
};

// --- Main Component ---
const OwnerProjectDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(initialProjects.find(p => p.id === id));
  const [tasks, setTasks] = useState(initialTasks.filter(t => t.projectId === id));

  useEffect(() => {
    // In a real app, you'd fetch data here based on ID.
    const foundProject = initialProjects.find(p => p.id === id);
    const foundTasks = initialTasks.filter(t => t.projectId === id);
    setProject(foundProject);
    setTasks(foundTasks);
  }, [id]);

  if (!project) {
    return <div className="p-8">Project not found.</div>;
  }

  const handleAddTask = (newTask) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleEditProject = (updatedProject) => {
    setProject(updatedProject);
  };

  const handleDeleteProject = () => {
    console.log(`Project ${id} deleted!`); // In a real app, this would be an API call.
    navigate("/dashboard/owner/projects");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Planning": return "bg-blue-100 text-blue-800";
      case "In Progress": return "bg-amber-100 text-amber-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-amber-100 text-amber-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  return (
    <main className="flex-1 px-6 py-8 bg-background">
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
            <Dialog><DialogTrigger asChild><Button variant="outline"><Edit className="w-4 h-4 mr-2"/> Edit Project</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Edit Project</DialogTitle></DialogHeader><EditProjectForm project={project} onEditProject={handleEditProject} /></DialogContent></Dialog>
            <AlertDialog>
              <AlertDialogTrigger asChild><Button variant="destructive"><Trash2 className="w-4 h-4 mr-2"/> Delete Project</Button></AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader><AlertDialogTitle>Are you sure?</AlertDialogTitle><AlertDialogDescription>This action cannot be undone. This will permanently delete the project.</AlertDialogDescription></AlertDialogHeader>
                <AlertDialogFooter><AlertDialogCancel>Cancel</AlertDialogCancel><AlertDialogAction onClick={handleDeleteProject}>Delete</AlertDialogAction></AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
        </div>
      </div>

      {/* Key Metrics & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader><CardTitle>Project Description</CardTitle></CardHeader>
                <CardContent><p className="text-muted-foreground">{project.description}</p></CardContent>
            </Card>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Tasks ({tasks.length})</CardTitle>
                    <Dialog><DialogTrigger asChild><Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/>Add Task</Button></DialogTrigger><DialogContent><DialogHeader><DialogTitle>Add New Task</DialogTitle></DialogHeader><AddTaskForm onAddTask={handleAddTask} projectId={project.id} /></DialogContent></Dialog>
                </CardHeader>
                <CardContent className="space-y-4">
                    {tasks.map(task => (
                        <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div><p className="font-medium">{task.title}</p><p className="text-sm text-muted-foreground">Assigned to: {task.assignedTo}</p></div>
                            <div className="text-right"><p className="text-sm font-semibold">{task.priority}</p><p className="text-xs text-muted-foreground">Due: {task.dueDate}</p></div>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        {/* Team & Info */}
        <div className="space-y-8">
            <Card>
                <CardHeader><CardTitle>Team Members</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {project.team.map(name => {
                        const member = teamMembers.find(m => m.name === name);
                        return (
                            <div key={name} className="flex items-center space-x-3">
                                <Avatar className="w-9 h-9"><AvatarFallback>{name.split(' ').map(n => n[0]).join('')}</AvatarFallback></Avatar>
                                <div><p className="font-semibold">{name}</p><p className="text-sm text-muted-foreground">{member?.role}</p></div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Budget</CardTitle></CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold">{project.budget}</div>
                    <p className="text-xs text-muted-foreground">{project.spent} spent</p>
                    <Progress value={(parseFloat(project.spent.replace(/[^\d.-]/g, '')) / parseFloat(project.budget.replace(/[^\d.-]/g, ''))) * 100} className="mt-2"/>
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
