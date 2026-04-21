import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['echarts', 'echarts-gl', 'zrender', 'three', 'react-globe.gl', 'maplibre-gl'],
  devIndicators: false,
};


export default nextConfig;
