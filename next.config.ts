import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bluestag-ai-strapi.onrender.com",
                pathname: "/uploads/**",
            },
        ],
    },
};

export default nextConfig;
