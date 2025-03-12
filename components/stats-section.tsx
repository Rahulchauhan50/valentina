"use client"

import { useEffect, useState, useRef } from "react"

export default function StatsSection() {
  const stats = [
    { value: "10+", label: "Companies" },
    { value: "20+", label: "Years of Excellence" },
    { value: "500+", label: "Employees" },
    { value: "5000+", label: "Happy Clients" },
  ]

  const [isVisible, setIsVisible] = useState(false)
  const [counters, setCounters] = useState([0, 0, 0, 0])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 },
    )

    const element = sectionRef.current
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element)
    }
  }, [])

  // Animate number counting
  useEffect(() => {
    if (!isVisible) return

    const finalValues = stats.map((stat) => {
      const numericPart = Number.parseInt(stat.value.replace(/\D/g, ""))
      return numericPart
    })

    const duration = 2000 // ms
    const frameDuration = 1000 / 60 // 60fps
    const totalFrames = Math.round(duration / frameDuration)

    let frame = 0
    const timer = setInterval(() => {
      frame++

      const progress = frame / totalFrames
      const easedProgress = easeOutQuart(progress)

      const newCounters = finalValues.map((value) => Math.floor(easedProgress * value))
      setCounters(newCounters)

      if (frame === totalFrames) {
        clearInterval(timer)
      }
    }, frameDuration)

    return () => clearInterval(timer)
  }, [isVisible, stats])

  // Easing function for smoother animation
  const easeOutQuart = (x: number): number => {
    return 1 - Math.pow(1 - x, 4)
  }

  return (
    <section
      id="stats-section"
      ref={sectionRef}
      className="bg-gradient-to-r from-primary via-secondary to-primary text-white py-12"
    >
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`space-y-2 transition-all duration-700 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <h3 className="text-4xl font-bold">
                {counters[index]}
                {stat.value.includes("+") ? "+" : ""}
              </h3>
              <p className="text-lg opacity-80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

