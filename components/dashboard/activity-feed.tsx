"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, MapPin, CheckCircle, AlertTriangle, Database } from "lucide-react"
import { cn } from "@/lib/utils"

const activities = [
  {
    id: 1,
    type: "zone_complete",
    message: "Zone NE-2847 census completed",
    time: "2 min ago",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
  {
    id: 2,
    type: "robot_deployed",
    message: "12 robots deployed to Zone SW-1923",
    time: "5 min ago",
    icon: Bot,
    iconColor: "text-primary",
  },
  {
    id: 3,
    type: "data_sync",
    message: "AWS S3 data sync completed",
    time: "12 min ago",
    icon: Database,
    iconColor: "text-chart-1",
  },
  {
    id: 4,
    type: "alert",
    message: "Low connectivity in Zone E-0492",
    time: "18 min ago",
    icon: AlertTriangle,
    iconColor: "text-yellow-500",
  },
  {
    id: 5,
    type: "zone_started",
    message: "Census started in Zone W-3821",
    time: "25 min ago",
    icon: MapPin,
    iconColor: "text-chart-2",
  },
  {
    id: 6,
    type: "zone_complete",
    message: "Zone S-1547 census completed",
    time: "32 min ago",
    icon: CheckCircle,
    iconColor: "text-green-500",
  },
]

export function ActivityFeed() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Live Activity Feed</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 rounded-lg p-2 transition-colors hover:bg-secondary/50"
          >
            <div
              className={cn(
                "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-secondary",
              )}
            >
              <activity.icon className={cn("h-4 w-4", activity.iconColor)} />
            </div>
            <div className="flex-1 space-y-0.5">
              <p className="text-sm text-foreground">{activity.message}</p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
