import { useState } from 'react';
import { MOCK_INTEGRATIONS, Integration } from '@/lib/integrations';
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
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

const IntegrationCard = ({ integration, onStatusChange }: { integration: Integration, onStatusChange: (id: string, status: Integration['status']) => void }) => {
  const statusConfig = {
    'Connected': {
      badge: 'success' as const,
      buttonText: 'Disconnect',
      buttonVariant: 'destructive' as const,
      action: () => onStatusChange(integration.id, 'Not Connected'),
    },
    'Not Connected': {
      badge: 'secondary' as const,
      buttonText: 'Connect',
      buttonVariant: 'default' as const,
      action: () => onStatusChange(integration.id, 'Connected'),
    },
    'Pending': {
      badge: 'warning' as const,
      buttonText: 'Pending',
      buttonVariant: 'outline' as const,
      action: () => {},
    },
  };

  const config = statusConfig[integration.status];

  return (
    <Card>
      <CardHeader className="flex flex-row items-start gap-4">
        <img src={integration.logo} alt={`${integration.name} logo`} className="w-12 h-12" />
        <div>
          <CardTitle>{integration.name}</CardTitle>
          <CardDescription>{integration.category}</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground h-10">{integration.description}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <Badge variant={config.badge}>{integration.status}</Badge>
        <Button 
          variant={config.buttonVariant} 
          size="sm"
          onClick={config.action}
          disabled={integration.status === 'Pending'}
        >
          {config.buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const AdminIntegrations = () => {
  const [integrations, setIntegrations] = useState(MOCK_INTEGRATIONS);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id: string, status: Integration['status']) => {
    setIntegrations(prev => prev.map(int => int.id === id ? { ...int, status } : int));
  };

  const filteredIntegrations = integrations.filter(int => 
    int.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categories = ['All', ...Array.from(new Set(integrations.map(i => i.category)))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
          <p className="text-muted-foreground">Connect and manage third-party applications.</p>
        </div>
        <Button className="w-full sm:w-auto">
          <PlusCircle className="h-4 w-4 mr-2" />
          Add New Integration
        </Button>
      </div>

      <Tabs defaultValue="all">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <TabsList>
            {categories.map(category => (
              <TabsTrigger key={category} value={category.toLowerCase()}>{category}</TabsTrigger>
            ))}
          </TabsList>
          <div className="relative w-full sm:max-w-xs">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search integrations..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {categories.map(category => (
          <TabsContent key={category} value={category.toLowerCase()}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {filteredIntegrations
                .filter(int => category === 'All' || int.category === category)
                .map(integration => (
                  <IntegrationCard 
                    key={integration.id} 
                    integration={integration} 
                    onStatusChange={handleStatusChange} 
                  />
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default AdminIntegrations;