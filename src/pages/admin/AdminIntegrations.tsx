import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_INTEGRATIONS, Integration, IntegrationCategory } from '@/lib/integrations';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
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

const IntegrationCard = ({ integration }: { integration: Integration }) => {
  const navigate = useNavigate();
  const Icon = iconMap[integration.id] || (() => <div className="w-8 h-8 bg-secondary rounded-lg" />);

  const statusVariant: Record<typeof integration.status, 'default' | 'secondary' | 'outline'> = {
    active: 'default',
    inactive: 'secondary',
    coming_soon: 'outline',
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0">
        <Icon className="w-8 h-8" />
        <div className="flex-1">
          <CardTitle>{integration.name}</CardTitle>
          <CardDescription>{integration.category}</CardDescription>
        </div>
        <Badge variant={statusVariant[integration.status]} className="capitalize">
          {integration.status.replace('_', ' ')}
        </Badge>
      </CardHeader>
      <CardContent className="flex-1">
        <p className="text-sm text-muted-foreground">
          {integration.description}
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          disabled={integration.status === 'coming_soon'}
          onClick={() => navigate(`/dashboard/admin/integrations/${integration.id}`)}
        >
          {integration.status === 'active' ? 'Manage' : (integration.status === 'inactive' ? 'Configure' : 'Coming Soon')}
        </Button>
      </CardFooter>
    </Card>
  );
};

const AdminIntegrations = () => {
  const categories: IntegrationCategory[] = ['Communication', 'Productivity', 'Source Control', 'Design', 'Finance', 'CRM'];
  const [activeTab, setActiveTab] = useState<string>('all');

  const filteredIntegrations = activeTab === 'all' 
    ? MOCK_INTEGRATIONS 
    : MOCK_INTEGRATIONS.filter(i => i.category === activeTab);

  return (
    <div className="space-y-4 sm:space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Integration Marketplace</h1>
        <p className="text-muted-foreground">
          Connect third-party apps to extend the functionality of Flowstate.
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="overflow-x-auto">
          <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-7 min-w-max">
            <TabsTrigger value="all" className="text-xs sm:text-sm">All</TabsTrigger>
            {categories.map(category => (
              <TabsTrigger key={category} value={category} className="text-xs sm:text-sm">{category}</TabsTrigger>
            ))}
          </TabsList>
        </div>
        <TabsContent value={activeTab} className="mt-4 sm:mt-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminIntegrations;
          <TabsTrigger value="all">All</TabsTrigger>
          {categories.map(category => (
            <TabsTrigger key={category} value={category}>{category}</TabsTrigger>
          ))}
        </TabsList>
        <TabsContent value={activeTab} className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredIntegrations.map(integration => (
              <IntegrationCard key={integration.id} integration={integration} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminIntegrations;
