import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /*
     * Atļauj SVG placeholder attēlus caur next/image.
     * Kad nomainīsi placeholderus pret īstiem PNG/JPG/GIF failiem,
     * šo drīkst atstāt, tas netraucē.
     */
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
