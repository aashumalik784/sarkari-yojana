/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Ye line sabse zaroori hai - ye Next.js ko static HTML banane ke liye bolti hai
  images: {
    unoptimized: true, // Static export ke liye zaroori hai
  },
};

export default nextConfig;
