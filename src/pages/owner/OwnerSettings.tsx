import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { AlertTriangle, Settings, Building2, Palette, Bell, CreditCard, Lock, Users, Upload, Check, X, Save, RefreshCw, Eye, EyeOff, Shield, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type BadgeVariant = "destructive" | "default" | "secondary" | "outline";

const securityRoles: { id: string; role: string; description: string; color: BadgeVariant }[] = [

// Enhanced Toast Component
const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 flex items-center gap-2 ${
      type === "success" ? "bg-green-500 text-white" : 
      type === "error" ? "bg-red-500 text-white" : 
      "bg-blue-500 text-white"
    }`}>
      {type === "success" && <Check className="w-4 h-4" />}
      {type === "error" && <X className="w-4 h-4" />}
      {type === "info" && <AlertCircle className="w-4 h-4" />}
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-80">
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Enhanced Permissions Matrix
const PermissionsMatrix = () => (
  <div className="space-y-6">
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Permission Matrix
        </CardTitle>
        <CardDescription>Overview of permissions for each role in your organization</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {securityRoles.map(role => (
            <Badge key={role.id} variant={role.color} className="flex items-center gap-1">
              {role.role}
              <span className="text-xs opacity-70">({role.description})</span>
            </Badge>
          ))}
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">Permission</TableHead>
                {securityRoles.map(role => (
                  <TableHead key={role.id} className="text-center min-w-[100px]">
                    {role.role}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {permissionMatrix.map(perm => (
                <TableRow key={perm.permission}>
                  <TableCell className="font-medium">{perm.permission}</TableCell>
                  {securityRoles.map(role => (
                    <TableCell key={`${perm.permission}-${role.id}`} className="text-center">
                      {perm[role.id.toLowerCase()] ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-red-300 mx-auto" />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
    
    <Card>
      <CardHeader>
        <CardTitle>Role Management</CardTitle>
        <CardDescription>Add or modify user roles and their permissions</CardDescription>
      </CardHeader>
      <CardContent>
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            Role modifications will take effect immediately. Users may need to log in again to see changes.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  </div>
);

// Main Component
const OwnerSettings = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [showPassword, setShowPassword] = useState(false);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
  };

  const handleSettingChange = (path, value) => {
    setUnsavedChanges(true);
    setSettings(prev => {
      const keys = path.split('.');
      const newSettings = JSON.parse(JSON.stringify(prev));
      let temp = newSettings;
      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) temp[keys[i]] = {};
        temp = temp[keys[i]];
      }
      temp[keys[keys.length - 1]] = value;
      return newSettings;
    });
  };

  const handleSaveChanges = async (tabName) => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log(`Saving ${tabName} settings:`, settings);
      setUnsavedChanges(false);
      showToast(`${tabName} settings saved successfully!`, "success");
    } catch (error) {
      showToast(`Failed to save ${tabName} settings. Please try again.`, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (field) => {
    // Simulate file upload
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          handleSettingChange(field, reader.result);
          showToast('Image uploaded successfully!', 'success');
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateURL = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={() => setToast(null)} 
        />
      )}
      
      <main className="flex-1 px-6 py-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Company Settings</h1>
            <p className="text-gray-600 mt-1">Manage global settings for your entire organization</p>
            {unsavedChanges && (
              <Badge variant="secondary" className="mt-2">
                <AlertCircle className="w-3 h-3 mr-1" />
                Unsaved changes
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            {loading && <RefreshCw className="w-4 h-4 animate-spin" />}
            <Badge variant="outline">Owner Access</Badge>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-white shadow-sm">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Building2 className="w-4 h-4"/>General
            </TabsTrigger>
            <TabsTrigger value="branding" className="flex items-center gap-2">
              <Palette className="w-4 h-4"/>Branding
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4"/>Notifications
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4"/>Billing
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Lock className="w-4 h-4"/>Security
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Users className="w-4 h-4"/>Roles
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Company Information</CardTitle>
                <CardDescription>Update your company's public profile and basic information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name *</Label>
                    <Input 
                      id="company-name" 
                      value={settings.company.name} 
                      onChange={e => handleSettingChange('company.name', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-website">Website</Label>
                    <Input 
                      id="company-website" 
                      type="url"
                      value={settings.company.website} 
                      onChange={e => handleSettingChange('company.website', e.target.value)}
                      placeholder="https://example.com"
                    />
                    {settings.company.website && !validateURL(settings.company.website) && (
                      <p className="text-sm text-red-500">Please enter a valid URL</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-industry">Industry</Label>
                    <Select value={settings.company.industry} onValueChange={value => handleSettingChange('company.industry', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Healthcare">Healthcare</SelectItem>
                        <SelectItem value="Finance">Finance</SelectItem>
                        <SelectItem value="Education">Education</SelectItem>
                        <SelectItem value="Manufacturing">Manufacturing</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company-size">Company Size</Label>
                    <Select value={settings.company.size} onValueChange={value => handleSettingChange('company.size', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-10">1-10 employees</SelectItem>
                        <SelectItem value="11-50">11-50 employees</SelectItem>
                        <SelectItem value="51-200">51-200 employees</SelectItem>
                        <SelectItem value="201-500">201-500 employees</SelectItem>
                        <SelectItem value="500+">500+ employees</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-address">Address</Label>
                  <Textarea 
                    id="company-address" 
                    value={settings.company.address} 
                    onChange={e => handleSettingChange('company.address', e.target.value)}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="company-description">Description</Label>
                  <Textarea 
                    id="company-description" 
                    value={settings.company.description} 
                    onChange={e => handleSettingChange('company.description', e.target.value)}
                    placeholder="Brief description of your company"
                    rows={3}
                  />
                </div>
                <Button 
                  onClick={() => handleSaveChanges('General')} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="branding" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Brand Identity</CardTitle>
                <CardDescription>Customize your workspace appearance and branding</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-6">
                  <div className="space-y-4">
                    <Avatar className="w-24 h-24 border-2 border-gray-200">
                      <AvatarImage src={settings.company.logo} alt="Company Logo" />
                      <AvatarFallback className="text-lg font-bold">
                        {settings.company.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Button 
                      variant="outline" 
                      onClick={() => handleFileUpload('company.logo')}
                      className="flex items-center gap-2"
                    >
                      <Upload className="w-4 h-4" />
                      Upload Logo
                    </Button>
                  </div>
                  <div className="flex-1 space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Logo Guidelines</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Recommended size: 256x256px</li>
                        <li>• Supported formats: PNG, JPG, SVG</li>
                        <li>• Maximum file size: 2MB</li>
                        <li>• Use transparent background for best results</li>
                      </ul>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <h4 className="font-medium">Color Scheme</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="primary-color">Primary Color</Label>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg border shadow-sm cursor-pointer" 
                          style={{ backgroundColor: settings.branding?.primaryColor || '#000' }}
                          onClick={() => document.getElementById('primary-color-picker').click()}
                        />
                        <Input 
                          id="primary-color" 
                          value={settings.branding?.primaryColor || ''} 
                          onChange={e => handleSettingChange('branding.primaryColor', e.target.value)}
                          placeholder="#6D28D9"
                          className="font-mono"
                        />
                        <input
                          id="primary-color-picker"
                          type="color"
                          className="sr-only"
                          value={settings.branding?.primaryColor || '#000000'}
                          onChange={e => handleSettingChange('branding.primaryColor', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="secondary-color">Secondary Color</Label>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-10 h-10 rounded-lg border shadow-sm cursor-pointer" 
                          style={{ backgroundColor: settings.branding?.secondaryColor || '#000' }}
                          onClick={() => document.getElementById('secondary-color-picker').click()}
                        />
                        <Input 
                          id="secondary-color" 
                          value={settings.branding?.secondaryColor || ''} 
                          onChange={e => handleSettingChange('branding.secondaryColor', e.target.value)}
                          placeholder="#EC4899"
                          className="font-mono"
                        />
                        <input
                          id="secondary-color-picker"
                          type="color"
                          className="sr-only"
                          value={settings.branding?.secondaryColor || '#000000'}
                          onChange={e => handleSettingChange('branding.secondaryColor', e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="custom-css">Custom CSS (Advanced)</Label>
                  <Textarea 
                    id="custom-css" 
                    value={settings.branding?.customCSS || ''} 
                    onChange={e => handleSettingChange('branding.customCSS', e.target.value)}
                    placeholder="Enter custom CSS rules..."
                    rows={4}
                    className="font-mono text-sm"
                  />
                  <p className="text-xs text-gray-500">Add custom CSS to further customize your workspace appearance</p>
                </div>
                
                <Button 
                  onClick={() => handleSaveChanges('Branding')} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Branding
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Configure default notification settings for all organization members</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {[
                    { key: 'emailNotifications', label: 'Email Notifications', desc: 'Send notifications via email' },
                    { key: 'projectDeadlines', label: 'Project Deadlines', desc: 'Alerts for approaching project deadlines' },
                    { key: 'teamUpdates', label: 'Team Updates', desc: 'Notifications about team activity and updates' },
                    { key: 'systemMaintenance', label: 'System Maintenance', desc: 'Alerts about scheduled maintenance' },
                    { key: 'securityAlerts', label: 'Security Alerts', desc: 'Important security notifications' },
                    { key: 'weeklyReports', label: 'Weekly Reports', desc: 'Summary reports sent weekly' }
                  ].map(item => (
                    <div key={item.key} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-grow">
                        <Label htmlFor={`notif-${item.key}`} className="cursor-pointer font-medium">
                          {item.label}
                        </Label>
                        <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
                      </div>
                      <Switch 
                        id={`notif-${item.key}`} 
                        checked={settings.notifications[item.key]} 
                        onCheckedChange={value => handleSettingChange(`notifications.${item.key}`, value)} 
                      />
                    </div>
                  ))}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select 
                    value={settings.notifications.frequency} 
                    onValueChange={value => handleSettingChange('notifications.frequency', value)}
                  >
                    <SelectTrigger className="w-full md:w-64">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="hourly">Hourly Digest</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                      <SelectItem value="weekly">Weekly Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button 
                  onClick={() => handleSaveChanges('Notification')} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Preferences
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your organization's billing and payment settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={settings.billing.currency} onValueChange={value => handleSettingChange('billing.currency', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD - US Dollar</SelectItem>
                        <SelectItem value="EUR">EUR - Euro</SelectItem>
                        <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                        <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Tax Rate (%)</Label>
                    <Input 
                      id="tax-rate" 
                      type="number" 
                      min="0" 
                      max="100" 
                      step="0.1"
                      value={settings.billing.taxRate} 
                      onChange={e => handleSettingChange('billing.taxRate', parseFloat(e.target.value) || 0)} 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="payment-terms">Payment Terms</Label>
                    <Select value={settings.billing.paymentTerms} onValueChange={value => handleSettingChange('billing.paymentTerms', value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 60">Net 60</SelectItem>
                        <SelectItem value="Due on Receipt">Due on Receipt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="invoice-prefix">Invoice Prefix</Label>
                    <Input 
                      id="invoice-prefix" 
                      value={settings.billing.invoicePrefix} 
                      onChange={e => handleSettingChange('billing.invoicePrefix', e.target.value)}
                      placeholder="INV-2024"
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="font-medium">Auto-renewal</Label>
                      <p className="text-sm text-gray-600 mt-1">Automatically renew subscription</p>
                    </div>
                    <Switch 
                      checked={settings.billing.autoRenewal} 
                      onCheckedChange={value => handleSettingChange('billing.autoRenewal', value)} 
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="billing-address">Billing Address</Label>
                  <Textarea 
                    id="billing-address" 
                    value={settings.billing.billingAddress} 
                    onChange={e => handleSettingChange('billing.billingAddress', e.target.value)}
                    rows={3}
                  />
                </div>
                
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium mb-2">Current Payment Method</h4>
                  <p className="text-sm text-gray-600">{settings.billing.paymentMethod}</p>
                  <Button variant="outline" className="mt-2" size="sm">
                    Update Payment Method
                  </Button>
                </div>
                
                <Button 
                  onClick={() => handleSaveChanges('Billing')} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Billing Settings
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Policy
                </CardTitle>
                <CardDescription>Configure security settings and policies for your organization</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Security changes may require users to re-authenticate. Consider notifying your team before making changes.
                  </AlertDescription>
                </Alert>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="font-medium">Enforce Two-Factor Authentication (2FA)</Label>
                      <p className="text-sm text-gray-600 mt-1">Require all users to enable 2FA for account access</p>
                    </div>
                    <Switch 
                      checked={settings.security.enforce2FA} 
                      onCheckedChange={value => handleSettingChange('security.enforce2FA', value)} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <Label className="font-medium">Audit Logging</Label>
                      <p className="text-sm text-gray-600 mt-1">Log all user actions and system events</p>
                    </div>
                    <Switch 
                      checked={settings.security.auditLogging} 
                      onCheckedChange={value => handleSettingChange('security.auditLogging', value)} 
                    />
                  </div>
                </div>
                
                <Separator />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Session Timeout (minutes)</Label>
                    <Input 
                      id="session-timeout" 
                      type="number" 
                      min="5" 
                      max="480"
                      value={settings.security.sessionTimeout} 
                      onChange={e => handleSettingChange('security.sessionTimeout', parseInt(e.target.value) || 120)}
                    />
                    <p className="text-xs text-gray-500">Users will be logged out after this period of inactivity</p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="data-retention">Data Retention (days)</Label>
                    <Input 
                      id="data-retention" 
                      type="number" 
                      min="30" 
                      max="2555"
                      value={settings.security.dataRetention} 
                      onChange={e => handleSettingChange('security.dataRetention', parseInt(e.target.value) || 365)}
                    />
                    <p className="text-xs text-gray-500">How long to keep user activity logs</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium">Password Policy</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="min-password-length">Minimum Password Length</Label>
                      <Input 
                        id="min-password-length" 
                        type="number" 
                        min="6" 
                        max="50"
                        value={settings.security.passwordPolicy.minLength} 
                        onChange={e => handleSettingChange('security.passwordPolicy.minLength', parseInt(e.target.value) || 8)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label>Password Requirements</Label>
                      <div className="space-y-2">
                        {[
                          { key: 'requireNumbers', label: 'Require Numbers' },
                          { key: 'requireUppercase', label: 'Require Uppercase' },
                          { key: 'requireSpecialChars', label: 'Require Special Characters' }
                        ].map(item => (
                          <div key={item.key} className="flex items-center space-x-2">
                            <Switch 
                              id={`pwd-${item.key}`}
                              checked={settings.security.passwordPolicy[item.key]} 
                              onCheckedChange={value => handleSettingChange(`security.passwordPolicy.${item.key}`, value)} 
                            />
                            <Label htmlFor={`pwd-${item.key}`} className="text-sm">{item.label}</Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Button 
                  onClick={() => handleSaveChanges('Security')} 
                  disabled={loading}
                  className="flex items-center gap-2"
                >
                  {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  Save Security Policy
                </Button>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Security Status</CardTitle>
                <CardDescription>Current security configuration overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Overall Security Score</span>
                    <div className="flex items-center gap-2">
                      <Progress value={85} className="w-20" />
                      <span className="text-sm font-medium">85%</span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {[
                      { label: '2FA Enabled', status: settings.security.enforce2FA, color: settings.security.enforce2FA ? 'green' : 'red' },
                      { label: 'Audit Logging', status: settings.security.auditLogging, color: settings.security.auditLogging ? 'green' : 'yellow' },
                      { label: 'Strong Passwords', status: settings.security.passwordPolicy.minLength >= 8, color: settings.security.passwordPolicy.minLength >= 8 ? 'green' : 'red' }
                    ].map((item, index) => (
                      <div key={index} className={`p-3 border rounded-lg ${
                        item.color === 'green' ? 'bg-green-50 border-green-200' :
                        item.color === 'yellow' ? 'bg-yellow-50 border-yellow-200' :
                        'bg-red-50 border-red-200'
                      }`}>
                        <div className="flex items-center gap-2">
                          {item.status ? (
                            <Check className={`w-4 h-4 ${item.color === 'green' ? 'text-green-600' : 'text-yellow-600'}`} />
                          ) : (
                            <X className="w-4 h-4 text-red-600" />
                          )}
                          <span className="text-sm font-medium">{item.label}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="roles">
            <PermissionsMatrix />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default OwnerSettings;