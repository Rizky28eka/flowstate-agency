import { useState, useMemo, useEffect } from 'react';
import { generateForecast, ForecastDataPoint, Scenario, ScenarioType } from '@/lib/forecasting';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  ComposedChart, 
  Bar, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  Area 
} from 'recharts';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import { PlusCircle, X, CalendarIcon } from 'lucide-react';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const AddScenarioDialog = ({ onAddScenario }: { onAddScenario: (scenario: Omit<Scenario, 'id' | 'isActive'>) => void }) => {
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ScenarioType>('ADD_RECURRING_COST');
  const [value, setValue] = useState(0);
  const [startMonth, setStartMonth] = useState<Date | undefined>(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (description && value && startMonth) {
      onAddScenario({ description, type, value, startMonth });
      setIsOpen(false);
      // Reset form
      setDescription('');
      setValue(0);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button><PlusCircle className="h-4 w-4 mr-2" /> Add Scenario</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Scenario</DialogTitle>
          <DialogDescription>Model a potential change to your forecast.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., Hire 2 new developers" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">Scenario Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ScenarioType)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ADD_RECURRING_COST">Recurring Cost</SelectItem>
                <SelectItem value="ADD_RECURRING_REVENUE">Recurring Revenue</SelectItem>
                <SelectItem value="ADD_ONE_TIME_COST">One-Time Cost</SelectItem>
                <SelectItem value="ADD_ONE_TIME_REVENUE">One-Time Revenue</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="value">Value (per month for recurring)</Label>
            <Input id="value" type="number" value={value} onChange={(e) => setValue(parseFloat(e.target.value) || 0)} />
          </div>
          <div className="space-y-2">
            <Label>Start Month</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start font-normal">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startMonth ? format(startMonth, 'MMM yyyy') : <span>Pick a month</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={startMonth} onSelect={setStartMonth} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Scenario</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const OwnerForecasting = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([]);
  const [forecastData, setForecastData] = useState<ForecastDataPoint[]>([]);

  useEffect(() => {
    const data = generateForecast(scenarios);
    setForecastData(data);
  }, [scenarios]);

  const addScenario = (scenario: Omit<Scenario, 'id' | 'isActive'>) => {
    const newScenario: Scenario = {
      ...scenario,
      id: `scen_${Date.now()}`,
      isActive: true,
    };
    setScenarios(prev => [...prev, newScenario]);
  };

  const toggleScenario = (id: string) => {
    setScenarios(scenarios.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const removeScenario = (id: string) => {
    setScenarios(scenarios.filter(s => s.id !== id));
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Financial Forecasting</h1>
        <p className="text-muted-foreground">Project future financials and model what-if scenarios.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>12-Month Financial Forecast</CardTitle>
            <CardDescription>Revenue and costs projection with applied scenarios.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <ComposedChart data={forecastData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis tickFormatter={(value) => `${formatCurrency(value / 1000000)}M`} />
                <Tooltip formatter={(value: number) => formatCurrency(value)} />
                <Legend />
                <Area type="monotone" dataKey="scenarioRevenue" fill="#82ca9d" stroke="#82ca9d" name="Scenario Profit" stackId="a" />
                <Area type="monotone" dataKey="scenarioCosts" fill="#ffc658" stroke="#ffc658" name="Scenario Costs" stackId="a" />
                <Line type="monotone" dataKey="baselineRevenue" stroke="#8884d8" strokeDasharray="5 5" name="Baseline Revenue" />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Scenario Builder</CardTitle>
            <CardDescription>Add or toggle scenarios to see their impact.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <AddScenarioDialog onAddScenario={addScenario} />
            <div className="space-y-3 pt-4">
              {scenarios.map(scenario => (
                <div key={scenario.id} className="flex items-center justify-between p-2 rounded-md border">
                  <div className="flex items-center gap-3">
                    <Switch checked={scenario.isActive} onCheckedChange={() => toggleScenario(scenario.id)} />
                    <div>
                      <p className="text-sm font-medium">{scenario.description}</p>
                      <p className="text-xs text-muted-foreground">
                        {scenario.type.replace(/_/g, ' ')} - {formatCurrency(scenario.value)}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => removeScenario(scenario.id)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {scenarios.length === 0 && (
                <p className="text-sm text-muted-foreground text-center py-4">No scenarios added yet.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerForecasting;