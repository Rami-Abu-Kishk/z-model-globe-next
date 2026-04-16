"use client";

import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';
import { assetHistory, assetTimeline } from '@/lib/mock-data/investment.mock';

interface Props {
  assetName: string;
}

export default function InvestmentCandlestickChart({ assetName }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const chartInstance = useRef<echarts.ECharts | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const myChart = echarts.init(chartRef.current);
    chartInstance.current = myChart;

    const data = assetHistory[assetName] || [];

    const option = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
          color: '#000'
        },
        formatter: (params: any) => {
          const p = params[0];
          return `
            <div style="font-size: 10px; font-weight: bold; color: #64748b; margin-bottom: 4px; text-transform: uppercase;">${p.name}</div>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span style="color: #64748b; font-size: 10px;">Open:</span>
              <span style="font-weight: bold; font-size: 10px;">${p.data[1]}</span>
            </div>
            <div style="display: flex; justify-content: space-between; gap: 20px;">
              <span style="color: #64748b; font-size: 10px;">Close:</span>
              <span style="font-weight: bold; font-size: 10px;">${p.data[2]}</span>
            </div>
          `;
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: true
      },
      xAxis: {
        type: 'category',
        data: assetTimeline,
        scale: true,
        boundaryGap: false,
        axisLine: { onZero: false, lineStyle: { color: '#e2e8f0' } },
        splitLine: { show: false },
        axisLabel: { color: '#64748b', fontSize: 9 }
      },
      yAxis: {
        scale: true,
        splitArea: { show: false },
        axisLabel: { color: '#64748b', fontSize: 9 },
        axisLine: { show: false },
        splitLine: { lineStyle: { color: '#f1f5f9' } }
      },
      series: [
        {
          type: 'candlestick',
          data: data,
          itemStyle: {
            color: '#10b981',
            color0: '#f43f5e',
            borderColor: '#10b981',
            borderColor0: '#f43f5e'
          }
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
  }, [assetName]);

  return (
    <div className="w-full h-full flex justify-center">
      <div 
        ref={chartRef} 
        style={{ height: '100%', width: '100%' }} 
      />
    </div>
  );
}

