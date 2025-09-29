import { goals, teamMembers } from './mock-data';

// --- LOGIC ---

/**
 * Fetches all goals assigned to members of a specific team lead's team.
 */
export const getTeamGoals = (teamLeadName: string) => {
  const lead = teamMembers.find(m => m.name === teamLeadName);
  if (!lead) return [];

  const teamMemberNames = teamMembers
    .filter(m => m.departmentId === lead.departmentId)
    .map(m => m.name);

  return goals.filter(g => teamMemberNames.includes(g.owner));
};

/**
 * Fetches the details for a single goal by its ID.
 */
export const getGoalDetails = (goalId: string) => {
  return goals.find(g => g.id === goalId);
};
