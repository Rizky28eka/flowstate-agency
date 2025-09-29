import {
  clients,
  projects,
  invoices,
  contracts,
} from './mock-data';
import { getFinancialsForProject } from './profitability';

// --- INTERFACES ---

export interface ClientKPIs {
  lifetimeValue: number;
  avgProfitMargin: number;
  activeProjectsCount: number;
  satisfactionScore: number;
}

export interface ClientDetails {
  id: string;
  name: string;
  industry: string;
  status: string;
  avatar: string;
  contactPerson: string;
  email: string;
  phone: string;
  website: string;
  address: string;
  joinDate: string;
  kpis: ClientKPIs;
  projects: (typeof projects)[0][];
  invoices: (typeof invoices)[0][];
  contracts: (typeof contracts)[0][];
}

// --- LOGIC ---

/**
 * Fetches and assembles all details for a specific client ID.
 * This function aggregates data from projects, invoices, and contracts,
 * and calculates key performance indicators (KPIs).
 */
export const getClientDetails = (clientId: string): ClientDetails | null => {
  const client = clients.find(c => c.id === clientId);
  if (!client) return null;

  // 1. Aggregate related data
  const clientProjects = projects.filter(p => p.clientId === clientId);
  const clientInvoices = invoices.filter(inv => inv.clientId === clientId);
  const clientContracts = contracts.filter(c => c.clientId === clientId);

  // 2. Calculate KPIs
  const lifetimeValue = client.totalBilled;
  const activeProjectsCount = clientProjects.filter(p => p.status !== 'Completed').length;
  
  // Calculate weighted average profit margin across all client projects
  let totalRevenueAllProjects = 0;
  let totalProfitAllProjects = 0;
  clientProjects.forEach(p => {
    const financials = getFinancialsForProject(p.id);
    if (financials) {
      totalRevenueAllProjects += financials.totalRevenue;
      totalProfitAllProjects += financials.netProfit;
    }
  });
  const avgProfitMargin = totalRevenueAllProjects > 0 
    ? (totalProfitAllProjects / totalRevenueAllProjects) * 100 
    : 0;

  const kpis: ClientKPIs = {
    lifetimeValue,
    activeProjectsCount,
    avgProfitMargin,
    satisfactionScore: client.satisfaction,
  };

  // 3. Assemble the final object
  return {
    id: client.id,
    name: client.name,
    industry: client.industry,
    status: client.status,
    avatar: client.avatar,
    contactPerson: client.contact,
    email: client.email,
    phone: client.phone,
    website: client.website,
    address: client.address,
    joinDate: client.joinDate,
    kpis,
    projects: clientProjects,
    invoices: clientInvoices,
    contracts: clientContracts,
  };
};
