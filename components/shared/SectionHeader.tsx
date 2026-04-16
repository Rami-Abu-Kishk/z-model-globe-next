import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  icon?: LucideIcon;
  subtitle?: string;
  className?: string;
}

export function SectionHeader({ title, icon: Icon, subtitle, className }: SectionHeaderProps) {
  return (
    <div className={cn("flex items-center gap-3 p-4 border-b border-white/40", className)}>
      {Icon && <Icon className="w-5 h-5 text-slate-600" />}
      <div>
        <h2 className="text-sm font-bold text-slate-900 leading-tight">{title}</h2>
        {subtitle && <p className="text-[10px] text-slate-500 font-medium">{subtitle}</p>}
      </div>
    </div>
  );
}
