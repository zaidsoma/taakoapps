import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://apphub.com"),
  title: {
    default: "AppHub - Best Android App Marketplace",
    template: "%s | AppHub",
  },
  description:
    "Discover and download the best Android apps from our curated marketplace. Find games, productivity apps, social media, and more. Safe, fast downloads.",
  keywords: [
    "android apps",
    "app download",
    "mobile apps",
    "free apps",
    "app marketplace",
    "android games",
  ],
  authors: [{ name: "AppHub Team" }],
  creator: "AppHub",
  publisher: "AppHub",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apphub.com",
    siteName: "AppHub",
    title: "AppHub - Best Android App Marketplace",
    description: "Download the best Android apps safely and quickly",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppHub - Best Android App Marketplace",
    description: "Download the best Android apps safely and quickly",
    creator: "@apphub",
  },
  verification: {
    google: "your-google-verification-code",
  },
  generator: "v0.dev",
};

// export const runtime = "edge";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://apphub.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "AppHub",
              url: "https://apphub.com",
              description:
                "Best Android app marketplace for downloading mobile applications",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://apphub.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
