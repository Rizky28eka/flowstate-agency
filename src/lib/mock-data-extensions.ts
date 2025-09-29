import { Crown, Shield, User, Users, Code, DollarSign, Handshake } from "lucide-react";

export const mockRoles = [
  { 
    id: "owner", 
    role: "Owner", 
    description: "Complete platform access", 
    color: "bg-gradient-to-r from-purple-500 to-pink-500",
    icon: Crown,
    users: 1,
    permissions: ["full_access", "user_management", "system_config"]
  },
  { 
    id: "admin", 
    role: "Admin", 
    description: "System administration", 
    color: "bg-gradient-to-r from-blue-500 to-cyan-500",
    icon: Shield,
    users: 2,
    permissions: ["user_management", "system_config", "security"]
  },
  { 
    id: "project-manager", 
    role: "Project Manager", 
    description: "Project oversight", 
    color: "bg-gradient-to-r from-green-500 to-teal-500",
    icon: User,
    users: 5,
    permissions: ["project_management", "team_oversight", "client_communication"]
  },
  { 
    id: "team-lead", 
    role: "Team Lead", 
    description: "Team management", 
    color: "bg-gradient-to-r from-orange-500 to-red-500",
    icon: Users,
    users: 3,
    permissions: ["team_management", "task_assignment", "performance_review"]
  },
  { 
    id: "member", 
    role: "Member", 
    description: "Team member access", 
    color: "bg-gradient-to-r from-gray-500 to-slate-500",
    icon: Code,
    users: 15,
    permissions: ["task_management", "time_tracking", "project_view"]
  },
  { 
    id: "finance", 
    role: "Finance", 
    description: "Financial management", 
    color: "bg-gradient-to-r from-emerald-500 to-green-500",
    icon: DollarSign,
    users: 2,
    permissions: ["financial_management", "invoice_management", "budget_planning"]
  },
  { 
    id: "client", 
    role: "Client", 
    description: "Client portal access", 
    color: "bg-gradient-to-r from-indigo-500 to-purple-500",
    icon: Handshake,
    users: 8,
    permissions: ["project_view", "file_access", "communication"]
  }
];

export const mockPermissions = [
  { permission: "Create Projects", owner: true, admin: true, manager: true, pm: true, lead: false, member: false },
  { permission: "Delete Projects", owner: true, admin: true, manager: false, pm: false, lead: false, member: false },
  { permission: "Manage Users", owner: true, admin: true, manager: false, pm: false, lead: false, member: false },
  { permission: "View Finances", owner: true, admin: true, manager: true, pm: true, lead: false, member: false },
  { permission: "Export Data", owner: true, admin: true, manager: true, pm: true, lead: true, member: false }
];

export const mockClients = [
  {
    id: "1",
    name: "TechCorp Solutions",
    industry: "Technology",
    status: "Active",
    avatar: "/placeholder.svg",
    contact: "John Smith",
    email: "john@techcorp.com",
    phone: "+1 (555) 123-4567",
    website: "https://techcorp.com",
    address: "123 Tech Street, SF, CA",
    projects: 3,
    activeProjects: 2,
    completedProjects: 1,
    totalValue: "$45,000",
    lastContact: "2024-01-15",
    notes: "High-value client, excellent communication",
    contractEndDate: "2024-12-31"
  }
];

export const mockSupportTickets = [
  {
    id: "1",
    title: "Login Issues",
    description: "Cannot access dashboard after password reset",
    status: "Open",
    priority: "High",
    project: "Website Redesign",
    createdDate: "2024-01-15",
    lastUpdate: "2024-01-16",
    assignedTo: "Sarah Wilson"
  }
];