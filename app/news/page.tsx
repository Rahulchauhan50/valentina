"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Calendar, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function NewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample news data - in a real app, this would come from the database
  const newsItems = [
    {
      id: 1,
      title: "Valentina Group Expands Into New Markets",
      excerpt:
        "Valentina Industries announces expansion into three new international markets, marking a significant milestone in the group's global growth strategy. The expansion includes new offices in Singapore, Dubai, and London, strengthening our presence in key financial hubs around the world.",
      content: "Full article content here...",
      category: "Corporate",
      author: "Admin",
      date: "2023-12-15",
      image: "/placeholder.svg?height=400&width=600",
      slug: "expansion-new-markets",
    },
    {
      id: 2,
      title: "Sustainability Initiative Launched",
      excerpt:
        "Our new eco-friendly initiative aims to reduce carbon footprint across all ventures. The comprehensive sustainability program includes renewable energy adoption, waste reduction strategies, and community environmental projects that align with global sustainability goals.",
      content: "Full article content here...",
      category: "CSR",
      author: "John Smith",
      date: "2023-11-28",
      image: "/placeholder.svg?height=400&width=600",
      slug: "sustainability-initiative",
    },
    {
      id: 3,
      title: "Annual Investor Conference Highlights",
      excerpt:
        "Key takeaways from this year's investor conference and future growth plans. The event featured presentations from leadership across all Valentina companies, showcasing strong financial performance and ambitious expansion strategies for the coming fiscal year.",
      content: "Full article content here...",
      category: "Finance",
      author: "Sarah Johnson",
      date: "2023-10-10",
      image: "/placeholder.svg?height=400&width=600",
      slug: "investor-conference",
    },
    {
      id: 4,
      title: "Valentina Pharma Launches New Product Line",
      excerpt:
        "Introducing our innovative range of healthcare products designed for modern needs. The new product line includes advanced formulations developed through extensive research and clinical trials, addressing key health concerns with cutting-edge solutions.",
      content: "Full article content here...",
      category: "Product",
      author: "Dr. Patel",
      date: "2023-09-05",
      image: "/placeholder.svg?height=400&width=600",
      slug: "pharma-product-launch",
    },
    {
      id: 5,
      title: "Corporate Social Responsibility Report 2023",
      excerpt:
        "Detailed overview of our community initiatives and environmental impact throughout the past year. The report highlights significant achievements in education support, healthcare access improvement, and environmental conservation efforts across all regions where Valentina operates.",
      content: "Full article content here...",
      category: "CSR",
      author: "Admin",
      date: "2023-08-22",
      image: "/placeholder.svg?height=400&width=600",
      slug: "csr-report-2023",
    },
    {
      id: 6,
      title: "Phoenix Security Wins Industry Award",
      excerpt:
        "Our security division recognized for excellence in service and innovation at the annual Security Services Excellence Awards. The prestigious recognition highlights Phoenix Security's commitment to implementing cutting-edge security technologies while maintaining exceptional service standards.",
      content: "Full article content here...",
      category: "Awards",
      author: "Michael Brown",
      date: "2023-07-15",
      image: "/placeholder.svg?height=400&width=600",
      slug: "security-award",
    },
    {
      id: 7,
      title: "Santosh Bandai Construction Completes Landmark Project",
      excerpt:
        "Celebrating the successful completion of our largest residential development to date, featuring sustainable design elements and community-focused amenities. The project represents a new benchmark in urban living, combining luxury, sustainability, and community integration.",
      content: "Full article content here...",
      category: "Projects",
      author: "Rajesh Kumar",
      date: "2023-06-20",
      image: "/placeholder.svg?height=400&width=600",
      slug: "landmark-project-completion",
    },
    {
      id: 8,
      title: "Valentina Industries Hosts Technology Summit",
      excerpt:
        "Industry leaders gathered at our headquarters for a two-day summit exploring emerging technologies and digital transformation strategies. The event featured keynote speeches, panel discussions, and interactive workshops focused on AI, blockchain, and sustainable tech innovations.",
      content: "Full article content here...",
      category: "Events",
      author: "Priya Sharma",
      date: "2023-05-10",
      image: "/placeholder.svg?height=400&width=600",
      slug: "technology-summit",
    },
    {
      id: 9,
      title: "Magic Of Scissors Opens New Flagship Location",
      excerpt:
        "Expanding our premium salon chain with a state-of-the-art facility featuring the latest beauty technologies and sustainable practices. The new location showcases innovative design, eco-friendly operations, and an expanded range of services for our discerning clientele.",
      content: "Full article content here...",
      category: "Expansion",
      author: "Majhar Shaik",
      date: "2023-04-05",
      image: "/placeholder.svg?height=400&width=600",
      slug: "new-salon-opening",
    },
  ]

  // Filter news items based on search term and selected category
  const filteredNewsItems = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase())

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
            alt="Valentina Industries News"
            fill
            className="object-cover"
          />
        </div>
        <div className="container relative z-20 px-4 md:px-6 text-center text-white">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl mb-6">News & Blog</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Stay updated with the latest developments from Valentina Industries
          </p>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <div className="flex items-center gap-2 flex-1">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search news..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Corporate">Corporate</SelectItem>
                <SelectItem value="CSR">CSR</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Product">Product</SelectItem>
                <SelectItem value="Awards">Awards</SelectItem>
                <SelectItem value="Projects">Projects</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Expansion">Expansion</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* News Grid */}
          {filteredNewsItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <p className="text-muted-foreground">No news items found matching your criteria.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNewsItems.map((item) => (
                <Card key={item.id} className="overflow-hidden transition-all duration-300 hover:shadow-lg">
                  <div className="relative h-48 w-full">
                    <Image src={item.image || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded">
                      {item.category}
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {new Date(item.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground line-clamp-3">{item.excerpt}</p>
                  </CardContent>
                  <CardFooter className="p-6 pt-0">
                    <Link href={`/news/${item.slug}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Read More
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

