"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/chart"
import {
  Bar,
  BarChart,
  Line,
  LineChart,
  Pie,
  PieChart,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts"
import { Wind, Thermometer, Zap, Activity } from "lucide-react"

// Dust Sensor Data (24 hours)
const dustSensorData = [
  { time: "00:00", panel1: 12, panel2: 15, panel3: 18, panel4: 14 },
  { time: "04:00", panel1: 18, panel2: 22, panel3: 25, panel4: 20 },
  { time: "08:00", panel1: 28, panel2: 32, panel3: 38, panel4: 30 },
  { time: "12:00", panel1: 42, panel2: 48, panel3: 55, panel4: 45 },
  { time: "16:00", panel1: 55, panel2: 62, panel3: 70, panel4: 58 },
  { time: "20:00", panel1: 48, panel2: 52, panel3: 58, panel4: 50 },
  { time: "Now", panel1: 42, panel2: 45, panel3: 52, panel4: 44 },
]

const dustConfig = {
  panel1: { label: "Zone A", color: "var(--color-chart-1)" },
  panel2: { label: "Zone B", color: "var(--color-chart-2)" },
  panel3: { label: "Zone C", color: "var(--color-chart-3)" },
  panel4: { label: "Zone D", color: "var(--color-chart-4)" },
} satisfies ChartConfig

// Temperature Sensor Data (24 hours)
const temperatureData = [
  { time: "00:00", ambient: 22, panel: 24, optimal: 25 },
  { time: "04:00", ambient: 20, panel: 22, optimal: 25 },
  { time: "08:00", ambient: 28, panel: 35, optimal: 25 },
  { time: "12:00", ambient: 38, panel: 52, optimal: 25 },
  { time: "16:00", ambient: 42, panel: 58, optimal: 25 },
  { time: "20:00", ambient: 32, panel: 42, optimal: 25 },
  { time: "Now", ambient: 28, panel: 36, optimal: 25 },
]

const temperatureConfig = {
  ambient: { label: "Ambient Temp", color: "var(--color-chart-1)" },
  panel: { label: "Panel Temp", color: "var(--color-destructive)" },
  optimal: { label: "Optimal", color: "var(--color-chart-3)" },
} satisfies ChartConfig

// Voltage Output Data
const voltageData = [
  { time: "06:00", voltage: 180, current: 8 },
  { time: "08:00", voltage: 320, current: 18 },
  { time: "10:00", voltage: 380, current: 26 },
  { time: "12:00", voltage: 410, current: 32 },
  { time: "14:00", voltage: 395, current: 30 },
  { time: "16:00", voltage: 350, current: 24 },
  { time: "18:00", voltage: 220, current: 12 },
  { time: "Now", voltage: 385, current: 28 },
]

const voltageConfig = {
  voltage: { label: "Voltage (V)", color: "var(--color-primary)" },
  current: { label: "Current (A)", color: "var(--color-accent)" },
} satisfies ChartConfig

// Cleaning Status Pie Data
const cleaningStatusData = [
  { name: "Clean", value: 847, fill: "var(--color-chart-3)" },
  { name: "Needs Cleaning", value: 312, fill: "var(--color-chart-1)" },
  { name: "Cleaning In Progress", value: 87, fill: "var(--color-accent)" },
  { name: "Validation Pending", value: 38, fill: "var(--color-chart-4)" },
]

const cleaningConfig = {
  clean: { label: "Clean", color: "var(--color-chart-3)" },
  needsCleaning: { label: "Needs Cleaning", color: "var(--color-chart-1)" },
  inProgress: { label: "In Progress", color: "var(--color-accent)" },
  validation: { label: "Validation", color: "var(--color-chart-4)" },
} satisfies ChartConfig

// Power Generation by Zone
const powerGenerationData = [
  { zone: "Zone A", before: 85, after: 98, fill: "var(--color-chart-1)" },
  { zone: "Zone B", before: 72, after: 95, fill: "var(--color-chart-2)" },
  { zone: "Zone C", before: 68, after: 92, fill: "var(--color-chart-3)" },
  { zone: "Zone D", before: 78, after: 96, fill: "var(--color-chart-4)" },
  { zone: "Zone E", before: 82, after: 97, fill: "var(--color-chart-5)" },
]

const powerConfig = {
  before: { label: "Before Cleaning (%)", color: "var(--color-muted-foreground)" },
  after: { label: "After Cleaning (%)", color: "var(--color-chart-3)" },
} satisfies ChartConfig

export function DustSensorChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Wind className="h-4 w-4 text-orange-500" />
            Dust Sensor Readings
          </CardTitle>
          <CardDescription>Real-time dust accumulation by zone (g/m²)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={dustConfig} className="h-[280px] w-full">
            <AreaChart data={dustSensorData}>
              <defs>
                <linearGradient id="dustGradient1" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-1)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-1)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dustGradient2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-2)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-2)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dustGradient3" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="dustGradient4" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-4)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-4)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area type="monotone" dataKey="panel1" stroke="var(--color-chart-1)" strokeWidth={2} fill="url(#dustGradient1)" />
              <Area type="monotone" dataKey="panel2" stroke="var(--color-chart-2)" strokeWidth={2} fill="url(#dustGradient2)" />
              <Area type="monotone" dataKey="panel3" stroke="var(--color-chart-3)" strokeWidth={2} fill="url(#dustGradient3)" />
              <Area type="monotone" dataKey="panel4" stroke="var(--color-chart-4)" strokeWidth={2} fill="url(#dustGradient4)" />
            </AreaChart>
          </ChartContainer>
          {/* Threshold indicator */}
          <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-orange-500/10 border border-orange-500/30">
            <span className="text-xs text-orange-500 font-medium">Cleaning Threshold: 40 g/m²</span>
            <span className="text-xs text-muted-foreground">3 zones above threshold</span>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function TemperatureSensorChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-red-500" />
            Temperature Sensor
          </CardTitle>
          <CardDescription>Panel vs ambient temperature monitoring (°C)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={temperatureConfig} className="h-[280px] w-full">
            <LineChart data={temperatureData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="optimal"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="ambient"
                stroke="var(--color-chart-1)"
                strokeWidth={2}
                dot={{ fill: "var(--color-chart-1)", strokeWidth: 0, r: 3 }}
              />
              <Line
                type="monotone"
                dataKey="panel"
                stroke="var(--color-destructive)"
                strokeWidth={2}
                dot={{ fill: "var(--color-destructive)", strokeWidth: 0, r: 3 }}
              />
            </LineChart>
          </ChartContainer>
          {/* Temperature status */}
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="p-2 rounded-lg bg-chart-1/10 border border-chart-1/30 text-center">
              <p className="text-lg font-bold text-chart-1">28°C</p>
              <p className="text-[10px] text-muted-foreground">Ambient</p>
            </div>
            <div className="p-2 rounded-lg bg-destructive/10 border border-destructive/30 text-center">
              <p className="text-lg font-bold text-destructive">47°C</p>
              <p className="text-[10px] text-muted-foreground">Panel Avg</p>
            </div>
            <div className="p-2 rounded-lg bg-chart-3/10 border border-chart-3/30 text-center">
              <p className="text-lg font-bold text-chart-3">25°C</p>
              <p className="text-[10px] text-muted-foreground">Optimal</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function VoltageCurrentChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4 text-primary" />
            Voltage & Current Output
          </CardTitle>
          <CardDescription>Real-time power generation metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={voltageConfig} className="h-[280px] w-full">
            <AreaChart data={voltageData}>
              <defs>
                <linearGradient id="voltageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis yAxisId="voltage" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis yAxisId="current" orientation="right" tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Area yAxisId="voltage" type="monotone" dataKey="voltage" stroke="var(--color-primary)" strokeWidth={2} fill="url(#voltageGradient)" />
              <Area yAxisId="current" type="monotone" dataKey="current" stroke="var(--color-accent)" strokeWidth={2} fill="url(#currentGradient)" />
            </AreaChart>
          </ChartContainer>
          {/* Power output */}
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Current Power Output</span>
              </div>
              <span className="text-lg font-bold text-chart-3">10.78 kW</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function CleaningStatusChart() {
  const total = cleaningStatusData.reduce((sum, item) => sum + item.value, 0)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Activity className="h-4 w-4 text-chart-3" />
            Cleaning Status
          </CardTitle>
          <CardDescription>Panel cleaning workflow distribution</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={cleaningConfig} className="h-[200px] w-full">
            <PieChart>
              <defs>
                <filter id="cleaningGlow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={cleaningStatusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                strokeWidth={3}
                stroke="var(--background)"
                filter="url(#cleaningGlow)"
              >
                {cleaningStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
          {/* Status summary */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            {cleaningStatusData.map((item) => (
              <div key={item.name} className="flex items-center justify-between p-2 rounded-lg bg-secondary/30">
                <span className="text-[10px] text-muted-foreground">{item.name}</span>
                <span className="text-xs font-bold">{item.value}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function PowerEfficiencyChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Zap className="h-4 w-4 text-chart-3" />
            Cleaning Efficiency Impact
          </CardTitle>
          <CardDescription>Power output before vs after cleaning (%)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={powerConfig} className="h-[280px] w-full">
            <BarChart data={powerGenerationData} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="zone" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" domain={[0, 100]} />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Bar dataKey="before" radius={[4, 4, 0, 0]} fill="var(--color-muted-foreground)" opacity={0.5} />
              <Bar dataKey="after" radius={[4, 4, 0, 0]} fill="var(--color-chart-3)" />
            </BarChart>
          </ChartContainer>
          {/* Efficiency summary */}
          <div className="mt-4 p-3 rounded-lg bg-chart-3/10 border border-chart-3/30">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Average Efficiency Gain</span>
              <span className="text-lg font-bold text-chart-3">+18.4%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
