"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sun,
  Thermometer,
  Zap,
  Activity,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Wind,
  TrendingUp,
  TrendingDown,
} from "lucide-react"
import { cn } from "@/lib/utils"

interface StatCardProps {
  title: string
  value: string
  unit?: string
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: React.ReactNode
  gradient: string
  index: number
  showProgress?: boolean
  progressValue?: number
  progressLabel?: string
}

function StatCard({ 
  title, 
  value,
  unit,
  change, 
  changeType, 
  icon, 
  gradient, 
  index,
  showProgress,
  progressValue = 0,
  progressLabel,
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
              <p className="text-2xl font-bold text-foreground">
                {value}
                {unit && <span className="text-sm font-normal text-muted-foreground ml-1">{unit}</span>}
              </p>
            </div>

            {/* Progress indicator */}
            {showProgress && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground">{progressLabel}</span>
                  <span className={cn(
                    "text-[10px] font-medium",
                    progressValue > 70 ? "text-destructive" : progressValue > 40 ? "text-yellow-500" : "text-chart-3"
                  )}>{progressValue}%</span>
                </div>
                <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                  <motion.div
                    className={cn(
                      "h-full rounded-full",
                      progressValue > 70 ? "bg-gradient-to-r from-destructive to-destructive/60" : 
                      progressValue > 40 ? "bg-gradient-to-r from-yellow-500 to-yellow-500/60" : 
                      "bg-gradient-to-r from-chart-3 to-primary"
                    )}
                    initial={{ width: 0 }}
                    animate={{ width: `${progressValue}%` }}
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
      title: "Total Solar Panels",
      value: "1,284",
      change: "+24 installed",
      changeType: "positive" as const,
      icon: <Sun className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-yellow-500 to-orange-500",
    },
    {
      title: "Dust Level (Avg)",
      value: "42.5",
      unit: "g/m²",
      change: "Above threshold",
      changeType: "negative" as const,
      icon: <Wind className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-orange-500 to-red-500",
      showProgress: true,
      progressValue: 68,
      progressLabel: "Dust Accumulation",
    },
    {
      title: "Temperature (Avg)",
      value: "47.2",
      unit: "°C",
      change: "Optimal range",
      changeType: "positive" as const,
      icon: <Thermometer className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-red-500 to-pink-500",
    },
    {
      title: "Voltage Output",
      value: "385.4",
      unit: "V",
      change: "+2.3% today",
      changeType: "positive" as const,
      icon: <Zap className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-primary to-accent",
    },
    {
      title: "Current Output",
      value: "28.7",
      unit: "A",
      change: "Peak performance",
      changeType: "positive" as const,
      icon: <Activity className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-chart-3 to-chart-3/60",
    },
    {
      title: "Active Cleaning Robots",
      value: "12",
      change: "8 dispatched",
      changeType: "neutral" as const,
      icon: <Bot className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-accent to-accent/60",
    },
    {
      title: "Panels Cleaned Today",
      value: "847",
      change: "65.9% complete",
      changeType: "positive" as const,
      icon: <CheckCircle2 className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-chart-3 to-chart-4",
    },
    {
      title: "Cleaning Alerts",
      value: "23",
      change: "5 critical",
      changeType: "negative" as const,
      icon: <AlertTriangle className="h-6 w-6 text-primary-foreground" />,
      gradient: "bg-gradient-to-br from-destructive to-destructive/60",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8">
      {stats.map((stat, index) => (
        <StatCard key={stat.title} {...stat} index={index} />
      ))}
    </div>
  )
}
