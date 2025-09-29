import { projects } from "./mock-data";

// --- TYPES & INTERFACES ---

export type TriggerType =
  | "PROJECT_STATUS_CHANGED"
  | "INVOICE_OVERDUE"
  | "DEAL_STAGE_CHANGED";

export type ActionType =
  | "SEND_SLACK_NOTIFICATION"
  | "CREATE_TASK"
  | "SEND_EMAIL";

// Variables available in templates
export type TemplateVariable =
  | "{projectName}"
  | "{clientName}"
  | "{invoiceNumber}"
  | "{invoiceAmount}"
  | "{dealName}"
  | "{dealStage}";

export interface AutomationRule {
  id: string;
  name: string;
  description: string;
  triggerType: TriggerType;
  triggerConditions: Record<string, string | number | boolean>;
  actionType: ActionType;
  actionParams: Record<string, string | number | boolean>;
  isActive: boolean;
}

// --- DEFINITIONS FOR UI BUILDER ---

// More generic field types
export type FieldType = "text" | "textarea" | "select";

export interface ConditionField {
  id: string;
  label: string;
  type: FieldType;
  options?: string[];
}

export interface ParamField {
  id: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: string[];
}

export interface TriggerDefinition {
  type: TriggerType;
  name: string;
  description: string;
  conditionFields: ConditionField[];
  outputVariables: { id: TemplateVariable; description: string }[];
}

export interface ActionDefinition {
  type: ActionType;
  name: string;
  description: string;
  paramFields: ParamField[];
}

// --- TRIGGERS ---

export const AVAILABLE_TRIGGERS: TriggerDefinition[] = [
  {
    type: "PROJECT_STATUS_CHANGED",
    name: "Project Status is Changed",
    description: "Fires when a project's status is updated.",
    conditionFields: [
      {
        id: "status",
        label: "New Status is",
        type: "select",
        options: ["Planning", "In Progress", "Review", "Completed"],
      },
    ],
    outputVariables: [
      { id: "{projectName}", description: "The name of the project" },
      { id: "{clientName}", description: "The name of the client" },
    ],
  },
  {
    type: "INVOICE_OVERDUE",
    name: "Invoice Becomes Overdue",
    description:
      "Fires when an invoice passes its due date without being paid.",
    conditionFields: [],
    outputVariables: [
      { id: "{invoiceNumber}", description: "The invoice number" },
      { id: "{clientName}", description: "The name of the client" },
      { id: "{invoiceAmount}", description: "The total amount of the invoice" },
    ],
  },
  {
    type: "DEAL_STAGE_CHANGED",
    name: "Deal Stage is Changed",
    description: "Fires when a deal moves from one stage to another.",
    conditionFields: [
      {
        id: "newStage",
        label: "New Stage",
        type: "select",
        options: ["Prospect", "Qualified", "Proposal", "Negotiation", "Closed"],
      },
    ],
    outputVariables: [
      { id: "{dealName}", description: "The name of the deal" },
      { id: "{dealStage}", description: "The new stage of the deal" },
      { id: "{clientName}", description: "The name of the client" },
    ],
  },
];

// --- ACTIONS ---

export const AVAILABLE_ACTIONS: ActionDefinition[] = [
  {
    type: "SEND_SLACK_NOTIFICATION",
    name: "Send a Slack Notification",
    description: "Posts a message to a specified Slack channel.",
    paramFields: [
      {
        id: "channel",
        label: "Channel",
        type: "text",
        placeholder: "e.g., #general or @username",
      },
      {
        id: "message",
        label: "Message",
        type: "textarea",
        placeholder: "e.g., Project {projectName} is complete!",
      },
    ],
  },
  {
    type: "CREATE_TASK",
    name: "Create a New Task",
    description: "Creates a new task in a specified project.",
    paramFields: [
      {
        id: "projectId",
        label: "Project ID",
        type: "select",
        options: projects.length ? projects.map((p) => p.id) : ["PRJ-DEFAULT"],
      },
      {
        id: "title",
        label: "Task Title",
        type: "text",
        placeholder: "e.g., Prepare final report for {projectName}",
      },
    ],
  },
  {
    type: "SEND_EMAIL",
    name: "Send an Email",
    description: "Sends an email to a specified recipient.",
    paramFields: [
      { id: "to", label: "Recipient", type: "text", placeholder: "client@example.com" },
      { id: "subject", label: "Subject", type: "text", placeholder: "Update on {projectName}" },
      { id: "body", label: "Body", type: "textarea", placeholder: "Hello {clientName}, ..." },
    ],
  },
];

// --- MOCK DATA ---

export const MOCK_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: "RULE-001",
    name: "Notify on Project Completion",
    description:
      "Sends a notification to the #projects channel when any project is marked as Completed.",
    triggerType: "PROJECT_STATUS_CHANGED",
    triggerConditions: { status: "Completed" },
    actionType: "SEND_SLACK_NOTIFICATION",
    actionParams: {
      channel: "#projects",
      message:
        '🎉 Project "{projectName}" for client {clientName} has been completed!',
    },
    isActive: true,
  },
  {
    id: "RULE-002",
    name: "Create Follow-up Task for Overdue Invoice",
    description:
      "Creates a task for the finance team to follow up when an invoice becomes overdue.",
    triggerType: "INVOICE_OVERDUE",
    triggerConditions: {},
    actionType: "CREATE_TASK",
    actionParams: {
      projectId: "PRJ-001",
      title: "Follow up on overdue invoice {invoiceNumber} for {clientName}",
    },
    isActive: true,
  },
  {
    id: "RULE-003",
    name: "Internal QA on Project Review",
    description:
      "Notifies the QA team when a project is moved to the Review stage.",
    triggerType: "PROJECT_STATUS_CHANGED",
    triggerConditions: { status: "Review" },
    actionType: "SEND_SLACK_NOTIFICATION",
    actionParams: {
      channel: "@qa-team",
      message: "Project {projectName} is ready for QA review.",
    },
    isActive: false,
  },
  {
    id: "RULE-004",
    name: "Notify Sales on Deal Progression",
    description: "Sends an email to the sales team when a deal changes stage.",
    triggerType: "DEAL_STAGE_CHANGED",
    triggerConditions: { newStage: "Proposal" },
    actionType: "SEND_EMAIL",
    actionParams: {
      to: "sales@agency.com",
      subject: "Deal {dealName} moved to Proposal stage",
      body: "Heads up! Deal {dealName} for client {clientName} is now in {dealStage}.",
    },
    isActive: true,
  },
];