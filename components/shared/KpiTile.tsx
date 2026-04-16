import { cn } from "@/lib/utils";

interface KpiTileProps {
  label: string;
  value: string;
  change?: string;
  trend?: 'up' | 'down';
  className?: string;
}

export function KpiTile({ label, value, change, trend, className }: KpiTileProps) {
  return (
    <div className={cn("p-4", className)}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h3 className="text-xl font-bold text-slate-900">{value}</h3>
        {change && (
          <span className={cn(
            "text-xs font-semibold px-1 rounded",
            trend === 'up' ? "text-emerald-600 bg-emerald-50" : "text-crimson-600 bg-crimson-50"
          )}>
            {change}
          </span>
        )}
      </div>
    </div>
  );
}
