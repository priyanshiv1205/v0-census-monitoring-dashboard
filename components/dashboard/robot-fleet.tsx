"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import {
  Bot,
  Battery,
  Wifi,
  WifiOff,
  Activity,
  Clock,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Droplets,
  Play,
  Pause,
  RotateCcw,
} from "lucide-react"
import { cn } from "@/lib/utils"

const robotFleetData = [
  { 
    id: "CLN-001", 
    status: "cleaning", 
    battery: 78, 
    zone: "Zone A", 
    targetPanel: "A-03",
    connectivity: "excellent", 
    lastSync: "2s ago", 
    panelsCleaned: 12,
    waterLevel: 65,
  },
  { 
    id: "CLN-002", 
    status: "cleaning", 
    battery: 85, 
    zone: "Zone B", 
    targetPanel: "B-02",
    connectivity: "excellent", 
    lastSync: "1s ago", 
    panelsCleaned: 15,
    waterLevel: 72,
  },
  { 
    id: "CLN-003", 
    status: "returning", 
    battery: 22, 
    zone: "Zone C", 
    targetPanel: "-",
    connectivity: "good", 
    lastSync: "5s ago", 
    panelsCleaned: 28,
    waterLevel: 15,
  },
  { 
    id: "CLN-004", 
    status: "cleaning", 
    battery: 92, 
    zone: "Zone D", 
    targetPanel: "D-04",
    connectivity: "excellent", 
    lastSync: "1s ago", 
    panelsCleaned: 8,
    waterLevel: 88,
  },
  { 
    id: "CLN-005", 
    status: "moving", 
    battery: 67, 
    zone: "Zone A", 
    targetPanel: "A-04",
    connectivity: "good", 
    lastSync: "3s ago", 
    panelsCleaned: 18,
    waterLevel: 54,
  },
  { 
    id: "CLN-006", 
    status: "moving", 
    battery: 74, 
    zone: "Zone C", 
    targetPanel: "C-07",
    connectivity: "moderate", 
    lastSync: "8s ago", 
    panelsCleaned: 14,
    waterLevel: 62,
  },
  { 
    id: "CLN-007", 
    status: "idle", 
    battery: 100, 
    zone: "Base", 
    targetPanel: "-",
    connectivity: "excellent", 
    lastSync: "1s ago", 
    panelsCleaned: 0,
    waterLevel: 100,
  },
  { 
    id: "CLN-008", 
    status: "maintenance", 
    battery: 45, 
    zone: "Base", 
    targetPanel: "-",
    connectivity: "poor", 
    lastSync: "2m ago", 
    panelsCleaned: 35,
    waterLevel: 30,
  },
]

const statusConfig = {
  cleaning: { icon: Droplets, color: "text-primary", bg: "bg-primary/10", border: "border-primary/30", label: "Cleaning" },
  moving: { icon: Activity, color: "text-accent", bg: "bg-accent/10", border: "border-accent/30", label: "Moving" },
  idle: { icon: CheckCircle2, color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30", label: "Idle" },
  returning: { icon: RotateCcw, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", label: "Returning" },
  maintenance: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "Maintenance" },
}

const connectivityConfig = {
  excellent: { icon: Wifi, color: "text-chart-3", bars: 4 },
  good: { icon: Wifi, color: "text-primary", bars: 3 },
  moderate: { icon: Wifi, color: "text-yellow-500", bars: 2 },
  poor: { icon: WifiOff, color: "text-destructive", bars: 1 },
}

export function RobotFleetTable() {
  const activeCount = robotFleetData.filter(r => r.status === "cleaning" || r.status === "moving").length
  const totalCleaned = robotFleetData.reduce((sum, r) => sum + r.panelsCleaned, 0)

  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Cleaning Robot Fleet
          </CardTitle>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
              {activeCount} Active
            </Badge>
            <Badge variant="outline" className="bg-chart-3/10 border-chart-3/30 text-chart-3">
              {totalCleaned} Panels Cleaned
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Robot ID</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Battery</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Water</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Target</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Signal</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Cleaned</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody>
              {robotFleetData.map((robot, index) => {
                const status = statusConfig[robot.status as keyof typeof statusConfig]
                const connectivity = connectivityConfig[robot.connectivity as keyof typeof connectivityConfig]
                const StatusIcon = status.icon
                const ConnectivityIcon = connectivity.icon

                return (
                  <motion.tr
                    key={robot.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="border-b border-border/30 hover:bg-secondary/30 transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("h-8 w-8 rounded-lg flex items-center justify-center", status.bg, status.border, "border")}>
                          <Bot className={cn("h-4 w-4", status.color)} />
                        </div>
                        <span className="font-mono text-sm font-medium">{robot.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className={cn(status.bg, status.border, status.color, "gap-1")}>
                        <StatusIcon className={cn("h-3 w-3", robot.status === "cleaning" && "animate-pulse")} />
                        {status.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Battery className={cn(
                          "h-4 w-4",
                          robot.battery > 50 ? "text-chart-3" : robot.battery > 20 ? "text-yellow-500" : "text-destructive"
                        )} />
                        <div className="w-14">
                          <Progress 
                            value={robot.battery} 
                            className="h-1.5"
                          />
                        </div>
                        <span className={cn(
                          "text-xs font-medium w-8",
                          robot.battery > 50 ? "text-chart-3" : robot.battery > 20 ? "text-yellow-500" : "text-destructive"
                        )}>
                          {robot.battery}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Droplets className={cn(
                          "h-4 w-4",
                          robot.waterLevel > 50 ? "text-primary" : robot.waterLevel > 20 ? "text-yellow-500" : "text-destructive"
                        )} />
                        <div className="w-14">
                          <Progress 
                            value={robot.waterLevel} 
                            className="h-1.5"
                          />
                        </div>
                        <span className={cn(
                          "text-xs font-medium w-8",
                          robot.waterLevel > 50 ? "text-primary" : robot.waterLevel > 20 ? "text-yellow-500" : "text-destructive"
                        )}>
                          {robot.waterLevel}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-foreground">{robot.targetPanel}</span>
                      <span className="text-xs text-muted-foreground block">{robot.zone}</span>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <ConnectivityIcon className={cn("h-4 w-4", connectivity.color)} />
                        <div className="flex gap-0.5">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={cn(
                                "w-1 rounded-full",
                                i < connectivity.bars ? connectivity.color.replace("text-", "bg-") : "bg-secondary",
                                i === 0 ? "h-1" : i === 1 ? "h-2" : i === 2 ? "h-3" : "h-4"
                              )}
                            />
                          ))}
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-chart-3" />
                        <span className="text-sm font-medium text-chart-3">{robot.panelsCleaned}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        {robot.status === "idle" && (
                          <Button size="icon" variant="outline" className="h-7 w-7 border-chart-3/30">
                            <Play className="h-3 w-3 text-chart-3" />
                          </Button>
                        )}
                        {(robot.status === "cleaning" || robot.status === "moving") && (
                          <Button size="icon" variant="outline" className="h-7 w-7 border-yellow-500/30">
                            <Pause className="h-3 w-3 text-yellow-500" />
                          </Button>
                        )}
                        <Button size="icon" variant="outline" className="h-7 w-7 border-primary/30">
                          <RotateCcw className="h-3 w-3 text-primary" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
