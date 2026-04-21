import { Link, NavLink, useLocation } from "react-router-dom";
import { Bell, Lock, Search } from "lucide-react";
import logo from "@/assets/cheinly-logo.jpeg";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Badge } from "@/components/ui/badge";

interface BuyerHeaderProps {
  variant?: "checkout" | "dashboard";
}

export const BuyerHeader = ({ variant = "checkout" }: BuyerHeaderProps) => {
  const location = useLocation();
  const isDashboard = variant === "dashboard";

  return (
    <header className="border-b border-border/60 bg-card/60 backdrop-blur-sm sticky top-0 z-30">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Cheinly" className="h-8 w-8 rounded-md object-cover ring-1 ring-gold/40" />
            <span className="font-display text-xl text-gold tracking-wide">CHEINLY</span>
          </Link>
          {isDashboard && (
            <nav className="hidden md:flex items-center gap-1 text-sm">
              {[
                { to: "/buyer/dashboard", label: "Overview" },
                { to: "/buyer/transactions", label: "Transactions" },
                { to: "/buyer/orders", label: "Orders" },
                { to: "/buyer/help", label: "Help Centre" },
              ].map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-md transition-colors ${
                      isActive || location.pathname === item.to
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-3">
          {isDashboard ? (
            <>
              <button className="hidden sm:flex h-9 w-9 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Search">
                <Search className="h-4 w-4" />
              </button>
              <button className="relative h-9 w-9 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-gold" />
              </button>
              <div className="h-9 w-9 rounded-full bg-gold-gradient text-gold-foreground flex items-center justify-center text-xs font-semibold ring-1 ring-gold/40">
                G
              </div>
            </>
          ) : (
            <Badge variant="outline" className="hidden sm:inline-flex gap-1.5 border-primary/40 text-primary">
              <Lock className="h-3 w-3" /> Secure Checkout
            </Badge>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};