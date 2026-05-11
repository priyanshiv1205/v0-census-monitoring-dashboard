"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

const zones = [
  {
    id: "NE-2847",
    region: "Northeast",
    population: "2.4M",
    robots: 24,
    progress: 100,
    status: "completed",
  },
  {
    id: "SW-1923",
    region: "Southwest",
    population: "1.8M",
    robots: 18,
    progress: 72,
    status: "in_progress",
  },
  {
    id: "S-1547",
    region: "South",
    population: "3.1M",
    robots: 31,
    progress: 100,
    status: "completed",
  },
  {
    id: "W-3821",
    region: "West",
    population: "1.5M",
    robots: 15,
    progress: 45,
    status: "in_progress",
  },
  {
    id: "E-0492",
    region: "East",
    population: "2.7M",
    robots: 8,
    progress: 15,
    status: "pending",
  },
  {
    id: "N-7823",
    region: "North",
    population: "1.2M",
    robots: 0,
    progress: 0,
    status: "pending",
  },
]

const statusConfig = {
  completed: { label: "Completed", variant: "outline" as const, className: "bg-green-500/10 text-green-500 border-green-500/30" },
  in_progress: { label: "In Progress", variant: "outline" as const, className: "bg-primary/10 text-primary border-primary/30" },
  pending: { label: "Pending", variant: "outline" as const, className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/30" },
}

export function ZoneTable() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Census Zones Overview</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Zone ID
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Region
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Population
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Robots
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Progress
                </th>
                <th className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {zones.map((zone) => (
                <tr key={zone.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="py-3 text-sm font-medium text-foreground">{zone.id}</td>
                  <td className="py-3 text-sm text-muted-foreground">{zone.region}</td>
                  <td className="py-3 text-sm text-foreground">{zone.population}</td>
                  <td className="py-3 text-sm text-foreground">{zone.robots}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <Progress value={zone.progress} className="h-2 w-20" />
                      <span className="text-xs text-muted-foreground">{zone.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge
                      variant={statusConfig[zone.status as keyof typeof statusConfig].variant}
                      className={cn(
                        "border",
                        statusConfig[zone.status as keyof typeof statusConfig].className
                      )}
                    >
                      {statusConfig[zone.status as keyof typeof statusConfig].label}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
