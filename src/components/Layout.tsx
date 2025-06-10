import { NavLink, Outlet } from "react-router-dom";
import { Dumbbell, History, ListChecks } from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: Dumbbell },
  { href: "/history", label: "History", icon: History },
  { href: "/exercises", label: "Exercises", icon: ListChecks },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 max-w-screen-2xl items-center justify-between px-4 md:px-6">
          <NavLink to="/" className="mr-6 flex items-center space-x-2">
            <Dumbbell className="h-7 w-7 text-primary" />
            <span className="font-display text-2xl font-bold text-primary hidden sm:inline-block">
              FITTRACK
            </span>
          </NavLink>
          <nav className="flex items-center gap-4 text-sm lg:gap-6">
            {navItems.map((item) => (
              <NavLink
                key={item.href}
                to={item.href}
                className={({ isActive }) =>
                  `transition-colors hover:text-primary/80 ${isActive ? "text-primary font-semibold" : "text-muted-foreground"}`
                }
              >
                <item.icon className="h-5 w-5 sm:hidden" />
                <span className="hidden sm:inline-block">{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="py-6 md:px-8 md:py-0 border-t border-border/40">
        <div className="container flex flex-col items-center justify-center gap-4 md:h-20 md:flex-row">
          <p className="text-balance text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built by Blink. Make something <span className="font-semibold text-primary/90">useful</span> and <span className="font-semibold text-primary/90">beautiful</span>.
          </p>
        </div>
      </footer>
    </div>
  );
}
