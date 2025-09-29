export interface Task {
  id: string;
  title: string;
  description: string;
  projectId: string;
  assignedTo: string;
  status: string;
  priority: string;
  dueDate: string;
  completedDate?: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  parentId: string | null;
  subtasks?: Task[];
  dependsOn?: string[];
}
