import { useState } from 'react';
import { 
  MOCK_ORGANIZATION_SETTINGS, 
  OrganizationSettings, 
  TIMEZONE_OPTIONS, 
  CURRENCY_OPTIONS, 
  DATE_FORMAT_OPTIONS 
} from '@/lib/organization';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const AdminOrganizationSettings = () => {
  const [settings, setSettings] = useState<OrganizationSettings>(MOCK_ORGANIZATION_SETTINGS);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    console.log('Saving organization settings:', settings);
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      alert('Settings saved successfully!');
      // Here you might want to update the mock file or refetch data in a real app
    }, 1000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: keyof OrganizationSettings, value: string) => {
    setSettings(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Organization Settings</h1>
          <p className="text-muted-foreground">
            Manage your company's global settings and preferences.
          </p>
        </div>
        <Button onClick={handleSave} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Column 1: General Settings */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>General</CardTitle>
            <CardDescription>Update your organization's basic information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="organizationName">Organization Name</Label>
              <Input 
                id="organizationName"
                name="organizationName"
                value={settings.organizationName}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16 rounded-lg">
                  <AvatarImage src={settings.logoUrl} alt={settings.organizationName} />
                  <AvatarFallback className="rounded-lg">{settings.organizationName.charAt(0)}</AvatarFallback>
                </Avatar>
                <Input 
                  id="logoUrl"
                  name="logoUrl"
                  type="url"
                  value={settings.logoUrl}
                  onChange={handleInputChange}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Column 2: Localization */}
        <Card>
          <CardHeader>
            <CardTitle>Localization</CardTitle>
            <CardDescription>Set default time, currency, and date formats.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Select value={settings.timezone} onValueChange={(value) => handleSelectChange('timezone', value)}>
                <SelectTrigger id="timezone">
                  <SelectValue placeholder="Select timezone" />
                </SelectTrigger>
                <SelectContent>
                  {TIMEZONE_OPTIONS.map(tz => <SelectItem key={tz} value={tz}>{tz}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Currency</Label>
              <Select value={settings.currency} onValueChange={(value) => handleSelectChange('currency', value)}>
                <SelectTrigger id="currency">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {CURRENCY_OPTIONS.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateFormat">Date Format</Label>
              <Select value={settings.dateFormat} onValueChange={(value) => handleSelectChange('dateFormat', value)}>
                <SelectTrigger id="dateFormat">
                  <SelectValue placeholder="Select date format" />
                </SelectTrigger>
                <SelectContent>
                  {DATE_FORMAT_OPTIONS.map(df => <SelectItem key={df} value={df}>{df}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOrganizationSettings;
