import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Eye, EyeOff, ArrowLeft, RotateCcw, CheckCircle2 } from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PasswordStrength, passwordChecks } from "@/components/auth/PasswordStrength";
import { toast } from "sonner";

const ResetPassword = () => {
  const nav = useNavigate();
  const [pw, setPw] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const c = passwordChecks(pw);
    if (!Object.values(c).every(Boolean)) return toast.error("Password doesn't meet all requirements");
    if (pw !== confirm) return toast.error("Passwords do not match");
    toast.success("Password reset successfully");
    setTimeout(() => nav("/auth/success"), 600);
  };

  return (
    <AuthLayout step={{ current: 3, total: 3 }}>
      <div className="mb-4 flex justify-center">
        <div className="inline-flex items-center gap-2 rounded-full bg-success/10 border border-success/30 px-4 py-1.5 text-xs text-success">
          <CheckCircle2 className="h-3.5 w-3.5" /> Password Reset Securely
        </div>
      </div>
      <AuthCard
        icon={RotateCcw}
        title="Create New Password"
        subtitle="Your new password must be different from previously used passwords."
      >
        <form onSubmit={submit} className="space-y-5">
          <PasswordField id="new" label="New Password" value={pw} onChange={setPw} show={show1} toggle={() => setShow1((s) => !s)} placeholder="Enter new password" />
          <PasswordStrength password={pw} />
          <PasswordField id="confirm" label="Confirm New Password" value={confirm} onChange={setConfirm} show={show2} toggle={() => setShow2((s) => !s)} placeholder="Confirm new password" />

          <Button type="submit" variant="hero" size="lg" className="w-full">
            Reset Password
          </Button>

          <Link to="/auth/login" className="flex items-center justify-center gap-2 text-sm text-primary hover:text-primary-glow">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </form>
      </AuthCard>
    </AuthLayout>
  );
};

const PasswordField = ({
  id, label, value, onChange, show, toggle, placeholder,
}: {
  id: string; label: string; value: string; onChange: (v: string) => void;
  show: boolean; toggle: () => void; placeholder: string;
}) => (
  <div className="space-y-2">
    <Label htmlFor={id}>{label}</Label>
    <div className="relative">
      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 pr-10 h-12 bg-input border-border"
      />
      <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Toggle">
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  </div>
);

export default ResetPassword;
