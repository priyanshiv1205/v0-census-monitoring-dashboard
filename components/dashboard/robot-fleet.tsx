"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
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
} from "lucide-react"
import { cn } from "@/lib/utils"

const robotFleetData = [
  { id: "SWR-001", status: "active", battery: 92, zone: "Delhi NCR", connectivity: "excellent", lastSync: "2s ago", sensorHealth: 100 },
  { id: "SWR-015", status: "active", battery: 78, zone: "Mumbai Central", connectivity: "good", lastSync: "5s ago", sensorHealth: 98 },
  { id: "SWR-023", status: "warning", battery: 34, zone: "Kolkata East", connectivity: "good", lastSync: "12s ago", sensorHealth: 95 },
  { id: "SWR-042", status: "active", battery: 88, zone: "Bangalore Tech", connectivity: "excellent", lastSync: "1s ago", sensorHealth: 100 },
  { id: "SWR-056", status: "maintenance", battery: 15, zone: "Hyderabad HQ", connectivity: "poor", lastSync: "45s ago", sensorHealth: 72 },
  { id: "SWR-078", status: "active", battery: 95, zone: "Pune West", connectivity: "excellent", lastSync: "3s ago", sensorHealth: 99 },
  { id: "SWR-089", status: "active", battery: 67, zone: "Chennai South", connectivity: "good", lastSync: "8s ago", sensorHealth: 96 },
  { id: "SWR-101", status: "warning", battery: 42, zone: "Jaipur Central", connectivity: "moderate", lastSync: "20s ago", sensorHealth: 88 },
]

const statusConfig = {
  active: { icon: CheckCircle2, color: "text-chart-3", bg: "bg-chart-3/10", border: "border-chart-3/30", label: "Active" },
  warning: { icon: AlertTriangle, color: "text-yellow-500", bg: "bg-yellow-500/10", border: "border-yellow-500/30", label: "Warning" },
  maintenance: { icon: XCircle, color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/30", label: "Maintenance" },
}

const connectivityConfig = {
  excellent: { icon: Wifi, color: "text-chart-3", bars: 4 },
  good: { icon: Wifi, color: "text-primary", bars: 3 },
  moderate: { icon: Wifi, color: "text-yellow-500", bars: 2 },
  poor: { icon: WifiOff, color: "text-destructive", bars: 1 },
}

export function RobotFleetTable() {
  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Robot Fleet Status
          </CardTitle>
          <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary">
            {robotFleetData.length} Units
          </Badge>
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
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Zone</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Connectivity</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Last Sync</th>
                <th className="text-left py-3 px-4 text-xs font-medium text-muted-foreground uppercase tracking-wider">Sensor Health</th>
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
                        <StatusIcon className="h-3 w-3" />
                        {status.label}
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Battery className={cn(
                          "h-4 w-4",
                          robot.battery > 50 ? "text-chart-3" : robot.battery > 20 ? "text-yellow-500" : "text-destructive"
                        )} />
                        <div className="w-16">
                          <Progress 
                            value={robot.battery} 
                            className="h-1.5"
                          />
                        </div>
                        <span className={cn(
                          "text-xs font-medium",
                          robot.battery > 50 ? "text-chart-3" : robot.battery > 20 ? "text-yellow-500" : "text-destructive"
                        )}>
                          {robot.battery}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="text-sm text-foreground">{robot.zone}</span>
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
                        <Clock className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">{robot.lastSync}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Activity className={cn(
                          "h-4 w-4",
                          robot.sensorHealth >= 95 ? "text-chart-3" : robot.sensorHealth >= 80 ? "text-yellow-500" : "text-destructive"
                        )} />
                        <span className={cn(
                          "text-sm font-medium",
                          robot.sensorHealth >= 95 ? "text-chart-3" : robot.sensorHealth >= 80 ? "text-yellow-500" : "text-destructive"
                        )}>
                          {robot.sensorHealth}%
                        </span>
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
