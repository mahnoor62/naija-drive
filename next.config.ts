import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['mysql2', 'sequelize'],
  // webpack: (config) => {
  //   // OPTIONAL: ensure node libs resolve properly
  //   config.externals = config.externals || [];
  //   return config;
  // },
};

export default nextConfig;
