export type SubscriptionPlan = 'Free' | 'Starter' | 'Business' | 'Enterprise' | 'Custom';

export interface PlanFeatures {
  projects: number;
  users: number;
  teams: number;
  clients: number;
  goals: number;
  features: {
    [key: string]: boolean;
  };
}

export const subscriptionConfig: Record<SubscriptionPlan, PlanFeatures> = {
  Free: {
    projects: 3,
    users: 5,
    teams: 1,
    clients: 5,
    goals: 5,
    features: {
      timesheet: false,
      analytics: false,
      reports: false,
      integrations: false,
      taxes: false,
      performance: false,
    },
  },
  Starter: {
    projects: 10,
    users: 15,
    teams: 3,
    clients: 15,
    goals: 15,
    features: {
      timesheet: true,
      analytics: false,
      reports: false,
      integrations: true,
      taxes: false,
      performance: false,
    },
  },
  Business: {
    projects: Infinity,
    users: 50,
    teams: 10,
    clients: 50,
    goals: 50,
    features: {
      timesheet: true,
      analytics: true,
      reports: false,
      integrations: true,
      taxes: true,
      performance: true,
    },
  },
  Enterprise: {
    projects: Infinity,
    users: Infinity,
    teams: Infinity,
    clients: Infinity,
    goals: Infinity,
    features: {
      timesheet: true,
      analytics: true,
      reports: true,
      integrations: true,
      taxes: true,
      performance: true,
    },
  },
  Custom: {
    projects: Infinity,
    users: Infinity,
    teams: Infinity,
    clients: Infinity,
    goals: Infinity,
    features: {
      timesheet: true,
      analytics: true,
      reports: true,
      integrations: true,
      taxes: true,
      performance: true,
    },
  },
};

export const getPlanFeatures = (plan: SubscriptionPlan): PlanFeatures => {
  return subscriptionConfig[plan];
};

export const canCreate = (plan: SubscriptionPlan, feature: keyof PlanFeatures, currentCount: number): boolean => {
    const limit = subscriptionConfig[plan][feature];
    if (typeof limit === 'number') {
        return currentCount < limit;
    }
    return true; // Infinity
};

export const hasFeature = (plan: SubscriptionPlan, feature: string): boolean => {
    return subscriptionConfig[plan].features[feature] || false;
};
