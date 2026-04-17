import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/cheinly-logo.jpeg";

const Index = () => {
  return (
    <div className="min-h-screen bg-background bg-hero flex flex-col items-center justify-center px-6 text-center">
      <img src={logo} alt="Cheinly logo" className="h-24 w-24 rounded-2xl object-cover ring-1 ring-gold/40 shadow-glow mb-8 animate-glow-pulse" />
      <h1 className="font-display text-5xl md:text-7xl text-gold tracking-wide">CHEINLY</h1>
      <p className="mt-4 max-w-xl text-muted-foreground">
        Connected intelligence. Secure access to your network — built for the modern enterprise.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <Button asChild variant="hero" size="lg">
          <Link to="/auth/login">
            Enter Portal <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button asChild variant="outline" size="lg" className="border-gold/40 text-gold hover:bg-gold/10 hover:text-gold">
          <Link to="/auth/forgot-password">Forgot password</Link>
        </Button>
      </div>
    </div>
  );
};

export default Index;
