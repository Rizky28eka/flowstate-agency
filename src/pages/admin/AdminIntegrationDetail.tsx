import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_INTEGRATIONS, Integration } from '@/lib/integrations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';
import { 
  MessageSquare, 
  Calendar, 
  Github, 
  Figma, 
  CreditCard, 
  Calculator, 
  Users 
} from 'lucide-react';

// Map integration IDs to Lucide icons
const iconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  slack: MessageSquare,
  'google-calendar': Calendar,
  github: Github,
  figma: Figma,
  stripe: CreditCard,
  quickbooks: Calculator,
  hubspot: Users,
};

const AdminIntegrationDetail = () => {
  const { integrationId } = useParams<{ integrationId: string }>();
  const navigate = useNavigate();
  const [integration, setIntegration] = useState<Integration | null>(null);
  const [configValues, setConfigValues] = useState<Record<string, string>>({});
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const foundIntegration = MOCK_INTEGRATIONS.find(i => i.id === integrationId);
    if (foundIntegration) {
      setIntegration(foundIntegration);
      setIsEnabled(foundIntegration.status === 'active');
      setConfigValues(foundIntegration.configuredValues || {});
    } else {
      // Handle not found
      navigate('/dashboard/admin/integrations');
    }
  }, [integrationId, navigate]);

  const handleSave = () => {
    console.log('Saving integration configuration:', {
      id: integration?.id,
      status: isEnabled ? 'active' : 'inactive',
      config: configValues,
    });
    alert(`Integration "${integration?.name}" saved successfully!`);
    navigate('/dashboard/admin/integrations');
  };

  if (!integration) {
    return <div>Loading...</div>;
  }

  const Icon = iconMap[integration.id] || (() => <div className="w-10 h-10 bg-secondary rounded-lg" />);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/admin/integrations')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <Icon className="w-8 h-8 sm:w-10 sm:h-10" />
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">{integration.name}</h1>
          <p className="text-muted-foreground">Manage the {integration.name} integration.</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Configuration</CardTitle>
          <CardDescription>Enable or disable the integration and provide necessary credentials.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 sm:space-y-6">
          <div className="flex items-center justify-between rounded-lg border p-3 sm:p-4 gap-4">
            <div>
              <h3 className="font-medium">Enable Integration</h3>
              <p className="text-sm text-muted-foreground">
                Allow users in your organization to connect their {integration.name} accounts.
              </p>
            </div>
            <Switch
              checked={isEnabled}
              onCheckedChange={setIsEnabled}
              aria-label={`Enable ${integration.name} integration`}
            />
          </div>

          {isEnabled && integration.configFields && integration.configFields.length > 0 && (
            <div className="space-y-4">
              {integration.configFields.map(field => (
                <div key={field.id} className="space-y-2">
                  <Label htmlFor={field.id}>{field.label}</Label>
                  <Input 
                    id={field.id} 
                    type={field.type}
                    placeholder={field.placeholder}
                    value={configValues[field.id] || ''}
                    onChange={(e) => setConfigValues({ ...configValues, [field.id]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-4 sm:mt-6">
        <Button variant="outline" onClick={() => navigate('/dashboard/admin/integrations')}>Cancel</Button>
        <Button onClick={handleSave}>Save Changes</Button>
      </div>
    </div>
  );
};

export default AdminIntegrationDetail;
