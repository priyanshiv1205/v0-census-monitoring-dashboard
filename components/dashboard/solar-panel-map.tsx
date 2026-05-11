"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Sun, Bot, Droplets, CheckCircle2, AlertTriangle, Clock } from "lucide-react"
import { cn } from "@/lib/utils"

// Solar panel grid data
const solarPanels = [
  // Zone A - Row 1-3
  { id: "A-01", x: 5, y: 10, zone: "A", status: "clean", dustLevel: 15, temp: 42 },
  { id: "A-02", x: 12, y: 10, zone: "A", status: "clean", dustLevel: 18, temp: 44 },
  { id: "A-03", x: 19, y: 10, zone: "A", status: "cleaning", dustLevel: 52, temp: 48 },
  { id: "A-04", x: 26, y: 10, zone: "A", status: "dirty", dustLevel: 68, temp: 52 },
  { id: "A-05", x: 5, y: 18, zone: "A", status: "clean", dustLevel: 12, temp: 41 },
  { id: "A-06", x: 12, y: 18, zone: "A", status: "validation", dustLevel: 28, temp: 43 },
  { id: "A-07", x: 19, y: 18, zone: "A", status: "dirty", dustLevel: 72, temp: 55 },
  { id: "A-08", x: 26, y: 18, zone: "A", status: "clean", dustLevel: 14, temp: 42 },
  // Zone B - Row 1-3
  { id: "B-01", x: 38, y: 10, zone: "B", status: "dirty", dustLevel: 58, temp: 50 },
  { id: "B-02", x: 45, y: 10, zone: "B", status: "cleaning", dustLevel: 45, temp: 47 },
  { id: "B-03", x: 52, y: 10, zone: "B", status: "clean", dustLevel: 20, temp: 44 },
  { id: "B-04", x: 59, y: 10, zone: "B", status: "clean", dustLevel: 16, temp: 43 },
  { id: "B-05", x: 38, y: 18, zone: "B", status: "clean", dustLevel: 22, temp: 45 },
  { id: "B-06", x: 45, y: 18, zone: "B", status: "dirty", dustLevel: 65, temp: 54 },
  { id: "B-07", x: 52, y: 18, zone: "B", status: "validation", dustLevel: 32, temp: 46 },
  { id: "B-08", x: 59, y: 18, zone: "B", status: "clean", dustLevel: 18, temp: 44 },
  // Zone C - Row 1-3
  { id: "C-01", x: 71, y: 10, zone: "C", status: "dirty", dustLevel: 75, temp: 58 },
  { id: "C-02", x: 78, y: 10, zone: "C", status: "dirty", dustLevel: 82, temp: 60 },
  { id: "C-03", x: 85, y: 10, zone: "C", status: "cleaning", dustLevel: 48, temp: 49 },
  { id: "C-04", x: 92, y: 10, zone: "C", status: "clean", dustLevel: 25, temp: 46 },
  { id: "C-05", x: 71, y: 18, zone: "C", status: "clean", dustLevel: 19, temp: 44 },
  { id: "C-06", x: 78, y: 18, zone: "C", status: "clean", dustLevel: 21, temp: 45 },
  { id: "C-07", x: 85, y: 18, zone: "C", status: "dirty", dustLevel: 62, temp: 53 },
  { id: "C-08", x: 92, y: 18, zone: "C", status: "validation", dustLevel: 30, temp: 45 },
  // Zone D - Row 4-6
  { id: "D-01", x: 5, y: 32, zone: "D", status: "clean", dustLevel: 17, temp: 43 },
  { id: "D-02", x: 12, y: 32, zone: "D", status: "clean", dustLevel: 14, temp: 41 },
  { id: "D-03", x: 19, y: 32, zone: "D", status: "dirty", dustLevel: 55, temp: 51 },
  { id: "D-04", x: 26, y: 32, zone: "D", status: "cleaning", dustLevel: 42, temp: 48 },
  { id: "D-05", x: 5, y: 40, zone: "D", status: "validation", dustLevel: 35, temp: 46 },
  { id: "D-06", x: 12, y: 40, zone: "D", status: "clean", dustLevel: 16, temp: 42 },
  { id: "D-07", x: 19, y: 40, zone: "D", status: "clean", dustLevel: 20, temp: 44 },
  { id: "D-08", x: 26, y: 40, zone: "D", status: "dirty", dustLevel: 70, temp: 56 },
]

// Robot positions
const cleaningRobots = [
  { id: "CLN-001", x: 19, y: 10, targetPanel: "A-03", status: "cleaning" },
  { id: "CLN-002", x: 45, y: 10, targetPanel: "B-02", status: "cleaning" },
  { id: "CLN-003", x: 85, y: 10, targetPanel: "C-03", status: "cleaning" },
  { id: "CLN-004", x: 26, y: 32, targetPanel: "D-04", status: "cleaning" },
  { id: "CLN-005", x: 30, y: 25, targetPanel: "A-04", status: "moving" },
  { id: "CLN-006", x: 75, y: 22, targetPanel: "C-07", status: "moving" },
]

const statusConfig = {
  clean: { color: "bg-chart-3", label: "Clean", border: "border-chart-3/50" },
  dirty: { color: "bg-orange-500", label: "Needs Cleaning", border: "border-orange-500/50" },
  cleaning: { color: "bg-primary", label: "Cleaning", border: "border-primary/50" },
  validation: { color: "bg-accent", label: "Validating", border: "border-accent/50" },
}

export function SolarPanelMap() {
  const cleanCount = solarPanels.filter(p => p.status === "clean").length
  const dirtyCount = solarPanels.filter(p => p.status === "dirty").length
  const cleaningCount = solarPanels.filter(p => p.status === "cleaning").length
  const validationCount = solarPanels.filter(p => p.status === "validation").length

  return (
    <Card className="glass-card border-border/50 col-span-2">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Solar Panel Array Monitor
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Real-time panel status and cleaning robot tracking
            </p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="outline" className="bg-chart-3/10 border-chart-3/30 text-chart-3 gap-1">
              <CheckCircle2 className="h-3 w-3" />
              {cleanCount} Clean
            </Badge>
            <Badge variant="outline" className="bg-orange-500/10 border-orange-500/30 text-orange-500 gap-1">
              <AlertTriangle className="h-3 w-3" />
              {dirtyCount} Dirty
            </Badge>
            <Badge variant="outline" className="bg-primary/10 border-primary/30 text-primary gap-1">
              <Droplets className="h-3 w-3" />
              {cleaningCount} Cleaning
            </Badge>
            <Badge variant="outline" className="bg-accent/10 border-accent/30 text-accent gap-1">
              <Clock className="h-3 w-3" />
              {validationCount} Validating
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative aspect-[2/1] bg-gradient-to-b from-background to-secondary/30 rounded-xl overflow-hidden border border-border/50">
          {/* Grid background */}
          <div className="absolute inset-0 opacity-10">
            {[...Array(8)].map((_, i) => (
              <div
                key={`h-${i}`}
                className="absolute w-full h-px bg-primary/50"
                style={{ top: `${(i + 1) * 12}%` }}
              />
            ))}
            {[...Array(12)].map((_, i) => (
              <div
                key={`v-${i}`}
                className="absolute h-full w-px bg-primary/50"
                style={{ left: `${(i + 1) * 8}%` }}
              />
            ))}
          </div>

          {/* Zone labels */}
          <div className="absolute top-2 left-4 text-xs font-bold text-chart-1/70">Zone A</div>
          <div className="absolute top-2 left-[38%] text-xs font-bold text-chart-2/70">Zone B</div>
          <div className="absolute top-2 left-[72%] text-xs font-bold text-chart-3/70">Zone C</div>
          <div className="absolute top-[55%] left-4 text-xs font-bold text-chart-4/70">Zone D</div>

          {/* Solar Panels */}
          {solarPanels.map((panel, index) => {
            const config = statusConfig[panel.status as keyof typeof statusConfig]
            return (
              <motion.div
                key={panel.id}
                className="absolute"
                style={{ left: `${panel.x}%`, top: `${panel.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.02 }}
              >
                <motion.div
                  className="relative group cursor-pointer"
                  whileHover={{ scale: 1.3, zIndex: 20 }}
                >
                  {/* Panel */}
                  <div className={cn(
                    "w-5 h-8 rounded-sm border-2 flex items-center justify-center",
                    config.border,
                    panel.status === "clean" ? "bg-chart-3/20" :
                    panel.status === "dirty" ? "bg-orange-500/20" :
                    panel.status === "cleaning" ? "bg-primary/20" :
                    "bg-accent/20"
                  )}>
                    <div className={cn(
                      "w-3 h-5 rounded-sm",
                      config.color,
                      panel.status === "cleaning" && "animate-pulse"
                    )} />
                  </div>
                  
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-card rounded-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30 shadow-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <Sun className="h-3 w-3 text-yellow-500" />
                      <span className="text-xs font-bold">{panel.id}</span>
                      <Badge variant="outline" className={cn(
                        "text-[8px] px-1 py-0",
                        panel.status === "clean" ? "bg-chart-3/10 text-chart-3 border-chart-3/30" :
                        panel.status === "dirty" ? "bg-orange-500/10 text-orange-500 border-orange-500/30" :
                        panel.status === "cleaning" ? "bg-primary/10 text-primary border-primary/30" :
                        "bg-accent/10 text-accent border-accent/30"
                      )}>
                        {config.label}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                      <div>
                        <span className="text-muted-foreground">Dust:</span>
                        <span className={cn(
                          "ml-1 font-medium",
                          panel.dustLevel > 50 ? "text-orange-500" : "text-chart-3"
                        )}>{panel.dustLevel} g/m²</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Temp:</span>
                        <span className={cn(
                          "ml-1 font-medium",
                          panel.temp > 50 ? "text-destructive" : "text-foreground"
                        )}>{panel.temp}°C</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Cleaning Robots */}
          {cleaningRobots.map((robot, index) => (
            <motion.div
              key={robot.id}
              className="absolute z-10"
              style={{ left: `${robot.x}%`, top: `${robot.y}%` }}
              initial={{ scale: 0 }}
              animate={{ 
                scale: 1,
                x: robot.status === "moving" ? [0, 5, 0] : 0,
                y: robot.status === "moving" ? [0, -3, 0] : 0,
              }}
              transition={{ 
                scale: { delay: 0.5 + index * 0.1, type: "spring" },
                x: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }}
            >
              <motion.div className="relative group cursor-pointer">
                <div className="absolute inset-0 -m-1 rounded-full bg-primary/30 blur-sm animate-pulse" />
                <div className="relative h-4 w-4 rounded-full bg-primary border-2 border-background shadow-lg flex items-center justify-center">
                  <Bot className="h-2 w-2 text-primary-foreground" />
                </div>
                
                {/* Robot tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-card rounded-lg border border-border/50 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-30">
                  <div className="flex items-center gap-1">
                    <Bot className="h-3 w-3 text-primary" />
                    <span className="text-[10px] font-bold">{robot.id}</span>
                  </div>
                  <div className="text-[9px] text-muted-foreground">
                    {robot.status === "cleaning" ? `Cleaning ${robot.targetPanel}` : `Moving to ${robot.targetPanel}`}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Legend */}
          <div className="absolute bottom-3 right-3 flex flex-col gap-1 p-2 rounded-lg glass text-[10px]">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-chart-3" />
              <span className="text-muted-foreground">Clean</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-orange-500" />
              <span className="text-muted-foreground">Dirty</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-sm bg-primary animate-pulse" />
              <span className="text-muted-foreground">Cleaning</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Robot</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
