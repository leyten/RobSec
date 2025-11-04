"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => {
  return (
    <a href={href} className="text-white hover:text-white/60 transition-colors font-mono text-sm font-bold">
      {children}
    </a>
  )
}

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const logoElement = (
    <div className="flex items-center gap-3">
      <Image src="/robsec-logo.png" alt="RobSec" width={32} height={32} className="w-8 h-8" />
      <span className="text-white font-bold text-xl font-mono">ROBSEC</span>
    </div>
  )

  const navLinksData = [
    { label: "SOLUTIONS", href: "#solutions" },
    { label: "TECHNOLOGY", href: "#technology" },
    { label: "USE CASES", href: "#use-cases" },
  ]

  const ctaButtonElement = (
    <a
      href="https://docs.google.com/forms/d/e/1FAIpQLSc1VB3oVeGh7uB2Zu3OCYdO8VctGIxBpH8RG9KzVmi0GwArmw/viewform"
      target="_blank"
      rel="noopener noreferrer"
      className="px-6 py-2 text-sm font-bold font-mono text-black bg-white hover:bg-white/90 transition-colors border-white border-0"
    >
      APPLY
    </a>
  )

  const xButtonElement = (
    <a
      href="https://x.com/Roboticsecurity"
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center text-white border border-white hover:bg-white hover:text-black transition-colors"
      aria-label="Follow us on X"
    >
      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    </a>
  )

  return (
    <header className="fixed top-6 left-1/2 transform -translate-x-1/2 z-20 flex flex-col items-center px-6 py-4 bg-black border-white w-[calc(100%-2rem)] sm:w-auto border">
      <div className="flex items-center justify-between w-full gap-x-8">
        <div className="flex items-center">{logoElement}</div>

        <nav className="hidden sm:flex items-center space-x-8">
          {navLinksData.map((link) => (
            <NavLink key={link.href} href={link.href}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden sm:flex items-center gap-3">
          {xButtonElement}
          {ctaButtonElement}
        </div>

        <button
          className="sm:hidden flex items-center justify-center w-8 h-8 text-white focus:outline-none"
          onClick={toggleMenu}
          aria-label={isOpen ? "Close Menu" : "Open Menu"}
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="square" strokeLinejoin="miter" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </button>
      </div>

      <div
        className={`sm:hidden flex flex-col items-center w-full transition-all ease-in-out duration-300 overflow-hidden
                       ${isOpen ? "max-h-[1000px] opacity-100 pt-6" : "max-h-0 opacity-0 pt-0 pointer-events-none"}`}
      >
        <nav className="flex flex-col items-center space-y-4 w-full">
          {navLinksData.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-white hover:text-white/60 transition-colors font-mono font-bold"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="flex flex-col items-center mt-6 w-full">{ctaButtonElement}</div>
        <div className="flex items-center mt-4">{xButtonElement}</div>
      </div>
    </header>
  )
}
