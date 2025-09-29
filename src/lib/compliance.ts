export type DataType = 'Project Data' | 'Client PII' | 'Inactive User Accounts' | 'Audit Logs';
export type RetentionAction = 'Anonymize' | 'Delete';

export interface DataRetentionPolicy {
  id: string;
  dataType: DataType;
  retentionPeriodDays: number;
  action: RetentionAction;
  description: string;
  isActive: boolean;
}

export type RequestType = 'Data Export' | 'Account Deletion';
export type RequestStatus = 'Pending' | 'In Progress' | 'Completed' | 'Rejected';

export const REQUEST_STATUSES: RequestStatus[] = ['Pending', 'In Progress', 'Completed', 'Rejected'];

export interface DataSubjectRequest {
  id: string;
  requestType: RequestType;
  status: RequestStatus;
  userEmail: string;
  requestDate: string;
  completionDate?: string;
  notes?: string;
}

// --- MOCK DATA ---

export const MOCK_RETENTION_POLICIES: DataRetentionPolicy[] = [
  {
    id: 'POL-001',
    dataType: 'Project Data',
    retentionPeriodDays: 1825, // 5 years
    action: 'Anonymize',
    description: 'Anonymize project details 5 years after project completion.',
    isActive: true,
  },
  {
    id: 'POL-002',
    dataType: 'Inactive User Accounts',
    retentionPeriodDays: 730, // 2 years
    action: 'Delete',
    description: 'Delete user accounts that have been inactive for 2 years.',
    isActive: true,
  },
  {
    id: 'POL-003',
    dataType: 'Audit Logs',
    retentionPeriodDays: 365, // 1 year
    action: 'Delete',
    description: 'Delete audit logs older than 1 year to save space.',
    isActive: false,
  },
];

export const MOCK_DATA_SUBJECT_REQUESTS: DataSubjectRequest[] = [
  {
    id: 'DSR-001',
    requestType: 'Data Export',
    status: 'Pending',
    userEmail: 'john.davis@retailbrand.com',
    requestDate: '2024-11-28',
  },
  {
    id: 'DSR-002',
    requestType: 'Account Deletion',
    status: 'In Progress',
    userEmail: 'jessica.green@globalfoods.com',
    requestDate: '2024-11-25',
    notes: 'User has multiple projects, requires manual data anonymization before deletion.'
  },
  {
    id: 'DSR-003',
    requestType: 'Data Export',
    status: 'Completed',
    userEmail: 'former.employee@agencyflow.com',
    requestDate: '2024-10-15',
    completionDate: '2024-10-16',
  },
];
