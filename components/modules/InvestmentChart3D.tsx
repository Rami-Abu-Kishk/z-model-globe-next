"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import 'echarts-gl';

export default function InvestmentChart3D() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);

    const countries = ['UAE', 'Singapore', 'USA', 'India', 'UK', 'Japan'];
    const metrics = ['FDI Inflow', 'Credit Rating', 'Yield Spread'];

    // [countryIndex, metricIndex, value]
    const data = [
      [0, 0, 9.2], [0, 1, 9.5], [0, 2, 8.8],
      [1, 0, 8.5], [1, 1, 9.2], [1, 2, 7.5],
      [2, 0, 7.8], [2, 1, 8.1], [2, 2, 6.4],
      [3, 0, 8.9], [3, 1, 6.5], [3, 2, 9.1],
      [4, 0, 5.5], [4, 1, 7.8], [4, 2, 4.2],
      [5, 0, 4.2], [5, 1, 8.5], [5, 2, 3.1],
    ];

    const option = {
      tooltip: {},
      visualMap: {
        min: 0,
        max: 10,
        calculable: true,
        orient: 'vertical',
        left: 'right',
        top: 'center',
        inRange: {
          color: ['#be123c', '#f59e0b', '#10b981'] // Muted Crimson -> Amber -> Emerald
        },
        show: false
      },
      xAxis3D: {
        type: 'category',
        data: countries,
        name: 'Country',
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
        boxDepth: 80,
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
        emphasis: { itemStyle: { color: '#10b981' } }
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
