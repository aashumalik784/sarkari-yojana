/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export'  <-- Is line ko delete kar de ya comment kar de
  
  images: {
    unoptimized: true, // Cloudflare ke liye ye sahi hai
  },
  
  // D1 ke liye ye zaroori hai
  experimental: {
    serverActions: {
      allowedOrigins: ['sarkari-yojana-5rd.pages.dev']
    }
  }
};

export default nextConfig;
