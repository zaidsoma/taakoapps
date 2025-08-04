import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { getApps } from "../actions"
import Link from "next/link"
import { PlusCircle, ExternalLink, Download } from "lucide-react"

export default async function ViewAppsPage() {
  const apps = await getApps()

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">All Apps</h1>
          <p className="text-muted-foreground">Manage all applications in your marketplace</p>
        </div>
        <Button asChild>
          <Link href="/admin/add-app">
            <PlusCircle className="h-4 w-4 mr-2" />
            Add New App
          </Link>
        </Button>
      </div>

      {apps.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <div className="text-muted-foreground mb-4">
              <PlusCircle className="h-16 w-16 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No apps found</h3>
              <p>Start building your marketplace by adding your first app</p>
            </div>
            <Button asChild>
              <Link href="/admin/add-app">Add First App</Link>
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app) => (
            <Card key={app.id} className="overflow-hidden">
              <div className="aspect-video relative">
                <img src={app.imageUrl || "/placeholder.svg"} alt={app.name} className="w-full h-full object-cover" />
                <Badge className="absolute top-2 right-2">v{app.version}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-1">{app.name}</CardTitle>
                <CardDescription className="line-clamp-2">{app.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span>{app.size}</span>
                  </div>

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" asChild className="flex-1 bg-transparent">
                      <Link href={app.downloadLink} target="_blank">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View
                      </Link>
                    </Button>
                    <Button size="sm" asChild className="flex-1">
                      <Link href={`/app/${app.id}`}>
                        <Download className="h-4 w-4 mr-2" />
                        Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
