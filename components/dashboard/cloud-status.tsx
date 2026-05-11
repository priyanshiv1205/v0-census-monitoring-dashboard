"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Cloud,
  Radio,
  Database,
  Cpu,
  CheckCircle2,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Wind,
  Thermometer,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const cloudServices = [
  {
    name: "AWS IoT Core",
    status: "connected",
    icon: Cloud,
    description: "Sensor data ingestion",
    metrics: { messages: "1.8M/hr", latency: "8ms" },
    gradient: "from-[#FF9900] to-[#FF9900]/60",
  },
  {
    name: "Dust Sensor Stream",
    status: "active",
    icon: Wind,
    description: "Real-time dust readings",
    metrics: { throughput: "420 MB/s", sensors: "1,284" },
    gradient: "from-orange-500 to-orange-500/60",
  },
  {
    name: "Temperature Monitor",
    status: "active",
    icon: Thermometer,
    description: "Panel thermal analysis",
    metrics: { readings: "5.2k/sec", zones: "4 active" },
    gradient: "from-red-500 to-red-500/60",
  },
  {
    name: "Power Analytics",
    status: "enabled",
    icon: Zap,
    description: "Voltage & current tracking",
    metrics: { efficiency: "94.2%", output: "10.78 kW" },
    gradient: "from-primary to-primary/60",
  },
]

const statusConfig = {
  connected: { color: "text-chart-3", bg: "bg-chart-3", label: "Connected" },
  active: { color: "text-primary", bg: "bg-primary", label: "Active" },
  syncing: { color: "text-yellow-500", bg: "bg-yellow-500", label: "Syncing" },
  enabled: { color: "text-accent", bg: "bg-accent", label: "Enabled" },
}

export function CloudStatusPanel() {
  return (
    <Card className="glass-card border-border/50">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cloud className="h-5 w-5 text-[#FF9900]" />
            AWS Cloud Integration
          </CardTitle>
          <Badge variant="outline" className="bg-chart-3/10 border-chart-3/30 text-chart-3 gap-1">
            <CheckCircle2 className="h-3 w-3" />
            All Systems Online
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cloudServices.map((service, index) => {
            const status = statusConfig[service.status as keyof typeof statusConfig]
            const ServiceIcon = service.icon

            return (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
                className="p-4 rounded-xl bg-secondary/30 border border-border/50 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={cn(
                    "h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center",
                    service.gradient
                  )}>
                    <ServiceIcon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex items-center gap-1.5">
                    <div className={cn("h-2 w-2 rounded-full", status.bg, "animate-pulse")} />
                    <span className={cn("text-xs font-medium", status.color)}>
                      {status.label}
                    </span>
                  </div>
                </div>

                <h4 className="text-sm font-semibold text-foreground mb-1">
                  {service.name}
                </h4>
                <p className="text-xs text-muted-foreground mb-3">
                  {service.description}
                </p>

                <div className="flex items-center justify-between pt-3 border-t border-border/50">
                  {Object.entries(service.metrics).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <p className="text-sm font-bold text-foreground">{value}</p>
                      <p className="text-[10px] text-muted-foreground capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Real-time metrics bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-4 p-4 rounded-xl bg-gradient-to-r from-[#FF9900]/10 via-orange-500/10 to-primary/10 border border-[#FF9900]/20"
        >
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <Activity className="h-5 w-5 text-[#FF9900] animate-pulse" />
              <div>
                <p className="text-sm font-medium text-foreground">Real-Time Sensor Data Flow</p>
                <p className="text-xs text-muted-foreground">Processing sensor readings from 1,284 panels</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ArrowUpRight className="h-4 w-4 text-chart-3" />
                <div>
                  <p className="text-sm font-bold text-chart-3">856 MB/s</p>
                  <p className="text-[10px] text-muted-foreground">Sensor Data</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <ArrowDownRight className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-sm font-bold text-primary">124 MB/s</p>
                  <p className="text-[10px] text-muted-foreground">Commands</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  )
}
