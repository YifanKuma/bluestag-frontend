import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // ⭐ REQUIRED because static export disables image optimizer
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "bluestag-ai-strapi.onrender.com",
                pathname: "/uploads/**/*",
            },
        ],
    },
};

export default nextConfig;

