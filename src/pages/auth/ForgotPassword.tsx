import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Mail, KeyRound, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const schema = z.string().trim().email("Enter a valid email").max(255);

const ForgotPassword = () => {
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = schema.safeParse(email);
    if (!r.success) return toast.error(r.error.errors[0].message);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("OTP sent to " + email);
      nav("/auth/verify-otp", { state: { email } });
    }, 700);
  };

  return (
    <AuthLayout step={{ current: 1, total: 3 }}>
      <AuthCard
        icon={KeyRound}
        title="Forgot Password?"
        subtitle="Enter your email and we'll send you a six-digit OTP to reset your password."
      >
        <form onSubmit={submit} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 bg-input border-border"
                autoComplete="email"
              />
            </div>
          </div>

          <Button type="submit" disabled={loading} variant="hero" size="lg" className="w-full">
            {loading ? "Sending…" : "Send OTP"}
          </Button>

          <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary-glow">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>

          <p className="text-center text-xs text-muted-foreground pt-2">
            Having trouble?{" "}
            <Link to="#" className="text-gold hover:underline">Contact Support</Link>
          </p>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default ForgotPassword;
