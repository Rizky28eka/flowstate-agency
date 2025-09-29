export type ChangeRequestStatus = 'Pending' | 'Approved' | 'Rejected';

export interface ChangeRequest {
  id: string;
  title: string;
  description: string;
  projectId: string;
  status: ChangeRequestStatus;
  impact: {
    cost: number; // in currency, e.g., 2000 for $2000
    timeDays: number; // in days, e.g., 5 for 5 extra days
  };
  requester: string; // e.g., "Client" or an internal team member's name
  dateRequested: string;
  dateApproved?: string;
}

export const MOCK_CHANGE_REQUESTS: ChangeRequest[] = [
  {
    id: 'CR-001',
    title: 'Add Social Media Sharing Feature',
    description: 'Client requested to add sharing functionality for Facebook, Twitter, and LinkedIn on all blog posts.',
    projectId: 'PRJ-001',
    status: 'Approved',
    impact: {
      cost: 15000000, // Rp 15.000.000
      timeDays: 5,
    },
    requester: 'Client',
    dateRequested: '2024-11-10',
    dateApproved: '2024-11-12',
  },
  {
    id: 'CR-002',
    title: 'Change Primary Brand Color',
    description: 'After initial mockups, client wants to change the primary brand color from blue to a dark green. This will require updating all existing design components.',
    projectId: 'PRJ-001',
    status: 'Pending',
    impact: {
      cost: 8000000,
      timeDays: 3,
    },
    requester: 'Client',
    dateRequested: '2024-11-28',
  },
  {
    id: 'CR-003',
    title: 'Implement Advanced Search Algorithm',
    description: 'Request to replace the standard search with a more advanced, weighted algorithm. Engineering estimates this is a significant effort.',
    projectId: 'PRJ-002',
    status: 'Rejected',
    impact: {
      cost: 50000000,
      timeDays: 20,
    },
    requester: 'Internal (Mike Johnson)',
    dateRequested: '2024-11-15',
    dateApproved: '2024-11-18',
  },
];

/**
 * Fetches all change requests for a given project.
 */
export const getChangeRequestsForProject = (projectId: string): ChangeRequest[] => {
  return MOCK_CHANGE_REQUESTS.filter(cr => cr.projectId === projectId);
};
