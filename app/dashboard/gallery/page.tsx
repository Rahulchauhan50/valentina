"use client"

import { useState } from "react"
import Image from "next/image"
import { Edit, MoreHorizontal, Plus, Trash, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function GalleryPage() {
  const { toast } = useToast()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  // Sample gallery data - in a real app, this would come from the database
  const [images, setImages] = useState([
    {
      id: 1,
      title: "Company Headquarters",
      category: "Offices",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-10-15",
    },
    {
      id: 2,
      title: "Annual Meeting 2023",
      category: "Events",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-12-05",
    },
    {
      id: 3,
      title: "Phoenix Security Team",
      category: "Teams",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-09-20",
    },
    {
      id: 4,
      title: "Valentina Pharma Lab",
      category: "Facilities",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-11-10",
    },
    {
      id: 5,
      title: "Magic Of Scissors Salon",
      category: "Facilities",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-08-15",
    },
    {
      id: 6,
      title: "CSR Initiative",
      category: "Events",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-07-22",
    },
    {
      id: 7,
      title: "Product Launch",
      category: "Products",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-06-30",
    },
    {
      id: 8,
      title: "Leadership Team",
      category: "Teams",
      src: "/placeholder.svg?height=300&width=400",
      date: "2023-05-12",
    },
  ])

  const handleDelete = (id: number) => {
    // In a real app, this would make an API call to delete the image
    setImages(images.filter((image) => image.id !== id))

    toast({
      title: "Image Deleted",
      description: "The image has been successfully deleted from the gallery.",
    })
  }

  // Filter images based on search term and selected category
  const filteredImages = images.filter((image) => {
    const matchesSearch = image.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || image.category === selectedCategory

    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Gallery Management</h2>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Images
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <Input placeholder="Search images..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
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
          </SelectContent>
        </Select>
      </div>

      {/* Gallery Grid */}
      {filteredImages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground mb-4">No images found</p>
          <Button variant="outline">
            <Plus className="mr-2 h-4 w-4" />
            Add Images
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredImages.map((image) => (
            <div key={image.id} className="group relative rounded-lg overflow-hidden border bg-card">
              <div className="relative aspect-square">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.title}
                  fill
                  className="object-cover transition-all group-hover:opacity-90"
                />
              </div>
              <div className="p-3">
                <h3 className="font-medium truncate">{image.title}</h3>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-muted-foreground">{image.category}</span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(image.id)}>
                        <Trash className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

