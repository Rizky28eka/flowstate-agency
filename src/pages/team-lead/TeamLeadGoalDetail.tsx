import { useState, useMemo, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getGoalDetails } from '@/lib/goals';
import { goals as allGoals, teamMembers } from '@/lib/mock-data';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ArrowLeft, Target } from 'lucide-react';

const TeamLeadGoalDetail = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();

  const goal = useMemo(() => goalId ? getGoalDetails(goalId) : null, [goalId]);

  const [milestones, setMilestones] = useState(goal?.milestones || []);

  useEffect(() => {
    if (!goal) {
      // navigate('/dashboard/team-lead/goals');
    }
  }, [goal, navigate]);

  const handleMilestoneToggle = (milestoneId: number) => {
    setMilestones(prev => 
      prev.map(m => m.id === milestoneId ? { ...m, completed: !m.completed } : m)
    );
  };

  if (!goal) {
    return <div>Loading goal details...</div>;
  }

  const statusVariant: Record<string, 'default' | 'secondary' | 'destructive'> = {
    'On Track': 'default',
    'At Risk': 'destructive',
    'Completed': 'secondary',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/team-lead/goals')}><ArrowLeft className="h-4 w-4" /></Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{goal.title}</h1>
          <p className="text-muted-foreground">Owner: {goal.owner}</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Overall Progress</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex justify-between items-baseline">
            <div className="text-3xl font-bold">{goal.metric === 'Revenue' ? formatCurrency(goal.current) : goal.current}</div>
            <div className="text-lg text-muted-foreground">/ {goal.metric === 'Revenue' ? formatCurrency(goal.target) : goal.target} {goal.metric}</div>
          </div>
          <Progress value={goal.progress} />
          <div className="flex justify-between items-center pt-2">
            <p className="text-sm text-muted-foreground">Target Date: {goal.endDate}</p>
            <Badge variant={statusVariant[goal.status] || 'outline'}>{goal.status}</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader><CardTitle>Milestones / Key Results</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {milestones.map(m => (
                <div key={m.id} className="flex items-start gap-3 p-3 border rounded-md">
                  <Checkbox id={`ms-${m.id}`} checked={m.completed} onCheckedChange={() => handleMilestoneToggle(m.id)} className="mt-1" />
                  <div className="flex-1">
                    <label htmlFor={`ms-${m.id}`} className="font-medium text-sm leading-none">{m.description}</label>
                    <p className="text-xs text-muted-foreground">Due: {m.dueDate || 'N/A'}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader><CardTitle>Discussion & Updates</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              {goal.comments.map(comment => (
                <div key={comment.id} className="flex items-start gap-3">
                  <Avatar className="h-8 w-8"><AvatarFallback>{comment.author.charAt(0)}</AvatarFallback></Avatar>
                  <div>
                    <p className="font-semibold text-sm">{comment.author} <span className="font-normal text-xs text-muted-foreground">- {comment.date}</span></p>
                    <p className="text-sm text-muted-foreground">{comment.text}</p>
                  </div>
                </div>
              ))}
              <div className="flex items-start gap-3 pt-4 border-t">
                <Avatar className="h-8 w-8"><AvatarFallback>You</AvatarFallback></Avatar>
                <div className="flex-1 space-y-2">
                  <Textarea placeholder="Post an update or ask a question..." />
                  <Button size="sm">Post Update</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

// Helper to format currency (should be in a utils file)
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

export default TeamLeadGoalDetail;
