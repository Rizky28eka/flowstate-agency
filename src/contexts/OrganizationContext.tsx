import { useState, ReactNode, useEffect } from 'react';
import { OrganizationContext, SubscriptionPlan } from './OrganizationContextValue';

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const [plan, setPlan] = useState<SubscriptionPlan>(() => {
    const storedPlan = localStorage.getItem('subscriptionPlan');
    return (storedPlan as SubscriptionPlan) || 'Free';
  });

  useEffect(() => {
    localStorage.setItem('subscriptionPlan', plan);
  }, [plan]);

  return (
    <OrganizationContext.Provider value={{ plan, setPlan }}>
      {children}
    </OrganizationContext.Provider>
  );
};


