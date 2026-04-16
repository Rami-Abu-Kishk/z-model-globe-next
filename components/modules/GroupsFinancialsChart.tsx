"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

interface Props {
  data: { month: string; value: number }[];
  color?: string;
}

export default function GroupsFinancialsChart({ data, color = '#10b981' }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    
    const option = {
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: data.map(d => d.month),
        axisLine: { lineStyle: { color: '#e2e8f0' } },
        axisLabel: { color: '#64748b', fontSize: 10 }
      },
      yAxis: {
        type: 'value',
        splitLine: { lineStyle: { color: '#f1f5f9' } },
        axisLabel: { color: '#64748b', fontSize: 10 }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderColor: color,
        borderWidth: 1,
        textStyle: { color: '#000', fontSize: 11 },
        formatter: '{b}: <span style="font-weight: bold">{c}</span>'
      },
      series: [
        {
          data: data.map(d => d.value),
          type: 'line',
          smooth: true,
          symbol: 'circle',
          symbolSize: 6,
          itemStyle: { color: color },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: `${color}33` },
              { offset: 1, color: `${color}00` }
            ])
          },
          lineStyle: { width: 3 }
        }
      ]
    };

    myChart.setOption(option);

    const resizeObserver = new ResizeObserver(() => {
      myChart.resize();
    });
    resizeObserver.observe(chartRef.current);

    const handleResize = () => myChart.resize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      resizeObserver.disconnect();
      myChart.dispose();
    };
  }, [data, color]);

  return (
    <div 
      ref={chartRef} 
      style={{ height: '300px', width: '100%' }} 
    />
  );
}
