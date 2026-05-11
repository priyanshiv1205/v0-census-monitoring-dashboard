"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Bot, Wifi, Signal } from "lucide-react"

// Robot positions on the map (relative percentages)
const robotPositions = [
  { id: "R-001", x: 28, y: 25, zone: "Delhi", status: "active" },
  { id: "R-015", x: 32, y: 45, zone: "Mumbai", status: "active" },
  { id: "R-023", x: 72, y: 35, zone: "Kolkata", status: "active" },
  { id: "R-042", x: 45, y: 70, zone: "Bangalore", status: "active" },
  { id: "R-056", x: 55, y: 48, zone: "Hyderabad", status: "warning" },
  { id: "R-078", x: 38, y: 55, zone: "Pune", status: "active" },
  { id: "R-089", x: 62, y: 25, zone: "Patna", status: "active" },
  { id: "R-101", x: 48, y: 32, zone: "Jaipur", status: "active" },
  { id: "R-112", x: 25, y: 38, zone: "Ahmedabad", status: "warning" },
  { id: "R-134", x: 68, y: 55, zone: "Chennai", status: "active" },
  { id: "R-145", x: 22, y: 55, zone: "Surat", status: "active" },
  { id: "R-156", x: 42, y: 22, zone: "Chandigarh", status: "active" },
]

// Zone clusters
const zoneClusters = [
  { name: "Northern Region", x: 35, y: 20, count: 847, color: "primary" },
  { name: "Western Region", x: 22, y: 45, count: 623, color: "accent" },
  { name: "Southern Region", x: 55, y: 65, count: 712, color: "chart-3" },
  { name: "Eastern Region", x: 70, y: 35, count: 665, color: "chart-4" },
]

export function RobotTrackingMap() {
  return (
    <Card className="glass-card border-border/50 col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-primary" />
              Live Robot Tracking
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time swarm distribution across India
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-3 pulse-live" />
              <span className="text-xs text-muted-foreground">2,847 Active</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500" />
              <span className="text-xs text-muted-foreground">23 Warning</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[4/3] bg-gradient-to-b from-background to-secondary/30 rounded-xl overflow-hidden border border-border/50">
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(10)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-px bg-primary/30"
                style={{ top: `${(i + 1) * 10}%` }}
              />
            ))}
            {[...Array(10)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-px bg-primary/30"
                style={{ left: `${(i + 1) * 10}%` }}
              />
            ))}
          </div>

          {/* India map silhouette (simplified representation) */}
          <svg 
            viewBox="0 0 100 100" 
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Simplified India outline */}
            <path
              d="M35 12 L45 10 L55 12 L65 15 L70 20 L72 30 L75 40 L73 50 L70 60 L65 70 L55 78 L45 82 L40 78 L35 70 L28 60 L22 50 L20 40 L22 30 L25 20 L30 15 Z"
              fill="url(#mapGradient)"
              stroke="var(--primary)"
              strokeWidth="0.5"
              strokeOpacity="0.3"
              className="opacity-60"
            />
          </svg>

          {/* Zone Clusters */}
          {zoneClusters.map((cluster, index) => (
            <motion.div
              key={cluster.name}
              className="absolute"
              style={{ left: `${cluster.x}%`, top: `${cluster.y}%` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className={`relative w-16 h-16 -translate-x-1/2 -translate-y-1/2`}>
                <div className={`absolute inset-0 rounded-full bg-${cluster.color}/20 animate-ping`} style={{ animationDuration: "3s" }} />
                <div className={`absolute inset-2 rounded-full bg-${cluster.color}/10 border border-${cluster.color}/30 flex items-center justify-center`}>
                  <span className="text-[10px] font-bold text-foreground">{cluster.count}</span>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Robot dots */}
          {robotPositions.map((robot, index) => (
            <motion.div
              key={robot.id}
              className="absolute"
              style={{ left: `${robot.x}%`, top: `${robot.y}%` }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05, type: "spring" }}
            >
              <motion.div
                className="relative group cursor-pointer"
                whileHover={{ scale: 1.5 }}
              >
                <div className={`absolute inset-0 -m-2 rounded-full ${robot.status === "active" ? "bg-chart-3/30" : "bg-yellow-500/30"} blur-sm`} />
                <div className={`relative h-3 w-3 rounded-full ${robot.status === "active" ? "bg-chart-3" : "bg-yellow-500"} border-2 border-background shadow-lg`}>
                  <div className={`absolute inset-0 rounded-full ${robot.status === "active" ? "bg-chart-3" : "bg-yellow-500"} animate-ping opacity-75`} />
                </div>
                
                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card rounded-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  <div className="flex items-center gap-2">
                    <Bot className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-medium">{robot.id}</span>
                  </div>
                  <div className="text-[9px] text-muted-foreground">{robot.zone}</div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Connection lines animation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {robotPositions.slice(0, 6).map((robot, i) => {
              const nextRobot = robotPositions[(i + 1) % 6]
              return (
                <motion.line
                  key={`line-${i}`}
                  x1={`${robot.x}%`}
                  y1={`${robot.y}%`}
                  x2={`${nextRobot.x}%`}
                  y2={`${nextRobot.y}%`}
                  stroke="var(--primary)"
                  strokeWidth="0.5"
                  strokeOpacity="0.2"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ delay: 1 + i * 0.1, duration: 1 }}
                />
              )
            })}
          </svg>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 flex flex-col gap-2 p-3 rounded-lg glass">
            <div className="flex items-center gap-2">
              <Signal className="h-3 w-3 text-primary" />
              <span className="text-[10px] text-muted-foreground">Coverage Zones</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-3 w-3 text-chart-3" />
              <span className="text-[10px] text-muted-foreground">Active Connections</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
