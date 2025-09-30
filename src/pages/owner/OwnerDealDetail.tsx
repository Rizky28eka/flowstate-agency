import { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDealDetails, Deal } from '@/lib/sales-pipeline';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from '@/components/ui/separator';
import { ArrowLeft, Phone, Mail, Users, FileText, Paperclip, DollarSign, Percent, Calendar } from 'lucide-react';
import { cn } from '@/lib/utils';

// Helper to format currency
const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value);
};

const ActivityItem = ({ item }: { item: Deal['activities'][0] | Deal['notes'][0] }) => {
  const isNote = 'text' in item;
  const iconMap = {
    Call: Phone,
    Email: Mail,
    Meeting: Users,
  };
  const Icon = isNote ? FileText : iconMap[item.type];

  return (
    <div className="flex gap-4">
      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="font-medium text-sm">
            {isNote ? `Note added by ${item.author}` : `${item.type} with ${'contact' in item ? item.contact : 'client'}`}
          </p>
          <p className="text-xs text-muted-foreground">{item.date}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {isNote ? item.text : item.summary}
        </p>
      </div>
    </div>
  );
};

const OwnerDealDetail = () => {
  const { dealId } = useParams<{ dealId: string }>();
  const navigate = useNavigate();

  const deal = useMemo(() => 
    dealId ? getDealDetails(dealId) : null
  , [dealId]);

  useEffect(() => {
    if (!deal) {
      // navigate('/dashboard/owner/sales-pipeline');
    }
  }, [deal, navigate]);

  if (!deal) {
    return <div>Loading deal details...</div>;
  }

  const combinedFeed = [...deal.activities, ...deal.notes].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate('/dashboard/owner/sales-pipeline')}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">{deal.dealName}</h1>
          <p className="text-muted-foreground">Managing deal with {deal.companyName}</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column: Activity Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Log Activity or Add Note</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Type your note or activity summary here..." className="mb-2" />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Log Activity</Button>
                <Button>Post Note</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Activity Feed</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {combinedFeed.map(item => <ActivityItem key={item.id} item={item} />)}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Details */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Deal Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between"> <span className="text-muted-foreground flex items-center"><DollarSign className="h-4 w-4 mr-2"/>Value</span> <span className="font-medium">{formatCurrency(deal.value)}</span> </div>
              <div className="flex justify-between"> <span className="text-muted-foreground flex items-center"><Percent className="h-4 w-4 mr-2"/>Probability</span> <span className="font-medium">{deal.probability}%</span> </div>
              <div className="flex justify-between"> <span className="text-muted-foreground flex items-center"><Calendar className="h-4 w-4 mr-2"/>Expected Close</span> <span className="font-medium">{deal.expectedCloseDate}</span> </div>
              <Separator />
              <div className="flex justify-between"> <span className="text-muted-foreground">Stage</span> <Badge>{deal.status}</Badge> </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Contact Person</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>{deal.contactPerson.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{deal.contactPerson}</p>
                <p className="text-sm text-muted-foreground">{deal.companyName}</p>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {deal.documents.map(doc => (
                <div key={doc.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{doc.name}</p>
                      <p className="text-xs text-muted-foreground">{doc.type} - {doc.uploadDate}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => alert('Downloading...')}>Download</Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OwnerDealDetail;
