import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Smartphone } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="h-12 w-12 rounded-lg bg-primary flex items-center justify-center">
            <Smartphone className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-2xl font-bold">AppHub</span>
        </div>

        <h1 className="text-4xl font-bold mb-4">404</h1>
        <h2 className="text-xl font-semibold mb-4">App Not Found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The app you're looking for doesn't exist or has been removed from our marketplace.
        </p>

        <Button asChild>
          <Link href="/">Back to Homepage</Link>
        </Button>
      </div>
    </div>
  )
}
