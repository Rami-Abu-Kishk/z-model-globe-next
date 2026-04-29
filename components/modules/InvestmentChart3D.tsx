"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

export default function InvestmentChart3D() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const countries = ['India', 'China', 'South Korea', 'UAE', 'USA'];
    const metrics = ['FDI %', 'Savings %', 'Investment %'];

    // Raw Data (Index 0 is India, Index 3 is UAE)
    const rawData = [
      [0, 0, 7.6], [0, 1, 43.3], [0, 2, 32.0], // India (Official Data)
      [1, 0, 4.5], [1, 1, 39.0], [1, 2, 30.0], // China
      [2, 0, 3.8], [2, 1, 36.0], [2, 2, 27.0], // South Korea
      [3, 0, 4.0], [3, 1, 35.2], [3, 2, 28.5], // UAE
      [4, 0, 3.2], [4, 1, 19.0], [4, 2, 24.0], // USA
    ];

    // Helper to determine color based on the metric type and value
    const getColor = (countryIndex: number, metricIndex: number, value: number) => {
      // 1. Highlight Top Country (India at index 0)
      if (countryIndex === 0) {
        return '#10b981'; // Emerald highlight for Best Country
      }

      // 2. Logic JUST for FDI (Metric Index 0)
      if (metricIndex === 0) {
        if (value > 7) return '#10b981';    
        if (value > 4) return '#f59e0b';    
        return '#ef4444';                   
      }
      
      // 3. Logic for Savings & Investment (Metric Index 1 & 2)
      if (value > 35) return '#059669';     
      if (value > 25) return '#10b981';     
      if (value > 20) return '#fbbf24';     
      return '#be123c';                      
    };

    // Map raw data to ECharts format with individual itemStyles
    const chartData = rawData.map(item => ({
      value: item,
      itemStyle: {
        color: getColor(item[0], item[1], item[2])
      }
    }));

    const option = {
      tooltip: {
        formatter: (params: any) => `${countries[params.value[0]]}<br/>${metrics[params.value[1]]}: ${params.value[2]}%`
      },
      xAxis3D: {
        type: 'category',
        data: countries,
        name: '',
        axisLabel: { color: '#64748b', fontSize: 12, margin: 20 }
      },
      yAxis3D: {
        type: 'category',
        data: metrics,
        name: '',
        axisLabel: { color: '#64748b' }
      },
      zAxis3D: {
        type: 'value',
        name: '%',
        max: 50,
        axisLabel: { color: '#64748b' }
      },
      grid3D: {
        boxWidth: 200,
        boxDepth: 80,
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 4,
          distance: 220,
          beta: 35,
          alpha: 15
        },
        light: {
          main: { intensity: 1.4, shadow: true },
          ambient: { intensity: 0.4 }
        }
      },
      series: [{
        type: 'bar3D',
        data: chartData,
        shading: 'lambert',
        itemStyle: { opacity: 0.95 },
        emphasis: { itemStyle: { color: '#ffffff', opacity: 1 } }
      }]
    };

    myChart.setOption(option);

    const resizeObserver = new ResizeObserver(() => myChart.resize());
    resizeObserver.observe(chartRef.current);

    return () => {
      resizeObserver.disconnect();
      myChart.dispose();
    };
  }, []);

  return <div ref={chartRef} style={{ height: '500px', width: '100%' }} />;
}