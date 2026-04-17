import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export const passwordChecks = (pw: string) => ({
  length: pw.length >= 8,
  upper: /[A-Z]/.test(pw),
  number: /\d/.test(pw),
  special: /[!@#$%^&*(),.?":{}|<>_\-+=/\\[\]`~';]/.test(pw),
});

export const PasswordStrength = ({ password }: { password: string }) => {
  const c = passwordChecks(password);
  const score = Object.values(c).filter(Boolean).length;
  const labels = ["Too weak", "Weak", "Fair", "Good", "Strong"];
  const colors = ["bg-destructive", "bg-destructive", "bg-gold", "bg-primary", "bg-success"];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="uppercase tracking-[0.15em] text-muted-foreground">Password strength</span>
        <span className={cn("font-medium", score >= 4 ? "text-success" : score >= 3 ? "text-primary" : "text-muted-foreground")}>
          {labels[score]}
        </span>
      </div>
      <div className="flex gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              i < score ? colors[score] : "bg-muted"
            )}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs">
        <Rule ok={c.length} label="At least 8 characters" />
        <Rule ok={c.upper} label="At least one uppercase" />
        <Rule ok={c.number} label="At least one number" />
        <Rule ok={c.special} label="One special character" />
      </div>
    </div>
  );
};

const Rule = ({ ok, label }: { ok: boolean; label: string }) => (
  <div className={cn("flex items-center gap-1.5", ok ? "text-success" : "text-muted-foreground")}>
    {ok ? <Check className="h-3.5 w-3.5" /> : <X className="h-3.5 w-3.5 opacity-50" />}
    <span>{label}</span>
  </div>
);
