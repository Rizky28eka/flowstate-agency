import { invoices, clients, settings } from './mock-data';

// --- INTERFACES ---

// Define a base type for a single invoice from the mock data
type Invoice = (typeof invoices)[0];

// Create the detailed type by intersecting the base Invoice with additional details
export type InvoiceDetails = Invoice & {
  clientDetails: (typeof clients)[0];
  agencyDetails: (typeof settings)['company'];
};

// --- LOGIC ---

/**
 * Fetches and assembles all data needed to render a full invoice document.
 */
export const getInvoiceDetails = (invoiceId: string): InvoiceDetails | null => {
  const invoice = invoices.find(inv => inv.id === invoiceId);
  if (!invoice) return null;

  const client = clients.find(c => c.id === invoice.clientId);
  if (!client) return null; // Or handle case where client might not be found

  const agencyDetails = settings.company;

  return {
    ...invoice,
    clientDetails: client,
    agencyDetails,
  };
};