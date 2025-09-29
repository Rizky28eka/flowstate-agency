import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAgencyHealth, HealthScore } from '@/lib/agency-health';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer 
} from 'recharts';
import { CheckCircle2, XCircle, TrendingUp, Users, DollarSign, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const GaugeChart = ({ score }: { score: number }) => {
  const data = [
    { name: 'Score', value: score },
    { name: 'Remaining', value: 100 - score },
  ];
  const scoreColor = score >= 85 ? '#22c55e' : score >= 70 ? '#facc15' : score >= 50 ? '#f97316' : '#ef4444';

  return (
    <div className="relative w-48 h-48 mx-auto">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            startAngle={180}
            endAngle={0}
            innerRadius={60}
            outerRadius={80}
            paddingAngle={0}
            dataKey="value"
          >
            <Cell key="score" fill={scoreColor} />
            <Cell key="remaining" fill="hsl(var(--muted))" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-bold" style={{ color: scoreColor }}>{score}</span>
        <span className="text-sm text-muted-foreground">/ 100</span>
      </div>
    </div>
  );
};

const HealthScoreCard = ({ title, score, icon: Icon, link }: { title: string, score: HealthScore, icon: React.ElementType, link: string }) => {
  const navigate = useNavigate();
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <Icon className="h-6 w-6 text-muted-foreground" />
          <CardTitle>{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="text-center">
        <GaugeChart score={score.score} />
        <p className="text-lg font-semibold mt-4">{score.rating}</p>
        <div className="text-left space-y-2 mt-4 text-sm">
          {score.contributingFactors.map((factor, index) => (
            <div key={index} className="flex items-start gap-2">
              {factor.type === 'positive' ? 
                <CheckCircle2 className="h-4 w-4 mt-0.5 text-green-500 shrink-0" /> : 
                <XCircle className="h-4 w-4 mt-0.5 text-red-500 shrink-0" />
              }
              <span className="text-muted-foreground">{factor.text}</span>
            </div>
          ))}
        </div>
        <Button variant="outline" className="mt-6 w-full" onClick={() => navigate(link)}>
          View Details <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </CardContent>
    </Card>
  );
};

const OwnerAgencyHealth = () => {
  const healthData = useMemo(() => getAgencyHealth(), []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Agency Health Dashboard</h1>
        <p className="text-muted-foreground">
          A high-level overview of your agency's performance across key business areas.
        </p>
      </div>

      <Card className="text-center py-8">
        <CardHeader>
          <CardTitle className="text-xl">Overall Agency Health</CardTitle>
        </CardHeader>
        <CardContent>
          <GaugeChart score={healthData.overallHealth.score} />
          <p className="text-2xl font-bold mt-4">{healthData.overallHealth.rating}</p>
          <div className="flex justify-center gap-6 mt-4">
            {healthData.overallHealth.contributingFactors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 text-sm">
                {factor.type === 'positive' ? 
                  <CheckCircle2 className="h-4 w-4 text-green-500" /> : 
                  <XCircle className="h-4 w-4 text-red-500" />
                }
                <span className="text-muted-foreground">{factor.text}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        <HealthScoreCard title="Financial Health" score={healthData.financialHealth} icon={DollarSign} link="/dashboard/owner/profitability" />
        <HealthScoreCard title="Client Health" score={healthData.clientHealth} icon={Users} link="/dashboard/owner/clients" />
        <HealthScoreCard title="Team Health" score={healthData.teamHealth} icon={TrendingUp} link="/dashboard/owner/resource-allocation" />
      </div>
    </div>
  );
};

export default OwnerAgencyHealth;
