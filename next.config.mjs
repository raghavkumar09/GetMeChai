/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: ['cdn.pixabay.com'],
    },
    experimental: {
      appDir: true, // Use new app directory structure if required
    },
  };
  
  export default nextConfig;