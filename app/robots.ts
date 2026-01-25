import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/"],
        disallow: [
          "/morning-check-in",
          "/day-state",
          "/daily-summary",
          "/weekly-reports",
          "/onboarding",
        ],
      },
    ],
    sitemap: "https://daily-signal.com/sitemap.xml",
  };
}
