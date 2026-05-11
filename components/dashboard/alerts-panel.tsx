"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  AlertTriangle,
  Wind,
  Thermometer,
  Zap,
  Bot,
  Clock,
  MapPin,
  CheckCircle2,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const alerts = [
  {
    id: 1,
    type: "critical",
    sensor: "dust",
    title: "High Dust Alert - Zone C",
    description: "Panels C-01, C-02 dust levels at 75-82 g/m². Immediate cleaning required.",
    icon: Wind,
    time: "2 min ago",
    panelId: "C-01, C-02",
    action: "Dispatch Robot",
    robotAssigned: null,
  },
  {
    id: 2,
    type: "critical",
    sensor: "temperature",
    title: "Temperature Warning - Zone D",
    description: "Panel D-08 temperature at 56°C exceeds safe threshold (50°C).",
    icon: Thermometer,
    time: "5 min ago",
    panelId: "D-08",
    action: "Inspect Panel",
    robotAssigned: null,
  },
  {
    id: 3,
    type: "warning",
    sensor: "voltage",
    title: "Low Voltage Detected",
    description: "Zone A voltage output dropped by 15%. Possible dust accumulation.",
    icon: Zap,
    time: "12 min ago",
    panelId: "Zone A",
    action: "Schedule Cleaning",
    robotAssigned: "CLN-005",
  },
  {
    id: 4,
    type: "info",
    sensor: "validation",
    title: "Cleaning Validation Required",
    description: "Panel A-06 cleaning complete. Dust sensor validation pending.",
    icon: CheckCircle2,
    time: "15 min ago",
    panelId: "A-06",
    action: "Validate",
    robotAssigned: null,
  },
  {
    id: 5,
    type: "info",
    sensor: "robot",
    title: "Robot Battery Low",
    description: "CLN-003 battery at 22%. Returning to charging station.",
    icon: Bot,
    time: "18 min ago",
    panelId: "CLN-003",
    action: "Monitor",
    robotAssigned: null,
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
    bg: "bg-orange-500/10", 
    border: "border-orange-500/30", 
    text: "text-orange-500",
    badge: "bg-orange-500/20 text-orange-500 border-orange-500/30"
  },
  info: { 
    bg: "bg-primary/10", 
    border: "border-primary/30", 
    text: "text-primary",
    badge: "bg-primary/20 text-primary border-primary/30"
  },
}

const sensorConfig = {
  dust: { color: "text-orange-500", bg: "bg-orange-500/10" },
  temperature: { color: "text-red-500", bg: "bg-red-500/10" },
  voltage: { color: "text-primary", bg: "bg-primary/10" },
  current: { color: "text-accent", bg: "bg-accent/10" },
  validation: { color: "text-chart-3", bg: "bg-chart-3/10" },
  robot: { color: "text-chart-4", bg: "bg-chart-4/10" },
}

export function AlertsPanel() {
  const criticalCount = alerts.filter(a => a.type === "critical").length
  const warningCount = alerts.filter(a => a.type === "warning").length

  return (
    <Card className="glass-card border-border/50 h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Cleaning Alerts
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-destructive/10 border-destructive/30 text-destructive">
              {criticalCount} Critical
            </Badge>
            <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-500">
              {warningCount} Warning
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert, index) => {
          const config = alertConfig[alert.type as keyof typeof alertConfig]
          const sensor = sensorConfig[alert.sensor as keyof typeof sensorConfig]
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
                  sensor.bg,
                  "border",
                  config.border
                )}>
                  <AlertIcon className={cn("h-5 w-5", sensor.color)} />
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
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {alert.time}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {alert.panelId}
                      </div>
                      {alert.robotAssigned && (
                        <div className="flex items-center gap-1">
                          <Bot className="h-3 w-3 text-primary" />
                          {alert.robotAssigned}
                        </div>
                      )}
                    </div>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className={cn(
                        "h-6 text-[10px] px-2 gap-1",
                        config.border,
                        config.text
                      )}
                    >
                      {alert.action}
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          )
        })}
        
        {/* Quick action bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="pt-3 border-t border-border/50"
        >
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <span className="text-xs text-muted-foreground">Quick Actions</span>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1">
                <Bot className="h-3 w-3" />
                Dispatch All Robots
              </Button>
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1 text-chart-3 border-chart-3/30">
                <CheckCircle2 className="h-3 w-3" />
                Validate All
              </Button>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
