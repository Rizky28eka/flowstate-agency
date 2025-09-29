import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Flag, LinkIcon } from "lucide-react";
import { Task } from "@/types";

interface TaskItemProps {
  task: Task;
  allTasks: Task[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "bg-green-100 text-green-800";
    case "In Progress": return "bg-blue-100 text-blue-800";
    case "In Review": return "bg-purple-100 text-purple-800";
    case "To Do": return "bg-gray-100 text-gray-800";
    default: return "bg-gray-100 text-gray-800";
  }
};

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "High": return "text-red-600";
    case "Medium": return "text-amber-600";
    case "Low": return "text-green-600";
    default: return "text-gray-600";
  }
};

export const TaskItem = ({ task, allTasks }: TaskItemProps) => {
  const subtasks = allTasks.filter((t) => t.parentId === task.id);
  const dependencies = task.dependsOn?.map(depId => allTasks.find(t => t.id === depId)).filter(Boolean) as Task[] || [];
  const isBlocked = dependencies.some(dep => dep.status !== "Completed");

  return (
    <Card className={`hover:shadow-md transition-shadow ${isBlocked ? 'opacity-50 cursor-not-allowed' : ''}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h4 className="font-semibold">{task.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">{task.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
            <span className={`text-sm font-medium ${getPriorityColor(task.priority)}`}>
              {task.priority}
            </span>
          </div>
        </div>

        {dependencies.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <LinkIcon className="w-3 h-3" />
              <span>Depends on:</span>
              {dependencies.map(dep => (
                <Badge key={dep.id} variant="outline">{dep.title}</Badge>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Due: {task.dueDate}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>{task.estimatedHours}h estimated</span>
            </div>
          </div>
          <Button variant="outline" size="sm" disabled={isBlocked}>
            {task.status === "Completed" ? "View" : "Work on Task"}
          </Button>
        </div>

        {subtasks.length > 0 && (
          <div className="ml-8 mt-4 space-y-4 border-l-2 border-dashed pl-4">
            {subtasks.map((subtask) => (
              <TaskItem key={subtask.id} task={subtask} allTasks={allTasks} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
