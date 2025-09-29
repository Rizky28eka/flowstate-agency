import { tasks, timeEntries, expenses } from './mock-data';

// --- TYPES & INTERFACES ---

export type DataSource = 'Tasks' | 'Time Entries' | 'Expenses';
export type FilterOperator = 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than';

export interface FilterCondition {
  field: string;
  operator: FilterOperator;
  value: string | number | boolean;
}

export interface Report {
  id: string;
  name: string;
  description: string;
  dataSource: DataSource;
  columns: string[];
  filters: FilterCondition[];
}

export interface DataSourceDefinition {
  id: DataSource;
  name: string;
  fields: { 
    id: string; 
    label: string; 
    type: 'string' | 'number' | 'date' | 'status_select';
    options?: string[];
  }[];
}

// --- DEFINITIONS FOR UI BUILDER ---

export const AVAILABLE_DATA_SOURCES: DataSourceDefinition[] = [
  {
    id: 'Tasks',
    name: 'Tasks',
    fields: [
      { id: 'title', label: 'Title', type: 'string' },
      { id: 'assignedTo', label: 'Assigned To', type: 'string' },
      { id: 'status', label: 'Status', type: 'status_select', options: ['Completed', 'In Progress', 'To Do', 'In Review'] },
      { id: 'priority', label: 'Priority', type: 'status_select', options: ['High', 'Medium', 'Low'] },
      { id: 'dueDate', label: 'Due Date', type: 'date' },
      { id: 'estimatedHours', label: 'Estimated Hours', type: 'number' },
    ],
  },
  {
    id: 'Time Entries',
    name: 'Time Entries',
    fields: [
      { id: 'employeName', label: 'Employee', type: 'string' },
      { id: 'projectName', label: 'Project', type: 'string' },
      { id: 'date', label: 'Date', type: 'date' },
      { id: 'hours', label: 'Hours', type: 'number' },
      { id: 'billable', label: 'Billable', type: 'status_select', options: ['true', 'false'] },
    ],
  },
];

// --- MOCK DATA ---

export const MOCK_REPORTS: Report[] = [
  {
    id: 'RPT-PM-01',
    name: 'Overdue High-Priority Tasks',
    description: 'A list of all high-priority tasks that are past their due date.',
    dataSource: 'Tasks',
    columns: ['title', 'assignedTo', 'dueDate', 'status'],
    filters: [
      { field: 'priority', operator: 'equals', value: 'High' },
      { field: 'status', operator: 'not_equals', value: 'Completed' },
      { field: 'dueDate', operator: 'less_than', value: new Date().toISOString().split('T')[0] },
    ],
  },
  {
    id: 'RPT-PM-02',
    name: 'Weekly Billable Hours per Project',
    description: 'A summary of all billable hours logged in the last 7 days.',
    dataSource: 'Time Entries',
    columns: ['projectName', 'employeName', 'date', 'hours'],
    filters: [
      { field: 'billable', operator: 'equals', value: true },
      // In a real app, we'd use a dynamic date for "last 7 days"
    ],
  },
];

// --- LOGIC ---

const DATA_MAP = {
  'Tasks': tasks,
  'Time Entries': timeEntries,
  'Expenses': expenses,
};

export const generateReportData = (report: Report): Record<string, unknown>[] => {
  const rawData = DATA_MAP[report.dataSource];
  if (!rawData) return [];

  const filteredData = rawData.filter(row => {
    return report.filters.every(filter => {
      const rowValue = row[filter.field as keyof typeof row];
      switch (filter.operator) {
        case 'equals': return rowValue == filter.value;
        case 'not_equals': return rowValue != filter.value;
        case 'contains': return typeof rowValue === 'string' && rowValue.toLowerCase().includes(String(filter.value).toLowerCase());
        case 'greater_than': return rowValue > filter.value;
        case 'less_than': return rowValue < filter.value;
        default: return true;
      }
    });
  });

  const selectedColumnsData = filteredData.map(row => {
    const newRow: Record<string, unknown> = {};
    report.columns.forEach(col => {
      newRow[col] = row[col as keyof typeof row];
    });
    return newRow;
  });

  return selectedColumnsData;
};
