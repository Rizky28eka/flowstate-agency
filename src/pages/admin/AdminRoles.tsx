import { useNavigate } from "react-router-dom";
import { MOCK_ROLES } from "@/lib/permissions";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

const AdminRoles = () => {
  const navigate = useNavigate();

  // Mock user counts for demonstration
  const userCounts: Record<string, number> = {
    owner: 1,
    admin: 2,
    project_manager: 5,
    team_lead: 8,
    member: 25,
    finance: 2,
    client: 45,
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">Roles & Permissions</h1>
          <p className="text-muted-foreground">
            Manage user roles and their access permissions across the platform.
          </p>
        </div>
        <Button onClick={() => navigate("/dashboard/admin/roles/new")} className="w-full sm:w-auto">
          Add New Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Existing Roles</CardTitle>
          <CardDescription>A list of all roles in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Role</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm">Description</TableHead>
                  <TableHead className="hidden sm:table-cell text-xs sm:text-sm">Users</TableHead>
                  <TableHead className="text-xs sm:text-sm">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {MOCK_ROLES.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium p-2 sm:p-4">
                      <div className="flex flex-col">
                        <span className="text-sm sm:text-base">{role.name}</span>
                        <span className="text-xs text-muted-foreground md:hidden">
                          {userCounts[role.id] || 0} users
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell p-2 sm:p-4 text-sm">
                      {role.description}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell p-2 sm:p-4">
                      <Badge variant="outline">{userCounts[role.id] || 0}</Badge>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button aria-haspopup="true" size="icon" variant="ghost" className="h-8 w-8">
                            <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => navigate(`/dashboard/admin/roles/${role.id}`)}>
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>View Users</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminRoles;
