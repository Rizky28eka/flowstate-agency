import { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  AutomationRule, 
  TriggerType, 
  ActionType, 
  AVAILABLE_TRIGGERS, 
  AVAILABLE_ACTIONS, 
  MOCK_AUTOMATION_RULES 
} from '@/lib/automations';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { ArrowLeft, Variable } from 'lucide-react';

const OwnerAutomationBuilder = () => {
  const { ruleId } = useParams<{ ruleId: string }>();
  const navigate = useNavigate();
  const [rule, setRule] = useState<Partial<AutomationRule>>({});

  const isNewRule = ruleId === 'new';

  useEffect(() => {
    if (!isNewRule) {
      const existingRule = MOCK_AUTOMATION_RULES.find(r => r.id === ruleId);
      if (existingRule) {
        setRule(existingRule);
      } else {
        // navigate('/dashboard/admin/automations');
      }
    } else {
      setRule({ name: '', description: '' });
    }
  }, [ruleId, isNewRule, navigate]);

  const selectedTrigger = useMemo(() => 
    AVAILABLE_TRIGGERS.find(t => t.type === rule.triggerType)
  , [rule.triggerType]);

  const selectedAction = useMemo(() => 
    AVAILABLE_ACTIONS.find(a => a.type === rule.actionType)
  , [rule.actionType]);

  const handleTriggerTypeChange = (type: TriggerType) => {
    setRule({ ...rule, triggerType: type, triggerConditions: {} });
  };

  const handleActionTypeChange = (type: ActionType) => {
    setRule({ ...rule, actionType: type, actionParams: {} });
  };

  const handleConditionChange = (id: string, value: string) => {
    setRule({ ...rule, triggerConditions: { ...rule.triggerConditions, [id]: value } });
  };

  const handleParamChange = (id: string, value: string) => {
    setRule({ ...rule, actionParams: { ...rule.actionParams, [id]: value } });
  };

  const handleSave = () => {
    console.log("Saving Rule:", rule);
    alert(`Rule "${rule.name}" saved successfully!`);
    navigate('/dashboard/admin/automations');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/admin/automations')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              {isNewRule ? 'Create Automation Rule' : 'Edit Automation Rule'}
            </h1>
            <p className="text-muted-foreground">Define a trigger and a corresponding action.</p>
          </div>
        </div>
        <Button onClick={handleSave}>Save Rule</Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* --- TRIGGER CARD --- */}
        <Card>
          <CardHeader>
            <CardTitle>WHEN: The Trigger</CardTitle>
            <CardDescription>This is the event that starts the automation.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Trigger Type</Label>
              <Select value={rule.triggerType} onValueChange={(v) => handleTriggerTypeChange(v as TriggerType)}>
                <SelectTrigger><SelectValue placeholder="Select a trigger..." /></SelectTrigger>
                <SelectContent>
                  {AVAILABLE_TRIGGERS.map(t => <SelectItem key={t.type} value={t.type}>{t.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {selectedTrigger?.conditionFields.map(field => (
              <div key={field.id} className="space-y-2">
                <Label>{field.label}</Label>
                <Select value={rule.triggerConditions?.[field.id]} onValueChange={(v) => handleConditionChange(field.id, v)}>
                  <SelectTrigger><SelectValue placeholder={`Select a ${field.label.toLowerCase()}...`} /></SelectTrigger>
                  <SelectContent>
                    {field.options.map(opt => <SelectItem key={opt} value={opt}>{opt}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* --- ACTION CARD --- */}
        <Card>
          <CardHeader>
            <CardTitle>THEN: The Action</CardTitle>
            <CardDescription>This is what happens when the trigger fires.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Action Type</Label>
              <Select value={rule.actionType} onValueChange={(v) => handleActionTypeChange(v as ActionType)}>
                <SelectTrigger><SelectValue placeholder="Select an action..." /></SelectTrigger>
                <SelectContent>
                  {AVAILABLE_ACTIONS.map(a => <SelectItem key={a.type} value={a.type}>{a.name}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {selectedAction?.paramFields.map(field => (
              <div key={field.id} className="space-y-2">
                <Label>{field.label}</Label>
                {field.type === 'textarea' ? (
                  <Textarea 
                    value={rule.actionParams?.[field.id] || ''} 
                    onChange={(e) => handleParamChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                  />
                ) : (
                  <Input 
                    value={rule.actionParams?.[field.id] || ''} 
                    onChange={(e) => handleParamChange(field.id, e.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}
            {selectedTrigger && (
              <div className="text-xs text-muted-foreground space-y-1 pt-2">
                <p className="flex items-center"><Variable className="h-3 w-3 mr-1.5"/> Available variables:</p>
                <div className="flex flex-wrap gap-x-2">
                  {selectedTrigger.outputVariables.map(v => <code key={v.id} className="font-mono bg-muted px-1 py-0.5 rounded">{v.id}</code>)}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Rule Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="rule-name">Rule Name</Label>
            <Input id="rule-name" value={rule.name || ''} onChange={(e) => setRule({...rule, name: e.target.value})} placeholder="e.g., Notify on Project Completion" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rule-description">Description</Label>
            <Input id="rule-description" value={rule.description || ''} onChange={(e) => setRule({...rule, description: e.target.value})} placeholder="A short summary of what this rule does." />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OwnerAutomationBuilder;
