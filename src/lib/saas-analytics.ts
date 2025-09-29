export interface SaasMetric {
  id: string;
  label: string;
  value: string;
  change: string;
  changeType: 'increase' | 'decrease' | 'neutral';
}

export interface MonthlyGrowth {
  month: string;
  mrr: number;
  newUsers: number;
}

export interface PlanDistribution {
  planName: string;
  customerCount: number;
  fillColor: string;
}

export interface RecentActivity {
  id: string;
  type: 'New Signup' | 'Plan Upgrade' | 'Plan Cancelation';
  description: string;
  timestamp: string;
}

export const MOCK_SAAS_METRICS: SaasMetric[] = [
  {
    id: 'mrr',
    label: 'Monthly Recurring Revenue',
    value: 'Rp 125.500.000',
    change: '+5.2%',
    changeType: 'increase',
  },
  {
    id: 'active_users',
    label: 'Active Users',
    value: '1,204',
    change: '+120 this month',
    changeType: 'increase',
  },
  {
    id: 'active_tenants',
    label: 'Active Tenants',
    value: '88',
    change: '+2 this month',
    changeType: 'increase',
  },
  {
    id: 'churn_rate',
    label: 'Churn Rate',
    value: '1.8%',
    change: '-0.3%',
    changeType: 'decrease',
  },
];

export const MOCK_MONTHLY_GROWTH: MonthlyGrowth[] = [
  { month: 'Jan', mrr: 65000000, newUsers: 80 },
  { month: 'Feb', mrr: 70000000, newUsers: 85 },
  { month: 'Mar', mrr: 78000000, newUsers: 95 },
  { month: 'Apr', mrr: 82000000, newUsers: 100 },
  { month: 'May', mrr: 85000000, newUsers: 105 },
  { month: 'Jun', mrr: 92000000, newUsers: 110 },
  { month: 'Jul', mrr: 101000000, newUsers: 120 },
  { month: 'Aug', mrr: 110000000, newUsers: 130 },
  { month: 'Sep', mrr: 125500000, newUsers: 145 },
  // Future data can be null or projected
  { month: 'Oct', mrr: 0, newUsers: 0 },
  { month: 'Nov', mrr: 0, newUsers: 0 },
  { month: 'Dec', mrr: 0, newUsers: 0 },
];

export const MOCK_PLAN_DISTRIBUTION: PlanDistribution[] = [
  { planName: 'Starter', customerCount: 45, fillColor: 'hsl(var(--chart-1))' },
  { planName: 'Pro', customerCount: 31, fillColor: 'hsl(var(--chart-2))' },
  { planName: 'Business', customerCount: 12, fillColor: 'hsl(var(--chart-3))' },
];

export const MOCK_RECENT_ACTIVITY: RecentActivity[] = [
  {
    id: '1',
    type: 'New Signup',
    description: 'CreativeWorks Inc. just signed up for the Pro plan.',
    timestamp: '2 hours ago',
  },
  {
    id: '2',
    type: 'Plan Upgrade',
    description: 'PixelPerfect Ltd. upgraded from Starter to Business.',
    timestamp: '8 hours ago',
  },
  {
    id: '3',
    type: 'New Signup',
    description: 'Innovate Solutions joined the Starter plan.',
    timestamp: '1 day ago',
  },
  {
    id: '4',
    type: 'Plan Cancelation',
    description: 'Legacy Systems Inc. has canceled their subscription.',
    timestamp: '2 days ago',
  },
];
