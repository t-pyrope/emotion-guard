import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/onboarding"],
        disallow: ["/morning-check-in", "/day-state", "/daily-summary"],
      },
    ],
    sitemap: "https://daily-signal.com/sitemap.xml",
  };
}
