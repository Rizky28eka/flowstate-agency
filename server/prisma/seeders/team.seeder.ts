import { PrismaClient, Organization, Team, User, TeamMemberRole } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { getRandomElement } from './utils';

const TEAMS_PER_AGENCY = 8;

// Universal team structures
const teamStructures = [
  { name: 'Strategy Team', focus: 'strategy' },
  { name: 'Creative Team', focus: 'creative' },
  { name: 'Execution Team', focus: 'execution' },
  { name: 'Client Services', focus: 'client' },
  { name: 'Production Team', focus: 'production' },
  { name: 'Analytics Team', focus: 'analytics' },
  { name: 'Operations Team', focus: 'operations' },
  { name: 'Innovation Lab', focus: 'innovation' },
];

export async function seedTeams(prisma: PrismaClient, organization: Organization, usersByRole: Record<string, User[]>): Promise<Team[]> {
  const specialists = [
    ...(usersByRole['SENIOR_SPECIALIST'] || []),
    ...(usersByRole['SPECIALIST'] || []),
    ...(usersByRole['JUNIOR_SPECIALIST'] || []),
  ];
  const teamLeads = usersByRole['TEAM_LEAD'] || [];
  const contractors = usersByRole['CONTRACTOR'] || [];
  
  const teams = await Promise.all(
    teamStructures.slice(0, TEAMS_PER_AGENCY).map(async (teamType, i) => {
      const team = await prisma.team.create({
        data: {
          name: teamType.name,
          slug: faker.helpers.slugify(teamType.name).toLowerCase(),
          organizationId: organization.id,
          description: `${teamType.name} - specialized in ${teamType.focus}`
        }
      });

      // Assign team lead
      if (teamLeads[i]) {
        await prisma.teamMember.create({
          data: { userId: teamLeads[i].id, teamId: team.id, role: TeamMemberRole.LEADER }
        });
      }

      // Assign specialists to teams
      const membersPerTeam = Math.floor(specialists.length / TEAMS_PER_AGENCY);
      const teamMembers = specialists.slice(i * membersPerTeam, (i + 1) * membersPerTeam);
      
      for (const member of teamMembers) {
        await prisma.teamMember.create({
          data: { userId: member.id, teamId: team.id, role: TeamMemberRole.MEMBER }
        });
      }

      // Add some contractors randomly
      if (contractors.length > 0 && Math.random() > 0.5) {
        const contractor = getRandomElement(contractors);
        await prisma.teamMember.create({
          data: { userId: contractor.id, teamId: team.id, role: TeamMemberRole.VIEWER }
        });
      }

      return team;
    })
  );
  
  console.log(`   ✓ Teams: ${teams.length} with ${specialists.length} specialists`);
  return teams;
}
