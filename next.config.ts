import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    images: {
        unoptimized: true, // needed for static export
    },

    experimental: {
        allowedDevOrigins: ["192.168.50.240"], // ⭐ fixes warning
    },
};

export default nextConfig;
