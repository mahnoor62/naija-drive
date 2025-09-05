import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    serverComponentsExternalPackages: ['mysql2', 'sequelize'],
  },
  // webpack: (config) => {
  //   // OPTIONAL: ensure node libs resolve properly
  //   config.externals = config.externals || [];
  //   return config;
  // },
};

export default nextConfig;
