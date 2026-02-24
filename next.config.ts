import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    root: process.cwd(),
  },
  outputFileTracingIncludes: {
    "/output/prototypes/[filename]": ["./content/output/prototypes/**/*"],
    "/output/[slug]": ["./content/output/**/*"],
    "/output": ["./content/output/**/*"],
    "/api/upload": ["./content/output/**/*"],
    "/api/upload-final": ["./content/output/**/*"],
  },
};

export default nextConfig;
