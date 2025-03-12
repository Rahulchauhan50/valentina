"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  Building,
  FileImage,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Settings,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If not logged in (on login page), don't show the dashboard layout
  if (pathname === "/dashboard" && isMounted) {
    return <>{children}</>
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 pr-0">
            <MobileNav />
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Image src="/placeholder.svg?height=30&width=30" alt="Valentina Industries Logo" width={30} height={30} />
          <Link href="/dashboard/home" className="flex items-center gap-2 font-semibold">
            Valentina Admin
          </Link>
        </div>
        <div className="flex-1"></div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/">
              <LogOut className="mr-2 h-4 w-4" />
              Exit Dashboard
            </Link>
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-muted/40 md:block">
          <DesktopNav />
        </aside>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}

function DesktopNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <ScrollArea className="h-full py-6">
      <nav className="grid gap-2 px-4 text-sm">
        <Link
          href="/dashboard/home"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/home")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Home className="h-4 w-4" />
          Dashboard Home
        </Link>
        <Link
          href="/dashboard/companies"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/companies")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Building className="h-4 w-4" />
          Companies
        </Link>
        <Link
          href="/dashboard/finances"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/finances")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Finances
        </Link>
        <Link
          href="/dashboard/gallery"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/gallery")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <FileImage className="h-4 w-4" />
          Gallery
        </Link>
        <Link
          href="/dashboard/news"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/news")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          News & Blog
        </Link>
        <Link
          href="/dashboard/inquiries"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/inquiries")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Inquiries
        </Link>
        <Link
          href="/dashboard/users"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/users")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Users className="h-4 w-4" />
          User Management
        </Link>
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/settings")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </ScrollArea>
  )
}

function MobileNav() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname?.startsWith(`${path}/`)
  }

  return (
    <ScrollArea className="h-full py-6">
      <div className="flex items-center gap-2 px-4 mb-6">
        <Image src="/placeholder.svg?height=30&width=30" alt="Valentina Industries Logo" width={30} height={30} />
        <span className="font-semibold">Valentina Admin</span>
      </div>
      <nav className="grid gap-2 px-4 text-sm">
        <Link
          href="/dashboard/home"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/home")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Home className="h-4 w-4" />
          Dashboard Home
        </Link>
        <Link
          href="/dashboard/companies"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/companies")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Building className="h-4 w-4" />
          Companies
        </Link>
        <Link
          href="/dashboard/finances"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/finances")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <BarChart3 className="h-4 w-4" />
          Finances
        </Link>
        <Link
          href="/dashboard/gallery"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/gallery")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <FileImage className="h-4 w-4" />
          Gallery
        </Link>
        <Link
          href="/dashboard/news"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/news")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <LayoutDashboard className="h-4 w-4" />
          News & Blog
        </Link>
        <Link
          href="/dashboard/inquiries"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/inquiries")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <MessageSquare className="h-4 w-4" />
          Inquiries
        </Link>
        <Link
          href="/dashboard/users"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/users")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Users className="h-4 w-4" />
          User Management
        </Link>
        <Link
          href="/dashboard/settings"
          className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
            isActive("/dashboard/settings")
              ? "bg-accent text-accent-foreground"
              : "hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          <Settings className="h-4 w-4" />
          Settings
        </Link>
      </nav>
    </ScrollArea>
  )
}

