"use client"

import * as React from "react"
import { Upload, LinkIcon, ImageIcon, FileText, X, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

interface FileUploadDropdownProps {
  label: string
  accept?: string
  fileType: "image" | "apk"
  onFileSelect?: (file: File) => void
  onUrlChange?: (url: string) => void
  className?: string
}

export function FileUploadDropdown({
  label,
  accept,
  fileType,
  onFileSelect,
  onUrlChange,
  className = "",
}: FileUploadDropdownProps) {
  const [uploadMethod, setUploadMethod] = React.useState<"upload" | "url" | null>(null)
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null)
  const [url, setUrl] = React.useState("")
  const [uploadProgress, setUploadProgress] = React.useState(0)
  const [uploadStatus, setUploadStatus] = React.useState<"idle" | "uploading" | "success" | "error">("idle")
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null)
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      onFileSelect?.(file)

      // Create preview for images
      if (fileType === "image" && file.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => setPreviewUrl(e.target?.result as string)
        reader.readAsDataURL(file)
      }

      // Simulate upload
      simulateUpload()
    }
  }

  const simulateUpload = () => {
    setUploadStatus("uploading")
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setUploadStatus("success")
          return 100
        }
        return prev + 10
      })
    }, 200)
  }

  const handleUrlChange = (value: string) => {
    setUrl(value)
    onUrlChange?.(value)
  }

  const resetUpload = () => {
    setSelectedFile(null)
    setUploadProgress(0)
    setUploadStatus("idle")
    setPreviewUrl(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const resetUrl = () => {
    setUrl("")
    onUrlChange?.("")
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <Label className="text-sm font-medium">{label}</Label>

      {!uploadMethod && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent">
              {fileType === "image" ? <ImageIcon className="h-4 w-4" /> : <FileText className="h-4 w-4" />}
              Choose {fileType === "image" ? "Image" : "APK"} Method
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full min-w-[200px]">
            <DropdownMenuItem onClick={() => setUploadMethod("upload")} className="gap-2">
              <Upload className="h-4 w-4" />
              Upload File
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setUploadMethod("url")} className="gap-2">
              <LinkIcon className="h-4 w-4" />
              Enter URL
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )}

      {uploadMethod === "upload" && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="gap-1">
              <Upload className="h-3 w-3" />
              File Upload
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setUploadMethod(null)
                resetUpload()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept={accept}
              onChange={handleFileSelect}
              className="hidden"
              id={`file-${fileType}`}
            />

            {!selectedFile ? (
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-20 border-dashed"
              >
                <div className="text-center">
                  <Upload className="h-6 w-6 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    Click to select {fileType === "image" ? "image" : "APK file"}
                  </p>
                </div>
              </Button>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-background rounded border">
                  {previewUrl && fileType === "image" ? (
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 bg-muted rounded flex items-center justify-center">
                      {fileType === "image" ? <ImageIcon className="h-6 w-6" /> : <FileText className="h-6 w-6" />}
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{selectedFile.name}</p>
                    <p className="text-xs text-muted-foreground">{formatFileSize(selectedFile.size)}</p>
                  </div>
                  <Button variant="ghost" size="sm" onClick={resetUpload}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {uploadStatus === "uploading" && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Uploading...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <Progress value={uploadProgress} className="h-2" />
                  </div>
                )}

                {uploadStatus === "success" && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    Upload successful
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {uploadMethod === "url" && (
        <div className="space-y-4 p-4 border rounded-lg bg-muted/50">
          <div className="flex items-center justify-between">
            <Badge variant="secondary" className="gap-1">
              <LinkIcon className="h-3 w-3" />
              URL Input
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setUploadMethod(null)
                resetUrl()
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-2">
            <Input
              placeholder={`Enter ${fileType === "image" ? "image" : "APK"} URL`}
              value={url}
              onChange={(e) => handleUrlChange(e.target.value)}
            />
            {url && <p className="text-xs text-muted-foreground truncate">URL: {url}</p>}
          </div>
        </div>
      )}
    </div>
  )
}
