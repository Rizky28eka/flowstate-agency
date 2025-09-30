export interface Integration {
  id: string;
  name: string;
  description: string;
  category: string;
  logo: string;
  status: 'Connected' | 'Not Connected' | 'Pending';
}

export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: 'slack',
    name: 'Slack',
    description: 'Real-time communication and notifications.',
    category: 'Communication',
    logo: '/placeholder.svg',
    status: 'Connected',
  },
  {
    id: 'google-drive',
    name: 'Google Drive',
    description: 'Cloud storage and file sharing.',
    category: 'File Management',
    logo: '/placeholder.svg',
    status: 'Connected',
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code hosting and version control.',
    category: 'Development',
    logo: '/placeholder.svg',
    status: 'Not Connected',
  },
  {
    id: 'jira',
    name: 'Jira',
    description: 'Project management and issue tracking.',
    category: 'Project Management',
    logo: '/placeholder.svg',
    status: 'Not Connected',
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks',
    description: 'Accounting and financial management.',
    category: 'Finance',
    logo: '/placeholder.svg',
    status: 'Pending',
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'CRM and marketing automation.',
    category: 'Sales & Marketing',
    logo: '/placeholder.svg',
    status: 'Connected',
  },
];
