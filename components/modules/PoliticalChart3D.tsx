"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { PoliticalCase } from '@/lib/mock-data/political.mock';

export default function PoliticalChart3D({ cases }: { cases: PoliticalCase[] }) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Use a light theme base
    const myChart = echarts.init(chartRef.current, undefined, { renderer: 'canvas' });

    // Mapping 3D Bar Data
    const data = (cases || []).map((pc, idx) => {
      // Meaningful Tiers:
      // X: Severity (Internal Tension)
      // Y: Involved Parties (Regional Complexity)
      // Z (Height): Overall Impact Magnitude (0-100%)
      const severity = pc.severity === 'Critical' ? 95 : pc.severity === 'Warning' ? 65 : 35;
      const complexity = Math.min(pc.involvedParties.length * 20, 100);
      const impact = 45 + (idx * 15); // Simulated Impact Magnitude

      return [severity, complexity, impact, pc.name, pc.severity];
    });

    const option = {
      backgroundColor: 'transparent',
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderColor: '#e2e8f0',
        borderWidth: 1,
        textStyle: { color: '#0f172a', fontWeight: '600', fontSize: 11 },
        formatter: (params: any) => {
          const d = params.value;
          return `
            <div class="p-2">
              <div class="text-[10px] uppercase font-black text-slate-400 mb-1">${d[4]} STATUS</div>
              <div class="text-[14px] font-black text-slate-900 mb-1">${d[3]}</div>
              <div class="flex items-center gap-2">
                <span class="text-slate-500 font-bold">Risk Magnitude:</span>
                <span class="text-emerald-600 font-black">${d[2]}%</span>
              </div>
            </div>
          `;
        }
      },
      grid3D: {
        boxWidth: 120,
        boxDepth: 120,
        boxHeight: 120,
        viewControl: {
          autoRotate: false,
          autoRotateSpeed: 5,
          distance: 220,
          alpha: 25,
          beta: 225
        },
        boxOutline: {
          show: true,
          lineStyle: { color: '#cbd5e1', width: 1 }
        },
        splitLine: {
          show: true,
          lineStyle: { color: '#f1f5f9', width: 1 }
        },
        axisPointer: {
          show: true,
          lineStyle: { color: '#38bdf8', width: 2 }
        },
        light: {
          main: {
            intensity: 1.5,
            shadow: true,
            alpha: 30,
            beta: 210
          },
          ambient: {
            intensity: 0.5
          }
        }
      },
      xAxis3D: {
        name: 'SEVERITY (%)',
        min: 0, max: 120,
        nameTextStyle: { color: '#64748b', fontSize: 10, fontWeight: 'bold' },
        axisLabel: { color: '#94a3b8', fontSize: 9 },
        axisLine: { lineStyle: { color: '#e2e8f0' } }
      },
      yAxis3D: {
        name: 'COMPLEXITY (%)',
        min: 0, max: 120,
        nameTextStyle: { color: '#64748b', fontSize: 10, fontWeight: 'bold' },
        axisLabel: { color: '#94a3b8', fontSize: 9 },
        axisLine: { lineStyle: { color: '#e2e8f0' } }
      },
      zAxis3D: {
        name: 'IMPACT MAGNITUDE',
        min: 0, max: 120,
        nameTextStyle: { color: '#64748b', fontSize: 10, fontWeight: 'bold' },
        axisLabel: { color: '#94a3b8', fontSize: 9 },
        axisLine: { lineStyle: { color: '#e2e8f0' } }
      },
      visualMap: {
        max: 120,
        min: 0,
        dimension: 2, // Map to Height (Impact)
        inRange: {
          color: ['#0ea5e9', '#38bdf8', '#fbbf24', '#f87171', '#ef4444'], // Blue -> Yellow -> Red
        },
        show: false
      },
      series: [{
        type: 'bar3D',
        data: data, // Pass full array [x, y, z, name, severity]
        shading: 'lambert',
        label: {
          show: false // Remove names from the chart itself as requested
        },
        itemStyle: {
          opacity: 1,
          borderRadius: 2
        },
        emphasis: {
          label: {
            show: false
          },
          itemStyle: {
            color: '#0284c7'
          }
        }
      }]
    };

    myChart.setOption(option);

    const resizeObserver = new ResizeObserver(() => myChart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      myChart.dispose();
    };
  }, [cases]);

  return <div ref={chartRef} className="w-full h-full" />;
}
