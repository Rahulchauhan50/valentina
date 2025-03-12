"use client"

import { useEffect, useState, type ReactNode } from "react"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  animation?: "fade-in" | "slide-up" | "slide-down" | "slide-in-right" | "slide-in-left" | "zoom-in"
  delay?: number
  threshold?: number
  once?: boolean
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fade-in",
  delay = 0,
  threshold = 0.1,
  once = true,
}: AnimatedSectionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setIsVisible(false)
        }
      },
      { threshold },
    )

    const currentElement = document.getElementById(`animated-section-${delay}`)
    if (currentElement) observer.observe(currentElement)

    return () => {
      if (currentElement) observer.unobserve(currentElement)
    }
  }, [delay, threshold, once])

  return (
    <div
      id={`animated-section-${delay}`}
      className={`transition-all duration-700 ${className} ${
        isVisible ? `opacity-100 animate-${animation}` : "opacity-0"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

