import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
}

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div className={cn(
      "glass-card overflow-hidden transition-all duration-300 pointer-events-auto",
      className
    )}>
      {children}
    </div>
  );
}
