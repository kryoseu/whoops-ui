/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  reactCompiler: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
