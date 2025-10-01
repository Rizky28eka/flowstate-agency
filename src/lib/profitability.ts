import { projects, invoices, expenses, timeEntries, teamMembers } from './mock-data';

// --- INTERFACES ---
export interface RevenueItem {
  id: string;
  description: string;
  amount: number;
  status: string;
  date: string;
}

export interface CostItem {
  id: string;
  type: 'Time Cost' | 'Direct Expense';
  description: string;
  date: string;
  cost: number;
}

export interface ProjectFinancials {
  projectId: string;
  projectName: string;
  clientName: string;
  totalRevenue: number;
  totalCosts: number;
  netProfit: number;
  profitMargin: number;
  budget: number;
  budgetUsage: number;
  revenueItems: RevenueItem[];
  costItems: CostItem[];
}

// --- LOGIC ---

/**
 * Calculates an estimated internal hourly cost rate for an employee based on their salary.
 * PROFESSIONAL ASSUMPTION: This assumes a standard 2080 work hours in a year (40 hours/week * 52 weeks).
 * In a real-world scenario, this rate would be a configurable value per employee.
 */
const getInternalCostRate = (salary: string): number => {
  const numericSalary = parseFloat(salary.replace(/[^0-9.-]+/g, ""));
  if (isNaN(numericSalary) || numericSalary === 0) return 75; // Default rate if salary is invalid
  return numericSalary / 2080;
};

/**
 * Fetches and calculates all financial data for a given project ID.
 * This function acts as a service layer, aggregating data from multiple sources.
 */
export const getFinancialsForProject = (projectId: string): ProjectFinancials | null => {
  const project = projects.find(p => p.id === projectId);
  if (!project) return null;

  // 1. Calculate Revenue from Invoices
  const projectInvoices = invoices.filter(inv => inv.projectId === projectId);
  const totalRevenue = projectInvoices.reduce((sum, inv) => sum + inv.amount, 0);
  const revenueItems: RevenueItem[] = projectInvoices.map(inv => ({
    id: inv.id,
    description: `Invoice #${inv.invoiceNumber}`,
    amount: inv.amount,
    status: inv.status,
    date: inv.issuedAt,
  }));

  // 2. Calculate Costs from Expenses and Time Entries
  const costItems: CostItem[] = [];

  // Direct Expenses
  const directExpenses = expenses.filter(exp => exp.projectId === projectId && exp.billable);
  directExpenses.forEach(exp => {
    costItems.push({
      id: exp.id,
      type: 'Direct Expense',
      description: exp.description,
      date: exp.date,
      cost: exp.amount,
    });
  });
  const totalDirectExpenses = directExpenses.reduce((sum, exp) => sum + exp.amount, 0);

  // Time Costs
  const projectTimeEntries = timeEntries.filter(t => t.projectId === projectId);
  const totalTimeCosts = projectTimeEntries.reduce((sum, entry) => {
    const member = teamMembers.find(m => m.id === entry.employeeId);
    if (!member) return sum;
    
    const costRate = getInternalCostRate(member.salary);
    const timeCost = entry.hours * costRate;

    costItems.push({
      id: entry.id,
      type: 'Time Cost',
      description: `${entry.employeName} - ${entry.taskName || 'General Project Work'}`,
      date: entry.date,
      cost: timeCost,
    });

    return sum + timeCost;
  }, 0);

  // 3. Final Calculations
  const totalCosts = totalDirectExpenses + totalTimeCosts;
  const netProfit = totalRevenue - totalCosts;
  const profitMargin = totalRevenue > 0 ? (netProfit / totalRevenue) * 100 : 0;
  
  const budget = parseFloat(project.budget.replace(/[^0-9.-]+/g, ""));
  const budgetUsage = budget > 0 ? (totalCosts / budget) * 100 : 0;

  return {
    projectId,
    projectName: project.name,
    clientName: project.client,
    totalRevenue,
    totalCosts,
    netProfit,
    profitMargin,
    budget,
    budgetUsage,
    revenueItems,
    costItems: costItems.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()),
  };
};
