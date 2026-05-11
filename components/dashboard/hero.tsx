"use client"

import { motion } from "framer-motion"
import { Activity, Wifi, Cloud, Cpu, Sun, Bot } from "lucide-react"

const statusIndicators = [
  { icon: Sun, label: "Solar Active", status: "online" },
  { icon: Bot, label: "Robots Online", status: "online" },
  { icon: Wifi, label: "Sensors Live", status: "online" },
  { icon: Cloud, label: "AWS Connected", status: "online" },
  { icon: Activity, label: "Data Stream", status: "online" },
  { icon: Cpu, label: "AI Processing", status: "online" },
]

export function Hero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-2xl glass-card p-8 mb-6"
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-yellow-500/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-yellow-500/50 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + (i % 3) * 20}%`,
          }}
          animate={{
            y: [-10, 10, -10],
            x: [-5, 5, -5],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 3 + i * 0.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="relative z-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4 max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30"
            >
              <div className="h-2 w-2 rounded-full bg-chart-3 pulse-live" />
              <span className="text-xs font-medium text-yellow-500">System Online</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl lg:text-4xl font-bold leading-tight"
            >
              <span className="bg-gradient-to-r from-yellow-500 via-orange-500 to-primary bg-clip-text text-transparent">
                Solar Panel Monitoring
              </span>
              <br />
              <span className="text-foreground">& Swarm Robot Cleaning System</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-muted-foreground text-base lg:text-lg leading-relaxed"
            >
              AI-powered sensor monitoring with autonomous swarm robots for automated 
              solar panel cleaning. Real-time dust, temperature, voltage, and current analysis.
            </motion.p>
          </div>

          {/* Status Indicators */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-3 gap-3"
          >
            {statusIndicators.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-background/50 border border-border/50 backdrop-blur-sm"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-3/30 blur-md rounded-full" />
                  <div className="relative h-8 w-8 rounded-full bg-chart-3/10 border border-chart-3/30 flex items-center justify-center">
                    <item.icon className="h-4 w-4 text-chart-3" />
                  </div>
                </div>
                <span className="text-[10px] font-medium text-muted-foreground text-center leading-tight">
                  {item.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}
