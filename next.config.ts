import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Every page lives under a locale. Arabic is the default for an Iraqi
  // audience; the header toggle switches to English.
  async redirects() {
    return [{ source: "/", destination: "/ar", permanent: false }];
  },
};

export default nextConfig;
