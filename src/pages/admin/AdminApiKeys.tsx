import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Copy, Check, AlertTriangle } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ApiKey {
  id: string;
  name: string;
  token: string;
  truncatedToken: string;
  createdDate: string;
  lastUsedDate: string | null;
  status: "active" | "revoked";
}

const MOCK_API_KEYS: ApiKey[] = [
  {
    id: "1",
    name: "External Reporting Service",
    token: "fs_prod_1234567890abcdefghijklmnopqrstuvwxyz",
    truncatedToken: "fs_prod_...wxyz",
    createdDate: "2024-08-15",
    lastUsedDate: "2025-09-28",
    status: "active",
  },
  {
    id: "2",
    name: "Old Zapier Integration",
    token: "fs_prod_0987654321zyxwutsrqponmlkjihgfedcba",
    truncatedToken: "fs_prod_...dcba",
    createdDate: "2023-01-20",
    lastUsedDate: "2024-03-10",
    status: "revoked",
  },
];

const GenerateKeyDialog = ({ onGenerate }: { onGenerate: (name: string) => void }) => {
  const [name, setName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = () => {
    if (name) {
      onGenerate(name);
      setName("");
      setIsOpen(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto">Generate New Key</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Generate New API Key</DialogTitle>
          <DialogDescription>
            Give this key a descriptive name to remember its purpose.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="sm:text-right">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="sm:col-span-3"
              placeholder="e.g., Marketing Site API"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit} className="w-full sm:w-auto">
            Generate Key
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const ShowKeyDialog = ({
  apiKey,
  isOpen,
  setIsOpen,
}: {
  apiKey: ApiKey | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    if (apiKey) {
      navigator.clipboard.writeText(apiKey.token);
      setHasCopied(true);
      setTimeout(() => setHasCopied(false), 2000);
    }
  };

  if (!apiKey) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>API Key Generated Successfully</DialogTitle>
          <DialogDescription>
            Copy this key and store it securely. You will not be able to see it again.
          </DialogDescription>
        </DialogHeader>
        <div className="relative bg-muted rounded-md p-4 font-mono text-sm break-all">
          {apiKey.token}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 h-8 w-8"
            onClick={handleCopy}
          >
            {hasCopied ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="flex items-start gap-3 bg-destructive/10 text-destructive p-3 rounded-md border border-destructive/30">
          <AlertTriangle className="h-5 w-5 mt-0.5 shrink-0" />
          <p className="text-sm">
            Treat this key like a password. Do not share it or expose it in client-side code.
          </p>
        </div>
        <DialogFooter>
          <Button onClick={() => setIsOpen(false)} className="w-full sm:w-auto">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

const AdminApiKeys = () => {
  const [keys, setKeys] = useState<ApiKey[]>(MOCK_API_KEYS);
  const [newlyGeneratedKey, setNewlyGeneratedKey] = useState<ApiKey | null>(null);
  const [showKeyDialogOpen, setShowKeyDialogOpen] = useState(false);

  const handleGenerateKey = (name: string) => {
    const newKey: ApiKey = {
      id: (keys.length + 2).toString(),
      name,
      token: `fs_prod_${[...Array(32)]
        .map(() => Math.random().toString(36)[2])
        .join("")}`,
      truncatedToken: "fs_prod_...new",
      createdDate: new Date().toISOString().split("T")[0],
      lastUsedDate: null,
      status: "active",
    };
    newKey.truncatedToken = `${newKey.token.substring(0, 11)}...${newKey.token.substring(
      newKey.token.length - 4
    )}`;
    setKeys((prev) => [newKey, ...prev]);
    setNewlyGeneratedKey(newKey);
    setShowKeyDialogOpen(true);
  };

  const handleRevokeKey = (keyId: string) => {
    setKeys(
      keys.map((key) =>
        key.id === keyId ? { ...key, status: "revoked" } : key
      )
    );
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            API Management
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Generate and manage API keys for programmatic access to Flowstate.
          </p>
        </div>
        <GenerateKeyDialog onGenerate={handleGenerateKey} />
      </div>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">API Keys</CardTitle>
          <CardDescription>
            Keys that can be used to access the Flowstate API.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm">Name</TableHead>
                  <TableHead className="text-xs sm:text-sm">Token</TableHead>
                  <TableHead className="text-xs sm:text-sm">Status</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm">Created</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm">Last Used</TableHead>
                  <TableHead className="text-xs sm:text-sm">
                    <span className="sr-only">Actions</span>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {keys.map((key) => (
                  <TableRow
                    key={key.id}
                    className={key.status === "revoked" ? "text-muted-foreground" : ""}
                  >
                    <TableCell className="font-medium p-2 sm:p-4 text-sm">{key.name}</TableCell>
                    <TableCell className="p-2 sm:p-4">
                      <code className="font-mono text-xs sm:text-sm">{key.truncatedToken}</code>
                    </TableCell>
                    <TableCell className="p-2 sm:p-4">
                      <Badge
                        variant={key.status === "active" ? "default" : "destructive"}
                        className="capitalize text-xs"
                      >
                        {key.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell p-2 sm:p-4 text-sm">{key.createdDate}</TableCell>
                    <TableCell className="hidden md:table-cell p-2 sm:p-4 text-sm">
                      {key.lastUsedDate || "Never"}
                    </TableCell>
                    <TableCell className="p-2 sm:p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            aria-haspopup="true"
                            size="sm"
                            variant="ghost"
                            disabled={key.status === "revoked"}
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-3 w-3 sm:h-4 sm:w-4" />
                            <span className="sr-only">Toggle menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            className="text-destructive"
                            onClick={() => handleRevokeKey(key.id)}
                          >
                            Revoke Key
                          </DropdownMenuItem>
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

      <ShowKeyDialog
        apiKey={newlyGeneratedKey}
        isOpen={showKeyDialogOpen}
        setIsOpen={setShowKeyDialogOpen}
      />
    </div>
  );
};

export default AdminApiKeys;