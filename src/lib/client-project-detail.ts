import { projects, tasks, invoices } from './mock-data';

// --- INTERFACES (Client-Safe Versions) ---

export interface ClientTask {
  id: string;
  title: string;
  status: string;
  isCompleted: boolean;
}

export interface ClientFile {
  id: string;
  name: string;
  type: string;
  size: string;
  uploadDate: string;
  url: string;
}

export interface ClientInvoiceSummary {
  id: string;
  invoiceNumber: string;
  status: string;
  amount: number;
  dueDate: string;
}

export interface ClientProjectDetails {
  id: string;
  name: string;
  description: string;
  status: string;
  progress: number;
  startDate: string;
  endDate: string;
  tasks: ClientTask[];
  files: ClientFile[];
  invoices: ClientInvoiceSummary[];
}

// --- LOGIC ---

/**
 * Fetches and filters project data to what is safe and relevant for a client to see.
 */
export const getClientProjectDetails = (projectId: string): ClientProjectDetails | null => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  // Filter and simplify tasks for client view
  const clientTasks: ClientTask[] = tasks
    .filter(t => t.projectId === projectId)
    .map(t => ({
      id: t.id,
      title: t.title,
      status: t.status,
      isCompleted: t.status === 'Completed',
    }));

  // Filter invoices for this project
  const clientInvoices: ClientInvoiceSummary[] = invoices
    .filter(inv => inv.projectId === projectId)
    .map(inv => ({
      id: inv.id,
      invoiceNumber: inv.invoiceNumber,
      status: inv.status,
      amount: inv.amount,
      dueDate: inv.dueDate,
    }));

  // Generate mock files for demonstration
  const clientFiles: ClientFile[] = [
    { id: 'F-01', name: 'Project_Brief_v2.pdf', type: 'PDF', size: '2.1 MB', uploadDate: '2024-10-15', url: '#' },
    { id: 'F-02', name: 'Initial_Mockups.fig', type: 'Figma File', size: '15.8 MB', uploadDate: '2024-10-25', url: '#' },
    { id: 'F-03', name: 'User_Flow_Diagram.png', type: 'Image', size: '800 KB', uploadDate: '2024-11-05', url: '#' },
  ];

  return {
    id: project.id,
    name: project.name,
    description: project.description,
    status: project.status,
    progress: project.progress,
    startDate: project.startDate,
    endDate: project.endDate,
    tasks: clientTasks,
    files: clientFiles,
    invoices: clientInvoices,
  };
};
