"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Bot,
  BarChart3,
  Radio,
  AlertTriangle,
  Cloud,
  Settings,
  User,
  Menu,
  X,
  Sun,
} from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Sun, label: "Solar Panels", active: false },
  { icon: Bot, label: "Cleaning Robots", active: false },
  { icon: BarChart3, label: "Sensor Analytics", active: false },
  { icon: Radio, label: "Live Monitoring", active: false },
  { icon: AlertTriangle, label: "Alerts", active: false },
  { icon: Cloud, label: "AWS Cloud", active: false },
  { icon: Settings, label: "Settings", active: false },
]

export function Navbar() {
  const [activeTab, setActiveTab] = useState("Dashboard")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-yellow-500/20"
    >
      <div className="max-w-[1800px] mx-auto px-4 lg:px-6">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/30 blur-xl rounded-full" />
              <div className="relative h-10 w-10 rounded-xl bg-gradient-to-br from-yellow-500 via-orange-500 to-primary p-[2px]">
                <div className="h-full w-full rounded-xl bg-background flex items-center justify-center">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-primary bg-clip-text text-transparent">
                SolarSwarm
              </span>
              <span className="text-[10px] text-muted-foreground font-medium tracking-wider uppercase">
                Panel Monitoring System
              </span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <motion.button
                key={item.label}
                onClick={() => setActiveTab(item.label)}
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                  activeTab === item.label
                    ? "text-yellow-500"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                )}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
                {activeTab === item.label && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-yellow-500/10 border border-yellow-500/30 rounded-lg -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          {/* User Profile & Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* Live Status */}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-chart-3/10 border border-chart-3/30">
              <div className="h-2 w-2 rounded-full bg-chart-3 pulse-live" />
              <span className="text-xs font-medium text-chart-3">Live</span>
            </div>

            {/* User */}
            <motion.div 
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card cursor-pointer"
              whileHover={{ scale: 1.02 }}
            >
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
                <User className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="hidden md:block text-sm font-medium">Admin</span>
            </motion.div>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="lg:hidden border-t border-border/50 glass"
        >
          <div className="px-4 py-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setActiveTab(item.label)
                  setMobileMenuOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                  activeTab === item.label
                    ? "bg-yellow-500/10 text-yellow-500 border border-yellow-500/30"
                    : "text-muted-foreground hover:bg-secondary/50"
                )}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}
