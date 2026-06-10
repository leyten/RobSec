"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { SplineScene } from "@/components/ui/spline-scene"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

const APPLY_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc1VB3oVeGh7uB2Zu3OCYdO8VctGIxBpH8RG9KzVmi0GwArmw/viewform"

function TypewriterText({ text, className = "" }: { text: string; className?: string }) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 30)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, isInView])

  return (
    <span ref={ref} className={className}>
      {displayText}
      {currentIndex < text.length && <span className="animate-pulse">|</span>}
    </span>
  )
}

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export default function HomePage() {
  return (
    <div className="relative h-[100dvh] overflow-hidden bg-black">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[200vh]">
          <SplineScene
            scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col pointer-events-none">
        <header className="flex items-center justify-between px-6 py-5 md:px-10">
          <div className="flex items-center gap-3">
            <Image src="/robsec-logo.png" alt="RobSec" width={32} height={32} className="w-8 h-8" />
            <span className="text-white font-bold text-xl font-mono tracking-wider">ROBSEC</span>
          </div>
          <a
            href="https://x.com/Roboticsecurity"
            target="_blank"
            rel="noopener noreferrer"
            className="pointer-events-auto w-9 h-9 flex items-center justify-center text-white border border-white hover:bg-white hover:text-black transition-colors"
            aria-label="Follow us on X"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </header>

        <main className="flex flex-1 items-center px-6 md:px-10">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="inline-block px-3 py-1.5 bg-white mb-8">
                <span className="text-xs text-black font-mono font-bold tracking-[0.2em]">
                  DEFENSE TECH FOR HUMANITY
                </span>
              </div>
            </FadeIn>

            <FadeIn delay={0.15}>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-10 leading-tight tracking-tight font-mono">
                <TypewriterText text="SAFETY & CONTROL" />
                <br />
                <TypewriterText text="FOR AUTONOMOUS" />
                <br />
                <TypewriterText text="SYSTEMS" />
              </h1>
            </FadeIn>

            <FadeIn delay={0.3}>
              <Button
                size="lg"
                className="pointer-events-auto bg-white text-black hover:bg-white/90 font-mono font-bold px-8 border-0 rounded-none"
                asChild
              >
                <a href={APPLY_URL} target="_blank" rel="noopener noreferrer">
                  JOIN THE COLLECTIVE
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </FadeIn>
          </div>
        </main>

        <footer className="flex flex-col md:flex-row items-center justify-between gap-3 px-6 py-5 md:px-10">
          <FadeIn delay={0.45}>
            <p className="text-white/60 text-xs font-mono tracking-[0.3em]">MONITOR · AUDIT · OVERRIDE</p>
          </FadeIn>
          <FadeIn delay={0.45}>
            <p className="text-white/40 text-xs font-mono">© 2026 ROBSEC</p>
          </FadeIn>
        </footer>
      </div>
    </div>
  )
}
