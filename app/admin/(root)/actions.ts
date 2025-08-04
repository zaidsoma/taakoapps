"use server"

// --- Demo App Storage ---
interface App {
  id: string
  name: string
  description: string
  downloadLink: string
  imageUrl: string
  version: string
  size: string
}

// In-memory storage for demo purposes
const apps: App[] = []

export async function addApp(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const downloadLink = formData.get("downloadLink") as string
  const imageUrl = formData.get("imageUrl") as string
  const version = formData.get("version") as string
  const size = formData.get("size") as string

  if (!name || !description || !downloadLink || !imageUrl || !version || !size) {
    return { error: "All fields are required." }
  }

  const newApp: App = {
    id: crypto.randomUUID(),
    name,
    description,
    downloadLink,
    imageUrl,
    version,
    size,
  }

  apps.push(newApp)
  console.log("App added:", newApp)
  return { success: true, message: "App added successfully!" }
}

export async function getApps(): Promise<App[]> {
  return apps
}
