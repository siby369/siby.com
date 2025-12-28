"use client"

import { AnimatePresence, motion } from "motion/react"
import React, { useEffect, useState } from "react"

export function HeroIntro() {
  const [phase, setPhase] = useState<"wireframe" | "glitch" | "complete">(
    "wireframe"
  )

  useEffect(() => {
    const timer1 = setTimeout(() => setPhase("glitch"), 2500)
    const timer2 = setTimeout(() => setPhase("complete"), 2800)
    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
    }
  }, [])

  if (phase === "complete") return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#121212] overflow-hidden">
      <AnimatePresence mode="wait">
        {phase === "wireframe" && (
          <motion.div
            key="wireframe"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(10px) brightness(2)" }}
            transition={{ duration: 0.5 }}
            className="relative size-64"
          >
            {/* Simple 3D Wireframe Cube using SVG */}
            <motion.svg
              viewBox="0 0 200 200"
              className="size-full overflow-visible"
              animate={{ rotateY: 360, rotateX: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <defs>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                  <feMerge>
                    <feMergeNode in="coloredBlur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
              <g
                fill="none"
                stroke="white"
                strokeWidth="1"
                filter="url(#glow)"
                style={{ transformOrigin: "center" }}
              >
                {/* Cube Faces */}
                <path d="M50 50 L150 50 L150 150 L50 150 Z" />
                <path d="M80 80 L180 80 L180 180 L80 180 Z" />
                <path d="M50 50 L80 80 M150 50 L180 80 M150 150 L180 180 M50 150 L80 180" />
              </g>
            </motion.svg>

            {/* Particle dissolution simulation */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute size-1 bg-white"
                  initial={{
                    x: "50%",
                    y: "50%",
                    opacity: 0,
                  }}
                  animate={{
                    x: `${Math.random() * 200 - 50}%`,
                    y: `${Math.random() * 200 - 50}%`,
                    opacity: [0, 1, 0],
                    scale: [0, 1.5, 0],
                  }}
                  transition={{
                    duration: 2,
                    delay: 1 + Math.random(),
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Spotlight effect */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#121212_70%)]" />
          </motion.div>
        )}

        {phase === "glitch" && (
          <motion.div
            key="glitch"
            initial={{ opacity: 1 }}
            animate={{
              x: [-10, 10, -5, 5, 0],
              filter: [
                "hue-rotate(90deg) contrast(2)",
                "hue-rotate(-90deg) contrast(3)",
                "none",
              ],
            }}
            className="fixed inset-0 flex items-center justify-center bg-white"
          >
            <div className="text-9xl font-black text-black select-none tracking-tighter">
              SIBY
            </div>
            {/* Pixelated grid overlay for the transition */}
            <div className="absolute inset-0 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAAXNSR0IArs4c6QAAACpJREFUGFdjZEADJgY0QC6AkgApgAnABYAsIAWIAsQAKIDigAmABUAWMAYAHLUCC69W6mAAAAAASUVORK5CYII=')] opacity-20 bg-repeat bg-center" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
