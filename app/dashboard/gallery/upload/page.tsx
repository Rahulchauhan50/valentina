"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function UploadGalleryPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    images: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)

      toast({
        title: "Images Uploaded",
        description: "The images have been successfully uploaded to the gallery.",
      })

      // In a real app, this would redirect to the gallery page
      // For now, we'll just reset the form
      setFormData({
        title: "",
        category: "",
        description: "",
        images: null,
      })
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Upload Gallery Images</h2>
        <Link href="/dashboard/gallery">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Gallery
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="title">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter image title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Offices">Offices</SelectItem>
                <SelectItem value="Events">Events</SelectItem>
                <SelectItem value="Teams">Teams</SelectItem>
                <SelectItem value="Facilities">Facilities</SelectItem>
                <SelectItem value="Products">Products</SelectItem>
                <SelectItem value="Projects">Projects</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Enter image description (optional)"
            rows={3}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="images">
            Upload Images <span className="text-red-500">*</span>
          </Label>
          <Input id="images" name="images" type="file" accept="image/*" multiple required />
          <p className="text-xs text-muted-foreground">
            You can select multiple images. Recommended size: 1200x800px. Max file size per image: 5MB.
          </p>
        </div>

        <div className="flex gap-4 justify-end">
          <Link href="/dashboard/gallery">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Uploading...</>
            ) : (
              <>
                <Upload className="mr-2 h-4 w-4" /> Upload Images
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

