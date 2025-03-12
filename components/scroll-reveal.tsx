"use client"

import { useEffect, useRef, type ReactNode } from "react"

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  animation?: "fade-bottom" | "fade-left" | "fade-right" | "fade"
  delay?: number
  threshold?: number
  duration?: number
  distance?: string
}

export default function ScrollReveal({
  children,
  className = "",
  animation = "fade-bottom",
  delay = 0,
  threshold = 0.1,
  duration = 800,
  distance = "50px",
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("active")
            }, delay)

            // Once revealed, no need to observe anymore
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold,
        rootMargin: "0px 0px -100px 0px", // Adjust when the animation triggers
      },
    )

    const currentRef = ref.current

    if (currentRef) {
      // Set initial styles based on animation type
      currentRef.style.transitionDuration = `${duration}ms`

      if (animation === "fade-bottom" || animation === "fade-left" || animation === "fade-right") {
        currentRef.classList.add(animation)
      } else {
        currentRef.style.opacity = "0"
      }

      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [animation, delay, threshold, duration, distance])

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  )
}

