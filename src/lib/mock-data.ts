export const projects = [
  {
    id: "PRJ-001",
    name: "TechCorp Brand Redesign",
    client: "TechCorp Inc.",
    status: "In Progress",
    priority: "High",
    progress: 75,
    budget: "$45,000",
    spent: "$33,750",
    remaining: "$11,250",
    startDate: "2024-10-15",
    endDate: "2024-12-15",
    team: ["Sarah W.", "Mike J.", "Emma D."],
    manager: "Sarah Wilson",
    description: "Complete brand identity redesign including logo, guidelines, and marketing materials",
    tags: ["Design", "Branding", "Marketing"],
    lastUpdate: "2024-11-20",
    clientId: "CLI-001"
  },
  {
    id: "PRJ-002", 
    name: "E-commerce Platform",
    client: "RetailBrand Co.",
    status: "Planning",
    priority: "Medium",
    progress: 25,
    budget: "$85,000",
    spent: "$12,750",
    remaining: "$72,250",
    startDate: "2024-11-01",
    endDate: "2025-02-28",
    team: ["Tom R.", "Lisa K.", "Alex C.", "Maria L."],
    manager: "Tom Rodriguez",
    description: "Full e-commerce website development with custom CMS and payment integration",
    tags: ["Development", "E-commerce", "CMS"],
    lastUpdate: "2024-11-18",
    clientId: "CLI-002"
  },
  {
    id: "PRJ-003",
    name: "Mobile App UI/UX",
    client: "FinanceApp Ltd.",
    status: "Review",
    priority: "High",
    progress: 90,
    budget: "$32,000",
    spent: "$28,800",
    remaining: "$3,200",
    startDate: "2024-09-01",
    endDate: "2024-11-30",
    team: ["David K.", "Sophie T."],
    manager: "David Kim",
    description: "Complete mobile application interface design and user experience optimization",
    tags: ["UI/UX", "Mobile", "Design"],
    lastUpdate: "2024-11-22",
    clientId: "CLI-003"
  },
  {
    id: "PRJ-004",
    name: "Marketing Campaign",
    client: "StartupXYZ",
    status: "Completed",
    priority: "Low",
    progress: 100,
    budget: "$25,000",
    spent: "$24,200",
    remaining: "$800",
    startDate: "2024-08-15",
    endDate: "2024-10-15",
    team: ["James W.", "Anna B."],
    manager: "James Wilson",
    description: "Digital marketing campaign including social media, content creation, and advertising",
    tags: ["Marketing", "Social Media", "Content"],
    lastUpdate: "2024-10-15",
    clientId: "CLI-005"
  },
  {
    id: "PRJ-005",
    name: "Healthcare Portal Development",
    client: "HealthWell Group",
    status: "In Progress",
    priority: "High",
    progress: 40,
    budget: "$75,000",
    spent: "$30,000",
    remaining: "$45,000",
    startDate: "2024-11-10",
    endDate: "2025-03-10",
    team: ["Mike J.", "Alex T.", "Lisa C."],
    manager: "Mike Johnson",
    description: "Patient portal with appointment booking, medical records, and telehealth features",
    tags: ["Development", "Healthcare", "Portal"],
    lastUpdate: "2024-11-25",
    clientId: "CLI-004"
  },
  {
    id: "PRJ-006",
    name: "Corporate Website Redesign",
    client: "TechCorp Inc.",
    status: "Planning",
    priority: "Medium",
    progress: 15,
    budget: "$35,000",
    spent: "$5,250",
    remaining: "$29,750",
    startDate: "2024-12-01",
    endDate: "2025-02-15",
    team: ["Sarah W.", "Lisa C."],
    manager: "Sarah Wilson",
    description: "Modern corporate website with responsive design and CMS integration",
    tags: ["Design", "Development", "Corporate"],
    lastUpdate: "2024-11-28",
    clientId: "CLI-001"
  }
];

export const departments = [
  {
    id: "creative",
    name: "Creative Team",
    description: "Brand design, visual identity, and creative direction",
    members: 12,
    lead: "Sarah Wilson",
    utilization: 87,
    satisfaction: 4.6,
    projects: 18,
    budget: "$450,000",
    spent: "$389,500",
    color: "#FF6B6B"
  },
  {
    id: "development",
    name: "Development Team", 
    description: "Web development, mobile apps, and technical solutions",
    members: 8,
    lead: "Mike Johnson",
    utilization: 92,
    satisfaction: 4.4,
    projects: 15,
    budget: "$380,000",
    spent: "$349,600",
    color: "#4ECDC4"
  },
  {
    id: "strategy",
    name: "Strategy Team",
    description: "Business strategy, market research, and consulting",
    members: 5,
    lead: "Emma Davis",
    utilization: 78,
    satisfaction: 4.8,
    projects: 8,
    budget: "$220,000",
    spent: "$171,600",
    color: "#45B7D1"
  },
  {
    id: "account",
    name: "Account Management",
    description: "Client relationships, project coordination, and business development",
    members: 7,
    lead: "Tom Rodriguez",
    utilization: 85,
    satisfaction: 4.5,
    projects: 12,
    budget: "$280,000",
    spent: "$238,000",
    color: "#96CEB4"
  },
  {
    id: "marketing",
    name: "Marketing Team",
    description: "Digital marketing, content creation, and campaign management",
    members: 6,
    lead: "James Wilson",
    utilization: 83,
    satisfaction: 4.3,
    projects: 10,
    budget: "$195,000",
    spent: "$161,850",
    color: "#FFEAA7"
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Sarah Wilson",
    role: "Creative Director",
    department: "Creative Team",
    departmentId: "creative",
    email: "sarah.wilson@agencyflow.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    joinDate: "2022-01-15",
    status: "Active",
    utilization: 89,
    projects: 4,
    rating: 4.8,
    skills: ["Brand Design", "Art Direction", "Team Leadership", "Adobe Creative Suite"],
    avatar: "/api/placeholder/40/40",
    salary: "$95,000",
    birthday: "1987-03-22",
    emergencyContact: "John Wilson - +1 (555) 123-0000"
  },
  {
    id: 2,
    name: "Mike Johnson",
    role: "Lead Developer",
    department: "Development Team",
    departmentId: "development",
    email: "mike.johnson@agencyflow.com",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    joinDate: "2021-08-20",
    status: "Active",
    utilization: 95,
    projects: 3,
    rating: 4.6,
    skills: ["React", "Node.js", "System Architecture", "Python", "AWS"],
    avatar: "/api/placeholder/40/40",
    salary: "$105,000",
    birthday: "1985-07-14",
    emergencyContact: "Lisa Johnson - +1 (555) 234-0000"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Strategy Lead",
    department: "Strategy Team",
    departmentId: "strategy",
    email: "emma.davis@agencyflow.com",
    phone: "+1 (555) 345-6789",
    location: "Chicago, IL",
    joinDate: "2022-03-10",
    status: "Active",
    utilization: 82,
    projects: 2,
    rating: 4.9,
    skills: ["Business Strategy", "Market Research", "Data Analysis", "Consulting"],
    avatar: "/api/placeholder/40/40",
    salary: "$90,000",
    birthday: "1989-11-08",
    emergencyContact: "Robert Davis - +1 (555) 345-0000"
  },
  {
    id: 4,
    name: "Tom Rodriguez",
    role: "Account Director",
    department: "Account Management",
    departmentId: "account",
    email: "tom.rodriguez@agencyflow.com",
    phone: "+1 (555) 456-7890",
    location: "Austin, TX",
    joinDate: "2021-11-05",
    status: "Active",
    utilization: 88,
    projects: 5,
    rating: 4.7,
    skills: ["Client Relations", "Project Management", "Business Development", "Sales"],
    avatar: "/api/placeholder/40/40",
    salary: "$88,000",
    birthday: "1986-09-30",
    emergencyContact: "Maria Rodriguez - +1 (555) 456-0000"
  },
  {
    id: 5,
    name: "Lisa Chen",
    role: "Senior Designer",
    department: "Creative Team",
    departmentId: "creative",
    email: "lisa.chen@agencyflow.com",
    phone: "+1 (555) 567-8901",
    location: "Los Angeles, CA",
    joinDate: "2022-06-12",
    status: "Active",
    utilization: 91,
    projects: 3,
    rating: 4.5,
    skills: ["UI/UX Design", "Prototyping", "Design Systems", "Figma"],
    avatar: "/api/placeholder/40/40",
    salary: "$75,000",
    birthday: "1990-12-03",
    emergencyContact: "Kevin Chen - +1 (555) 567-0000"
  },
  {
    id: 6,
    name: "Alex Thompson",
    role: "Full Stack Developer",
    department: "Development Team",
    departmentId: "development",
    email: "alex.thompson@agencyflow.com",
    phone: "+1 (555) 678-9012",
    location: "Seattle, WA",
    joinDate: "2023-02-28",
    status: "Active",
    utilization: 87,
    projects: 2,
    rating: 4.4,
    skills: ["JavaScript", "Python", "Database Design", "DevOps"],
    avatar: "/api/placeholder/40/40",
    salary: "$82,000",
    birthday: "1992-05-17",
    emergencyContact: "Sarah Thompson - +1 (555) 678-0000"
  },
  {
    id: 7,
    name: "James Wilson",
    role: "Marketing Manager",
    department: "Marketing Team",
    departmentId: "marketing",
    email: "james.wilson@agencyflow.com",
    phone: "+1 (555) 789-0123",
    location: "Miami, FL",
    joinDate: "2022-09-15",
    status: "Active",
    utilization: 85,
    projects: 4,
    rating: 4.3,
    skills: ["Digital Marketing", "Content Strategy", "SEO", "Social Media"],
    avatar: "/api/placeholder/40/40",
    salary: "$68,000",
    birthday: "1988-01-25",
    emergencyContact: "Anna Wilson - +1 (555) 789-0000"
  },
  {
    id: 8,
    name: "David Kim",
    role: "UX Researcher",
    department: "Strategy Team",
    departmentId: "strategy",
    email: "david.kim@agencyflow.com",
    phone: "+1 (555) 890-1234",
    location: "Portland, OR",
    joinDate: "2023-01-20",
    status: "Active",
    utilization: 79,
    projects: 2,
    rating: 4.6,
    skills: ["User Research", "Data Analysis", "Prototyping", "Testing"],
    avatar: "/api/placeholder/40/40",
    salary: "$72,000",
    birthday: "1991-08-12",
    emergencyContact: "Jenny Kim - +1 (555) 890-0000"
  }
];

export const clients = [
  {
    id: "CLI-001",
    name: "TechCorp Inc.",
    industry: "Technology",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    contact: "Laura Smith",
    email: "la.smith@techcorp.com",
    phone: "+1 (555) 111-2222",
    website: "techcorp.com",
    address: "123 Tech Avenue, Silicon Valley, CA 94000",
    projects: 7,
    activeProjects: 2,
    totalBilled: 215000,
    satisfaction: 4.8,
    joinDate: "2022-03-15",
    lastContact: "2024-11-20",
    contractValue: "$500,000",
    paymentTerms: "Net 30"
  },
  {
    id: "CLI-002",
    name: "RetailBrand Co.",
    industry: "E-commerce",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    contact: "John Davis",
    email: "john.davis@retailbrand.com",
    phone: "+1 (555) 333-4444",
    website: "retailbrand.com",
    address: "456 Commerce Street, New York, NY 10001",
    projects: 4,
    activeProjects: 1,
    totalBilled: 335000,
    satisfaction: 4.5,
    joinDate: "2021-09-01",
    lastContact: "2024-11-18",
    contractValue: "$750,000",
    paymentTerms: "Net 45"
  },
  {
    id: "CLI-003",
    name: "FinanceApp Ltd.",
    industry: "FinTech",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    contact: "Emily White",
    email: "emily.white@financeapp.com",
    phone: "+1 (555) 555-6666",
    website: "financeapp.com",
    address: "789 Finance Plaza, Chicago, IL 60601",
    projects: 9,
    activeProjects: 1,
    totalBilled: 352000,
    satisfaction: 4.9,
    joinDate: "2022-07-20",
    lastContact: "2024-11-22",
    contractValue: "$400,000",
    paymentTerms: "Net 15"
  },
  {
    id: "CLI-004",
    name: "HealthWell Group",
    industry: "Healthcare",
    status: "Onboarding",
    avatar: "/api/placeholder/40/40",
    contact: "Michael Brown",
    email: "michael.brown@healthwell.com",
    phone: "+1 (555) 777-8888",
    website: "healthwell.com",
    address: "321 Medical Center, Boston, MA 02101",
    projects: 1,
    activeProjects: 1,
    totalBilled: 50000,
    satisfaction: 5.0,
    joinDate: "2024-11-10",
    lastContact: "2024-11-25",
    contractValue: "$200,000",
    paymentTerms: "Net 30"
  },
  {
    id: "CLI-005",
    name: "Global Foods",
    industry: "Food & Beverage",
    status: "Churned",
    avatar: "/api/placeholder/40/40",
    contact: "Jessica Green",
    email: "jessica.green@globalfoods.com",
    phone: "+1 (555) 999-0000",
    website: "globalfoods.com",
    address: "654 Food Boulevard, Denver, CO 80202",
    projects: 12,
    activeProjects: 0,
    totalBilled: 450000,
    satisfaction: 3.2,
    joinDate: "2020-05-25",
    lastContact: "2024-08-15",
    contractValue: "$0",
    paymentTerms: "Net 30",
    churnReason: "Budget constraints and internal restructuring"
  },
  {
    id: "CLI-006",
    name: "EduTech Solutions",
    industry: "Education Technology",
    status: "Active",
    avatar: "/api/placeholder/40/40",
    contact: "Robert Martinez",
    email: "robert.martinez@edutech.com",
    phone: "+1 (555) 222-3333",
    website: "edutechsolutions.com",
    address: "987 Learning Lane, Austin, TX 78701",
    projects: 3,
    activeProjects: 2,
    totalBilled: 125000,
    satisfaction: 4.4,
    joinDate: "2023-06-12",
    lastContact: "2024-11-15",
    contractValue: "$300,000",
    paymentTerms: "Net 30"
  }
];

export const monthlyRevenueData = [
  { month: "Jan", revenue: 120000, expenses: 85000, profit: 35000 },
  { month: "Feb", revenue: 150000, expenses: 95000, profit: 55000 },
  { month: "Mar", revenue: 175000, expenses: 110000, profit: 65000 },
  { month: "Apr", revenue: 160000, expenses: 105000, profit: 55000 },
  { month: "May", revenue: 190000, expenses: 125000, profit: 65000 },
  { month: "Jun", revenue: 210000, expenses: 140000, profit: 70000 },
  { month: "Jul", revenue: 230000, expenses: 150000, profit: 80000 },
  { month: "Aug", revenue: 220000, expenses: 145000, profit: 75000 },
  { month: "Sep", revenue: 250000, expenses: 165000, profit: 85000 },
  { month: "Oct", revenue: 280000, expenses: 180000, profit: 100000 },
  { month: "Nov", revenue: 300000, expenses: 190000, profit: 110000 },
  { month: "Dec", revenue: 320000, expenses: 200000, profit: 120000 }
];

export const clientAcquisitionData = [
  { month: "Jan", newClients: 5, lostClients: 1, netGrowth: 4 },
  { month: "Feb", newClients: 7, lostClients: 2, netGrowth: 5 },
  { month: "Mar", newClients: 10, lostClients: 1, netGrowth: 9 },
  { month: "Apr", newClients: 8, lostClients: 3, netGrowth: 5 },
  { month: "May", newClients: 12, lostClients: 2, netGrowth: 10 },
  { month: "Jun", newClients: 15, lostClients: 4, netGrowth: 11 },
  { month: "Jul", newClients: 14, lostClients: 2, netGrowth: 12 },
  { month: "Aug", newClients: 18, lostClients: 5, netGrowth: 13 },
  { month: "Sep", newClients: 20, lostClients: 3, netGrowth: 17 },
  { month: "Oct", newClients: 22, lostClients: 4, netGrowth: 18 },
  { month: "Nov", newClients: 25, lostClients: 2, netGrowth: 23 },
  { month: "Dec", newClients: 28, lostClients: 3, netGrowth: 25 }
];

export const goals = [
  {
    id: "1",
    title: "Increase Quarterly Revenue by 15%",
    metric: "Revenue",
    target: 350000,
    current: 310000,
    owner: "Sales Team",
    status: "On Track",
    icon: "DollarSign",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    progress: 88.6,
    milestones: [
      { id: 1, description: "Secure 3 new enterprise clients", completed: true, completedDate: "2024-11-15" },
      { id: 2, description: "Launch new product feature", completed: false, dueDate: "2024-12-10" },
      { id: 3, description: "Expand into new market segment", completed: false, dueDate: "2024-12-20" },
    ],
    comments: [
      { id: 1, author: "John Doe", date: "2024-11-20", text: "Sales team is pushing hard, expect to hit target by end of month." },
      { id: 2, author: "Jane Smith", date: "2024-11-15", text: "Need to re-evaluate marketing spend for new feature launch." },
    ]
  },
  {
    id: "2",
    title: "Achieve 95% Client Retention Rate",
    metric: "Retention Rate",
    target: 95,
    current: 94.2,
    owner: "Account Management",
    status: "On Track",
    icon: "Users",
    startDate: "2024-09-01",
    endDate: "2025-02-28",
    progress: 99.2,
    milestones: [
      { id: 1, description: "Implement new client feedback system", completed: true, completedDate: "2024-10-15" },
      { id: 2, description: "Conduct quarterly client check-ins", completed: true, completedDate: "2024-11-30" },
      { id: 3, description: "Develop personalized retention strategies", completed: false, dueDate: "2025-01-15" },
    ],
    comments: [
      { id: 1, author: "Emily White", date: "2024-11-22", text: "Client feedback system is showing positive results." },
      { id: 2, author: "Tom Rodriguez", date: "2024-11-28", text: "Quarterly check-ins completed with 98% client satisfaction." },
    ]
  },
  {
    id: "3",
    title: "Improve Profit Margin to 50%",
    metric: "Profit Margin",
    target: 50,
    current: 48.2,
    owner: "Finance Department",
    status: "At Risk",
    icon: "TrendingUp",
    startDate: "2024-08-01",
    endDate: "2024-12-31",
    progress: 96.4,
    milestones: [
      { id: 1, description: "Optimize operational costs", completed: false, dueDate: "2024-12-15" },
      { id: 2, description: "Negotiate better vendor contracts", completed: false, dueDate: "2024-12-20" },
      { id: 3, description: "Implement cost tracking system", completed: true, completedDate: "2024-10-30" },
    ],
    comments: [
      { id: 1, author: "David Green", date: "2024-11-25", text: "Operational costs are still high, need to review Q3 spending." },
      { id: 2, author: "Sarah Wilson", date: "2024-11-20", text: "New cost tracking system shows promise for better control." },
    ]
  },
  {
    id: "4",
    title: "Launch 5 New Key Projects",
    metric: "Projects Launched",
    target: 5,
    current: 4,
    owner: "Project Management",
    status: "On Track",
    icon: "Target",
    startDate: "2024-09-01",
    endDate: "2024-12-31",
    progress: 80,
    milestones: [
      { id: 1, description: "Finalize project proposals", completed: true, completedDate: "2024-10-01" },
      { id: 2, description: "Allocate resources for new projects", completed: true, completedDate: "2024-10-15" },
      { id: 3, description: "Kick-off meeting for Project Alpha", completed: true, completedDate: "2024-11-01" },
      { id: 4, description: "Kick-off meeting for Project Beta", completed: false, dueDate: "2024-12-10" },
    ],
    comments: [
      { id: 1, author: "Sarah Brown", date: "2024-11-18", text: "Project Beta kick-off delayed due to resource availability." },
      { id: 2, author: "Mike Johnson", date: "2024-11-25", text: "Healthcare portal project officially launched as our 4th key project." },
    ]
  }
];

export const tasks = [
  {
    id: "TSK-001",
    title: "Design Logo Concepts",
    description: "Create 5 initial logo concepts for TechCorp brand redesign",
    projectId: "PRJ-001",
    assignedTo: "Sarah Wilson",
    status: "Completed",
    priority: "High",
    dueDate: "2024-11-15",
    completedDate: "2024-11-12",
    estimatedHours: 16,
    actualHours: 14,
    tags: ["Design", "Branding"]
  },
  {
    id: "TSK-002",
    title: "Database Schema Design",
    description: "Design database schema for e-commerce platform",
    projectId: "PRJ-002",
    assignedTo: "Alex Thompson",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-12-05",
    estimatedHours: 24,
    actualHours: 8,
    tags: ["Development", "Database"],
    parentId: null
  },
  {
    id: "TSK-005",
    title: "Create User Table",
    description: "Define and create the user table with all necessary fields.",
    projectId: "PRJ-002",
    assignedTo: "Alex Thompson",
    status: "In Progress",
    priority: "High",
    dueDate: "2024-11-30",
    estimatedHours: 8,
    actualHours: 4,
    tags: ["Development", "Database"],
    parentId: "TSK-002"
  },
  {
    id: "TSK-006",
    title: "Create Products Table",
    description: "Define and create the products table for the e-commerce platform.",
    projectId: "PRJ-002",
    assignedTo: "Alex Thompson",
    status: "To Do",
    priority: "High",
    dueDate: "2024-12-02",
    estimatedHours: 8,
    actualHours: 0,
    tags: ["Development", "Database"],
    parentId: "TSK-002",
    dependsOn: ["TSK-005"]

  },
  {
    id: "TSK-003",
    title: "User Testing Sessions",
    description: "Conduct user testing for mobile app interface",
    projectId: "PRJ-003",
    assignedTo: "David Kim",
    status: "In Review",
    priority: "Medium",
    dueDate: "2024-11-30",
    estimatedHours: 20,
    actualHours: 18,
    tags: ["Testing", "UX"]
  },
  {
    id: "TSK-004",
    title: "Content Strategy Plan",
    description: "Develop content strategy for healthcare portal",
    projectId: "PRJ-005",
    assignedTo: "James Wilson",
    status: "To Do",
    priority: "Medium",
    dueDate: "2024-12-10",
    estimatedHours: 12,
    actualHours: 0,
    tags: ["Content", "Strategy"]
  }
];

export const integrations = [
  {
    id: 1,
    name: "Accounting Software",
    provider: "QuickBooks",
    description: "Automate financial data sync, streamline invoicing, and get real-time financial reports.",
    status: "Not Connected",
    category: "Finance",
    icon: "Calculator",
    setupComplexity: "Medium",
    monthlyFee: "$29.99"
  },
  {
    id: 2,
    name: "CRM System",
    provider: "HubSpot",
    description: "Sync client data, track sales pipelines, and personalize client communications.",
    status: "Connected",
    category: "Sales & Marketing",
    icon: "Users",
    setupComplexity: "Easy",
    monthlyFee: "$45.00",
    connectedDate: "2024-09-15"
  },
  {
    id: 3,
    name: "Project Management",
    provider: "Asana",
    description: "Centralize project tasks, track progress, and manage team workloads efficiently.",
    status: "Not Connected",
    category: "Project Management",
    icon: "CheckCircle",
    setupComplexity: "Easy",
    monthlyFee: "$24.99"
  },
  {
    id: 4,
    name: "Time Tracking",
    provider: "Toggl",
    description: "Track time spent on projects and generate detailed productivity reports.",
    status: "Connected",
    category: "Productivity",
    icon: "Clock",
    setupComplexity: "Easy",
    monthlyFee: "$15.00",
    connectedDate: "2024-08-20"
  },
  {
    id: 5,
    name: "Communication Platform",
    provider: "Slack",
    description: "Streamline team communication and project collaboration.",
    status: "Connected",
    category: "Communication",
    icon: "MessageCircle",
    setupComplexity: "Easy",
    monthlyFee: "$8.75",
    connectedDate: "2024-07-10"
  },
  {
    id: 6,
    name: "Cloud Storage",
    provider: "Google Drive",
    description: "Centralized file storage and sharing for all projects and teams.",
    status: "Connected",
    category: "Storage",
    icon: "Cloud",
    setupComplexity: "Easy",
    monthlyFee: "$12.00",
    connectedDate: "2024-06-01"
  }
];

export const timeEntries = [
  {
    id: "TIME-001",
    employeeId: 1,
    employeName: "Sarah Wilson",
    projectId: "PRJ-001",
    projectName: "TechCorp Brand Redesign",
    taskId: "TSK-001",
    taskName: "Design Logo Concepts",
    date: "2024-11-25",
    hours: 8,
    description: "Worked on initial logo concepts and brand guidelines",
    billable: true,
    hourlyRate: 85
  },
  {
    id: "TIME-002",
    employeeId: 2,
    employeName: "Mike Johnson",
    projectId: "PRJ-005",
    projectName: "Healthcare Portal Development",
    taskId: null,
    taskName: "Backend Development",
    date: "2024-11-25",
    hours: 7.5,
    description: "Implemented user authentication and authorization system",
    billable: true,
    hourlyRate: 95
  },
  {
    id: "TIME-003",
    employeeId: 5,
    employeName: "Lisa Chen",
    projectId: "PRJ-003",
    projectName: "Mobile App UI/UX",
    taskId: "TSK-003",
    taskName: "User Interface Design",
    date: "2024-11-24",
    hours: 6,
    description: "Created wireframes and mockups for mobile app screens",
    billable: true,
    hourlyRate: 75
  },
  {
    id: "TIME-004",
    employeeId: 3,
    employeName: "Emma Davis",
    projectId: "PRJ-002",
    projectName: "E-commerce Platform",
    taskId: null,
    taskName: "Market Research",
    date: "2024-11-24",
    hours: 4,
    description: "Conducted competitor analysis and market positioning research",
    billable: true,
    hourlyRate: 80
  }
];

export const invoices = [
  {
    id: "INV-001",
    projectId: "PRJ-001",
    projectName: "TechCorp Brand Redesign",
    invoiceNumber: "AGF-2024-001",
    issuedAt: "2024-11-01",
    dueDate: "2024-12-01",
    status: "Paid",
    amount: 15750,
    paidDate: "2024-11-25",
    items: [
      {
        description: "Brand Strategy & Research",
        quantity: 40,
        rate: 85,
        amount: 3400
      },
      {
        description: "Logo Design & Concepts",
        quantity: 60,
        rate: 85,
        amount: 5100
      },
      {
        description: "Brand Guidelines Development",
        quantity: 85,
        rate: 85,
        amount: 7225
      }
    ]
  },
  {
    id: "INV-002",
    projectId: "PRJ-003",
    projectName: "Mobile App UI/UX",
    invoiceNumber: "AGF-2024-002",
    issuedAt: "2024-11-15",
    dueDate: "2024-11-30",
    status: "Pending",
    amount: 12600,
    items: [
      {
        description: "UX Research & Analysis",
        quantity: 48,
        rate: 75,
        amount: 3600
      },
      {
        description: "UI Design & Prototyping",
        quantity: 120,
        rate: 75,
        amount: 9000
      }
    ]
  },
  {
    id: "INV-003",
    projectId: "PRJ-005",
    projectName: "Healthcare Portal Development",
    invoiceNumber: "AGF-2024-003",
    issuedAt: "2024-11-20",
    dueDate: "2024-12-20",
    status: "Draft",
    amount: 18500,
    items: [
      {
        description: "Backend Development",
        quantity: 120,
        rate: 95,
        amount: 11400
      },
      {
        description: "Database Design",
        quantity: 45,
        rate: 90,
        amount: 4050
      },
      {
        description: "API Development",
        quantity: 35,
        rate: 90,
        amount: 3150
      }
    ]
  }
];

export const expenses = [
  {
    id: "EXP-001",
    date: "2024-11-20",
    category: "Software",
    description: "Adobe Creative Cloud Team License",
    amount: 299.99,
    projectId: "PRJ-001",
    employeeId: 1,
    employeeName: "Sarah Wilson",
    status: "Approved",
    receipt: true,
    billable: true
  },
  {
    id: "EXP-002",
    date: "2024-11-18",
    category: "Travel",
    description: "Client meeting - Flight to Chicago",
    amount: 425.00,
    projectId: "PRJ-003",
    employeeId: 3,
    employeeName: "Emma Davis",
    status: "Pending",
    receipt: true,
    billable: true
  },
  {
    id: "EXP-003",
    date: "2024-11-15",
    category: "Office Supplies",
    description: "Design materials and equipment",
    amount: 156.78,
    projectId: null,
    employeeId: 5,
    employeeName: "Lisa Chen",
    status: "Approved",
    receipt: true,
    billable: false
  },
  {
    id: "EXP-004",
    date: "2024-11-22",
    category: "Software",
    description: "Figma Professional Plan",
    amount: 144.00,
    projectId: "PRJ-006",
    employeeId: 5,
    employeeName: "Lisa Chen",
    status: "Approved",
    receipt: true,
    billable: true
  }
];

export const meetings = [
  {
    id: "MTG-001",
    title: "Project Kickoff - Healthcare Portal",
    date: "2024-12-02",
    time: "10:00 AM",
    duration: 90,
    type: "Project Kickoff",
    projectId: "PRJ-005",
    clientId: "CLI-004",
    attendees: [
      { id: 2, name: "Mike Johnson", role: "Lead Developer" },
      { id: 6, name: "Alex Thompson", role: "Full Stack Developer" },
      { id: 4, name: "Tom Rodriguez", role: "Account Director" }
    ],
    location: "Conference Room A",
    status: "Scheduled",
    agenda: [
      "Project overview and objectives",
      "Technical requirements review",
      "Timeline and milestones",
      "Team roles and responsibilities"
    ]
  },
  {
    id: "MTG-002",
    title: "Weekly Team Standup - Creative",
    date: "2024-11-28",
    time: "9:00 AM",
    duration: 30,
    type: "Team Meeting",
    recurring: "Weekly",
    attendees: [
      { id: 1, name: "Sarah Wilson", role: "Creative Director" },
      { id: 5, name: "Lisa Chen", role: "Senior Designer" }
    ],
    location: "Virtual - Zoom",
    status: "Completed",
    notes: "Discussed progress on TechCorp brand redesign and resource allocation for upcoming projects."
  },
  {
    id: "MTG-003",
    title: "Client Review - Mobile App Design",
    date: "2024-12-05",
    time: "2:00 PM",
    duration: 60,
    type: "Client Review",
    projectId: "PRJ-003",
    clientId: "CLI-003",
    attendees: [
      { id: 5, name: "Lisa Chen", role: "Senior Designer" },
      { id: 8, name: "David Kim", role: "UX Researcher" },
      { id: 4, name: "Tom Rodriguez", role: "Account Director" }
    ],
    location: "Client Office",
    status: "Scheduled",
    agenda: [
      "Present final UI designs",
      "Review user testing feedback",
      "Discuss implementation timeline",
      "Next steps and approval process"
    ]
  }
];

export const notifications = [
  {
    id: "NOT-001",
    type: "deadline",
    title: "Project Deadline Approaching",
    message: "Mobile App UI/UX project is due in 2 days",
    projectId: "PRJ-003",
    priority: "high",
    read: false,
    timestamp: "2024-11-28T14:30:00Z",
    actionRequired: true
  },
  {
    id: "NOT-002",
    type: "payment",
    title: "Invoice Payment Received",
    message: "Payment of $15,750 received from TechCorp Inc.",
    clientId: "CLI-001",
    priority: "medium",
    read: false,
    timestamp: "2024-11-25T10:15:00Z",
    actionRequired: false
  },
  {
    id: "NOT-003",
    type: "team",
    title: "New Team Member Added",
    message: "David Kim has been assigned to Strategy Team",
    employeeId: 8,
    priority: "low",
    read: true,
    timestamp: "2024-11-20T09:00:00Z",
    actionRequired: false
  },
  {
    id: "NOT-004",
    type: "expense",
    title: "Expense Report Pending",
    message: "Travel expense from Emma Davis requires approval",
    expenseId: "EXP-002",
    priority: "medium",
    read: false,
    timestamp: "2024-11-18T16:45:00Z",
    actionRequired: true
  }
];

export const reports = [
  {
    id: "RPT-001",
    title: "Monthly Revenue Report - November 2024",
    type: "Financial",
    generatedBy: "System",
    generatedDate: "2024-12-01",
    period: "November 2024",
    data: {
      totalRevenue: 300000,
      totalExpenses: 190000,
      netProfit: 110000,
      profitMargin: 36.7,
      topPerformingProjects: ["PRJ-001", "PRJ-005"],
      departmentBreakdown: {
        creative: 125000,
        development: 100000,
        strategy: 45000,
        account: 30000
      }
    }
  },
  {
    id: "RPT-002",
    title: "Team Utilization Report - Q4 2024",
    type: "Resource",
    generatedBy: "Sarah Wilson",
    generatedDate: "2024-11-30",
    period: "Q4 2024",
    data: {
      averageUtilization: 87.2,
      highestUtilization: { employee: "Mike Johnson", rate: 95 },
      lowestUtilization: { employee: "David Kim", rate: 79 },
      departmentUtilization: {
        creative: 89,
        development: 91,
        strategy: 80.5,
        account: 86.5
      }
    }
  },
  {
    id: "RPT-003",
    title: "Client Satisfaction Analysis - 2024",
    type: "Client",
    generatedBy: "Tom Rodriguez",
    generatedDate: "2024-11-25",
    period: "2024 YTD",
    data: {
      averageSatisfaction: 4.5,
      totalResponseRate: 89,
      topRatedClient: { name: "HealthWell Group", rating: 5.0 },
      improvementNeeded: { name: "Global Foods", rating: 3.2 },
      satisfactionTrends: "Upward trend in Q4 with 12% improvement"
    }
  }
];

export const risks = [
  {
    id: "RSK-001",
    title: "Key Personnel Departure",
    description: "Lead developer for the e-commerce platform is a flight risk, potentially leaving mid-project.",
    projectId: "PRJ-002",
    projectName: "E-commerce Platform",
    status: "Mitigated",
    impact: "High",
    probability: "Medium",
    score: 15,
    owner: "Mike Johnson",
    mitigationPlan: "Knowledge transfer sessions are in progress. Secondary developer (Alex Thompson) is being trained to take over if necessary. Retention bonus has been offered.",
    lastUpdate: "2024-11-25"
  },
  {
    id: "RSK-002",
    title: "Budget Overrun on Branding Project",
    description: "Scope creep and additional client requests are pushing the TechCorp Brand Redesign project over budget.",
    projectId: "PRJ-001",
    projectName: "TechCorp Brand Redesign",
    status: "Active",
    impact: "Medium",
    probability: "High",
    score: 18,
    owner: "Sarah Wilson",
    mitigationPlan: "A change order for additional work has been sent to the client. Non-essential tasks are being deprioritized. Weekly budget reviews are in place.",
    lastUpdate: "2024-11-28"
  },
  {
    id: "RSK-003",
    title: "Third-Party API Instability",
    description: "The payment gateway API for the FinanceApp has been experiencing intermittent downtime, which could delay testing and launch.",
    projectId: "PRJ-003",
    projectName: "Mobile App UI/UX",
    status: "Active",
    impact: "High",
    probability: "Low",
    score: 10,
    owner: "David Kim",
    mitigationPlan: "Developing a fallback mechanism to handle API downtime. Communication channel established with the API provider's technical team. Exploring alternative providers as a backup.",
    lastUpdate: "2024-11-27"
  },
  {
    id: "RSK-004",
    title: "Delayed Client Feedback",
    description: "Client (HealthWell Group) has been slow to provide feedback on initial designs, potentially delaying the entire Healthcare Portal timeline.",
    projectId: "PRJ-005",
    projectName: "Healthcare Portal Development",
    status: "New",
    impact: "Medium",
    probability: "Medium",
    score: 12,
    owner: "Tom Rodriguez",
    mitigationPlan: "Schedule a dedicated weekly review meeting with the client. Clearly communicate the impact of delays on the project timeline and budget.",
    lastUpdate: "2024-11-26"
  }
];

export const settings = {
  company: {
    name: "Future Analytics Inc.",
    website: "https://futureanalytics.com",
    address: "123 Innovation Drive, Tech City, TC 12345",
    logo: "/api/placeholder/256/256",
    description: "Leading data analytics solutions provider",
    industry: "Technology",
    size: "51-200",
    founded: "2020"
  },
  branding: {
    primaryColor: "#6D28D9",
    secondaryColor: "#EC4899",
    logoUrl: "/api/placeholder/256/256",
    favicon: "/api/placeholder/32/32",
    customCSS: ""
  },
  notifications: {
    emailNotifications: true,
    projectDeadlines: true,
    teamUpdates: false,
    systemMaintenance: true,
    securityAlerts: true,
    weeklyReports: false,
    frequency: "immediate"
  },
  billing: {
    currency: "USD",
    taxRate: 8.5,
    paymentTerms: "Net 30",
    invoicePrefix: "INV-2024",
    autoRenewal: true,
    billingAddress: "123 Innovation Drive, Tech City, TC 12345",
    paymentMethod: "Credit Card ending in 4242"
  },
  security: {
    enforce2FA: true,
    sessionTimeout: 120,
    passwordPolicy: {
      minLength: 8,
      requireSpecialChars: true,
      requireNumbers: true,
      requireUppercase: true
    },
    ipWhitelist: [],
    auditLogging: true,
    dataRetention: 365
  }
};

export const securityRoles = [
  { id: "OWNER", role: "Owner", description: "Full system access", color: "destructive" },
  { id: "ADMIN", role: "Admin", description: "Administrative access", color: "default" },
  { id: "MANAGER", role: "Manager", description: "Team management", color: "secondary" },
  { id: "MEMBER", role: "Member", description: "Basic access", color: "outline" }
];

export const permissionMatrix = [
  { permission: "Create Projects", owner: true, admin: true, manager: true, member: false },
  { permission: "Delete Projects", owner: true, admin: true, manager: false, member: false },
  { permission: "Manage Users", owner: true, admin: true, manager: false, member: false },
  { permission: "View Reports", owner: true, admin: true, manager: true, member: true },
  { permission: "Export Data", owner: true, admin: true, manager: true, member: false },
  { permission: "System Settings", owner: true, admin: false, manager: false, member: false },
  { permission: "Billing Access", owner: true, admin: true, manager: false, member: false },
  { permission: "Security Settings", owner: true, admin: false, manager: false, member: false }
];

export const complianceData = [
  { standard: "GDPR", status: "Compliant", score: "98%", color: "text-green-600" },
  { standard: "SOC 2", status: "Compliant", score: "95%", color: "text-green-600" },
  { standard: "ISO 27001", status: "In Progress", score: "87%", color: "text-amber-600" },
  { standard: "HIPAA", status: "Not Applicable", score: "N/A", color: "text-gray-600" }
];

export const auditLogs = [
  {
    id: "LOG-001",
    timestamp: "2024-11-28T14:35:10Z",
    user: "sarah.wilson@agencyflow.com",
    action: "User Login",
    resource: "Authentication",
    ip: "192.168.1.10",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    status: "Success",
    payload: null,
  },
  {
    id: "LOG-002",
    timestamp: "2024-11-28T14:30:00Z",
    user: "mike.johnson@agencyflow.com",
    action: "Update Project Status",
    resource: "Project PRJ-001",
    ip: "10.0.0.54",
    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    status: "Success",
    payload: {
      before: { status: "In Progress" },
      after: { status: "In Review" },
    }
  },
  {
    id: "LOG-003",
    timestamp: "2024-11-28T13:05:00Z",
    user: "system",
    action: "Invoice Generated",
    resource: "Invoice INV-003",
    ip: "127.0.0.1",
    userAgent: "System Process",
    status: "Success",
    payload: null,
  },
  {
    id: "LOG-004",
    timestamp: "2024-11-28T11:15:00Z",
    user: "unknown",
    action: "Failed Login Attempt",
    resource: "Authentication",
    ip: "203.0.113.45",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    status: "Failed",
    payload: { reason: "Invalid credentials" },
  },
  {
    id: "LOG-005",
    timestamp: "2024-11-27T18:00:00Z",
    user: "emma.davis@agencyflow.com",
    action: "Delete Task",
    resource: "Task TSK-007",
    ip: "192.168.1.15",
    userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/96.0.4664.45 Safari/537.36",
    status: "Success",
    payload: {
      deleted: { id: "TSK-007", title: "Draft Q1 Marketing Report" }
    }
  },
  {
    id: "LOG-006",
    timestamp: "2024-11-25T10:15:00Z",
    user: "system",
    action: "Payment Received",
    resource: "Invoice INV-001",
    ip: "127.0.0.1",
    userAgent: "System Process",
    status: "Success",
    payload: { amount: 15750, method: "Stripe" },
  },
];

export const backupHistory = [
  {
    id: "BKP-001",
    type: "Full System Backup",
    timestamp: "2024-11-28T02:00:00Z",
    size: "2.4 GB",
    status: "Completed",
    duration: "45 minutes",
  },
  {
    id: "BKP-002",
    type: "Incremental Backup",
    timestamp: "2024-11-27T02:00:00Z",
    size: "150 MB",
    status: "Completed",
    duration: "5 minutes",
  },
  {
    id: "BKP-003",
    type: "Incremental Backup",
    timestamp: "2024-11-26T02:05:00Z",
    size: "145 MB",
    status: "Failed",
    duration: "7 minutes",
    error: "Connection to storage server failed.",
  },
  {
    id: "BKP-004",
    type: "Full System Backup",
    timestamp: "2024-11-21T02:00:00Z",
    size: "2.3 GB",
    status: "Completed",
    duration: "42 minutes",
  },
];

export const systemMetrics = [
  {
    name: "CPU Utilization",
    value: 78,
    status: "warning",
  },
  {
    name: "Memory Usage",
    value: 62,
    status: "healthy",
  },
  {
    name: "Database Connections",
    value: 92,
    status: "critical",
  },
  {
    name: "API Response Time",
    value: 245, // in ms
    status: "healthy",
  },
  {
    name: "Network Throughput",
    value: 85, // in %
    status: "healthy",
  },
];

export const services = [
  {
    name: "Authentication Service",
    status: "running",
    uptime: "99.99%",
    lastCheck: "2 minutes ago",
  },
  {
    name: "Project Management API",
    status: "running",
    uptime: "99.98%",
    lastCheck: "1 minute ago",
  },
  {
    name: "Notification Service",
    status: "warning",
    uptime: "99.80%",
    lastCheck: "5 minutes ago",
  },
  {
    name: "Billing & Invoicing",
    status: "running",
    uptime: "99.99%",
    lastCheck: "3 minutes ago",
  },
  {
    name: "Client Portal",
    status: "error",
    uptime: "98.50%",
    lastCheck: "1 minute ago",
  },
];

export const contracts = [
  {
    id: "CTR-001",
    title: "Master Service Agreement",
    clientName: "TechCorp Inc.",
    clientId: "CLI-001",
    status: "Active",
    startDate: "2022-03-15",
    endDate: "2025-03-14",
    renewalDate: "2025-02-12",
    value: 500000,
    documentUrl: "/mock-document.pdf",
  },
  {
    id: "CTR-002",
    title: "Project Agreement - E-commerce Platform",
    clientName: "RetailBrand Co.",
    clientId: "CLI-002",
    status: "Active",
    startDate: "2021-09-01",
    endDate: "2025-08-31",
    renewalDate: "2025-07-31",
    value: 750000,
    documentUrl: "/mock-document.pdf",
  },
  {
    id: "CTR-003",
    title: "Retainer Agreement Q4 2024",
    clientName: "FinanceApp Ltd.",
    clientId: "CLI-003",
    status: "Expiring Soon",
    startDate: "2024-10-01",
    endDate: "2024-12-31",
    renewalDate: "2024-12-01",
    value: 100000,
    documentUrl: "/mock-document.pdf",
  },
  {
    id: "CTR-004",
    title: "Vendor Agreement - Cloud Services",
    clientName: "AWS",
    clientId: null,
    status: "Active",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    renewalDate: "2025-11-30",
    value: 50000,
    documentUrl: "/mock-document.pdf",
  },
  {
    id: "CTR-005",
    title: "Past Project - Global Foods",
    clientName: "Global Foods",
    clientId: "CLI-005",
    status: "Expired",
    startDate: "2020-05-25",
    endDate: "2022-05-24",
    renewalDate: null,
    value: 450000,
    documentUrl: "/mock-document.pdf",
  },
];

export const strategicRoadmap = [
  {
    id: "RM-01",
    title: "Launch New SaaS Product",
    description: "Develop and launch a new recurring revenue product based on our internal tools.",
    quarter: "Q1",
    year: 2025,
    status: "On Track",
    goalId: "1",
  },
  {
    id: "RM-02",
    title: "Expand to Southeast Asia Market",
    description: "Initial market research and establishing a local presence.",
    quarter: "Q1",
    year: 2025,
    status: "On Track",
    goalId: "1",
  },
  {
    id: "RM-03",
    title: "Achieve SOC 2 Type II Certification",
    description: "Complete the audit process to enhance security and compliance.",
    quarter: "Q2",
    year: 2025,
    status: "Not Started",
    goalId: "3",
  },
  {
    id: "RM-04",
    title: "Reduce Client Churn by 50%",
    description: "Implement new client retention strategies and improve onboarding.",
    quarter: "Q2",
    year: 2025,
    status: "Not Started",
    goalId: "2",
  },
  {
    id: "RM-05",
    title: "Hire 10 Senior Engineers",
    description: "Scale up the development team to handle new projects and the SaaS product.",
    quarter: "Q3",
    year: 2025,
    status: "Not Started",
    goalId: "4",
  },
];

export const salesLeads = [
  {
    id: "LEAD-001",
    companyName: "Innovate Solutions",
    contactPerson: "John Doe",
    potentialValue: 75000,
    status: "Proposal",
    probability: 70,
    lastContactDate: "2024-11-25",
    expectedCloseDate: "2025-01-15",
  },
  {
    id: "LEAD-002",
    companyName: "Data Systems Co.",
    contactPerson: "Jane Smith",
    potentialValue: 120000,
    status: "Qualified",
    probability: 50,
    lastContactDate: "2024-11-28",
    expectedCloseDate: "2025-02-20",
  },
  {
    id: "LEAD-003",
    companyName: "Creative Minds Agency",
    contactPerson: "Peter Jones",
    potentialValue: 45000,
    status: "Prospect",
    probability: 25,
    lastContactDate: "2024-11-15",
    expectedCloseDate: "2025-03-10",
  },
  {
    id: "LEAD-004",
    companyName: "NextGen Tech",
    contactPerson: "Emily White",
    potentialValue: 250000,
    status: "Negotiation",
    probability: 85,
    lastContactDate: "2024-11-29",
    expectedCloseDate: "2025-01-25",
  },
  {
    id: "LEAD-005",
    companyName: "Health Analytics Inc.",
    contactPerson: "Michael Brown",
    potentialValue: 95000,
    status: "Qualified",
    probability: 45,
    lastContactDate: "2024-11-22",
    expectedCloseDate: "2025-04-05",
  },
  {
    id: "LEAD-006",
    companyName: "Market Leaders LLC",
    contactPerson: "Sarah Green",
    potentialValue: 60000,
    status: "Prospect",
    probability: 20,
    lastContactDate: "2024-11-10",
    expectedCloseDate: "2025-05-20",
  },
  {
    id: "LEAD-007",
    companyName: "E-commerce Gurus",
    contactPerson: "David Lee",
    potentialValue: 150000,
    status: "Proposal",
    probability: 65,
    lastContactDate: "2024-11-26",
    expectedCloseDate: "2025-02-28",
  },
];

export const chatChannels = [
  { id: 'C1', name: '#announcements', type: 'group', unread: 1 },
  { id: 'C2', name: '#prj-ecommerce', type: 'group', unread: 0 },
  { id: 'C3', name: '#creative-team', type: 'group', unread: 3 },
  { id: 'C4', name: '#random', type: 'group', unread: 0 },
  { id: 'D1', name: 'Sarah Wilson', type: 'dm', unread: 2, avatar: '/api/placeholder/40/40' },
  { id: 'D2', name: 'Mike Johnson', type: 'dm', unread: 0, avatar: '/api/placeholder/40/40' },
  { id: 'D3', name: 'Tom Rodriguez', type: 'dm', unread: 1, avatar: '/api/placeholder/40/40' },
];

export const chatMessages = [
  // Announcements
  { id: 'M1', channelId: 'C1', author: 'Owner', avatar: '/api/placeholder/40/40', content: 'Team, great work on Q4 goals! Let\'s keep up the momentum.', timestamp: '10:00 AM' },
  // Project E-commerce
  { id: 'M2', channelId: 'C2', author: 'Tom Rodriguez', avatar: '/api/placeholder/40/40', content: 'Client just approved the wireframes.', timestamp: '9:30 AM' },
  { id: 'M3', channelId: 'C2', author: 'Mike Johnson', avatar: '/api/placeholder/40/40', content: 'Great! I\'ll start scaffolding the backend components.', timestamp: '9:32 AM' },
  // Creative Team
  { id: 'M4', channelId: 'C3', author: 'Lisa Chen', avatar: '/api/placeholder/40/40', content: 'Does anyone have the latest font files for the TechCorp redesign?', timestamp: '11:15 AM' },
  { id: 'M5', channelId: 'C3', author: 'Sarah Wilson', avatar: '/api/placeholder/40/40', content: 'Check the shared Google Drive folder, I uploaded them this morning.', timestamp: '11:16 AM' },
  { id: 'M6', channelId: 'C3', author: 'David Kim', avatar: '/api/placeholder/40/40', content: 'Found them, thanks!', timestamp: '11:18 AM' },
  // DM with Sarah Wilson
  { id: 'M7', channelId: 'D1', author: 'Owner', avatar: '/api/placeholder/40/40', content: 'Can we get a status update on the TechCorp project?', timestamp: '2:00 PM' },
  { id: 'M8', channelId: 'D1', author: 'Sarah Wilson', avatar: '/api/placeholder/40/40', content: 'Things are going well. We are on track to present the final concepts by Friday.', timestamp: '2:05 PM' },
  // DM with Tom Rodriguez
  { id: 'M9', channelId: 'D3', author: 'Tom Rodriguez', avatar: '/api/placeholder/40/40', content: 'FYI, the client for the e-commerce platform has requested a meeting for tomorrow.', timestamp: '3:30 PM' },
];

// Utility functions for data manipulation
export const getProjectsByStatus = (status) => {
  return projects.filter(project => project.status === status);
};

export const getActiveProjects = () => {
  return projects.filter(project => project.status !== "Completed");
};

export const getTeamMembersByDepartment = (departmentId) => {
  return teamMembers.filter(member => member.departmentId === departmentId);
};

export const getClientsByStatus = (status) => {
  return clients.filter(client => client.status === status);
};

export const getTotalRevenue = () => {
  return monthlyRevenueData.reduce((total, month) => total + month.revenue, 0);
};

export const getOverdueInvoices = () => {
  const today = new Date();
  return invoices.filter(invoice => 
    invoice.status === "Pending" && new Date(invoice.dueDate) < today
  );
};

export const getUnreadNotifications = () => {
  return notifications.filter(notification => !notification.read);
};

export const getUpcomingDeadlines = () => {
  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
  
  return projects.filter(project => {
    const endDate = new Date(project.endDate);
    return endDate >= today && endDate <= nextWeek && project.status !== "Completed";
  });
};