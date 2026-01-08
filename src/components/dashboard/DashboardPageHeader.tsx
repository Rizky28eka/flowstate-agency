import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ReactNode } from "react";

interface DashboardPageHeaderProps {
    title: string;
    description?: string;
    actionLabel?: string;
    onAction?: () => void;
    children?: ReactNode;
}

const DashboardPageHeader = ({ title, description, actionLabel, onAction, children }: DashboardPageHeaderProps) => {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                {description && <p className="text-muted-foreground mt-1">{description}</p>}
            </div>
            <div className="flex items-center gap-3">
                {children}
                {actionLabel && (
                    <Button onClick={onAction} className="gap-2">
                        <PlusCircle className="w-4 h-4" />
                        {actionLabel}
                    </Button>
                )}
            </div>
        </div>
    );
};

export default DashboardPageHeader;
