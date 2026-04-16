"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { economyTrendData } from '@/lib/mock-data/economy.mock';

export default function EconomyExpandedChart3D() {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    chartInstance.current = myChart;
    
    // Process data for stacked area chart
    const sectors = Array.from(new Set(economyTrendData.map(d => d.category)));
    const years = Array.from(new Set(economyTrendData.map(d => d.year))).sort();

    const series = sectors.map(sector => {
      return {
        name: sector,
        type: 'line',
        stack: 'Total',
        smooth: true,
        lineStyle: { width: 0 },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: sector === 'Tech' ? '#10b981' : 
                     sector === 'Energy' ? '#0ea5e9' : 
                     sector === 'Finance' ? '#6366f1' : 
                     sector === 'Healthcare' ? '#f43f5e' : '#94a3b8'
            },
            {
              offset: 1,
              color: 'rgba(255,255,255,0)'
            }
          ])
        },
        emphasis: { focus: 'series' },
        data: years.map(year => {
          const item = economyTrendData.find(d => d.category === sector && d.year === year);
          return item ? item.value : 0;
        })
      };
    });

    const option = {
      color: ['#10b981', '#0ea5e9', '#6366f1', '#f43f5e', '#94a3b8', '#f59e0b'],
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#1e293b'
          }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        textStyle: { color: '#1e293b' }
      },
      legend: {
        data: sectors,
        bottom: 0,
        icon: 'circle',
        textStyle: { color: '#64748b', fontWeight: 'bold' }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '15%',
        top: '10%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          boundaryGap: false,
          data: years.map(y => y.toString()),
          axisLabel: { color: '#64748b', fontWeight: 'bold' },
          axisLine: { lineStyle: { color: '#e2e8f0' } }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: { color: '#64748b', fontWeight: 'bold' },
          splitLine: { lineStyle: { color: '#f1f5f9' } }
        }
      ],
      series: series
    };

    myChart.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      myChart.resize();
    });
    
    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      myChart.dispose();
    };
  }, []);

  return (
    <div className="w-full h-[450px] p-2">
      <div 
        ref={chartRef} 
        className="w-full h-full"
      />
    </div>
  );
}


