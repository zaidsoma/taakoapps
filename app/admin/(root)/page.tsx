import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getApps } from "./actions";
import Link from "next/link";
import { PlusCircle, Package, Download, Eye } from "lucide-react";

export default async function AdminDashboard() {
  const apps = await getApps();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Manage your Android app marketplace
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Apps</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{apps.length}</div>
            <p className="text-xs text-muted-foreground">Apps in marketplace</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downloads</CardTitle>
            <Download className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Total downloads</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Views</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5,678</div>
            <p className="text-xs text-muted-foreground">Page views</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">890</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common administrative tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Button asChild>
            <Link href="/admin/add-app">
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New App
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/admin/view-apps">View All Apps</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Recent Apps */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Apps</CardTitle>
          <CardDescription>
            Latest applications added to the marketplace
          </CardDescription>
        </CardHeader>
        <CardContent>
          {apps.length === 0 ? (
            <div className="text-center py-8">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No apps yet</h3>
              <p className="text-muted-foreground mb-4">
                Start by adding your first Android application
              </p>
              <Button asChild>
                <Link href="/admin/add-app">
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add First App
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {apps.slice(0, 5).map((app) => (
                <div
                  key={app.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={app.imageUrl || "/placeholder.svg"}
                      alt={app.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{app.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        Version {app.version} • {app.size}
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">Active</Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
