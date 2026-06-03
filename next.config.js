/** @type {import('next').NextConfig} */
const nextConfig = {
  // Prisma uses native binaries; keep it external to avoid bundling issues
  // that can break runtime path resolution in the App Router.
  // (Next 14 uses experimental.serverComponentsExternalPackages; the
  // top-level serverExternalPackages key is Next 15+.)
  experimental: {
    serverComponentsExternalPackages: ["@prisma/client", "prisma"],
  },
};

module.exports = nextConfig;
