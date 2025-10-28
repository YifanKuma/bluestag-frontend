import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    // ✅ tells Next.js to produce a static site in `/out` when you run `npm run build`
    output: "export",

    // ✅ enables React’s runtime checks in development (good practice)
    reactStrictMode: true,

    // ✅ disables image optimization (since static export can’t run an image optimizer server)
    images: {
        unoptimized: true,
    },
};

export default nextConfig;