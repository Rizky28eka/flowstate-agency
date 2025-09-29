import { salesLeads } from "./mock-data";

// --- TYPES & INTERFACES ---

export const DEAL_STATUSES = [
  "Prospect",
  "Qualified",
  "Proposal",
  "Negotiation",
  "Closed-Won",
  "Closed-Lost",
] as const;

export type DealStatus = (typeof DEAL_STATUSES)[number];

export interface Note {
  id: string;
  author: string;
  date: string; // ISO date string
  text: string;
}

export interface Activity {
  id: string;
  type: "Call" | "Email" | "Meeting";
  date: string;
  summary: string;
  notes?: string;
}

export interface Document {
  id: string;
  name: string;
  type: "Proposal" | "Contract" | "NDA";
  url: string;
  uploadDate: string;
}

export interface Deal {
  id: string;
  dealName: string;
  companyName: string;
  contactPerson: string;
  value: number;
  status: DealStatus;
  probability: number;
  expectedCloseDate: string;
  notes: Note[];
  activities: Activity[];
  documents: Document[];
}

// --- HELPERS ---

const sortByDateDesc = <T extends { date: string }>(arr: T[]): T[] =>
  [...arr].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

// --- MOCK DATA GENERATION ---

export const getDealDetails = (dealId: string): Deal | null => {
  const baseLead = salesLeads.find((lead) => lead.id === dealId);
  if (!baseLead) return null;

  const activities: Activity[] = [
    {
      id: "ACT-1",
      type: "Meeting",
      date: "2024-11-29",
      summary: "Initial discovery call with John Doe.",
      notes:
        "Client is interested in a full redesign. Budget seems flexible. Key pain point is their outdated mobile experience.",
    },
    {
      id: "ACT-2",
      type: "Email",
      date: "2024-12-02",
      summary: "Sent follow-up email with project case studies.",
    },
    {
      id: "ACT-3",
      type: "Call",
      date: "2024-12-05",
      summary:
        "Quick call to confirm receipt of case studies and schedule proposal meeting.",
    },
  ];

  const notes: Note[] = [
    {
      id: "NOTE-1",
      author: "Owner",
      date: "2024-11-29",
      text: "This is a high-priority lead. They were referred by TechCorp Inc. Let's make sure we put our best foot forward.",
    },
    {
      id: "NOTE-2",
      author: "Tom Rodriguez",
      date: "2024-12-05",
      text: "Client seems very receptive to our value proposition. I estimate an 85% chance of closing if the proposal is strong.",
    },
  ];

  const documents: Document[] = [
    {
      id: "DOC-1",
      name: "Innovate_Solutions_NDA.pdf",
      type: "NDA",
      url: "#",
      uploadDate: "2024-11-28",
    },
    {
      id: "DOC-2",
      name: "Flowstate_Proposal_v1.pdf",
      type: "Proposal",
      url: "#",
      uploadDate: "2024-12-06",
    },
  ];

  return {
    id: baseLead.id,
    dealName: `${baseLead.companyName} - Website Redesign`,
    companyName: baseLead.companyName,
    contactPerson: baseLead.contactPerson,
    value: baseLead.potentialValue,
    status: baseLead.status as DealStatus,
    probability: baseLead.probability,
    expectedCloseDate: "2025-01-31",
    activities: sortByDateDesc(activities),
    notes: sortByDateDesc(notes),
    documents,
  };
};