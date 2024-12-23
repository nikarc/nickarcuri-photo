import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "s3.amazonaws.com",
                port: "",
                // pathname: "/nickarcuri-photo/**",
                search: "",
            },
        ],
    },
};

export default nextConfig;
