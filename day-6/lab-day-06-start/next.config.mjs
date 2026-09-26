/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // อนุญาตให้ next/image โหลดรูปจาก TheMealDB
    remotePatterns: [
      { protocol: 'https', hostname: 'www.themealdb.com' },
    ],
  },
};

export default nextConfig;
