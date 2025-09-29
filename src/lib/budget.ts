import { teamMembers, expenses, projects } from './mock-data';
import { getFinancialsForProject } from './profitability';

// --- INTERFACES ---

export type BudgetCategory = 'Revenue' | 'Salaries' | 'Marketing' | 'Software' | 'Travel' | 'Office Supplies';

export interface BudgetItem {
  category: BudgetCategory;
  budgetedAmount: number;
  actualAmount: number;
  variance: number;
}

// --- LOGIC ---

/**
 * Calculates the budget vs. actuals for various financial categories across the organization.
 */
export const getBudgetVsActuals = (): BudgetItem[] => {
  // 1. Define the annual budget (this is a necessary assumption as it doesn't exist elsewhere)
  const MOCK_ANNUAL_BUDGET: Record<BudgetCategories, number> = {
    'Revenue': 3500000000,
    'Salaries': 1500000000,
    'Marketing': 250000000,
    'Software': 150000000,
    'Travel': 100000000,
    'Office Supplies': 50000000,
  };

  // 2. Calculate Actual Revenue
  const actualRevenue = projects
    .map(p => getFinancialsForProject(p.id))
    .reduce((sum, financials) => sum + (financials?.totalRevenue || 0), 0);

  // 3. Calculate Actual Costs
  const actualSalaries = teamMembers.reduce((sum, member) => {
    const numericSalary = parseFloat(member.salary.replace(/[^0-9.-]+/g, ""));
    return sum + (isNaN(numericSalary) ? 0 : numericSalary);
  }, 0);

  const actualExpensesByCategory = expenses.reduce((acc, expense) => {
    const category = expense.category as BudgetCategory;
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += expense.amount;
    return acc;
  }, {} as Record<BudgetCategories, number>);

  // 4. Assemble the final data
  const budgetItems: BudgetItem[] = (Object.keys(MOCK_ANNUAL_BUDGET) as BudgetCategory[]).map(category => {
    let actualAmount = 0;
    if (category === 'Revenue') {
      actualAmount = actualRevenue;
    } else if (category === 'Salaries') {
      actualAmount = actualSalaries;
    } else {
      actualAmount = actualExpensesByCategory[category] || 0;
    }

    const budgetedAmount = MOCK_ANNUAL_BUDGET[category];
    const variance = actualAmount - budgetedAmount;

    return { category, budgetedAmount, actualAmount, variance };
  });

  return budgetItems;
};

// Helper type to avoid repetition
type BudgetCategories = keyof typeof MOCK_ANNUAL_BUDGET;
