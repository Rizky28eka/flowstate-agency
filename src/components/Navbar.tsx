import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Crown, Shield, User, Users, Code, DollarSign, Handshake, Menu, X } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const roles = [
  { id: "OWNER", label: "Owner", icon: Crown, description: "Full platform access" },
  { id: "ADMIN", label: "Admin", icon: Shield, description: "Administrative control" },
  { id: "PROJECT_MANAGER", label: "Project Manager", icon: User, description: "Project oversight" },
  { id: "TEAM_LEAD", label: "Team Lead", icon: Users, description: "Team management" },
  { id: "MEMBER", label: "Member", icon: Code, description: "Team collaboration" },
  { id: "FINANCE", label: "Finance", icon: DollarSign, description: "Financial management" },
  { id: "CLIENT", label: "Client", icon: Handshake, description: "Client portal access" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  const handleRoleSelect = (roleId: string) => {
    const roleRoutes = {
      "OWNER": "/dashboard/owner",
      "ADMIN": "/dashboard/admin", 
      "PROJECT_MANAGER": "/dashboard/project-manager",
      "TEAM_LEAD": "/dashboard/team-lead",
      "MEMBER": "/dashboard/member",
      "FINANCE": "/dashboard/finance",
      "CLIENT": "/dashboard/client"
    };
    
    const route = roleRoutes[roleId as keyof typeof roleRoutes];
    if (route) {
      window.location.href = route;
    }
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="text-xl font-bold text-primary">AgencyFlow</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-foreground hover:text-primary transition-colors">Features</a>
            <a href="#testimonials" className="text-foreground hover:text-primary transition-colors">Testimonials</a>
            <a href="#pricing" className="text-foreground hover:text-primary transition-colors">Pricing</a>
            <a href="#faq" className="text-foreground hover:text-primary transition-colors">FAQ</a>
          </div>

          {/* Desktop Login Dropdown */}
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center space-x-2">
                  <span>Login</span>
                  <ChevronDown className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-64 p-2">
                <div className="px-3 py-2 border-b">
                  <p className="font-medium text-sm">Select your role</p>
                  <p className="text-xs text-muted-foreground">Choose how you'll access AgencyFlow</p>
                </div>
                {roles.map((role) => {
                  const IconComponent = role.icon;
                  return (
                    <DropdownMenuItem 
                      key={role.id}
                      onClick={() => handleRoleSelect(role.id)}
                      className="flex items-start space-x-3 p-3 cursor-pointer"
                    >
                      <IconComponent className="w-5 h-5 mt-0.5 text-primary" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{role.label}</p>
                        <p className="text-xs text-muted-foreground">{role.description}</p>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex flex-col space-y-6 mt-6">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col space-y-4">
                    <a href="#features" className="text-foreground hover:text-primary transition-colors py-2">Features</a>
                    <a href="#testimonials" className="text-foreground hover:text-primary transition-colors py-2">Testimonials</a>
                    <a href="#pricing" className="text-foreground hover:text-primary transition-colors py-2">Pricing</a>
                    <a href="#faq" className="text-foreground hover:text-primary transition-colors py-2">FAQ</a>
                  </div>
                  
                  <div className="border-t pt-6">
                    <p className="font-medium text-sm mb-4">Select your role to login:</p>
                    <div className="space-y-2">
                      {roles.map((role) => {
                        const IconComponent = role.icon;
                        return (
                          <Button
                            key={role.id}
                            variant="ghost"
                            onClick={() => {
                              handleRoleSelect(role.id);
                              setIsMobileMenuOpen(false);
                            }}
                            className="w-full justify-start space-x-3 p-3 h-auto"
                          >
                            <IconComponent className="w-5 h-5 text-primary" />
                            <div className="text-left">
                              <p className="font-medium text-sm">{role.label}</p>
                              <p className="text-xs text-muted-foreground">{role.description}</p>
                            </div>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;