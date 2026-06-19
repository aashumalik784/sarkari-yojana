/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',  <-- Ye line delete kar de ya comment kar de
  
  images: {
    unoptimized: true,
  },
  
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
