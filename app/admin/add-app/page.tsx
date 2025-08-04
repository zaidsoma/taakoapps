"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { FileUploadDropdown } from "@/components/file-upload-dropdown"
import { toast } from "sonner"
import { Upload, LinkIcon, Plus, X } from "lucide-react"

export default function AddAppPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    version: "",
    size: "",
    developer: "",
    tags: [] as string[],
  })
  const [currentTag, setCurrentTag] = useState("")
  const [downloadMethod, setDownloadMethod] = useState<"url" | "upload">("url")
  const [downloadUrl, setDownloadUrl] = useState("")
  const [apkFile, setApkFile] = useState<File | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()],
      }))
      setCurrentTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validation
    if (!formData.name || !formData.description || !formData.category) {
      toast.error("Please fill in all required fields")
      return
    }

    if (!downloadUrl && !apkFile) {
      toast.error("Please provide either a download URL or upload an APK file")
      return
    }

    // Here you would typically send the data to your API
    console.log("Form data:", formData)
    console.log("Download method:", downloadMethod)
    console.log("Download URL:", downloadUrl)
    console.log("APK file:", apkFile)

    toast.success("App added successfully!")
  }

  return (
    <div className="container mx-auto max-w-4xl space-y-6 overflow-x-hidden">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New App</h1>
        <p className="text-muted-foreground">Upload a new application to the marketplace</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>Enter the basic details about the application</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">App Name *</Label>
                <Input
                  id="name"
                  placeholder="Enter app name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="developer">Developer *</Label>
                <Input
                  id="developer"
                  placeholder="Enter developer name"
                  value={formData.developer}
                  onChange={(e) => handleInputChange("developer", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="version">Version</Label>
                  <Input
                    id="version"
                    placeholder="1.0.0"
                    value={formData.version}
                    onChange={(e) => handleInputChange("version", e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="size">Size</Label>
                  <Input
                    id="size"
                    placeholder="25 MB"
                    value={formData.size}
                    onChange={(e) => handleInputChange("size", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="games">Games</SelectItem>
                    <SelectItem value="productivity">Productivity</SelectItem>
                    <SelectItem value="social">Social</SelectItem>
                    <SelectItem value="entertainment">Entertainment</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="lifestyle">Lifestyle</SelectItem>
                    <SelectItem value="tools">Tools</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* App Icon */}
          <Card>
            <CardHeader>
              <CardTitle>App Icon</CardTitle>
              <CardDescription>Upload the application icon (recommended: 512x512px)</CardDescription>
            </CardHeader>
            <CardContent>
              <FileUploadDropdown
                label="App Icon"
                accept="image/*"
                fileType="image"
                onFileSelect={(file) => console.log("Icon file:", file)}
                onUrlChange={(url) => console.log("Icon URL:", url)}
              />
            </CardContent>
          </Card>
        </div>

        {/* Description */}
        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
            <CardDescription>Provide a detailed description of the application</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Enter app description..."
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              rows={6}
              required
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
            <CardDescription>Add relevant tags to help users discover your app</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="Enter tag"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                className="flex-1"
              />
              <Button type="button" onClick={addTag} size="sm">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="gap-1">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="ml-1 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Download Section */}
        <Card>
          <CardHeader>
            <CardTitle>Download Method</CardTitle>
            <CardDescription>Choose how users will download the app (at least one method required)</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={downloadMethod} onValueChange={(value) => setDownloadMethod(value as "url" | "upload")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="url" className="gap-2">
                  <LinkIcon className="h-4 w-4" />
                  Download URL
                </TabsTrigger>
                <TabsTrigger value="upload" className="gap-2">
                  <Upload className="h-4 w-4" />
                  Upload APK
                </TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="downloadUrl">Download URL</Label>
                  <Input
                    id="downloadUrl"
                    placeholder="https://example.com/app.apk"
                    value={downloadUrl}
                    onChange={(e) => setDownloadUrl(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground">Enter the direct download link for the APK file</p>
                </div>
              </TabsContent>

              <TabsContent value="upload" className="space-y-4">
                <FileUploadDropdown
                  label="APK File"
                  accept=".apk"
                  fileType="apk"
                  onFileSelect={(file) => setApkFile(file)}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline">
            Cancel
          </Button>
          <Button type="submit">Add App</Button>
        </div>
      </form>
    </div>
  )
}
