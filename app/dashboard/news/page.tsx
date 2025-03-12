"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Edit, MoreHorizontal, Plus, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

export default function NewsPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("all")

  // Sample news data - in a real app, this would come from the database
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Valentina Group Expands Into New Markets",
      excerpt: "Valentina Industries announces expansion into three new international markets...",
      author: "Admin",
      date: "2023-12-15",
      status: "Published",
      image: "/placeholder.svg?height=40&width=40",
      slug: "expansion-new-markets",
    },
    {
      id: 2,
      title: "Sustainability Initiative Launched",
      excerpt: "Our new eco-friendly initiative aims to reduce carbon footprint across all ventures...",
      author: "John Smith",
      date: "2023-11-28",
      status: "Published",
      image: "/placeholder.svg?height=40&width=40",
      slug: "sustainability-initiative",
    },
    {
      id: 3,
      title: "Annual Investor Conference Highlights",
      excerpt: "Key takeaways from this year's investor conference and future growth plans...",
      author: "Sarah Johnson",
      date: "2023-10-10",
      status: "Published",
      image: "/placeholder.svg?height=40&width=40",
      slug: "investor-conference",
    },
    {
      id: 4,
      title: "Valentina Pharma Launches New Product Line",
      excerpt: "Introducing our innovative range of healthcare products designed for modern needs...",
      author: "Dr. Patel",
      date: "2023-09-05",
      status: "Published",
      image: "/placeholder.svg?height=40&width=40",
      slug: "pharma-product-launch",
    },
    {
      id: 5,
      title: "Corporate Social Responsibility Report 2023",
      excerpt: "Detailed overview of our community initiatives and environmental impact...",
      author: "Admin",
      date: "2023-08-22",
      status: "Draft",
      image: "/placeholder.svg?height=40&width=40",
      slug: "csr-report-2023",
    },
    {
      id: 6,
      title: "Phoenix Security Wins Industry Award",
      excerpt: "Our security division recognized for excellence in service and innovation...",
      author: "Michael Brown",
      date: "2023-07-15",
      status: "Published",
      image: "/placeholder.svg?height=40&width=40",
      slug: "security-award",
    },
  ])

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the news item
    setNews(news.filter((item) => item.id !== id))

    toast({
      title: "News Item Deleted",
      description: "The news item has been successfully deleted.",
    })
  }

  // Filter news based on search term and selected status
  const filteredNews = news.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = selectedStatus === "all" || item.status === selectedStatus

    return matchesSearch && matchesStatus
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">News & Blog Management</h2>
        <Link href="/dashboard/news/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search news..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        </div>
        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Published">Published</SelectItem>
            <SelectItem value="Draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* News Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead className="hidden md:table-cell">Author</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredNews.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No news items found
                </TableCell>
              </TableRow>
            ) : (
              filteredNews.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      width={40}
                      height={40}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="line-clamp-1">{item.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1 mt-1">{item.excerpt}</div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{item.author}</TableCell>
                  <TableCell className="hidden md:table-cell">{item.date}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        item.status === "Published" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/dashboard/news/${item.id}`}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(item.id)}>
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

