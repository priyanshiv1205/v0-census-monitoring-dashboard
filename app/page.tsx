"use client"

import { Navbar } from "@/components/dashboard/navbar"
import { Hero } from "@/components/dashboard/hero"
import { StatCards } from "@/components/dashboard/stat-cards"
import { RobotTrackingMap } from "@/components/dashboard/robot-map"
import { RobotFleetTable } from "@/components/dashboard/robot-fleet"
import {
  AgeDistributionChart,
  GenderRatioChart,
  AreaDensityChart,
  DailySurveyChart,
} from "@/components/dashboard/charts"
import { AlertsPanel } from "@/components/dashboard/alerts-panel"
import { CloudStatusPanel } from "@/components/dashboard/cloud-status"
import { ParticlesBackground } from "@/components/dashboard/particles-background"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [currentTime, setCurrentTime] = useState<string>("")
  
  useEffect(() => {
    setCurrentTime(new Date().toLocaleTimeString())
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString())
    }, 1000)
    return () => clearInterval(interval)
  }, [])
  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated background */}
      <ParticlesBackground />

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 pt-20 pb-8 px-4 lg:px-6 max-w-[1800px] mx-auto">
        {/* Hero Section */}
        <Hero />

        {/* Stat Cards */}
        <section className="mb-6">
          <StatCards />
        </section>

        {/* Main Grid - Map and Alerts */}
        <section className="grid gap-6 lg:grid-cols-3 mb-6">
          <RobotTrackingMap />
          <AlertsPanel />
        </section>

        {/* Census Analytics Charts */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
            Census Analytics
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <AgeDistributionChart />
            <GenderRatioChart />
            <AreaDensityChart />
            <DailySurveyChart />
          </div>
        </section>

        {/* Robot Fleet Table */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-accent to-chart-3 rounded-full" />
            Robot Fleet Status
          </h2>
          <RobotFleetTable />
        </section>

        {/* Cloud Integration */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-chart-3 to-chart-4 rounded-full" />
            Cloud Integration
          </h2>
          <CloudStatusPanel />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-3 pulse-live" />
              <span className="text-sm text-muted-foreground">
                System Status: All services operational
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              Swarm Sense v2.0 | Powered by AWS IoT & AI | Last sync: {currentTime || "Loading..."}
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
