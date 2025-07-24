import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // otherwise, will get warning about it when
  // running app in dev mode at a server with the domain configured
  allowedDevOrigins: ["gerenciar-livros.gusalbukrk.com"],
};

export default nextConfig;
