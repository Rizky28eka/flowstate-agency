import { createContext } from 'react';

export type SubscriptionPlan = 'Free' | 'Starter' | 'Business' | 'Enterprise' | 'Custom';

export interface OrganizationContextType {
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;
}

export const OrganizationContext = createContext<OrganizationContextType | undefined>(undefined);
