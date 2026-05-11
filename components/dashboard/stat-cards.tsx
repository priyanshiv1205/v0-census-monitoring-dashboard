"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Bot,
  Users,
  MapPin,
  Cloud,
  Battery,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  gradient: string
  index: number
  showBattery?: boolean
  batteryLevel?: number
}

function StatCard({ 
  title, 
  value, 
  change, 
  changeType, 
  icon, 
  gradient, 
  index,
  showBattery,
  batteryLevel = 85
}: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ scale: 1.02, y: -2 }}
    >
      <Card className="glass-card border-border/50 overflow-hidden group">
        <CardContent className="p-5 relative">
          {/* Glow effect on hover */}
          <div className={cn(
            "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500",
            gradient,
            "blur-xl"
          )} style={{ transform: "scale(0.8)" }} />

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <motion.div
                className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-xl",
                  gradient
                )}
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.5 }}
              >
                {icon}
              </motion.div>

              {change && (
                <div className="flex items-center gap-1">
                  {changeType === "positive" && (
                    <TrendingUp className="h-3 w-3 text-chart-3" />
                  )}
                  {changeType === "negative" && (
                    <TrendingDown className="h-3 w-3 text-destructive" />
                  )}
                  <span
                    className={cn(
                      "text-xs font-medium",
                      changeType === "positive" && "text-chart-3",
                      changeType === "negative" && "text-destructive",
                      changeType === "neutral" && "text-muted-foreground"
                    )}
                  >
                    {change}
                  </span>
                </div>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                {title}
              </p>
              <p className="text-2xl font-bold text-foreground">{value}</p>
            </div>

            {/* Battery indicator */}
            {showBattery && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground">Avg. Battery</span>
                  <span className="text-[10px] font-medium text-chart-3">{batteryLevel}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-chart-3 to-primary rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${batteryLevel}%` }}
                    transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            )}

            {/* Live pulse indicator */}
            <div className="absolute top-3 right-3">
              <div className="h-2 w-2 rounded-full bg-chart-3 pulse-live" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function StatCards() {
  const stats = [
    {
      title: "Total Active Robots",
      value: "2,847",
      change: "+12 online",
      changeType: "positive" as const,
      icon: <Bot className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-primary to-primary/60",
      showBattery: false,
    },
    {
      title: "Population Collected",
      value: "847.2M",
      change: "+2.3% today",
      changeType: "positive" as const,
      icon: <Users className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-accent to-accent/60",
      showBattery: false,
    },
    {
      title: "Active Zones",
      value: "1,284",
      change: "142 in progress",
      changeType: "neutral" as const,
      icon: <MapPin className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-chart-3 to-chart-3/60",
      showBattery: false,
    },
    {
      title: "Cloud Synced",
      value: "99.8%",
      change: "Real-time",
      changeType: "positive" as const,
      icon: <Cloud className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-chart-4 to-chart-4/60",
      showBattery: false,
    },
    {
      title: "Battery Health",
      value: "85%",
      change: "Fleet average",
      changeType: "positive" as const,
      icon: <Battery className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-chart-5 to-chart-5/60",
      showBattery: true,
      batteryLevel: 85,
    },
    {
      title: "Emergency Alerts",
      value: "3",
      change: "2 critical",
      changeType: "negative" as const,
      icon: <AlertTriangle className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-destructive to-destructive/60",
      showBattery: false,
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  )
}
