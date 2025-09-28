import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, Building2, Palette, Bell, CreditCard, Lock, Users, Upload } from "lucide-react";
import { settings } from "@/lib/mock-data";

const OwnerSettings = () => {
  return (
    <main className="flex-1 px-6 py-8 overflow-auto">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <Settings className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-2xl font-bold text-foreground">Company Settings</h1>
            <p className="text-sm text-muted-foreground">Manage global settings for the entire organization</p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general"><Building2 className="w-4 h-4 mr-2"/>General</TabsTrigger>
          <TabsTrigger value="branding"><Palette className="w-4 h-4 mr-2"/>Branding</TabsTrigger>
          <TabsTrigger value="notifications"><Bell className="w-4 h-4 mr-2"/>Notifications</TabsTrigger>
          <TabsTrigger value="billing"><CreditCard className="w-4 h-4 mr-2"/>Billing</TabsTrigger>
          <TabsTrigger value="security"><Lock className="w-4 h-4 mr-2"/>Security</TabsTrigger>
          <TabsTrigger value="roles"><Users className="w-4 h-4 mr-2"/>Roles & Permissions</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Information</CardTitle>
              <CardDescription>Update your company's public details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="company-name">Company Name</Label>
                <Input id="company-name" defaultValue={settings.company.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-website">Website</Label>
                <Input id="company-website" defaultValue={settings.company.website} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company-address">Address</Label>
                <Input id="company-address" defaultValue={settings.company.address} />
              </div>
              <Button>Save Changes</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="branding">
          <Card>
            <CardHeader>
              <CardTitle>Branding & Appearance</CardTitle>
              <CardDescription>Customize the look and feel of your workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                    <Avatar className="w-20 h-20">
                        <AvatarImage src={settings.company.logo} alt="Company Logo" />
                        <AvatarFallback>FA</AvatarFallback>
                    </Avatar>
                    <div className="space-y-2">
                        <Label>Company Logo</Label>
                        <Input id="logo-upload" type="file" className="hidden" />
                        <Button asChild variant="outline">
                           <label htmlFor="logo-upload" className="cursor-pointer">
                                <Upload className="w-4 h-4 mr-2" />
                                Upload New Logo
                           </label>
                        </Button>
                        <p className="text-xs text-muted-foreground">Recommended size: 256x256px, PNG or JPG</p>
                    </div>
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="primary-color">Primary Color</Label>
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-lg bg-primary" />
                        <Input id="primary-color" defaultValue="#6D28D9" className="w-40" />
                    </div>
                </div>
              <Button>Save Branding</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Global Notification Settings</CardTitle>
              <CardDescription>Set default notification preferences for all users.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="notif-projects">Project Updates</Label>
                  <p className="text-sm text-muted-foreground">Notifications about new projects, status changes, and deadlines.</p>
                </div>
                <Switch id="notif-projects" defaultChecked={settings.notifications.projectDeadlines} />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="notif-tasks">Task Assignments</Label>
                  <p className="text-sm text-muted-foreground">Notify users when they are assigned to a new task.</p>
                </div>
                <Switch id="notif-tasks" defaultChecked={settings.notifications.teamUpdates} />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <Label htmlFor="notif-mentions">Mentions</Label>
                  <p className="text-sm text-muted-foreground">Notify users when they are @mentioned in comments.</p>
                </div>
                <Switch id="notif-mentions" defaultChecked={settings.notifications.clientCommunications} />
              </div>
              <Button>Save Preferences</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
            <Card>
                <CardHeader>
                    <CardTitle>Billing & Subscription</CardTitle>
                    <CardDescription>Manage your subscription plan and payment methods.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 border rounded-lg bg-secondary">
                        <h4 className="font-semibold">Current Plan: Enterprise</h4>
                        <p className="text-muted-foreground">Your plan renews on November 28, 2025.</p>
                        <div className="mt-4 flex space-x-2">
                            <Button>Upgrade Plan</Button>
                            <Button variant="outline">Cancel Subscription</Button>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-semibold mb-2">Payment Methods</h4>
                        <div className="border rounded-lg p-4 flex justify-between items-center">
                            <div className="flex items-center space-x-3">
                                <CreditCard className="w-6 h-6"/>
                                <div>
                                    <p className="font-medium">Visa ending in 4242</p>
                                    <p className="text-sm text-muted-foreground">Expires 12/27</p>
                                </div>
                            </div>
                            <Button variant="outline">Edit</Button>
                        </div>
                    </div>
                    <Button>Add Payment Method</Button>
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="security">
            <Card>
                <CardHeader>
                    <CardTitle>Security Policy</CardTitle>
                    <CardDescription>Manage your organization's security settings.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                            <Label>Two-Factor Authentication (2FA)</Label>
                            <p className="text-sm text-muted-foreground">Enforce 2FA for all members of the organization.</p>
                        </div>
                        <Switch id="enforce-2fa" />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout (in minutes)</Label>
                        <Input id="session-timeout" type="number" defaultValue={120} className="w-40" />
                        <p className="text-xs text-muted-foreground">Automatically log out users after a period of inactivity.</p>
                    </div>
                    <Button>Save Security Policy</Button>
                </CardContent>
            </Card>
        </TabsContent>

         <TabsContent value="roles">
            <Card>
                <CardHeader>
                    <CardTitle>Roles & Permissions</CardTitle>
                    <CardDescription>Define roles and manage what users can see and do.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Role management functionality will be implemented here.</p>
                </CardContent>
            </Card>
        </TabsContent>

      </Tabs>
    </main>
  );
};

export default OwnerSettings;