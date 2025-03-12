"use client"

import { useEffect } from "react"

export default function PageScript() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active")
          }
        })
      },
      { threshold: 0.1 },
    )

    const staggerElements = document.querySelectorAll(".stagger-animation")
    staggerElements.forEach((el) => observer.observe(el))

    return () => {
      staggerElements.forEach((el) => observer.unobserve(el))
    }
  }, [])

  return null
}

