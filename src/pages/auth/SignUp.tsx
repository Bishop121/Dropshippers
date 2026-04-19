import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CheckCircle2,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Shield,
  User,
  Briefcase,
  Globe,
} from "lucide-react";
import { AuthLayout } from "@/components/auth/AuthLayout";
import { AuthCard } from "@/components/auth/AuthCard";
import { StepProgress } from "@/components/auth/StepProgress";
import { PasswordStrength } from "@/components/auth/PasswordStrength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

const accountSchema = z
  .object({
    fullName: z.string().trim().min(2, "Enter your full name").max(100),
    email: z.string().trim().email("Enter a valid work email").max(255),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100)
      .regex(/[A-Z]/, "Include at least one uppercase letter")
      .regex(/[0-9]/, "Include at least one number"),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });

const orgSchema = z.object({
  organization: z.string().trim().min(2, "Organization name is required").max(120),
  role: z.string().trim().min(1, "Select your role"),
  size: z.string().trim().min(1, "Select organization size"),
  country: z.string().trim().min(2, "Country is required").max(80),
  agree: z.literal(true, { errorMap: () => ({ message: "You must accept the terms" }) }),
});

const SignUp = () => {
  const nav = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Step 1
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPwd, setShowPwd] = useState(false);

  // Step 2
  const [organization, setOrganization] = useState("");
  const [role, setRole] = useState("");
  const [size, setSize] = useState("");
  const [country, setCountry] = useState("");
  const [agree, setAgree] = useState(false);

  // Step 3 — OTP
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const next = () => setStep((s) => Math.min(s + 1, 4));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submitAccount = (e: React.FormEvent) => {
    e.preventDefault();
    const r = accountSchema.safeParse({ fullName, email, password, confirm });
    if (!r.success) return toast.error(r.error.errors[0].message);
    next();
  };

  const submitOrg = (e: React.FormEvent) => {
    e.preventDefault();
    const r = orgSchema.safeParse({ organization, role, size, country, agree });
    if (!r.success) return toast.error(r.error.errors[0].message);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(`Verification code sent to ${email}`);
      next();
    }, 700);
  };

  const handleOtpChange = (i: number, v: string) => {
    if (!/^\d?$/.test(v)) return;
    const arr = [...otp];
    arr[i] = v;
    setOtp(arr);
    if (v && i < 5) {
      const el = document.getElementById(`otp-${i + 1}`);
      el?.focus();
    }
  };

  const submitOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.some((d) => !d)) return toast.error("Enter the 6-digit code");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      next();
    }, 700);
  };

  const labels = ["Account", "Organization", "Verify Email", "All set"];

  return (
    <AuthLayout step={{ current: step, total: 4 }}>
      <AuthCard
        title={
          step === 1
            ? "Create your Cheinly account"
            : step === 2
            ? "Tell us about your organization"
            : step === 3
            ? "Verify your email"
            : "Welcome to Cheinly"
        }
        subtitle={
          step === 1
            ? "Join the network built for the modern enterprise."
            : step === 2
            ? "We'll tailor your portal to your organization."
            : step === 3
            ? (
              <>
                We sent a 6-digit code to <span className="text-foreground">{email || "your email"}</span>.
              </>
            )
            : "Your account is ready. Sign in to enter your portal."
        }
        icon={step === 4 ? CheckCircle2 : undefined}
      >
        {step < 4 && <StepProgress current={step} total={3} label={labels[step - 1]} />}

        {/* STEP 1 — Account */}
        {step === 1 && (
          <form onSubmit={submitAccount} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full name</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Ada Lovelace"
                  className="pl-10 h-12 bg-input border-border"
                  autoComplete="name"
                  maxLength={100}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Work email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@company.com"
                  className="pl-10 h-12 bg-input border-border"
                  autoComplete="email"
                  maxLength={255}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="pl-10 pr-10 h-12 bg-input border-border"
                  autoComplete="new-password"
                  maxLength={100}
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle password visibility"
                >
                  {showPwd ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrength password={password} />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm">Confirm password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirm"
                  type={showPwd ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter password"
                  className="pl-10 h-12 bg-input border-border"
                  autoComplete="new-password"
                  maxLength={100}
                />
              </div>
            </div>

            <Button type="submit" variant="hero" size="lg" className="w-full">
              Continue <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-gold hover:underline">
                Sign in
              </Link>
            </p>
          </form>
        )}

        {/* STEP 2 — Organization */}
        {step === 2 && (
          <form onSubmit={submitOrg} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="organization">Organization name</Label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Acme Holdings"
                  className="pl-10 h-12 bg-input border-border"
                  maxLength={120}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Your role</Label>
                <Select value={role} onValueChange={setRole}>
                  <SelectTrigger className="h-12 bg-input border-border">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive / C-Suite</SelectItem>
                    <SelectItem value="it">IT / Security</SelectItem>
                    <SelectItem value="ops">Operations</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Organization size</Label>
                <Select value={size} onValueChange={setSize}>
                  <SelectTrigger className="h-12 bg-input border-border">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-10">1–10</SelectItem>
                    <SelectItem value="11-50">11–50</SelectItem>
                    <SelectItem value="51-200">51–200</SelectItem>
                    <SelectItem value="201-1000">201–1,000</SelectItem>
                    <SelectItem value="1000+">1,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="country">Country</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="country"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="United States"
                  className="pl-10 h-12 bg-input border-border"
                  maxLength={80}
                />
              </div>
            </div>

            <label className="flex items-start gap-3 rounded-lg border border-border bg-secondary/40 p-3">
              <Checkbox
                checked={agree}
                onCheckedChange={(v) => setAgree(v === true)}
                className="mt-0.5"
              />
              <span className="text-xs text-muted-foreground leading-relaxed">
                I agree to Cheinly's{" "}
                <Link to="#" className="text-gold hover:underline">Terms of Service</Link> and{" "}
                <Link to="#" className="text-gold hover:underline">Privacy Policy</Link>, and consent to receive verification emails.
              </span>
            </label>

            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={back} className="border-border">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button type="submit" disabled={loading} variant="hero" size="lg" className="flex-1">
                {loading ? "Sending code…" : (
                  <>
                    Send verification <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </form>
        )}

        {/* STEP 3 — OTP */}
        {step === 3 && (
          <form onSubmit={submitOtp} className="space-y-6">
            <div className="flex justify-center gap-2">
              {otp.map((d, i) => (
                <input
                  key={i}
                  id={`otp-${i}`}
                  inputMode="numeric"
                  maxLength={1}
                  value={d}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !otp[i] && i > 0) {
                      document.getElementById(`otp-${i - 1}`)?.focus();
                    }
                  }}
                  className="h-14 w-12 rounded-lg border border-border bg-input text-center font-display text-2xl text-gold focus:outline-none focus:ring-2 focus:ring-primary"
                />
              ))}
            </div>

            <div className="text-center text-sm text-muted-foreground">
              Didn't receive it?{" "}
              <button
                type="button"
                onClick={() => toast.success("New code sent")}
                className="text-gold hover:underline"
              >
                Resend code
              </button>
            </div>

            <div className="flex gap-3">
              <Button type="button" variant="outline" size="lg" onClick={back} className="border-border">
                <ArrowLeft className="h-4 w-4" /> Back
              </Button>
              <Button type="submit" disabled={loading} variant="hero" size="lg" className="flex-1">
                <Shield className="h-4 w-4" />
                {loading ? "Verifying…" : "Verify & continue"}
              </Button>
            </div>
          </form>
        )}

        {/* STEP 4 — Done */}
        {step === 4 && (
          <div className="space-y-6 text-center">
            <div className="rounded-xl border border-border bg-secondary/40 p-5 text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-gold">Account ready</p>
              <p className="mt-2 text-foreground">{fullName || "—"}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
              {organization && (
                <p className="text-sm text-muted-foreground mt-1">{organization}</p>
              )}
            </div>

            <Button
              variant="hero"
              size="lg"
              className="w-full"
              onClick={() => nav("/auth/login")}
            >
              Enter the portal <ArrowRight className="h-4 w-4" />
            </Button>

            <p className="text-xs text-muted-foreground">
              Need help getting started?{" "}
              <Link to="#" className="text-gold hover:underline">Contact support</Link>
            </p>
          </div>
        )}
      </AuthCard>
    </AuthLayout>
  );
};

export default SignUp;
