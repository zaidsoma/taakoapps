"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, CheckCircle, Shield, Loader2, Play } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface DownloadButtonProps {
  downloadUrl: string
  appName: string
  appSize: string
  className?: string
  isMobile?: boolean
}

export function DownloadButton({ downloadUrl, appName, appSize, className, isMobile = false }: DownloadButtonProps) {
  const [downloadState, setDownloadState] = useState<"idle" | "preparing" | "ad" | "ready">("idle")
  const [countdown, setCountdown] = useState(30)
  const [adCountdown, setAdCountdown] = useState(5)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (downloadState === "preparing") {
      interval = setInterval(() => {
        setCountdown((prev) => {
          const newCount = prev - 1
          setProgress(((30 - newCount) / 30) * 100)

          if (newCount <= 0) {
            setDownloadState("ad")
            return 0
          }
          return newCount
        })
      }, 1000)
    }

    if (downloadState === "ad") {
      interval = setInterval(() => {
        setAdCountdown((prev) => {
          const newCount = prev - 1
          if (newCount <= 0) {
            setDownloadState("ready")
            return 0
          }
          return newCount
        })
      }, 1000)
    }

    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [downloadState])

  const handleDownloadClick = () => {
    if (downloadState === "idle") {
      setDownloadState("preparing")
      setCountdown(30)
      setAdCountdown(5)
      setProgress(0)
    } else if (downloadState === "ready") {
      // Create a temporary link and trigger download
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `${appName.replace(/\s+/g, "_")}.apk`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const resetDownload = () => {
    setDownloadState("idle")
    setCountdown(30)
    setAdCountdown(5)
    setProgress(0)
  }

  if (downloadState === "preparing") {
    return (
      <Card className={`w-full ${isMobile ? "max-w-none" : "max-w-md mx-auto"} ${className}`}>
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <div className="relative">
                <Loader2 className="h-12 w-12 text-primary animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold">{countdown}</span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg">Preparing your download...</h3>
              <p className="text-sm text-muted-foreground">Please wait while we prepare your secure download link</p>
            </div>

            <div className="space-y-2">
              <Progress value={progress} className="w-full" />
              <p className="text-xs text-muted-foreground">{countdown} seconds remaining</p>
            </div>

            <div className="flex items-center justify-center text-xs text-muted-foreground">
              <Shield className="h-3 w-3 mr-1" />
              Scanning for malware and viruses...
            </div>

            <Button variant="outline" size="sm" onClick={resetDownload}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (downloadState === "ad") {
    return (
      <Card
        className={`w-full ${isMobile ? "max-w-none" : "max-w-md mx-auto"} border-blue-200 bg-blue-50 ${className}`}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            {/* Ad Placeholder */}
            <div className="bg-gray-200 border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
              <Play className="h-12 w-12 mx-auto mb-2 text-gray-500" />
              <p className="text-sm text-gray-600 mb-2">Advertisement</p>
              <p className="text-xs text-gray-500">Your download will be ready in {adCountdown} seconds</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-blue-800">Almost Ready!</h3>
              <p className="text-sm text-blue-700">Please wait {adCountdown} more seconds...</p>
            </div>

            <Button variant="outline" size="sm" onClick={resetDownload}>
              Start Over
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (downloadState === "ready") {
    return (
      <Card
        className={`w-full ${isMobile ? "max-w-none" : "max-w-md mx-auto"} border-green-200 bg-green-50 ${className}`}
      >
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>

            <div className="space-y-2">
              <h3 className="font-semibold text-lg text-green-800">Download Ready!</h3>
              <p className="text-sm text-green-700">Your download link is ready and secure</p>
            </div>

            <div className="space-y-3">
              <Button size="lg" className="w-full bg-green-600 hover:bg-green-700" onClick={handleDownloadClick}>
                <Download className="h-5 w-5 mr-2" />
                Download {appName} ({appSize})
              </Button>

              <Button variant="outline" size="sm" onClick={resetDownload}>
                Start Over
              </Button>
            </div>

            <div className="flex items-center justify-center text-xs text-green-600">
              <Shield className="h-3 w-3 mr-1" />
              Verified safe and secure
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Button
      size="lg"
      className={`${isMobile ? "w-full" : "w-full sm:w-auto px-8"} ${className}`}
      onClick={handleDownloadClick}
    >
      <Download className="h-5 w-5 mr-2" />
      Download APK ({appSize})
    </Button>
  )
}
