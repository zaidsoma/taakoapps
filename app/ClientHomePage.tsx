"use client"

import { Search, Star, Download, Smartphone, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const allApps = [
  {
    id: "whatsapp-messenger",
    name: "WhatsApp Messenger",
    developer: "WhatsApp LLC",
    rating: 4.1,
    downloads: "5B+",
    category: "Communication",
    icon: "/placeholder.svg?height=80&width=80&text=WA",
    description: "Free messaging app for Android smartphones with voice and video calls.",
  },
  {
    id: "instagram",
    name: "Instagram",
    developer: "Meta Platforms",
    rating: 4.2,
    downloads: "2B+",
    category: "Social",
    icon: "/placeholder.svg?height=80&width=80&text=IG",
    description: "Share photos and videos with friends and discover content from around the world.",
  },
  {
    id: "tiktok",
    name: "TikTok",
    developer: "TikTok Ltd.",
    rating: 4.4,
    downloads: "1B+",
    category: "Entertainment",
    icon: "/placeholder.svg?height=80&width=80&text=TT",
    description: "Create and discover short videos with music, effects, and creative tools.",
  },
  {
    id: "spotify",
    name: "Spotify",
    developer: "Spotify AB",
    rating: 4.3,
    downloads: "1B+",
    category: "Music",
    icon: "/placeholder.svg?height=80&width=80&text=SP",
    description: "Stream millions of songs and podcasts with personalized playlists.",
  },
  {
    id: "telegram",
    name: "Telegram",
    developer: "Telegram FZ-LLC",
    rating: 4.5,
    downloads: "1B+",
    category: "Communication",
    icon: "/placeholder.svg?height=80&width=80&text=TG",
    description: "Fast and secure messaging app with cloud storage and group chats.",
  },
  {
    id: "netflix",
    name: "Netflix",
    developer: "Netflix, Inc.",
    rating: 4.1,
    downloads: "1B+",
    category: "Entertainment",
    icon: "/placeholder.svg?height=80&width=80&text=NF",
    description: "Watch TV shows and movies anytime, anywhere on your mobile device.",
  },
  {
    id: "uber",
    name: "Uber",
    developer: "Uber Technologies",
    rating: 4.0,
    downloads: "500M+",
    category: "Travel",
    icon: "/placeholder.svg?height=80&width=80&text=UB",
    description: "Request rides, order food delivery, and get around your city easily.",
  },
  {
    id: "discord",
    name: "Discord",
    developer: "Discord Inc.",
    rating: 4.4,
    downloads: "500M+",
    category: "Communication",
    icon: "/placeholder.svg?height=80&width=80&text=DC",
    description: "Chat, voice call, and video call with friends and communities.",
  },
  {
    id: "zoom",
    name: "Zoom",
    developer: "Zoom Video Communications",
    rating: 4.2,
    downloads: "500M+",
    category: "Business",
    icon: "/placeholder.svg?height=80&width=80&text=ZM",
    description: "Video conferencing and online meetings for work and personal use.",
  },
  {
    id: "canva",
    name: "Canva",
    developer: "Canva",
    rating: 4.6,
    downloads: "500M+",
    category: "Art & Design",
    icon: "/placeholder.svg?height=80&width=80&text=CV",
    description: "Design graphics, presentations, and social media posts with ease.",
  },
  {
    id: "youtube",
    name: "YouTube",
    developer: "Google LLC",
    rating: 4.3,
    downloads: "10B+",
    category: "Entertainment",
    icon: "/placeholder.svg?height=80&width=80&text=YT",
    description: "Watch, upload, and share videos from creators around the world.",
  },
  {
    id: "facebook",
    name: "Facebook",
    developer: "Meta Platforms",
    rating: 3.9,
    downloads: "5B+",
    category: "Social",
    icon: "/placeholder.svg?height=80&width=80&text=FB",
    description: "Connect with friends and family, share updates and photos.",
  },
]

const APPS_PER_PAGE = 6

export default function ClientHomePage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string }
}) {
  const currentPage = Number.parseInt(searchParams.page || "1")
  const searchQuery = searchParams.search || ""

  // Filter apps based on search query
  const filteredApps = allApps.filter(
    (app) =>
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Calculate pagination
  const totalPages = Math.ceil(filteredApps.length / APPS_PER_PAGE)
  const startIndex = (currentPage - 1) * APPS_PER_PAGE
  const endIndex = startIndex + APPS_PER_PAGE
  const currentApps = filteredApps.slice(startIndex, endIndex)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Smartphone className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">AppHub</span>
            </Link>
            <Button variant="outline" size="sm">
              Upload App
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Amazing Android Apps</h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
            Download the best Android apps safely and quickly. Curated collection of top-rated applications.
          </p>

          {/* Search Bar */}
          <form method="GET" className="relative max-w-lg mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              name="search"
              defaultValue={searchQuery}
              placeholder="Search apps, developers, categories..."
              className="pl-12 h-14 text-lg"
            />
            <Button type="submit" className="absolute right-2 top-2 h-10">
              Search
            </Button>
          </form>
        </div>
      </section>

      {/* Apps Section */}
      <section className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold">Apps</h2>
            <p className="text-muted-foreground">
              {searchQuery ? `${filteredApps.length} results for "${searchQuery}"` : `${allApps.length} apps available`}
            </p>
          </div>
          {searchQuery && (
            <Button variant="outline" asChild>
              <Link href="/">Clear Search</Link>
            </Button>
          )}
        </div>

        {/* Apps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentApps.map((app) => (
            <Card
              key={app.id}
              className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02] h-full cursor-pointer"
              onClick={() => (window.location.href = `/app/${app.id}`)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  <Image
                    src={app.icon || "/placeholder.svg"}
                    alt={`${app.name} icon`}
                    width={64}
                    height={64}
                    className="rounded-xl flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-lg leading-tight line-clamp-2 mb-1">{app.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{app.developer}</p>
                    <Badge variant="secondary" className="text-xs">
                      {app.category}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{app.description}</p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="text-sm font-medium">{app.rating}</span>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Download className="h-4 w-4 mr-1" />
                      <span>{app.downloads}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.location.href = `/app/${app.id}`
                    }}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {currentApps.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold mb-2">No apps found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search terms or browse all apps</p>
            <Button asChild>
              <Link href="/">View All Apps</Link>
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2">
            <Button variant="outline" size="sm" asChild disabled={currentPage === 1}>
              <Link href={`?page=${currentPage - 1}${searchQuery ? `&search=${searchQuery}` : ""}`}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Link>
            </Button>

            <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button key={page} variant={currentPage === page ? "default" : "outline"} size="sm" asChild>
                  <Link href={`?page=${page}${searchQuery ? `&search=${searchQuery}` : ""}`}>{page}</Link>
                </Button>
              ))}
            </div>

            <Button variant="outline" size="sm" asChild disabled={currentPage === totalPages}>
              <Link href={`?page=${currentPage + 1}${searchQuery ? `&search=${searchQuery}` : ""}`}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-muted/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                <Smartphone className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-bold">AppHub</span>
            </div>
            <p className="text-sm text-muted-foreground">Your trusted Android app marketplace</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
