import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    reactStrictMode: true,

    // ⭐ REQUIRED because static export disables image optimizer
    images: {
        unoptimized: true,
    }
};

export default nextConfig;
