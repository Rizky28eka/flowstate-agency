import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MOCK_AUTOMATION_RULES, 
  AVAILABLE_TRIGGERS, 
  AVAILABLE_ACTIONS, 
  AutomationRule 
} from '@/lib/automations';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { MoreHorizontal, PlusCircle, Bot, PlayCircle } from 'lucide-react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const AutomationRow = ({ rule, onToggle }: { rule: AutomationRule, onToggle: (id: string, isActive: boolean) => void }) => {
  const navigate = useNavigate();
  const trigger = AVAILABLE_TRIGGERS.find(t => t.type === rule.triggerType);
  const action = AVAILABLE_ACTIONS.find(a => a.type === rule.actionType);

  return (
    <TableRow>
      <TableCell>
        <div className="font-medium">{rule.name}</div>
        <div className="text-xs text-muted-foreground hidden sm:table-cell">{rule.description}</div>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">{trigger?.name || 'Unknown Trigger'}</Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        <Badge variant="outline">{action?.name || 'Unknown Action'}</Badge>
      </TableCell>
      <TableCell>
        <Switch 
          checked={rule.isActive} 
          onCheckedChange={(checked) => onToggle(rule.id, checked)}
          aria-label={`Toggle rule ${rule.name}`}
        />
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigate(`/dashboard/admin/automations/${rule.id}`)}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem>View Logs</DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

const AdminAutomations = () => {
  const [rules, setRules] = useState<AutomationRule[]>(MOCK_AUTOMATION_RULES);

  const handleToggle = (id: string, isActive: boolean) => {
    setRules(prevRules => prevRules.map(rule => rule.id === id ? { ...rule, isActive } : rule));
  };

  const activeRulesCount = useMemo(() => rules.filter(r => r.isActive).length, [rules]);

  const kpiData = [
    { title: 'Total Rules', value: rules.length, icon: Bot },
    { title: 'Active Automations', value: activeRulesCount, icon: PlayCircle },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Workflow Automations</h1>
          <p className="text-muted-foreground">Automate repetitive tasks and streamline your processes.</p>
        </div>
        <Button onClick={() => alert('Navigate to new rule page')}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Rule
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {kpiData.map(kpi => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Automation Rules</CardTitle>
          <CardDescription>Manage all the automation rules for your organization.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Rule</TableHead>
                <TableHead className="hidden md:table-cell">Trigger</TableHead>
                <TableHead className="hidden md:table-cell">Action</TableHead>
                <TableHead>Status</TableHead>
                <TableHead><span className="sr-only">Actions</span></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rules.map(rule => <AutomationRow key={rule.id} rule={rule} onToggle={handleToggle} />)}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminAutomations;
