"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

export default function NewNewsPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    category: "",
    status: "Draft",
    author: "",
    image: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-generate slug from title
    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s]/gi, "")
        .replace(/\s+/g, "-")

      setFormData((prev) => ({
        ...prev,
        slug,
      }))
    }
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
        title: "News Article Created",
        description: "The news article has been successfully created.",
      })

      // In a real app, this would redirect to the news list or detail page
      // For now, we'll just reset the form
      setFormData({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        category: "",
        status: "Draft",
        author: "",
        image: null,
      })
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Create News Article</h2>
        <Link href="/dashboard/news">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to News
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
              placeholder="Enter article title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="slug">
              URL Slug <span className="text-red-500">*</span>
            </Label>
            <Input
              id="slug"
              name="slug"
              value={formData.slug}
              onChange={handleChange}
              placeholder="article-title"
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be used in the URL: valentinaindustries.com/news/
              <strong>{formData.slug || "article-slug"}</strong>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">
            Excerpt <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={formData.excerpt}
            onChange={handleChange}
            placeholder="Brief summary of the article (1-2 sentences)"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground">
            This will appear in article listings and cards. Keep it concise.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="content">
            Content <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            placeholder="Full article content"
            rows={15}
            required
          />
          <p className="text-xs text-muted-foreground">
            HTML formatting is supported. You can use tags like &lt;p&gt;, &lt;h2&gt;, &lt;ul&gt;, etc.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-2">
            <Label htmlFor="category">
              Category <span className="text-red-500">*</span>
            </Label>
            <Select value={formData.category} onValueChange={(value) => handleSelectChange("category", value)} required>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
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

          <div className="space-y-2">
            <Label htmlFor="author">
              Author <span className="text-red-500">*</span>
            </Label>
            <Input
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Enter author name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Published">Published</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Featured Image</Label>
          <Input id="image" name="image" type="file" accept="image/*" />
          <p className="text-xs text-muted-foreground">Recommended size: 1200x600px. Max file size: 5MB.</p>
        </div>

        <div className="flex gap-4 justify-end">
          <Link href="/dashboard/news">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Article"}
          </Button>
        </div>
      </form>
    </div>
  )
}

