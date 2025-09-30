
import { NavLink, Outlet, useParams } from "react-router-dom";
import { teamMembers } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

const UserDetailLayout = () => {
  const { userId } = useParams<{ userId: string }>();
  const isMobile = useIsMobile();

  const user = teamMembers.find((m) => m.id.toString() === userId);

  if (!user) {
    return <div>User not found</div>;
  }

  const navLinks = [
    { to: ".", label: "Overview" },
    { to: "tasks", label: "Tasks" },
    { to: "performance", label: "Performance" },
    { to: "settings", label: "Settings" },
  ];

  const navigation = (
    <nav className="flex flex-col gap-2">
      {navLinks.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          end
          className={({ isActive }) =>
            `px-3 py-2 rounded-md text-sm font-medium ` +
            (isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted")
          }
        >
          {link.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen w-full">
      {isMobile ? (
        <Sheet>
          <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
            <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
                <SheetTrigger asChild>
                    <Button size="icon" variant="outline" className="sm:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle Menu</span>
                    </Button>
                </SheetTrigger>
                <h1 className="text-lg font-semibold">{user.name}</h1>
            </header>
            <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
                <Outlet context={{ user }} />
            </main>
          </div>
          <SheetContent side="left" className="sm:max-w-xs">
            <div className="p-4">
                <div className="mb-4 flex items-center gap-4">
                    <Avatar className="h-10 w-10 border">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">{user.name}</p>
                        <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                </div>
                {navigation}
            </div>
          </SheetContent>
        </Sheet>
      ) : (
        <>
          <aside className="hidden w-64 flex-col border-r bg-background p-4 sm:flex">
            <div className="mb-4 flex items-center gap-4">
              <Avatar className="h-12 w-12 border">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-lg font-bold">{user.name}</h1>
                <p className="text-sm text-muted-foreground">{user.role}</p>
              </div>
            </div>
            {navigation}
          </aside>
          <main className="flex-1 p-6">
            <Outlet context={{ user }} />
          </main>
        </>
      )}
    </div>
  );
};

export default UserDetailLayout;
