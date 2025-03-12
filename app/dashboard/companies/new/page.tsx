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

export default function NewCompanyPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    fullDescription: "",
    status: "Active",
    logo: null,
    coverImage: null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-generate slug from name
    if (name === "name") {
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
        title: "Company Created",
        description: "The company has been successfully created.",
      })

      // In a real app, this would redirect to the company list or detail page
      // For now, we'll just reset the form
      setFormData({
        name: "",
        slug: "",
        description: "",
        fullDescription: "",
        status: "Active",
        logo: null,
        coverImage: null,
      })
    }, 1500)
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Add New Company</h2>
        <Link href="/dashboard/companies">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to Companies
          </Button>
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8 mt-8">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">
              Company Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter company name"
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
              placeholder="company-name"
              required
            />
            <p className="text-xs text-muted-foreground">
              This will be used in the URL: valentinaindustries.com/companies/
              <strong>{formData.slug || "company-slug"}</strong>
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">
            Short Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Brief description of the company (1-2 sentences)"
            rows={2}
            required
          />
          <p className="text-xs text-muted-foreground">
            This will appear in company listings and cards. Keep it concise.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="fullDescription">
            Full Description <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="fullDescription"
            name="fullDescription"
            value={formData.fullDescription}
            onChange={handleChange}
            placeholder="Detailed description of the company, its services, and unique value proposition"
            rows={10}
            required
          />
          <p className="text-xs text-muted-foreground">
            This will appear on the company detail page. HTML formatting is supported.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => handleSelectChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <Input id="logo" name="logo" type="file" accept="image/*" />
            <p className="text-xs text-muted-foreground">Recommended size: 200x200px. Max file size: 2MB.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="coverImage">Cover Image</Label>
            <Input id="coverImage" name="coverImage" type="file" accept="image/*" />
            <p className="text-xs text-muted-foreground">Recommended size: 1200x600px. Max file size: 5MB.</p>
          </div>
        </div>

        <div className="flex gap-4 justify-end">
          <Link href="/dashboard/companies">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Company"}
          </Button>
        </div>
      </form>
    </div>
  )
}

