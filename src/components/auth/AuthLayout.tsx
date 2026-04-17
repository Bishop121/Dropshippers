import { ReactNode } from "react";
import { Link } from "react-router-dom";
import logo from "@/assets/cheinly-logo.jpeg";

interface AuthLayoutProps {
  children: ReactNode;
  step?: { current: number; total: number };
}

export const AuthLayout = ({ children, step }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen bg-background bg-hero flex flex-col">
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 md:px-10 py-5 border-b border-border/50">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="Cheinly" className="h-9 w-9 rounded-md object-cover ring-1 ring-gold/30" />
          <span className="font-display text-2xl text-gold tracking-wide">CHEINLY</span>
        </Link>
        {step ? (
          <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Step {step.current} of {step.total}
          </span>
        ) : (
          <Link to="/auth/login" className="text-sm text-muted-foreground hover:text-gold transition-colors">
            Support
          </Link>
        )}
      </header>

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md animate-fade-in">{children}</div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 py-5 text-center text-xs text-muted-foreground space-y-1">
        <div className="flex items-center justify-center gap-5">
          <Link to="#" className="hover:text-gold transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-gold transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-gold transition-colors">Help Center</Link>
        </div>
        <p>© {new Date().getFullYear()} Cheinly Technologies Inc. All rights reserved.</p>
      </footer>
    </div>
  );
};
