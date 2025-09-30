import { useContext } from 'react';
import { OrganizationContext } from '@/contexts/OrganizationContextValue';

export const useOrganization = () => {
  const context = useContext(OrganizationContext);
  if (!context) {
    throw new Error('useOrganization must be used within an OrganizationProvider');
  }
  return context;
};
