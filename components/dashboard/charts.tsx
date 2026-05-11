"use client"

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

// Population by Gender Data
const genderData = [
  { region: "North", male: 185, female: 178 },
  { region: "South", male: 210, female: 205 },
  { region: "East", male: 152, female: 148 },
  { region: "West", male: 170, female: 175 },
]

const genderConfig = {
  male: {
    label: "Male",
    color: "var(--color-chart-1)",
  },
  female: {
    label: "Female",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

// Census Completion Data
const completionData = [
  { name: "Completed", value: 8542, fill: "var(--color-chart-1)" },
  { name: "In Progress", value: 892, fill: "var(--color-chart-2)" },
  { name: "Pending", value: 566, fill: "var(--color-chart-3)" },
]

const completionConfig = {
  completed: {
    label: "Completed",
    color: "var(--color-chart-1)",
  },
  inProgress: {
    label: "In Progress",
    color: "var(--color-chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--color-chart-3)",
  },
} satisfies ChartConfig

// Population Growth Data
const growthData = [
  { year: "2019", population: 1.36 },
  { year: "2020", population: 1.38 },
  { year: "2021", population: 1.39 },
  { year: "2022", population: 1.40 },
  { year: "2023", population: 1.41 },
  { year: "2024", population: 1.42 },
]

const growthConfig = {
  population: {
    label: "Population (Billions)",
    color: "var(--color-chart-1)",
  },
} satisfies ChartConfig

// Robot Activity Data
const robotActivityData = [
  { time: "00:00", active: 2420, data: 156 },
  { time: "04:00", active: 2380, data: 142 },
  { time: "08:00", active: 2650, data: 198 },
  { time: "12:00", active: 2847, data: 245 },
  { time: "16:00", active: 2780, data: 232 },
  { time: "20:00", active: 2590, data: 189 },
]

const robotConfig = {
  active: {
    label: "Active Robots",
    color: "var(--color-chart-1)",
  },
  data: {
    label: "Data Points (K)",
    color: "var(--color-chart-2)",
  },
} satisfies ChartConfig

export function GenderBarChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Population by Gender</CardTitle>
        <CardDescription>Regional distribution in millions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={genderConfig} className="h-[280px] w-full">
          <BarChart data={genderData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis
              dataKey="region"
              tickLine={false}
              axisLine={false}
              className="text-xs"
            />
            <YAxis tickLine={false} axisLine={false} className="text-xs" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="male" fill="var(--color-male)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="female" fill="var(--color-female)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function CompletionPieChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Census Completion</CardTitle>
        <CardDescription>Zone status overview</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={completionConfig} className="h-[280px] w-full">
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={completionData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              strokeWidth={2}
              stroke="var(--background)"
            >
              {completionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <ChartLegend content={<ChartLegendContent nameKey="name" />} />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function PopulationGrowthChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Population Growth</CardTitle>
        <CardDescription>Yearly trend in billions</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={growthConfig} className="h-[280px] w-full">
          <AreaChart data={growthData}>
            <defs>
              <linearGradient id="populationGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-chart-1)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-chart-1)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis dataKey="year" tickLine={false} axisLine={false} className="text-xs" />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs"
              domain={[1.34, 1.44]}
              tickFormatter={(value) => `${value}B`}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Area
              type="monotone"
              dataKey="population"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              fill="url(#populationGradient)"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function RobotActivityChart() {
  return (
    <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-base font-semibold">Swarm Robot Activity</CardTitle>
        <CardDescription>24-hour monitoring cycle</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={robotConfig} className="h-[280px] w-full">
          <LineChart data={robotActivityData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
            <XAxis dataKey="time" tickLine={false} axisLine={false} className="text-xs" />
            <YAxis tickLine={false} axisLine={false} className="text-xs" yAxisId="left" />
            <YAxis
              tickLine={false}
              axisLine={false}
              className="text-xs"
              yAxisId="right"
              orientation="right"
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line
              type="monotone"
              dataKey="active"
              stroke="var(--color-active)"
              strokeWidth={2}
              dot={false}
              yAxisId="left"
            />
            <Line
              type="monotone"
              dataKey="data"
              stroke="var(--color-data)"
              strokeWidth={2}
              dot={false}
              yAxisId="right"
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
