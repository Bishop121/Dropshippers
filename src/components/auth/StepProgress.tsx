interface StepProgressProps {
  current: number;
  total: number;
  label: string;
}

export const StepProgress = ({ current, total, label }: StepProgressProps) => {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2">
        <div>
          <p className="text-[10px] uppercase tracking-[0.25em] text-gold">
            Step {current} of {total}
          </p>
          <p className="font-display text-xl text-foreground mt-0.5">{label}</p>
        </div>
        <span className="text-xs text-muted-foreground">{pct}% complete</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-gold-gradient transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
};
