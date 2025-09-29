import { useNavigate } from 'react-router-dom';
import { salesLeads } from '@/lib/mock-data';
import { DEAL_STATUSES, DealStatus } from '@/lib/sales-pipeline';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { PlusCircle, User } from 'lucide-react';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const DealCard = ({ deal }: { deal: (typeof salesLeads)[0] }) => {
  const navigate = useNavigate();
  return (
    <Card 
      className="mb-4 hover:shadow-md cursor-pointer"
      onClick={() => navigate(`/dashboard/owner/sales-pipeline/${deal.id}`)}
    >
      <CardHeader className="p-4">
        <CardTitle className="text-base">{deal.companyName}</CardTitle>
        <CardDescription className="text-lg font-semibold text-primary">{formatCurrency(deal.potentialValue)}</CardDescription>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex items-center text-sm text-muted-foreground">
          <User className="h-4 w-4 mr-2" />
          <span>{deal.contactPerson}</span>
        </div>
      </CardContent>
    </Card>
  );
};

const PipelineColumn = ({ status, deals }: { status: DealStatus, deals: (typeof salesLeads) }) => {
  const columnTotalValue = deals.reduce((sum, deal) => sum + deal.potentialValue, 0);

  return (
    <div className="flex-shrink-0 w-80 bg-muted/50 rounded-lg p-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">{status} ({deals.length})</h3>
        <span className="text-sm font-medium text-muted-foreground">{formatCurrency(columnTotalValue)}</span>
      </div>
      <div className="space-y-4">
        {deals.map(deal => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  );
};

const OwnerSalesPipeline = () => {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Sales Pipeline</h1>
          <p className="text-muted-foreground">
            Track and manage your sales leads through every stage.
          </p>
        </div>
        <Button>
          <PlusCircle className="h-4 w-4 mr-2" />
          Create New Deal
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-x-auto pb-4">
        {DEAL_STATUSES.map(status => {
          // Filter deals for the current column, excluding won/lost for the main board
          if (status === 'Closed-Won' || status === 'Closed-Lost') return null;
          const dealsInColumn = salesLeads.filter(lead => lead.status === status);
          return <PipelineColumn key={status} status={status} deals={dealsInColumn} />
        })}
      </div>
    </div>
  );
};

export default OwnerSalesPipeline;
