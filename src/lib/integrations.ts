import React from "react";

export type IntegrationCategory =
  | "Communication"
  | "Productivity"
  | "Source Control"
  | "Design"
  | "Finance"
  | "CRM";

export interface IntegrationConfigField {
  id: string;
  label: string;
  type: "text" | "password" | "textarea";
  placeholder?: string;
  required: boolean;
}

export interface Integration {
  id: string;
  name: string;
  description: string; // dibuat wajib biar konsisten
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  category: IntegrationCategory;
  status: "active" | "inactive" | "coming_soon";
  configFields?: IntegrationConfigField[];
  configuredValues?: Record<string, string>; // default bisa {}
}

// Placeholder icon biar konsisten
const PlaceholderIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) =>
  React.createElement("svg", props);

// Mock data untuk available integrations
export const MOCK_INTEGRATIONS: Integration[] = [
  {
    id: "slack",
    name: "Slack",
    description: "Receive notifications and messages in Slack channels.", // ditambahkan
    icon: PlaceholderIcon,
    category: "Communication",
    status: "inactive",
    configFields: [
      {
        id: "webhookUrl",
        label: "Incoming Webhook URL",
        type: "text",
        required: true,
        placeholder: "https://hooks.slack.com/services/...",
      },
    ],
  },
  {
    id: "google-calendar",
    name: "Google Calendar",
    description:
      "Sync project deadlines, meetings, and task due dates with your Google Calendar.",
    icon: PlaceholderIcon,
    category: "Productivity",
    status: "inactive",
    configFields: [
      { id: "clientId", label: "Google OAuth Client ID", type: "text", required: true },
      { id: "clientSecret", label: "Google OAuth Client Secret", type: "password", required: true },
    ],
  },
  {
    id: "github",
    name: "GitHub",
    description: "Link commits, branches, and pull requests to tasks and projects.",
    icon: PlaceholderIcon,
    category: "Source Control",
    status: "active",
    configFields: [
      { id: "personalAccessToken", label: "Personal Access Token", type: "password", required: true },
    ],
  },
  {
    id: "figma",
    name: "Figma",
    description: "Embed Figma files and prototypes directly into project pages and tasks.",
    icon: PlaceholderIcon,
    category: "Design",
    status: "inactive",
    configFields: [{ id: "apiKey", label: "Figma API Key", type: "password", required: true }],
  },
  {
    id: "stripe",
    name: "Stripe",
    description: "Connect your Stripe account to process payments for invoices directly.",
    icon: PlaceholderIcon,
    category: "Finance",
    status: "coming_soon",
  },
  {
    id: "quickbooks",
    name: "QuickBooks",
    description: "Sync invoices, expenses, and payments with your QuickBooks Online account.",
    icon: PlaceholderIcon,
    category: "Finance",
    status: "coming_soon",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    description: "Sync client data and sales pipelines between Flowstate and HubSpot CRM.",
    icon: PlaceholderIcon,
    category: "CRM",
    status: "inactive",
    configFields: [{ id: "apiKey", label: "HubSpot API Key", type: "password", required: true }],
  },
];