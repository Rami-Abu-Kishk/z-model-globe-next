"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

export default function GroupsChart3D() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    
    const companies = ['IHC', 'Royal Group', 'G42', 'ADIA', 'Mubadala'];
    const metrics = ['Revenue $B', 'Assets $B', 'Growth %'];
    
    // [companyIndex, metricIndex, value]
    const data = [
      [0, 0, 85], [0, 1, 240], [0, 2, 12],
      [1, 0, 65], [1, 1, 180], [1, 2, 8],
      [2, 0, 42], [2, 1, 95], [2, 2, 25],
      [3, 0, 15], [3, 1, 950], [3, 2, 4],
      [4, 0, 32], [4, 1, 280], [4, 2, 6],
    ];

    const option = {
      tooltip: {},
      visualMap: {
        max: 300,
        inRange: {
          color: ['#f1f5f9', '#93c5fd', '#3b82f6', '#1e3a8a']
        },
        show: false
      },
      xAxis3D: {
        type: 'category',
        data: companies,
        name: 'Entity',
        axisLabel: { color: '#64748b' }
      },
      yAxis3D: {
        type: 'category',
        data: metrics,
        name: 'Metric',
        axisLabel: { color: '#64748b' }
      },
      zAxis3D: {
        type: 'value',
        name: 'Value',
        axisLabel: { color: '#64748b' }
      },
      grid3D: {
        boxWidth: 200,
        boxDepth: 100,
        viewControl: {
          autoRotate: true,
          autoRotateSpeed: 4,
          distance: 250
        },
        light: {
          main: { intensity: 1.2, shadow: true },
          ambient: { intensity: 0.3 }
        }
      },
      series: [{
        type: 'bar3D',
        data: data,
        shading: 'lambert',
        label: { show: false },
        itemStyle: { opacity: 0.9 },
        emphasis: { itemStyle: { color: '#3b82f6' } }
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

  return <div ref={chartRef} style={{ height: '400px', width: '100%' }} />;
}
