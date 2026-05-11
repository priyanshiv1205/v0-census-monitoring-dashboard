"use client"

import { Card, CardContent } from "@/components/ui/card"
import {
  Users,
  UserCircle,
  UserCircle2,
  GraduationCap,
  Bot,
  CheckCircle2,
  Clock,
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
  iconBg: string
}

function StatCard({ title, value, change, changeType, icon, iconBg }: StatCardProps) {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {title}
            </p>
            <p className="text-2xl font-bold text-foreground">{value}</p>
            {change && (
              <div className="flex items-center gap-1">
                {changeType === "positive" && (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                )}
                {changeType === "negative" && (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={cn(
                    "text-xs font-medium",
                    changeType === "positive" && "text-green-500",
                    changeType === "negative" && "text-red-500",
                    changeType === "neutral" && "text-muted-foreground"
                  )}
                >
                  {change}
                </span>
              </div>
            )}
          </div>
          <div
            className={cn(
              "flex h-10 w-10 items-center justify-center rounded-lg",
              iconBg
            )}
          >
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export function StatCards() {
  const stats = [
    {
      title: "Total Population",
      value: "1.42B",
      change: "+2.3% from last census",
      changeType: "positive" as const,
      icon: <Users className="h-5 w-5 text-primary" />,
      iconBg: "bg-primary/10",
    },
    {
      title: "Male Population",
      value: "717.1M",
      change: "50.4% of total",
      changeType: "neutral" as const,
      icon: <UserCircle className="h-5 w-5 text-chart-1" />,
      iconBg: "bg-chart-1/10",
    },
    {
      title: "Female Population",
      value: "706.5M",
      change: "49.6% of total",
      changeType: "neutral" as const,
      icon: <UserCircle2 className="h-5 w-5 text-chart-2" />,
      iconBg: "bg-chart-2/10",
    },
    {
      title: "Literacy Rate",
      value: "77.7%",
      change: "+4.2% improvement",
      changeType: "positive" as const,
      icon: <GraduationCap className="h-5 w-5 text-chart-4" />,
      iconBg: "bg-chart-4/10",
    },
    {
      title: "Active Swarm Robots",
      value: "2,847",
      change: "98.2% operational",
      changeType: "positive" as const,
      icon: <Bot className="h-5 w-5 text-accent" />,
      iconBg: "bg-accent/10",
    },
    {
      title: "Completed Zones",
      value: "8,542",
      change: "85.4% complete",
      changeType: "positive" as const,
      icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
      iconBg: "bg-green-500/10",
    },
    {
      title: "Pending Zones",
      value: "1,458",
      change: "14.6% remaining",
      changeType: "negative" as const,
      icon: <Clock className="h-5 w-5 text-yellow-500" />,
      iconBg: "bg-yellow-500/10",
    },
  ]

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-7">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
