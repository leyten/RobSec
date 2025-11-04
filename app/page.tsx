"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { SplineScene } from "@/components/ui/spline-scene"
import { Navbar } from "@/components/ui/navbar"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import Image from "next/image"

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

function AnimatedSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <motion.div
      ref={ref}
      className="h-[2px] bg-white"
      initial={{ scaleX: 0 }}
      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left" }}
    />
  )
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 h-[250vh] -top-[vh]">
          <SplineScene scene="https://prod.spline.design/UbM7F-HZcyTbZ4y3/scene.splinecode" className="w-full h-full" />
        </div>
      </div>

      <div className="relative z-10">
        <Navbar />

        <section className="relative min-h-screen flex items-center justify-center">
          <div className="container mx-auto px-4 py-0 my-0">
            <div className="max-w-4xl mx-auto">
              <AnimatedSection>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border-2 border-white mb-8">
                  <span className="text-sm text-black font-mono font-bold tracking-wider">
                    DEFENSE TECH FOR HUMANITY
                  </span>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={0.2}>
                <h1 className="text-5xl md:text-6xl font-bold text-white mb-8 leading-none tracking-tight max-w-3xl">
                  <TypewriterText text="SAFETY &" />
                  <br />
                  <TypewriterText text="CONTROL LAYER" />
                  <br />
                  <TypewriterText text="FOR AUTONOMOUS SYSTEMS" />
                </h1>
              </AnimatedSection>

              <AnimatedSection delay={0.4}>
                <p className="text-lg text-white/80 mb-12 max-w-2xl font-mono">
                  RobSec safeguards autonomous systems. Infrastructure and tools to keep AI and robots safe and
                  reliable. Autonomous operations, made simple.
                </p>
              </AnimatedSection>

              <AnimatedSection delay={0.6}>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-black hover:bg-white/90 font-mono font-bold px-8 border-white relative overflow-hidden group/btn border-0"
                    asChild
                  >
                    <a
                      href="https://docs.google.com/forms/d/e/1FAIpQLSc1VB3oVeGh7uB2Zu3OCYdO8VctGIxBpH8RG9KzVmi0GwArmw/viewform"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-black transition-all duration-300 ease-out group-hover/btn:w-full" />
                      JOIN THE COLLECTIVE
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        <section id="solutions" className="py-32">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="mb-20">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  WHY TEAMS
                  <br />
                  USE ROBSEC
                </h2>
                <AnimatedLine delay={0.3} />
                <p className="text-xl text-white/60 max-w-2xl font-mono mt-6">
                  Keep your autonomous systems safe and reliable. No misbehavior, no downtime, no surprises.
                </p>
              </div>
            </AnimatedSection>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
              {[
                {
                  title: "AUTONOMOUS FLEET MONITORING",
                  desc: "Keep multiple robots and AI agents safe and on track across your infrastructure",
                },
                {
                  title: "AI BEHAVIOR AUDITING",
                  desc: "Ensure models behave as intended in real-world scenarios with continuous oversight",
                },
                {
                  title: "TWIN SIMULATION SAFETY TESTING",
                  desc: "Validate autonomous actions before deployment in controlled environments",
                },
                {
                  title: "DECENTRALIZED ROBOT COORDINATION",
                  desc: "Orchestrate multiple agents across networks with distributed control systems",
                },
                {
                  title: "EMERGENCY OVERRIDE SYSTEMS",
                  desc: "Instantly intervene when systems misbehave with fail-safe protocols",
                },
                {
                  title: "MODEL FINE-TUNING OVERSIGHT",
                  desc: "Track changes and validate safe updates to AI models in production",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.1}>
                  <div className="bg-white border border-white h-48 relative overflow-hidden group cursor-pointer transition-colors duration-300 hover:bg-black">
                    {/* Title - visible by default, hidden on hover */}
                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 opacity-100 group-hover:opacity-0 group-hover:translate-y-4">
                      <h3 className="text-xl font-bold font-mono text-center text-black group-hover:text-white">
                        {item.title}
                      </h3>
                    </div>

                    <div className="absolute inset-0 flex items-center justify-center p-8 transition-all duration-300 opacity-0 -translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 py-8 px-8">
                      <p className="text-sm font-mono leading-relaxed text-center text-white">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <section id="technology" className="py-32 text-black relative">
          <div className="absolute inset-0 bg-white -z-10" />
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <AnimatedSection>
                <div className="mb-20">
                  <h2 className="text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                    THE THREE PILLARS
                    <br />
                    OF ROBSEC
                  </h2>
                  <AnimatedLine delay={0.3} />
                  <p className="text-xl text-black/60 max-w-2xl font-mono mt-6">
                    Protecting and supervising autonomous systems across your infrastructure—cloud, on-premises, or
                    decentralized
                  </p>
                </div>
              </AnimatedSection>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    num: "01",
                    title: "SENSORS & ACTUATORS",
                    subtitle: "REAL-TIME SYSTEM MONITORING",
                    desc: "Connect to robots and AI systems, monitoring all inputs and outputs to prevent unsafe behavior. Multi-platform support for robots, drones, AI agents, and IoT devices.",
                  },
                  {
                    num: "02",
                    title: "SYSTEM SAFETY",
                    subtitle: "ENVIRONMENTS OF ANY COMPLEXITY",
                    desc: "Ensure autonomous systems act safely in any software, hardware, or physical environment. Multi-OS support, simulation testing, and legacy system protection.",
                  },
                  {
                    num: "03",
                    title: "META & OVERSIGHT",
                    subtitle: "AI THAT WATCHES AND ADAPTS",
                    desc: "High-level supervision and corrective intervention. Real-time oversight, behavior analytics, continuous learning, and intelligent human-like intervention.",
                  },
                ].map((item, index) => (
                  <AnimatedSection key={item.num} delay={index * 0.2}>
                    <div>
                      <div className="w-20 h-20 bg-black text-white flex items-center justify-center mb-6 border-4 border-black">
                        <span className="text-4xl font-bold font-mono">{item.num}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 font-mono">{item.title}</h3>
                      <p className="text-sm font-bold mb-4 font-mono text-black/60">{item.subtitle}</p>
                      <p className="text-black/60 font-mono text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="use-cases" className="py-32">
          <div className="container mx-auto px-4">
            <AnimatedSection>
              <div className="mb-20">
                <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
                  TRUSTED ACROSS
                  <br />
                  INDUSTRIES
                </h2>
                <AnimatedLine delay={0.3} />
                <p className="text-xl text-white/60 max-w-2xl font-mono mt-6">
                  Protecting autonomous systems in critical environments worldwide
                </p>
              </div>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 max-w-7xl mx-auto">
              {[
                {
                  title: "MANUFACTURING",
                  desc: "Secure industrial robots and automated assembly lines from unauthorized access and ensure production safety",
                  image: "/industry-manufacturing.png",
                },
                {
                  title: "LOGISTICS",
                  desc: "Secure autonomous delivery vehicles and warehouse robotics infrastructure across distributed networks",
                  image: "/industry-logistics.png",
                },
                {
                  title: "DEFENSE TECH",
                  desc: "Military-grade security for autonomous defense systems, unmanned vehicles, and tactical robotics operations",
                  image: "/industry-defense.png",
                },
                {
                  title: "HEALTHCARE",
                  desc: "Protect surgical robots and medical automation systems with real-time oversight and fail-safe protocols",
                  image: "/industry-healthcare.png",
                },
              ].map((item, index) => (
                <AnimatedSection key={item.title} delay={index * 0.15}>
                  <div className="border border-white border-r-0 last:border-r h-full">
                    <div className="aspect-square relative bg-black">
                      <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    </div>
                    <div className="p-8 bg-black">
                      <h3 className="text-2xl font-bold text-white mb-4 font-mono">{item.title}</h3>
                      <p className="text-white/80 font-mono text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-white border-t-0 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex items-center gap-3">
                <Image src="/robsec-logo.png" alt="RobSec" width={32} height={32} className="w-8 h-8" />
                <span className="text-white font-bold text-xl font-mono">ROBSEC</span>
              </div>
              <p className="text-white/60 text-sm font-mono">© 2025 ROBSEC. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
