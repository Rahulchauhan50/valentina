"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GalleryPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  // Sample gallery data - in a real app, this would come from the database
  const galleryItems = [
    {
      id: 1,
      title: "Company Headquarters",
      category: "Offices",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-10-15",
    },
    {
      id: 2,
      title: "Annual Meeting 2023",
      category: "Events",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-12-05",
    },
    {
      id: 3,
      title: "Phoenix Security Team",
      category: "Teams",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-09-20",
    },
    {
      id: 4,
      title: "Valentina Pharma Lab",
      category: "Facilities",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-11-10",
    },
    {
      id: 5,
      title: "Magic Of Scissors Salon",
      category: "Facilities",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-08-15",
    },
    {
      id: 6,
      title: "CSR Initiative",
      category: "Events",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-07-22",
    },
    {
      id: 7,
      title: "Product Launch",
      category: "Products",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-06-30",
    },
    {
      id: 8,
      title: "Leadership Team",
      category: "Teams",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-05-12",
    },
    {
      id: 9,
      title: "Santosh Bandai Construction Project",
      category: "Projects",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-04-18",
    },
    {
      id: 10,
      title: "Valentina Securities Office",
      category: "Offices",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-03-25",
    },
    {
      id: 11,
      title: "Valyou Retail Products",
      category: "Products",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-02-14",
    },
    {
      id: 12,
      title: "Valentina FMCG Product Line",
      category: "Products",
      src: "/placeholder.svg?height=600&width=800",
      date: "2023-01-30",
    },
  ]

  // Filter gallery items based on search term and selected category
  const filteredGalleryItems = galleryItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Valentina Industries Gallery"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6 animate-slide-down">
            Gallery
          </h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90 animate-slide-up animate-delay-200">
            Visual showcase of Valentina Industries' companies, events, and achievements
          </p>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10 animate-fade-in animate-delay-300">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search gallery..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Offices">Offices</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Teams">Teams</SelectItem>
                <SelectItem value="Facilities">Facilities</SelectItem>
                <SelectItem value="Products">Products</SelectItem>
                <SelectItem value="Projects">Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Gallery Grid */}
          {filteredGalleryItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No gallery items found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredGalleryItems.map((item, index) => (
                <div
                  key={item.id}
                  className={`group relative overflow-hidden rounded-lg border bg-card shadow-sm transition-all hover:shadow-md hover-slide-up ${
                    isLoaded ? "animate-zoom-in opacity-100" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.category}</p>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">{item.category}</span>
                      <span className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

