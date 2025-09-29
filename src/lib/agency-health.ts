import { clients, teamMembers, tasks, projects } from "./mock-data";
import { getFinancialsForProject } from "./profitability";

// --- TYPES & INTERFACES ---

export type HealthRating = "Excellent" | "Good" | "Fair" | "Poor";

export interface HealthScore {
  score: number; // 0–100
  rating: HealthRating;
  contributingFactors: { text: string; type: "positive" | "negative" }[];
}

export interface AgencyHealth {
  overallHealth: HealthScore;
  financialHealth: HealthScore;
  clientHealth: HealthScore;
  teamHealth: HealthScore;
}

// --- HELPERS ---

const getRating = (score: number): HealthRating => {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Poor";
};

const clamp = (value: number, min: number, max: number): number =>
  Math.max(min, Math.min(value, max));

// --- FINANCIAL HEALTH ---

const calculateFinancialHealth = (): HealthScore => {
  const allFinancials = projects
    .map((p) => getFinancialsForProject(p.id))
    .filter((p): p is NonNullable<ReturnType<typeof getFinancialsForProject>> => Boolean(p));

  const totalRevenue = allFinancials.reduce((sum, p) => sum + p.totalRevenue, 0);
  const totalProfit = allFinancials.reduce((sum, p) => sum + p.netProfit, 0);
  const overallMargin = totalRevenue > 0 ? (totalProfit / totalRevenue) * 100 : 0;

  // Margin score (0–70)
  const marginScore = clamp((overallMargin / 35) * 70, 0, 70);

  // Client concentration score (0–30)
  const revenuePerClient: Record<string, number> = {};
  allFinancials.forEach((p) => {
    revenuePerClient[p.clientName] =
      (revenuePerClient[p.clientName] || 0) + p.totalRevenue;
  });

  const topClientRevenue = Math.max(...Object.values(revenuePerClient), 0);
  const concentration = totalRevenue > 0 ? (topClientRevenue / totalRevenue) * 100 : 0;
  const concentrationScore = clamp(((50 - concentration) / 50) * 30, 0, 30);

  const score = Math.round(marginScore + concentrationScore);

  return {
    score,
    rating: getRating(score),
    contributingFactors: [
      {
        text: `Overall profit margin is ${overallMargin.toFixed(1)}%`,
        type: overallMargin > 20 ? "positive" : "negative",
      },
      {
        text: `Top client accounts for ${concentration.toFixed(1)}% of revenue`,
        type: concentration < 40 ? "positive" : "negative",
      },
    ],
  };
};

// --- CLIENT HEALTH ---

const calculateClientHealth = (): HealthScore => {
  const churnedCount = clients.filter((c) => c.status === "Churned").length;
  const churnRate = (churnedCount / clients.length) * 100;
  const avgSatisfaction =
    clients.reduce((sum, c) => sum + c.satisfaction, 0) / clients.length;

  // Satisfaction score (0–60)
  const satisfactionScore = clamp(((avgSatisfaction - 3.5) / 1.5) * 60, 0, 60);

  // Churn score (0–40)
  const churnScore = clamp(((10 - churnRate) / 10) * 40, 0, 40);

  const score = Math.round(satisfactionScore + churnScore);

  return {
    score,
    rating: getRating(score),
    contributingFactors: [
      {
        text: `Average client satisfaction is ${avgSatisfaction.toFixed(1)}/5.0`,
        type: avgSatisfaction > 4.2 ? "positive" : "negative",
      },
      {
        text: `Churn rate is ${churnRate.toFixed(1)}%`,
        type: churnRate < 5 ? "positive" : "negative",
      },
    ],
  };
};

// --- TEAM HEALTH ---

const calculateTeamHealth = (): HealthScore => {
  const avgUtilization =
    teamMembers.reduce((sum, m) => sum + m.utilization, 0) / teamMembers.length;

  const overdueTasks = tasks.filter(
    (t) => new Date(t.dueDate) < new Date() && t.status !== "Completed"
  ).length;

  // Utilization score (0–70), ideal = 85%
  const utilizationDistance = Math.abs(85 - avgUtilization);
  const utilizationScore = clamp(((25 - utilizationDistance) / 25) * 70, 0, 70);

  // Overdue tasks score (0–30)
  const overdueScore = clamp(((5 - overdueTasks) / 5) * 30, 0, 30);

  const score = Math.round(utilizationScore + overdueScore);

  return {
    score,
    rating: getRating(score),
    contributingFactors: [
      {
        text: `Average team utilization is ${avgUtilization.toFixed(0)}%`,
        type:
          avgUtilization > 75 && avgUtilization < 95 ? "positive" : "negative",
      },
      {
        text: `${overdueTasks} tasks are currently overdue`,
        type: overdueTasks < 3 ? "positive" : "negative",
      },
    ],
  };
};

// --- OVERALL AGENCY HEALTH ---

export const getAgencyHealth = (): AgencyHealth => {
  const financialHealth = calculateFinancialHealth();
  const clientHealth = calculateClientHealth();
  const teamHealth = calculateTeamHealth();

  // Weighted average
  const overallScore = Math.round(
    financialHealth.score * 0.4 +
      clientHealth.score * 0.35 +
      teamHealth.score * 0.25
  );

  const overallHealth: HealthScore = {
    score: overallScore,
    rating: getRating(overallScore),
    contributingFactors: [
      {
        text: `Financial health is ${financialHealth.rating}`,
        type: financialHealth.score > 70 ? "positive" : "negative",
      },
      {
        text: `Client health is ${clientHealth.rating}`,
        type: clientHealth.score > 70 ? "positive" : "negative",
      },
      {
        text: `Team health is ${teamHealth.rating}`,
        type: teamHealth.score > 70 ? "positive" : "negative",
      },
    ],
  };

  return {
    overallHealth,
    financialHealth,
    clientHealth,
    teamHealth,
  };
};