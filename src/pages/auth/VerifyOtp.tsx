import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MailCheck, ArrowLeft } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { toast } from "sonner";

const VerifyOtp = () => {
  const nav = useNavigate();
  const loc = useLocation();
  const email = (loc.state as { email?: string } | null)?.email ?? "your email";
  const [code, setCode] = useState("");
  const [seconds, setSeconds] = useState(120);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds]);

  const fmt = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code.length !== 6) return toast.error("Enter the full 6-digit code");
    toast.success("OTP verified");
    nav("/auth/reset-password", { state: { email } });
  };

  return (
    <AuthLayout step={{ current: 2, total: 3 }}>
      <AuthCard
        icon={MailCheck}
        title="Enter Verification Code"
        subtitle={
          <>
            We've sent a 6-digit code to <span className="text-gold">{email}</span>
          </>
        }
      >
        <form onSubmit={submit} className="space-y-6">
          <div className="flex justify-center">
            <InputOTP maxLength={6} value={code} onChange={setCode}>
              <InputOTPGroup className="gap-2">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <InputOTPSlot
                    key={i}
                    index={i}
                    className="h-12 w-11 text-lg bg-input border-border rounded-lg"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Verify OTP
          </Button>

          <div className="text-center text-sm space-y-1.5">
            <p className="text-muted-foreground">
              Didn't receive the code?{" "}
              <button
                type="button"
                disabled={seconds > 0}
                onClick={() => {
                  setSeconds(120);
                  toast.success("Code resent");
                }}
                className="text-primary hover:text-primary-glow disabled:text-muted-foreground disabled:no-underline hover:underline"
              >
                Resend
              </button>
            </p>
            <p className="text-muted-foreground">Resend in <span className="text-gold font-medium">{fmt}</span></p>
          </div>

          <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary-glow">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

export default VerifyOtp;
