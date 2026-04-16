import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown } from "lucide-react";

interface TrendBadgeProps {
  trend: 'up' | 'down';
  value: string;
}

export function TrendBadge({ trend, value }: TrendBadgeProps) {
  const isUp = trend === 'up';
  
  return (
    <div className={cn(
      "inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight",
      isUp ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
    )}>
      {isUp ? <TrendingUp size={10} /> : <TrendingDown size={10} />}
      {value}
    </div>
  );
}
