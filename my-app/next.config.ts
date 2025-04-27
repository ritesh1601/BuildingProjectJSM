import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images:{
    dangerouslyAllowSVG:true,
    remotePatterns:[
      {
        protocol: "https",
        hostname: "**", // Double asterisk allows all subdomains
        port: "",
        pathname: "**", // Allows all paths
      },
    ]
  },
  experimental:{
    ppr:"incremental",
  },
};

export default nextConfig;
