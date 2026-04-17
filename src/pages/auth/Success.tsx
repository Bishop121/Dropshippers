import { Link } from "react-router-dom";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { Button } from "@/components/ui/button";

const Success = () => {
  return (
    <AuthLayout>
      <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-card p-8 md:p-10 text-center animate-fade-in">
        <div className="flex justify-center mb-5">
          <div className="h-16 w-16 rounded-full bg-success/10 ring-1 ring-success/40 flex items-center justify-center animate-glow-pulse">
            <CheckCircle2 className="h-8 w-8 text-success" />
          </div>
        </div>
        <h1 className="font-display text-3xl md:text-4xl text-foreground">Password Changed Successfully</h1>
        <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
          This is a confirmation that the password for your Cheinly account has been changed. If you performed this action, you can safely continue.
        </p>

        <Button asChild variant="hero" size="lg" className="w-full mt-7">
          <Link to="/auth/login">Log In to My Account</Link>
        </Button>

        <div className="mt-6 flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-4 text-left">
          <ShieldCheck className="h-5 w-5 text-gold shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">For your security,</span> we recommend that you do not share your login credentials with anyone and use a unique password for your accounts.
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Success;
