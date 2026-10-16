import createNextIntlPlugin from "next-intl/plugin";
import bundleAnalyzer from "@next/bundle-analyzer";
import { withSerwist } from "@serwist/turbopack";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    const cacheControl =
      "public, max-age=604800, stale-while-revalidate=86400";

    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: cacheControl }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: cacheControl }],
      },
      {
        source: "/serwist/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "no-cache, no-store, must-revalidate",
          },
        ],
      },
      ...[
        "/favicon.ico",
        "/favicon.svg",
        "/favicon-96.png",
        "/apple-touch-icon.png",
        "/og-image.jpeg",
      ].map((source) => ({
        source,
        headers: [{ key: "Cache-Control", value: cacheControl }],
      })),
    ];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default withBundleAnalyzer(withNextIntl(withSerwist(nextConfig)));
