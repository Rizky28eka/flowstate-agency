import { contracts, projects } from './mock-data';

// --- INTERFACES ---

export interface AssociatedProject {
  id: string;
  name: string;
  status: string;
  endDate: string;
}

export interface ContractDetails {
  id: string;
  title: string;
  clientName: string;
  clientId: string | null;
  status: string;
  startDate: string;
  endDate: string | null;
  renewalDate: string | null;
  value: number;
  documentUrl: string;
  keyTerms: string[];
  associatedProjects: AssociatedProject[];
}

// --- LOGIC ---

/**
 * Fetches and assembles all details for a specific contract, 
 * including projects associated with that contract's client.
 */
export const getContractDetails = (contractId: string): ContractDetails | null => {
  const contract = contracts.find(c => c.id === contractId);
  if (!contract) return null;

  // Find all projects associated with this contract's client
  const associatedProjects: AssociatedProject[] = contract.clientId
    ? projects
        .filter(p => p.clientId === contract.clientId)
        .map(p => ({
          id: p.id,
          name: p.name,
          status: p.status,
          endDate: p.endDate,
        }))
    : [];

  // Mock key terms for demonstration
  const keyTerms = [
    'Net 30 payment terms.',
    'Quarterly performance review required.',
    'Auto-renewal unless cancelled 30 days prior to end date.',
    'All intellectual property developed under this agreement remains property of the client upon full payment.',
  ];

  return {
    id: contract.id,
    title: contract.title,
    clientName: contract.clientName,
    clientId: contract.clientId,
    status: contract.status,
    startDate: contract.startDate,
    endDate: contract.endDate,
    renewalDate: contract.renewalDate,
    value: contract.value,
    documentUrl: contract.documentUrl,
    keyTerms: keyTerms,
    associatedProjects: associatedProjects,
  };
};
