import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Building, Bell, Palette, Save, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

const SettingsPage = () => {
    const queryClient = useQueryClient();
    const [isSaving, setIsSaving] = useState(false);

    // Data Fetching
    const { data: userRes, isLoading: isUserLoading } = useQuery({
        queryKey: ["user", "me"],
        queryFn: () => api.get("/users/me")
    });

    const { data: orgRes, isLoading: isOrgLoading } = useQuery({
        queryKey: ["organization"],
        queryFn: () => api.get("/organization")
    });

    const user = userRes?.data;
    const organization = orgRes?.data;

    // Form States
    const [profileForm, setProfileForm] = useState({ name: "", email: "" });
    const [orgForm, setOrgForm] = useState({ name: "", website: "" });

    useEffect(() => {
        if (user) {
            setProfileForm({
                name: user.name || "",
                email: user.email || ""
            });
        }
    }, [user]);

    useEffect(() => {
        if (organization) {
            setOrgForm({
                name: organization.name || "",
                website: organization.website || ""
            });
        }
    }, [organization]);

    // Mutations
    const updateProfileMutation = useMutation({
        mutationFn: (data: { name: string; email: string }) => api.patch("/users/me", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user", "me"] });
            toast.success("Profile updated successfully");
        },
        onError: () => {
            toast.error("Failed to update profile");
        }
    });

    const updateOrgMutation = useMutation({
        mutationFn: (data: { name: string; website: string }) => api.patch("/organization", data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["organization"] });
            toast.success("Organization updated successfully");
        },
        onError: () => {
            toast.error("Failed to update organization");
        }
    });

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateProfileMutation.mutateAsync(profileForm);
        } catch (err) {
            // Error handled by mutation
        } finally {
            setIsSaving(false);
        }
    };

    const handleSaveOrg = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        try {
            await updateOrgMutation.mutateAsync(orgForm);
        } catch (err) {
            // Error handled by mutation
        } finally {
            setIsSaving(false);
        }
    };

    if (isUserLoading || isOrgLoading) {
        return (
            <DashboardLayout>
                <div className="flex items-center justify-center p-20">
                    <Loader2 className="w-8 h-8 animate-spin text-primary" />
                </div>
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout>
            <DashboardPageHeader
                title="Settings"
                description="Manage your account settings and preferences."
            />

            <Tabs defaultValue="profile" className="w-full">
                <TabsList className="bg-background/50 border border-border/50 mb-8 p-1">
                    <TabsTrigger value="profile" className="gap-2 px-6 font-bold">
                        <User className="w-4 h-4" /> Profile
                    </TabsTrigger>
                    <TabsTrigger value="organization" className="gap-2 px-6 font-bold">
                        <Building className="w-4 h-4" /> Organization
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="gap-2 px-6 font-bold">
                        <Bell className="w-4 h-4" /> Notifications
                    </TabsTrigger>
                    <TabsTrigger value="appearance" className="gap-2 px-6 font-bold">
                        <Palette className="w-4 h-4" /> Appearance
                    </TabsTrigger>
                </TabsList>

                {/* Profile Settings */}
                <TabsContent value="profile" className="space-y-6">
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Public Profile</CardTitle>
                            <CardDescription>Update your personal information and how others see you.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSaveProfile}>
                            <CardContent className="space-y-6">
                                <div className="flex items-center gap-6 p-4 rounded-xl bg-muted/30 border border-border/50 w-fit">
                                    <Avatar className="w-20 h-20 border-4 border-background shadow-xl">
                                        <AvatarImage src={`https://avatar.vercel.sh/${profileForm.email}`} />
                                        <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-black">
                                            {profileForm.name?.substring(0, 2).toUpperCase() || "UN"}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="space-y-2">
                                        <Button variant="outline" size="sm" type="button">Change Avatar</Button>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">JPG, GIF or PNG. Max size 2MB</p>
                                    </div>
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Full Name</Label>
                                        <Input
                                            id="name"
                                            value={profileForm.name}
                                            onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            value={profileForm.email}
                                            readOnly
                                            className="bg-muted/50 cursor-not-allowed"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-border/50 pt-6">
                                <Button className="ml-auto gap-2 font-black" type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Save Changes
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                {/* Organization Settings */}
                <TabsContent value="organization" className="space-y-6">
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Organization Details</CardTitle>
                            <CardDescription>Manage your company information and workspace settings.</CardDescription>
                        </CardHeader>
                        <form onSubmit={handleSaveOrg}>
                            <CardContent className="space-y-6">
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="org-name" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Organization Name</Label>
                                        <Input
                                            id="org-name"
                                            value={orgForm.name}
                                            onChange={(e) => setOrgForm({ ...orgForm, name: e.target.value })}
                                            className="bg-background/50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="org-website" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Website</Label>
                                        <Input
                                            id="org-website"
                                            value={orgForm.website}
                                            onChange={(e) => setOrgForm({ ...orgForm, website: e.target.value })}
                                            placeholder="https://example.com"
                                            className="bg-background/50"
                                        />
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="border-t border-border/50 pt-6">
                                <Button className="ml-auto gap-2 font-black" type="submit" disabled={isSaving}>
                                    {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                    Update Organization
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </TabsContent>

                {/* Notifications */}
                <TabsContent value="notifications" className="space-y-6">
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardHeader>
                            <CardTitle className="text-xl font-bold">Notification Preferences</CardTitle>
                            <CardDescription>Control how and when you receive updates.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {[
                                { title: "Email Notifications", desc: "Receive daily summaries and important updates via email." },
                                { title: "Push Notifications", desc: "Get real-time alerts on your desktop or mobile device." },
                                { title: "Project Activity", desc: "Notify me when tasks are assigned or completed." }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-xl border border-border/50 bg-muted/20">
                                    <div className="space-y-0.5">
                                        <h4 className="font-bold">{item.title}</h4>
                                        <p className="text-xs text-muted-foreground">{item.desc}</p>
                                    </div>
                                    <Switch defaultChecked />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="appearance">
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm p-12 text-center">
                        <Palette className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-20" />
                        <h3 className="text-lg font-bold">Coming Soon</h3>
                        <p className="text-muted-foreground">Custom themes and dark mode adjustment will be available in the next update.</p>
                    </Card>
                </TabsContent>
            </Tabs>
        </DashboardLayout>
    );
};

export default SettingsPage;
