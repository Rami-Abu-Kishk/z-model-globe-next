"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';
import { economyTrendData } from '@/lib/mock-data/economy.mock';

export default function EconomyChart3D() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    chartInstance.current = myChart;
    
    const sectors = Array.from(new Set(economyTrendData.map(d => d.category)));
    const years = Array.from(new Set(economyTrendData.map(d => d.year))).sort();

    // Map data to [x, y, z] for bar3D where x = year index, y = sector index, z = value
    const data3D = economyTrendData.map(d => {
      const xIdx = years.indexOf(d.year);
      const yIdx = sectors.indexOf(d.category);
      return [xIdx, yIdx, d.value];
    });

    const option = {
      tooltip: {},
      visualMap: {
        max: Math.max(...economyTrendData.map(d => d.value)),
        inRange: {
          color: ['#1e293b', '#475569', '#10b981'] // Deep navy, slate, emerald
        },
        show: false
      },
      xAxis3D: {
        type: 'category',
        data: years.map(y => y.toString()),
        name: 'Year',
        nameTextStyle: { color: '#64748b', fontSize: 12 },
        axisLabel: { color: '#64748b', fontSize: 10 },
        axisLine: { lineStyle: { color: '#e2e8f0' } }
      },
      yAxis3D: {
        type: 'category',
        data: sectors,
        name: 'Sector',
        nameTextStyle: { color: '#64748b', fontSize: 12 },
        axisLabel: { color: '#64748b', fontSize: 10 },
        axisLine: { lineStyle: { color: '#e2e8f0' } }
      },
      zAxis3D: {
        type: 'value',
        name: 'Growth',
        nameTextStyle: { color: '#64748b', fontSize: 12 },
        axisLabel: { color: '#64748b', fontSize: 10 },
        axisLine: { lineStyle: { color: '#e2e8f0' } }
      },
      grid3D: {
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 3,
          alpha: 20,
          beta: 40
        },
        light: {
          main: {
            intensity: 1.2,
            shadow: true
          },
          ambient: {
            intensity: 0.3
          }
        }
      },
      series: [{
        type: 'bar3D',
        data: data3D,
        shading: 'lambert',
        label: {
          textStyle: {
            fontSize: 12,
            borderWidth: 1
          }
        },
        emphasis: {
          label: {
            textStyle: {
              fontSize: 16,
              color: '#10b981'
            }
          },
          itemStyle: {
            color: '#10b981'
          }
        }
      }]
    };

    myChart.setOption(option);

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[400px]">
      <div ref={chartRef} className="w-full h-full" />
    </div>
  );
}
