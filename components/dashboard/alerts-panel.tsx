"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  AlertTriangle,
  Battery,
  Wifi,
  ThermometerSun,
  Users,
  MapPin,
  Clock,
} from "lucide-react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    type: "critical",
    title: "Low Battery Alert",
    description: "Robot SWR-056 battery at 15%",
    icon: Battery,
    time: "2 min ago",
    zone: "Hyderabad HQ",
  },
  {
    id: 2,
    type: "critical",
    title: "Sensor Failure",
    description: "Temperature sensor malfunction on SWR-089",
    icon: ThermometerSun,
    time: "8 min ago",
    zone: "Chennai South",
  },
  {
    id: 3,
    type: "warning",
    title: "Connectivity Loss",
    description: "Robot SWR-023 experiencing intermittent connection",
    icon: Wifi,
    time: "12 min ago",
    zone: "Kolkata East",
  },
  {
    id: 4,
    type: "warning",
    title: "Overcrowding Detection",
    description: "High population density detected in Zone A-7",
    icon: Users,
    time: "18 min ago",
    zone: "Mumbai Central",
  },
  {
    id: 5,
    type: "info",
    title: "Zone Boundary Alert",
    description: "Robot SWR-134 approaching restricted area",
    icon: MapPin,
    time: "25 min ago",
    zone: "Delhi NCR",
  },
]

const alertConfig = {
  critical: { 
    bg: "bg-destructive/10", 
    border: "border-destructive/30", 
    text: "text-destructive",
    badge: "bg-destructive/20 text-destructive border-destructive/30"
  },
  warning: { 
    bg: "bg-yellow-500/10", 
    border: "border-yellow-500/30", 
    text: "text-yellow-500",
    badge: "bg-yellow-500/20 text-yellow-500 border-yellow-500/30"
  },
  info: { 
    bg: "bg-primary/10", 
    border: "border-primary/30", 
    text: "text-primary",
    badge: "bg-primary/20 text-primary border-primary/30"
  },
}

export function AlertsPanel() {
  const criticalCount = alerts.filter(a => a.type === "critical").length
  const warningCount = alerts.filter(a => a.type === "warning").length

  return (
    <Card className="glass-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            System Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-destructive/10 border-destructive/30 text-destructive">
              {criticalCount} Critical
            </Badge>
            <Badge variant="outline" className="bg-yellow-500/10 border-yellow-500/30 text-yellow-500">
              {warningCount} Warning
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.type as keyof typeof alertConfig]
          const AlertIcon = alert.icon

          return (
            <motion.div
              key={alert.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "p-4 rounded-xl border transition-all hover:scale-[1.01] cursor-pointer",
                config.bg,
                config.border
              )}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "h-10 w-10 rounded-lg flex items-center justify-center shrink-0",
                  config.bg,
                  "border",
                  config.border
                )}>
                  <AlertIcon className={cn("h-5 w-5", config.text)} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <h4 className={cn("text-sm font-medium", config.text)}>
                      {alert.title}
                    </h4>
                    <Badge variant="outline" className={cn("text-[10px] shrink-0", config.badge)}>
                      {alert.type}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {alert.description}
                  </p>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {alert.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {alert.zone}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
      </CardContent>
    </Card>
  )
}
