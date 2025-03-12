"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HeroSection() {
  const [isClient, setIsClient] = useState(false)
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    setIsClient(true)

    const handleScroll = () => {
      setScrollPosition(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Parallax effect for hero content
  const parallaxOffset = scrollPosition * 0.4

  return (
    <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Video Background - Only rendered on client side to avoid hydration issues */}
      {isClient && (
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: `translateY(${parallaxOffset * 0.2}px)` }}
          >
            <source src="/videos/corporate-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      )}

      {/* Fallback background for SSR */}
      {!isClient && <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-900 to-gray-800"></div>}

      {/* Hero Content */}
      <div
        className="container relative z-20 px-4 md:px-6 text-center text-white"
        style={{ transform: `translateY(${-parallaxOffset * 0.5}px)` }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6 animate-slide-down">
            <span className="inline-block">Valentina</span>{" "}
            <span className="inline-block animate-delay-100">Group of</span>{" "}
            <span className="inline-block animate-delay-200">Companies</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 animate-slide-up animate-delay-300">
            A dynamic and diverse conglomerate with a commitment to excellence and innovation
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in animate-delay-500">
            <Link href="/companies">
              <Button
                size="lg"
                variant="default"
                className="gap-2 hover-scale bg-gradient-to-r from-primary to-secondary"
              >
                Explore Our Companies <ArrowRight className="h-4 w-4 animate-bounce-subtle" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-black hover-scale"
              >
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

