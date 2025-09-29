import {
  teamMembers,
  tasks,
  projects,
  timeEntries
} from './mock-data';

// --- INTERFACES ---

export interface PerformanceKPIs {
  avgUtilization: number;
  completedTasks: number;
  financialContribution: number; // Total revenue generated from billable hours
  avgProjectRating: number; // Mocked data
}

export interface ProjectHistoryItem {
  projectId: string;
  projectName: string;
  status: string;
  employeeRole?: string; // Role in that specific project
}

export interface PerformanceReview {
  id: string;
  date: string;
  reviewer: string;
  summary: string;
  rating: number;
}

export interface EmployeeProfile {
  id: number;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  location: string;
  joinDate: string;
  status: string;
  avatar: string;
  skills: string[];
  kpis: PerformanceKPIs;
  projectHistory: ProjectHistoryItem[];
  performanceReviews: PerformanceReview[];
  assignedTasks: (typeof tasks)[0][];
}

// --- LOGIC ---

/**
 * Fetches and assembles all performance and historical data for a specific employee.
 */
export const getEmployeeProfile = (employeeId: number): EmployeeProfile | null => {
  const member = teamMembers.find(m => m.id === employeeId);
  if (!member) return null;

  // 1. Aggregate data
  const memberTasks = tasks.filter(t => t.assignedTo === member.name);
  const memberTimeEntries = timeEntries.filter(t => t.employeeId === member.id);
  const memberProjects = projects.filter(p => p.team.includes(member.name));

  // 2. Calculate KPIs
  const completedTasks = memberTasks.filter(t => t.status === 'Completed').length;
  const financialContribution = memberTimeEntries
    .filter(t => t.billable)
    .reduce((sum, entry) => sum + (entry.hours * entry.hourlyRate), 0);

  const kpis: PerformanceKPIs = {
    avgUtilization: member.utilization, // Using the static value from mock data for simplicity
    completedTasks,
    financialContribution,
    avgProjectRating: 4.7, // Mocked value
  };

  // 3. Format Project History
  const projectHistory: ProjectHistoryItem[] = memberProjects.map(p => ({
    projectId: p.id,
    projectName: p.name,
    status: p.status,
  }));

  // 4. Generate Mock Performance Reviews
  const performanceReviews: PerformanceReview[] = [
    {
      id: 'REV-1', date: '2024-09-01', reviewer: 'Sarah Wilson', rating: 4.8,
      summary: 'Excellent performance in Q3. Consistently delivers high-quality work ahead of schedule. A key team player.'
    },
    {
      id: 'REV-2', date: '2024-03-01', reviewer: 'Sarah Wilson', rating: 4.5,
      summary: 'Great progress in Q1. Shows strong potential for leadership. Could improve on providing proactive updates.'
    },
  ];

  // 5. Assemble final profile object
  return {
    id: member.id,
    name: member.name,
    role: member.role,
    department: member.department,
    email: member.email,
    phone: member.phone,
    location: member.location,
    joinDate: member.joinDate,
    status: member.status,
    avatar: member.avatar,
    skills: member.skills,
    kpis,
    projectHistory,
    performanceReviews,
    assignedTasks: memberTasks,
  };
};
