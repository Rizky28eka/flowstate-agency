import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import DashboardPageHeader from "@/components/dashboard/DashboardPageHeader";
import api from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    FileText,
    Download,
    Trash2,
    Calendar,
    TrendingUp,
    CheckCircle2,
    Clock,
    Filter,
    Plus,
    Loader2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { toast } from "sonner";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Report {
    id: string;
    title: string;
    type: string;
    status: string;
    createdAt: string;
    size: string;
}

const ReportsPage = () => {
    const queryClient = useQueryClient();
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [reportType, setReportType] = useState("FINANCIAL");

    const { data: response, isLoading } = useQuery({
        queryKey: ["reports"],
        queryFn: () => api.get("/reports"),
    });

    const reports = response?.data || [];

    const createMutation = useMutation({
        mutationFn: (type: string) => api.post("/reports", { type, title: `${type} Report - ${new Date().toLocaleDateString()}` }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            toast.success("Report generated successfully");
            setIsCreateModalOpen(false);
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id: string) => api.delete(`/reports/${id}`),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            toast.success("Report deleted");
        }
    });

    return (
        <DashboardLayout>
            <DashboardPageHeader
                title="Reports"
                description="Extract insights and export data from your projects and finances."
                actionLabel="Generate Report"
                onAction={() => setIsCreateModalOpen(true)}
            />

            <div className="flex flex-col gap-8">
                {/* Stats Summary */}
                <div className="grid gap-6 md:grid-cols-3">
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                                    <FileText className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Total Reports</p>
                                    <h3 className="text-2xl font-black">{reports.length}</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Storage Used</p>
                                    <h3 className="text-2xl font-black">1.2 GB</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Recent Activity</p>
                                    <h3 className="text-2xl font-black">{reports.filter((r: Report) => new Date(r.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)).length} New</h3>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Reports List */}
                <Card className="border-border/50 bg-background/50 backdrop-blur-sm">
                    <CardHeader className="flex flex-row items-center justify-between border-b border-border/50 px-6 py-4">
                        <div className="space-y-1">
                            <CardTitle className="text-lg font-bold">Generated Reports</CardTitle>
                            <CardDescription className="text-xs">Your organization's downloadable report history.</CardDescription>
                        </div>
                        <Button variant="outline" size="sm" className="gap-2">
                            <Filter className="w-4 h-4" /> Filter
                        </Button>
                    </CardHeader>
                    <CardContent className="p-0">
                        {isLoading ? (
                            <div className="p-6 space-y-4">
                                {[1, 2, 3].map(i => <Skeleton key={i} className="h-16 w-full" />)}
                            </div>
                        ) : (
                            <div className="divide-y divide-border/50">
                                {reports.map((report: Report) => (
                                    <div key={report.id} className="flex items-center justify-between p-6 hover:bg-muted/30 transition-colors group">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                                                <FileText className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-sm">{report.title}</h4>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <span className="text-[10px] uppercase font-bold text-muted-foreground">{report.type}</span>
                                                    <span className="text-muted-foreground">•</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium">{report.size || "1.4 MB"}</span>
                                                    <span className="text-muted-foreground">•</span>
                                                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1">
                                                        <Calendar className="w-3 h-3" /> {new Date(report.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline" className="text-[9px] font-bold uppercase py-0 px-2 border-emerald-500/20 text-emerald-500 bg-emerald-500/5">
                                                {report.status}
                                            </Badge>
                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-9 w-9 text-muted-foreground hover:text-destructive"
                                                onClick={() => {
                                                    if (confirm("Delete report?")) deleteMutation.mutate(report.id);
                                                }}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                                {reports.length === 0 && (
                                    <div className="py-20 text-center">
                                        <p className="text-muted-foreground font-medium">No reports generated yet.</p>
                                        <Button variant="link" onClick={() => setIsCreateModalOpen(true)}>Generate your first report</Button>
                                    </div>
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Create Report Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-black">Generate Report</DialogTitle>
                        <DialogDescription>
                            Select the type of report you want to generate for your organization.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="type" className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Report Type</Label>
                            <Select value={reportType} onValueChange={setReportType}>
                                <SelectTrigger className="w-full bg-background/50">
                                    <SelectValue placeholder="Select report type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="FINANCIAL">Financial Statement</SelectItem>
                                    <SelectItem value="PROJECT">Project Progress Summary</SelectItem>
                                    <SelectItem value="CLIENT">Active Client Directory</SelectItem>
                                    <SelectItem value="CUSTOM">Custom System Audit</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button
                            className="font-black px-8"
                            onClick={() => createMutation.mutate(reportType)}
                            disabled={createMutation.isPending}
                        >
                            {createMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                            Generate Now
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
};

export default ReportsPage;
