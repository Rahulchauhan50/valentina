"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"

export default function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  // Handle scroll events to change header style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isMenuOpen &&
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    // Close menu when pressing escape key
    const handleEscKey = (event: KeyboardEvent) => {
      if (isMenuOpen && event.key === "Escape") {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleEscKey)

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isMenuOpen])

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Companies", href: "/companies" },
    { label: "Gallery", href: "/gallery" },
    { label: "News", href: "/news" },
    { label: "Contact", href: "/contact" },
  ]

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b backdrop-blur-sm transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 dark:bg-gray-900/80 border-gray-200 dark:border-gray-800"
          : "bg-primary/90 text-white border-primary/20"
      }`}
    >
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=32&width=32" alt="Valentina Industries Logo" width={32} height={32} />
          <span className={`text-lg font-bold ${isScrolled ? "text-primary dark:text-white" : "text-white"}`}>
            Valentina Industries
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className={`text-sm font-medium transition-colors relative group ${
                isScrolled
                  ? "text-gray-700 hover:text-primary dark:text-gray-200 dark:hover:text-white"
                  : "text-white/90 hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full ${
                  isScrolled ? "bg-primary dark:bg-white" : "bg-white"
                }`}
              ></span>
            </Link>
          ))}
        </nav>

        {/* Theme Toggle and Login Button - Desktop */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className={
                isScrolled ? "border-gray-300 dark:border-gray-700" : "border-white/30 text-white hover:bg-white/10"
              }
            >
              Admin Login
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            ref={buttonRef}
            className={isScrolled ? "text-gray-700 dark:text-gray-200" : "text-white"}
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close Menu" : "Open Menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-menu"
          ref={menuRef}
          className={`absolute top-16 left-0 right-0 border-b z-50 md:hidden mobile-menu card-glass ${isMenuOpen ? "visible" : "hidden"}`}
        >
          <nav className="container flex flex-col py-4">
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="py-3 text-sm font-medium transition-colors hover:text-primary dark:hover:text-white"
                onClick={() => setIsMenuOpen(false)}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                {item.label}
              </Link>
            ))}
            <div className="pt-4 pb-2">
              <Link href="/dashboard" onClick={() => setIsMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Admin Login
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

