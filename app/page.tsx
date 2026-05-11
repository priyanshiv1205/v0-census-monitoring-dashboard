"use client"

import { Navbar } from "@/components/dashboard/navbar"
import { Hero } from "@/components/dashboard/hero"
import { StatCards } from "@/components/dashboard/stat-cards"
import { SolarPanelMap } from "@/components/dashboard/solar-panel-map"
import { RobotFleetTable } from "@/components/dashboard/robot-fleet"
import {
  DustSensorChart,
  TemperatureSensorChart,
  VoltageCurrentChart,
  CleaningStatusChart,
  PowerEfficiencyChart,
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

        {/* Main Grid - Solar Panel Map and Alerts */}
        <section className="grid gap-6 lg:grid-cols-3 mb-6">
          <SolarPanelMap />
          <AlertsPanel />
        </section>

        {/* Sensor Analytics Charts */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
            Sensor Analytics
          </h2>
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <DustSensorChart />
            <TemperatureSensorChart />
            <VoltageCurrentChart />
          </div>
        </section>

        {/* Cleaning Analytics */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-primary to-accent rounded-full" />
            Cleaning Analytics
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <CleaningStatusChart />
            <PowerEfficiencyChart />
          </div>
        </section>

        {/* Robot Fleet Table */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-accent to-chart-3 rounded-full" />
            Cleaning Robot Fleet
          </h2>
          <RobotFleetTable />
        </section>

        {/* Cloud Integration */}
        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <span className="h-1 w-8 bg-gradient-to-r from-[#FF9900] to-orange-500 rounded-full" />
            AWS Cloud Integration
          </h2>
          <CloudStatusPanel />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-chart-3 pulse-live" />
              <span className="text-sm text-muted-foreground">
                System Status: All sensors and robots operational
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              SolarSwarm v1.0 | Powered by AWS IoT Core | Last sync: {currentTime || "Loading..."}
            </p>
          </div>
        </footer>
      </main>
    </div>
  )
}
