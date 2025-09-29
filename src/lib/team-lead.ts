import { teamMembers, tasks } from './mock-data';
import { isAfter, subDays } from 'date-fns';

// --- INTERFACES ---

export interface TeamMemberSummary {
  id: number;
  name: string;
  role: string;
  avatar: string;
  utilization: number;
  overdueTasksCount: number;
  completedTasksThisWeek: number;
}

// --- LOGIC ---

/**
 * Gathers performance summary data for all members of a specific team lead's team.
 */
export const getTeamData = (teamLeadName: string): TeamMemberSummary[] => {
  const lead = teamMembers.find(m => m.name === teamLeadName);
  if (!lead) return [];

  const team = teamMembers.filter(m => m.departmentId === lead.departmentId && m.id !== lead.id);

  const summary: TeamMemberSummary[] = team.map(member => {
    const memberTasks = tasks.filter(t => t.assignedTo === member.name);

    const overdueTasksCount = memberTasks.filter(
      t => new Date(t.dueDate) < new Date() && t.status !== 'Completed'
    ).length;

    // Mocking completedDate as it doesn't exist in the base data
    const completedTasksThisWeek = memberTasks.filter(t => {
      if (t.status !== 'Completed') return false;
      // Simulate a completed date for demo purposes
      const mockCompletedDate = new Date(t.dueDate);
      return isAfter(mockCompletedDate, subDays(new Date(), 7));
    }).length;

    return {
      id: member.id,
      name: member.name,
      role: member.role,
      avatar: member.avatar,
      utilization: member.utilization,
      overdueTasksCount,
      completedTasksThisWeek,
    };
  });

  return summary;
};
