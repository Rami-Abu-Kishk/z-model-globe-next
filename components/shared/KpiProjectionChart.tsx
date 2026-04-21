"use client";

import React, { useEffect, useRef, useMemo } from 'react';
import * as echarts from 'echarts';

interface KpiProjectionChartProps {
  mode: 'historical' | 'forecast';
  data?: number[];
  labels?: string[];
  color?: string;
  unit?: string;
}

export function KpiProjectionChart({ 
  mode, 
  data, 
  labels, 
  color: customColor,
  unit = '%'
}: KpiProjectionChartProps) {
  const chartRef = useRef<HTMLDivElement>(null);

  const chartData = useMemo(() => {
    if (data) return data;
    return mode === 'historical' 
      ? [2.4, 2.1, -1.2, 1.8, 2.6] 
      : [2.9, 3.2, 4.8, 6.5, 8.8];
  }, [mode, data]);

  const chartLabels = useMemo(() => {
    if (labels) return labels;
    return mode === 'historical'
      ? ['2019', '2020', '2021', '2022', '2023']
      : ['2024', '2025', '2026', '2027', '2028 (Est)'];
  }, [mode, labels]);

  const color = customColor || (mode === 'historical' ? '#64748b' : '#6366f1');

  useEffect(() => {
    if (!chartRef.current) return;
    const chart = echarts.init(chartRef.current);

    chart.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        padding: [10, 15],
        textStyle: { color: '#0f172a', fontWeight: 'bold', fontSize: 11 },
        formatter: (params: any) => {
          const p = params[0];
          return `
            <div style="display: flex; flex-direction: column; gap: 4px;">
              <div style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 0.1em; font-weight: 900;">${p.name} Report</div>
              <div style="font-size: 14px; font-weight: 900; color: #0f172a;">${p.value}${unit} <span style="font-size: 10px; color: ${color}; font-weight: bold; margin-left: 4px;">${mode === 'historical' ? 'AUDITED' : 'PROJECTED'}</span></div>
            </div>
          `;
        }
      },
      grid: { left: '10%', right: '5%', top: '15%', bottom: '15%' },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: chartLabels,
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold' }
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold', formatter: `{value}${unit}` },
        splitLine: { lineStyle: { color: '#f1f5f9', type: 'dashed' } }
      },
      series: [{
        name: mode === 'historical' ? 'Historical Audit' : 'Z-Model AI Projection',
        data: chartData,
        type: 'line',
        smooth: true,
        symbolSize: 8,
        itemStyle: { color: color },
        lineStyle: { 
          width: 4, 
          color: color, 
          shadowBlur: 15, 
          shadowColor: `${color}44`
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: `${color}22` },
            { offset: 1, color: 'rgba(255, 255, 255, 0)' }
          ])
        },
        emphasis: {
          itemStyle: {
            scale: true,
            borderWidth: 2,
            borderColor: '#fff'
          }
        }
      }]
    });

    const handleResize = () => chart.resize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      chart.dispose();
    };
  }, [mode, chartData, chartLabels, color, unit]);

  return <div ref={chartRef} className="w-full h-[180px]" />;
}
