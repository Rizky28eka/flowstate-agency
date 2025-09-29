import { salesLeads, teamMembers, contracts } from './mock-data';
import { addMonths, format, getMonth, getYear, startOfMonth } from 'date-fns';

// --- INTERFACES & TYPES ---

export type ScenarioType = 'ADD_RECURRING_REVENUE' | 'ADD_RECURRING_COST' | 'ADD_ONE_TIME_REVENUE' | 'ADD_ONE_TIME_COST';

export interface Scenario {
  id: string;
  type: ScenarioType;
  description: string;
  value: number; // Monthly value for recurring, total value for one-time
  startMonth: Date;
  isActive: boolean;
}

export interface ForecastDataPoint {
  month: string; // e.g., "Jan 2025"
  baselineRevenue: number;
  baselineCosts: number;
  scenarioRevenue: number;
  scenarioCosts: number;
}

// --- FORECASTING LOGIC ---

/**
 * Generates a financial forecast for the next 12 months based on current data and applied scenarios.
 */
export const generateForecast = (scenarios: Scenario[]): ForecastDataPoint[] => {
  const forecast: ForecastDataPoint[] = [];
  const startDate = startOfMonth(new Date());

  // 1. Generate the 12-month timeline
  for (let i = 0; i < 12; i++) {
    const monthDate = addMonths(startDate, i);
    forecast.push({
      month: format(monthDate, 'MMM yyyy'),
      baselineRevenue: 0,
      baselineCosts: 0,
      scenarioRevenue: 0,
      scenarioCosts: 0,
    });
  }

  // 2. Calculate Baseline Monthly Costs (Salaries)
  const monthlySalaryCost = teamMembers.reduce((total, member) => {
    const numericSalary = parseFloat(member.salary.replace(/[^0-9.-]+/g, ""));
    return total + (numericSalary / 12);
  }, 0);

  // 3. Calculate Baseline Monthly Revenue
  // Includes a base assumption for existing retainers + pipeline deals
  const BASE_RETAINER_REVENUE = 20000000; // Mock base recurring revenue

  forecast.forEach((monthData, index) => {
    const currentMonthDate = addMonths(startDate, index);
    let revenueThisMonth = BASE_RETAINER_REVENUE;

    // Add revenue from sales pipeline leads expected to close this month
    salesLeads.forEach(lead => {
      const closeDate = new Date(lead.expectedCloseDate);
      if (getMonth(closeDate) === getMonth(currentMonthDate) && getYear(closeDate) === getYear(currentMonthDate)) {
        revenueThisMonth += lead.potentialValue * (lead.probability / 100);
      }
    });

    monthData.baselineRevenue = revenueThisMonth;
    monthData.baselineCosts = monthlySalaryCost;
  });

  // 4. Apply Scenarios
  forecast.forEach((monthData, index) => {
    let scenarioRevenue = monthData.baselineRevenue;
    let scenarioCosts = monthData.baselineCosts;
    const currentMonthDate = addMonths(startDate, index);

    scenarios.forEach(scenario => {
      if (scenario.isActive && currentMonthDate >= startOfMonth(scenario.startMonth)) {
        switch (scenario.type) {
          case 'ADD_RECURRING_REVENUE':
            scenarioRevenue += scenario.value;
            break;
          case 'ADD_RECURRING_COST':
            scenarioCosts += scenario.value;
            break;
          case 'ADD_ONE_TIME_REVENUE':
            if (getMonth(currentMonthDate) === getMonth(scenario.startMonth) && getYear(currentMonthDate) === getYear(scenario.startMonth)) {
              scenarioRevenue += scenario.value;
            }
            break;
          case 'ADD_ONE_TIME_COST':
            if (getMonth(currentMonthDate) === getMonth(scenario.startMonth) && getYear(currentMonthDate) === getYear(scenario.startMonth)) {
              scenarioCosts += scenario.value;
            }
            break;
        }
      }
    });

    monthData.scenarioRevenue = scenarioRevenue;
    monthData.scenarioCosts = scenarioCosts;
  });

  return forecast;
};
