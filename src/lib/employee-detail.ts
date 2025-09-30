import { teamMembers, projects, tasks } from './mock-data';

export interface PerformanceReview {
  id: string;
  reviewer: string;
  date: string;
  rating: number; // out of 5
  summary: string;
}

// Get the type of a single element from the arrays
type TeamMember = (typeof teamMembers)[0];
type Project = (typeof projects)[0];
type Task = (typeof tasks)[0];

export interface EmployeeDetails extends TeamMember {
  kpis: {
    activeProjects: number;
    tasksCompleted: number;
    avgUtilization: number; // percentage
  };
  assignedProjects: Project[];
  recentActivity: Task[];
  performanceHistory: PerformanceReview[];
}

// --- MOCK DATA GENERATION ---

const MOCK_PERFORMANCE_REVIEWS: Record<number, PerformanceReview[]> = {
  1: [ // Sarah Wilson
    { id: 'REV-001', reviewer: 'John Doe (Owner)', date: '2024-09-01', rating: 4.5, summary: 'Excellent work on the "Project Phoenix" launch. Proactive and great leadership.' },
    { id: 'REV-002', reviewer: 'John Doe (Owner)', date: '2024-03-15', rating: 4.2, summary: 'Consistently delivers high-quality results. Room for improvement in delegation.' },
  ],
  2: [ // Mike Johnson
    { id: 'REV-003', reviewer: 'Sarah Wilson (PM)', date: '2024-08-20', rating: 4.8, summary: 'Top-tier developer. Technical skills are a huge asset to the team.' },
  ],
  3: [ // David Chen
    { id: 'REV-004', reviewer: 'Sarah Wilson (PM)', date: '2024-08-22', rating: 4.0, summary: 'Great designer with a keen eye for detail. Improving on meeting deadlines.' },
  ],
};

export const getEmployeeDetails = (employeeId: number): EmployeeDetails | null => {
  const employee = teamMembers.find(m => m.id === employeeId);
  if (!employee) return null;

  const assignedProjects = projects.filter(p => p.team.includes(employee.name));
  const assignedTasks = tasks.filter(t => t.assignedTo === employee.name);

  const tasksCompleted = assignedTasks.filter(t => t.status === 'Completed').length;

  const totalAllocation = assignedProjects.reduce((acc, project) => {
      const tasksInProject = assignedTasks.filter(t => t.projectId === project.id);
      return acc + tasksInProject.reduce((taskAcc, task) => taskAcc + (task.estimatedHours || 0) / 4, 0);
  }, 0);
  const avgUtilization = (totalAllocation / 40) * 100; // Assuming 40h/week capacity

  return {
    ...employee,
    kpis: {
      activeProjects: assignedProjects.filter(p => p.status === 'In Progress').length,
      tasksCompleted,
      avgUtilization: Math.round(avgUtilization),
    },
    assignedProjects,
    recentActivity: assignedTasks.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime()).slice(0, 5),
    performanceHistory: MOCK_PERFORMANCE_REVIEWS[employeeId] || [],
  };
};