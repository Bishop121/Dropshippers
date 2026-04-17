import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface AuthCardProps {
  icon?: LucideIcon;
  title: string;
  subtitle?: ReactNode;
  children: ReactNode;
}

export const AuthCard = ({ icon: Icon, title, subtitle, children }: AuthCardProps) => {
  return (
    <div className="bg-card/80 backdrop-blur-xl border border-border rounded-2xl shadow-card p-8 md:p-10">
      {Icon && (
        <div className="flex justify-center mb-5">
          <div className="h-14 w-14 rounded-full bg-primary/10 ring-1 ring-primary/30 flex items-center justify-center">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>
      )}
      <h1 className="font-display text-3xl md:text-4xl text-center text-foreground">{title}</h1>
      {subtitle && (
        <p className="text-center text-muted-foreground text-sm mt-2 leading-relaxed">{subtitle}</p>
      )}
      <div className="mt-7">{children}</div>
    </div>
  );
};
