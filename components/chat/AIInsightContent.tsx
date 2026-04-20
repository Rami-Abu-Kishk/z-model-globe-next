'use client';

import React from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  BarChart3, 
  Calendar,
  Layers
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Progress } from '@/components/ui/progress';

interface AIInsightContentProps {
  data: any;
  hideActions?: boolean;
  variant?: 'default' | 'chat';
  kpiLabel?: string;
  updatesLabel?: string;
}

export function AIInsightContent({ 
  data, 
  variant = 'chat',
  kpiLabel = "Executive Summary",
  updatesLabel = "Recent Updates"
}: AIInsightContentProps) {
  if (!data) return null;

  return (
    <div className={cn(
      "flex flex-col gap-4",
      variant === 'chat' ? 'text-xs' : 'text-sm'
    )}>
      {/* Title */}
      {data.title && (
        <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
          <Activity className="w-4 h-4 text-emerald-600" />
          <span className="font-bold text-slate-900">{data.title}</span>
        </div>
      )}

      {/* KPIs */}
      {data.kpis && (
        <div className="grid grid-cols-2 gap-3">
          {data.kpis.map((kpi: any, idx: number) => (
            <div key={idx} className="bg-slate-50 p-2 rounded-lg border border-slate-100">
              <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">{kpi.label}</div>
              <div className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-1">
                {kpi.value}
                {kpi.trend === 'up' && <TrendingUp className="w-3 h-3 text-emerald-500" />}
                {kpi.trend === 'down' && <TrendingDown className="w-3 h-3 text-rose-500" />}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Progress Bars / Metrics */}
      {data.metrics && (
        <div className="space-y-3">
          {data.metrics.map((metric: any, idx: number) => (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between text-[10px] font-bold text-slate-600">
                <span>{metric.label}</span>
                <span>{metric.value}%</span>
              </div>
              <Progress value={metric.value} className="h-1 bg-slate-100" />
            </div>
          ))}
        </div>
      )}

      {/* Description */}
      {data.description && (
        <div className="text-slate-600 italic leading-relaxed">
          {data.description}
        </div>
      )}

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[9px] text-slate-400 mt-2">
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Real-time Analytics
        </div>
        <div className="flex items-center gap-1">
          <Layers className="w-3 h-3" />
          Z-Model Core
        </div>
      </div>
    </div>
  );
}
