import { ReactNode, useCallback } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { OrganizationContext, SubscriptionPlan } from './OrganizationContextValue';
import { getOrganization } from '@/lib/api';
import { Organization } from '@/types';

export const OrganizationProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  const { data: organization, isLoading } = useQuery<Organization>({
    queryKey: ['organization'],
    queryFn: getOrganization,
    staleTime: Infinity, // Organization data is stable, no need to refetch often
    enabled: !!token, // Only fetch if token exists
  });

  // The plan is derived from the organization data, with a fallback to 'Free'
  const plan: SubscriptionPlan = (organization?.settings?.plan as SubscriptionPlan) || 'Free';

  // This function would be used to update the plan on the server.
  // This requires a new API endpoint (e.g., PATCH /api/organization)
  // For now, it will just invalidate the query to show that the mechanism works.
  const setPlan = useCallback((newPlan: SubscriptionPlan) => {
    console.log(`TODO: Implement API call to update plan to ${newPlan}`);
    // In a real implementation, you would use useMutation here to update the backend.
    // After mutation, you would invalidate the 'organization' query.
    // For demonstration, we can manually update the cache, but invalidation is better.
    queryClient.invalidateQueries({ queryKey: ['organization'] });

  }, [queryClient]);

  if (isLoading) {
    // You could return a global loading spinner here if desired
    return null;
  }

  return (
    <OrganizationContext.Provider value={{ plan, setPlan }}>
      {children}
    </OrganizationContext.Provider>
  );
};