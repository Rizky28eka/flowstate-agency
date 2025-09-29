import { teamMembers, tasks } from './mock-data';

export interface MemberTask {
  id: string;
  taskName: string;
  projectName: string;
  dueDate: string;
  status: 'Completed' | 'In Progress' | 'To Do' | 'In Review';
}

export interface TeamMemberAllocation {
  id: number;
  name: string;
  avatar: string;
  role: string;
  capacity: number; // hours per week
  currentAllocation: number; // hours per week
  projects: { 
    projectId: string;
    projectName: string;
    allocatedHours: number;
  }[];
}

// --- MOCK DATA GENERATION ---

// Helper to calculate total allocated hours from tasks
const calculateAllocation = (memberId: number): number => {
  return tasks
    .filter(task => task.assignedTo === teamMembers.find(m => m.id === memberId)?.name && task.status !== 'Completed')
    .reduce((total, task) => total + (task.estimatedHours || 0) / 4, 0); // Assume tasks are for a month, so divide by 4 for weekly allocation
};

// Helper to get project allocations
const getProjectAllocations = (memberId: number) => {
  const projectMap = new Map<string, { projectName: string, allocatedHours: number }>();

  tasks
    .filter(task => task.assignedTo === teamMembers.find(m => m.id === memberId)?.name && task.status !== 'Completed')
    .forEach(task => {
      const weeklyHours = (task.estimatedHours || 0) / 4;
      if (projectMap.has(task.projectId)) {
        projectMap.get(task.projectId)!.allocatedHours += weeklyHours;
      } else {
        projectMap.set(task.projectId, {
          projectName: task.projectId, // In a real app, you'd look up the project name
          allocatedHours: weeklyHours,
        });
      }
    });

  return Array.from(projectMap.entries()).map(([projectId, data]) => ({ ...data, projectId }));
};

export const MOCK_TEAM_ALLOCATION: TeamMemberAllocation[] = teamMembers.map(member => ({
  id: member.id,
  name: member.name,
  avatar: member.avatar,
  role: member.role,
  capacity: 40, // Assume a standard 40-hour week for everyone
  currentAllocation: Math.round(calculateAllocation(member.id)),
  projects: getProjectAllocations(member.id),
}));

export const getTasksForMember = (memberId: number): MemberTask[] => {
  const memberName = teamMembers.find(m => m.id === memberId)?.name;
  if (!memberName) return [];

  return tasks
    .filter(task => task.assignedTo === memberName)
    .map(task => ({
      id: task.id,
      taskName: task.title,
      projectName: task.projectId, // Again, you'd look this up
      dueDate: task.dueDate,
      status: task.status as MemberTask['status'],
    }))
    .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
};

/**
 * Calculates resource allocation data specifically for projects managed by a given PM.
 */
export const getPmResourceAllocation = (pmName: string) => {
  // 1. Find projects managed by the PM
  const pmProjectIds = projects.filter(p => p.manager === pmName).map(p => p.id);

  // 2. Find all unique team members on those projects
  const pmTeamMemberNames = new Set<string>();
  projects.forEach(p => {
    if (pmProjectIds.includes(p.id)) {
      p.team.forEach(name => pmTeamMemberNames.add(name));
    }
  });

  const pmTeamMembers = teamMembers.filter(m => pmTeamMemberNames.has(m.name));

  // 3. Calculate allocations for each member, but only within the PM's projects
  const pmAllocation: TeamMemberAllocation[] = pmTeamMembers.map(member => {
    const tasksInPmProjects = tasks.filter(task => 
      task.assignedTo === member.name && 
      pmProjectIds.includes(task.projectId) &&
      task.status !== 'Completed'
    );

    const allocationForPmProjects = tasksInPmProjects.reduce((total, task) => total + (task.estimatedHours || 0) / 4, 0);

    return {
      id: member.id,
      name: member.name,
      avatar: member.avatar,
      role: member.role,
      capacity: 40, // Total capacity remains the same
      currentAllocation: Math.round(allocationForPmProjects), // Allocation only for PM's projects
      projects: [], // Simplified for this view, can be expanded later
    };
  });

  return pmAllocation;
};
