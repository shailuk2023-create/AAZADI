interface ProgressBarProps {
  value: number;
  max: number;
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, max, className = "", showLabel = true }: ProgressBarProps) {
  const percentage = Math.round((value / max) * 100);

  return (
    <div className={`space-y-2 ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Progress</span>
          <span className="font-medium">{percentage}%</span>
        </div>
      )}
      <div className="h-3 bg-accent rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-primary to-primary/80 transition-all duration-500 ease-out rounded-full"
          style={{ width: `${percentage}%` }}
          data-testid="progress-fill"
        />
      </div>
    </div>
  );
}
