"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  speed?: number
  direction?: "up" | "down" | "left" | "right"
}

export default function ParallaxSection({
  children,
  className = "",
  speed = 0.1,
  direction = "up",
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const scrollY = window.scrollY
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const viewportHeight = window.innerHeight

      // Check if section is in viewport
      if (scrollY + viewportHeight > sectionTop && scrollY < sectionTop + sectionHeight) {
        // Calculate how far the section is from the center of the viewport
        const distanceFromCenter = scrollY + viewportHeight / 2 - (sectionTop + sectionHeight / 2)

        // Apply transform based on direction
        let transform = ""
        switch (direction) {
          case "up":
            transform = `translateY(${-distanceFromCenter * speed}px)`
            break
          case "down":
            transform = `translateY(${distanceFromCenter * speed}px)`
            break
          case "left":
            transform = `translateX(${-distanceFromCenter * speed}px)`
            break
          case "right":
            transform = `translateX(${distanceFromCenter * speed}px)`
            break
        }

        section.style.transform = transform
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [speed, direction])

  return (
    <div ref={sectionRef} className={`parallax ${className}`}>
      {children}
    </div>
  )
}

