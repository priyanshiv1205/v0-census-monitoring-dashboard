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
  RadialBar,
  RadialBarChart,
} from "recharts"
import { BarChart3, PieChartIcon, TrendingUp, Users } from "lucide-react"

// Age Distribution Data
const ageDistributionData = [
  { age: "0-14", population: 248, fill: "var(--color-chart-1)" },
  { age: "15-24", population: 195, fill: "var(--color-chart-2)" },
  { age: "25-44", population: 312, fill: "var(--color-chart-3)" },
  { age: "45-64", population: 187, fill: "var(--color-chart-4)" },
  { age: "65+", population: 105, fill: "var(--color-chart-5)" },
]

const ageConfig = {
  "0-14": { label: "0-14 years", color: "var(--color-chart-1)" },
  "15-24": { label: "15-24 years", color: "var(--color-chart-2)" },
  "25-44": { label: "25-44 years", color: "var(--color-chart-3)" },
  "45-64": { label: "45-64 years", color: "var(--color-chart-4)" },
  "65+": { label: "65+ years", color: "var(--color-chart-5)" },
  population: { label: "Population (M)", color: "var(--color-primary)" },
} satisfies ChartConfig

// Gender Ratio Data
const genderRatioData = [
  { name: "Male", value: 51.4, fill: "var(--color-chart-1)" },
  { name: "Female", value: 48.6, fill: "var(--color-chart-4)" },
]

const genderConfig = {
  male: { label: "Male", color: "var(--color-chart-1)" },
  female: { label: "Female", color: "var(--color-chart-4)" },
} satisfies ChartConfig

// Area Density Data
const areaDensityData = [
  { area: "Urban", density: 4200 },
  { area: "Semi-Urban", density: 1800 },
  { area: "Rural", density: 620 },
  { area: "Tribal", density: 180 },
  { area: "Remote", density: 45 },
]

const densityConfig = {
  density: { label: "Density (per km²)", color: "var(--color-primary)" },
} satisfies ChartConfig

// Daily Survey Data
const dailySurveyData = [
  { day: "Mon", completed: 12400, target: 15000 },
  { day: "Tue", completed: 14200, target: 15000 },
  { day: "Wed", completed: 15800, target: 15000 },
  { day: "Thu", completed: 13600, target: 15000 },
  { day: "Fri", completed: 16200, target: 15000 },
  { day: "Sat", completed: 11800, target: 12000 },
  { day: "Sun", completed: 8400, target: 10000 },
]

const surveyConfig = {
  completed: { label: "Completed", color: "var(--color-chart-3)" },
  target: { label: "Target", color: "var(--color-muted-foreground)" },
} satisfies ChartConfig

// Population Heatmap Data
const heatmapData = [
  { zone: "Zone A", mon: 85, tue: 92, wed: 88, thu: 95, fri: 91, sat: 78, sun: 72 },
  { zone: "Zone B", mon: 72, tue: 78, wed: 82, thu: 85, fri: 88, sat: 65, sun: 58 },
  { zone: "Zone C", mon: 95, tue: 98, wed: 96, thu: 92, fri: 94, sat: 85, sun: 80 },
  { zone: "Zone D", mon: 68, tue: 72, wed: 75, thu: 78, fri: 82, sat: 60, sun: 55 },
]

export function AgeDistributionChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            Age Group Distribution
          </CardTitle>
          <CardDescription>Population by age segments (millions)</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={ageConfig} className="h-[260px] w-full">
            <BarChart data={ageDistributionData} barGap={8}>
              <defs>
                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={1} />
                  <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="age" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar dataKey="population" radius={[6, 6, 0, 0]}>
                {ageDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function GenderRatioChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <PieChartIcon className="h-4 w-4 text-accent" />
            Gender Ratio
          </CardTitle>
          <CardDescription>Male vs Female population percentage</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={genderConfig} className="h-[260px] w-full">
            <PieChart>
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              <ChartTooltip content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={genderRatioData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                strokeWidth={3}
                stroke="var(--background)"
                filter="url(#glow)"
              >
                {genderRatioData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <ChartLegend content={<ChartLegendContent nameKey="name" />} />
            </PieChart>
          </ChartContainer>
          <div className="flex justify-center gap-8 mt-2">
            <div className="text-center">
              <p className="text-2xl font-bold text-chart-1">51.4%</p>
              <p className="text-xs text-muted-foreground">Male</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-chart-4">48.6%</p>
              <p className="text-xs text-muted-foreground">Female</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function AreaDensityChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <Users className="h-4 w-4 text-chart-3" />
            Area Density
          </CardTitle>
          <CardDescription>Population density per square kilometer</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={densityConfig} className="h-[260px] w-full">
            <AreaChart data={areaDensityData}>
              <defs>
                <linearGradient id="densityGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-chart-3)" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="var(--color-chart-3)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="area" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Area
                type="monotone"
                dataKey="density"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                fill="url(#densityGradient)"
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export function DailySurveyChart() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card className="glass-card border-border/50">
        <CardHeader className="pb-4">
          <CardTitle className="text-base font-semibold flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-chart-4" />
            Daily Survey Completion
          </CardTitle>
          <CardDescription>Surveys completed vs target this week</CardDescription>
        </CardHeader>
        <CardContent>
          <ChartContainer config={surveyConfig} className="h-[260px] w-full">
            <LineChart data={dailySurveyData}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
              <XAxis dataKey="day" tickLine={false} axisLine={false} className="text-xs" />
              <YAxis tickLine={false} axisLine={false} className="text-xs" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <ChartLegend content={<ChartLegendContent />} />
              <Line
                type="monotone"
                dataKey="target"
                stroke="var(--color-muted-foreground)"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="var(--color-chart-3)"
                strokeWidth={2}
                dot={{ fill: "var(--color-chart-3)", strokeWidth: 0, r: 4 }}
                activeDot={{ r: 6, fill: "var(--color-chart-3)" }}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  )
}
