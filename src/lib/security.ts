export type IncidentSeverity = 'Low' | 'Medium' | 'High' | 'Critical';
export type IncidentStatus = 'New' | 'Investigating' | 'Resolved' | 'Ignored';
export const INCIDENT_STATUSES: IncidentStatus[] = ['New', 'Investigating', 'Resolved', 'Ignored'];
export type IncidentType =
  | 'Suspicious Login'
  | 'Data Export'
  | 'Permission Change'
  | 'Anomalous Activity';

export interface IncidentActivity {
  id: string;
  timestamp: string;
  author: string;
  comment: string;
  action?: string; // e.g., "Changed status to Investigating"
}

export interface SecurityIncident {
  id: string;
  title: string;
  description: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  type: IncidentType;
  timestamp: string;
  details: Record<string, string | number>;
  recommendations: string[];
  activity: IncidentActivity[];
}

export const MOCK_SECURITY_INCIDENTS: Omit<SecurityIncident, 'activity'>[] = [
  {
    id: 'SEC-001',
    title: 'Multiple Failed Logins',
    description: `User 'emma.davis@agencyflow.com' had 7 failed login attempts in 5 minutes.`,
    severity: 'Medium',
    status: 'New',
    type: 'Suspicious Login',
    timestamp: '2024-11-29T09:15:00Z',
    details: { user: 'emma.davis@agencyflow.com', source_ip: '188.43.136.21' },
    recommendations: [
      'Verify with the user if these attempts were legitimate.',
      'If not, force a password reset for the user.',
      'Consider temporarily locking the account.',
      'Add the source IP to a watchlist.',
    ],
  },
  {
    id: 'SEC-002',
    title: 'Anomalous Data Export',
    description: `A large number of project files (250+) were downloaded from project PRJ-002.`,
    severity: 'High',
    status: 'Investigating',
    type: 'Data Export',
    timestamp: '2024-11-28T23:30:00Z',
    details: {
      user: 'mike.johnson@agencyflow.com',
      project_id: 'PRJ-002',
      file_count: 257,
      total_size: '1.2 GB',
    },
    recommendations: [
      'Confirm with the user if this export was intentional.',
      'Review the user\'s recent activity for other suspicious actions.',
      'Ensure the user\'s account has not been compromised.',
    ],
  },
  {
    id: 'SEC-003',
    title: 'Admin Role Granted',
    description: `User 'alex.thompson@agencyflow.com' was granted the Admin role.`,
    severity: 'Low',
    status: 'Resolved',
    type: 'Permission Change',
    timestamp: '2024-11-27T11:00:00Z',
    details: {
      target_user: 'alex.thompson@agencyflow.com',
      granting_user: 'sarah.wilson@agencyflow.com',
      new_role: 'Admin',
    },
    recommendations: [
      'No action needed if this was an authorized change.',
      'Ensure the principle of least privilege is being followed.',
    ],
  },
  {
    id: 'SEC-004',
    title: 'Login from New Device',
    description: `User 'sarah.wilson@agencyflow.com' logged in from a new device or location.`,
    severity: 'Low',
    status: 'Ignored',
    type: 'Suspicious Login',
    timestamp: '2024-11-29T10:05:00Z',
    details: {
      user: 'sarah.wilson@agencyflow.com',
      source_ip: '104.28.213.117',
      location: 'Oslo, Norway',
    },
    recommendations: [
      'If the user travels frequently, this can be ignored.',
      'Ensure Two-Factor Authentication is enabled for the user.',
    ],
  },
];

export const getIncidentDetails = (
  incidentId: string
): SecurityIncident | null => {
  const incident = MOCK_SECURITY_INCIDENTS.find((i) => i.id === incidentId);
  if (!incident) return null;

  // Generate mock activity based on incident status
  const activity: IncidentActivity[] = [
    {
      id: 'ACT-1',
      timestamp: incident.timestamp,
      author: 'System',
      comment: 'Incident automatically detected.',
    },
  ];

  if (incident.status === 'Investigating' || incident.status === 'Resolved') {
    activity.push({
      id: 'ACT-2',
      timestamp: '2024-11-29T01:35:00Z',
      author: 'admin@agencyflow.com',
      comment: 'Assigned to security team for review. Contacted user.',
      action: 'Changed status to Investigating',
    });
  }

  if (incident.status === 'Resolved') {
    activity.push({
      id: 'ACT-3',
      timestamp: '2024-11-27T11:05:00Z',
      author: 'admin@agencyflow.com',
      comment:
        'Confirmed with Sarah Wilson that this was an intentional and authorized permission change.',
      action: 'Changed status to Resolved',
    });
  }

  if (incident.status === 'Ignored') {
    activity.push({
      id: 'ACT-2',
      timestamp: '2024-11-29T10:06:00Z',
      author: 'admin@agencyflow.com',
      comment: 'User confirmed they are traveling. Marking as ignored.',
      action: 'Changed status to Ignored',
    });
  }

  return {
    ...incident,
    activity: activity.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    ),
  };
};