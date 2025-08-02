import type { Metadata } from "next"
import ClientHomePage from "./ClientHomePage"

export const metadata: Metadata = {
  title: "AppHub - Download Best Android Apps | Free App Marketplace",
  description:
    "Discover and download the best Android apps from our curated marketplace. Find games, productivity apps, social media, and more. Safe, fast downloads.",
  keywords: "android apps, app download, mobile apps, free apps, app marketplace, android games",
  openGraph: {
    title: "AppHub - Best Android App Marketplace",
    description: "Download the best Android apps safely and quickly",
    type: "website",
    url: "https://apphub.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "AppHub - Best Android App Marketplace",
    description: "Download the best Android apps safely and quickly",
  },
}

export default function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  return <ClientHomePage searchParams={searchParams} />
}
