"use client"

import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { DashboardHeader } from "@/components/dashboard/header"
import { StatCards } from "@/components/dashboard/stat-cards"
import {
  GenderBarChart,
  CompletionPieChart,
  PopulationGrowthChart,
  RobotActivityChart,
} from "@/components/dashboard/charts"
import { ActivityFeed } from "@/components/dashboard/activity-feed"
import { ZoneTable } from "@/components/dashboard/zone-table"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <DashboardSidebar />
      </div>

      {/* Mobile menu button */}
      <Button
        variant="outline"
        size="icon"
        className="fixed left-4 top-4 z-50 lg:hidden border-border bg-card"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Main Content */}
      <div className="flex-1 lg:pl-64 transition-all duration-300">
        <DashboardHeader />

        <main className="p-6 space-y-6">
          {/* Stat Cards */}
          <StatCards />

          {/* Charts Row */}
          <div className="grid gap-6 lg:grid-cols-2">
            <GenderBarChart />
            <CompletionPieChart />
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <PopulationGrowthChart />
            <RobotActivityChart />
          </div>

          {/* Activity and Table Row */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <ZoneTable />
            </div>
            <ActivityFeed />
          </div>
        </main>
      </div>
    </div>
  )
}
