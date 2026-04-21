import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['echarts', 'echarts-gl', 'zrender', 'three', 'react-globe.gl', 'maplibre-gl'],
  allowedDevOrigins: ['localhost', '172.27.160.1', '192.168.1.131'],
  devIndicators: false,
};


export default nextConfig;
