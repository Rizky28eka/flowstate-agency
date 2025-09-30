import { useOrganization } from '@/hooks/useOrganization';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { hasFeature, getPlanFeatures } from "@/lib/SubscriptionManager";

interface PaywallProps {
  children: ReactNode;
  feature: string;
  featureName: string;
  features: string[];
}

import { subscriptionConfig } from "@/lib/SubscriptionManager";

const Paywall = ({ children, feature, featureName, features }: PaywallProps) => {
  const { plan } = useOrganization();

  if (hasFeature(plan, feature)) {
    return <>{children}</>;
  }

  const requiredPlan = Object.keys(subscriptionConfig).find(p => subscriptionConfig[p].features[feature]) || "Starter";

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Upgrade to unlock {featureName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          The <strong>{featureName}</strong> feature is only available on the <strong>{requiredPlan}</strong> plan or higher. 
          You are currently on the <strong>{plan}</strong> plan.
        </p>
        <p className="mb-4">By upgrading, you will unlock:</p>
        <ul className="list-disc list-inside mb-4">
          {features.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
        <Link to="/dashboard/owner/settings">
          <Button>Upgrade Your Plan</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Paywall;
