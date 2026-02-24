/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "vonnect-admin.votivereact.in",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
