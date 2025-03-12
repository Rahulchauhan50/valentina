"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"

interface EditCompanyPageProps {
  params: {
    id: string
  }
}

export default function EditCompanyPage({ params }: EditCompanyPageProps) {
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    slug: "",
    description: "",
    fullDescription: "",
    status: "Active",
    logo: null,
    coverImage: null,
  })

  // Simulate fetching company data
  useEffect(() => {
    const fetchCompany = async () => {
      // In a real app, this would be an API call
      setTimeout(() => {
        // Mock data based on ID
        setFormData({
          id: Number.parseInt(params.id),
          name: "Phoenix Security",
          slug: "phoenix-security",
          description: "Cautious Security and Excellent Service",
          fullDescription: `
            <p>We have the pleasure in introducing ourselves as "Phoenix Security and Facility Services" an ISO 9001:2015 certified company which is a part of Malai Industries, to you. We intend to provide high standard services to our impending customers. We owe to maintain a good record of professional services with our customers.</p>
            
            <p>We aim ourselves to have many prestigious organizations from Governmental, Commercial, Industrial, Residential and Banking Sectors with due dedication, hard work and practical strategic approach. Depending upon the threat perception, we endeavor to visualize the likely security related problems that may arise in course of our operation whether under present day surrounding or in near future.</p>
            
            <h3>Security Force</h3>
            
            <p>Phoenix Security and Facility Services takes care of entire security requirements and growing expectations of our customers, keeping in view a security premises and assets. We provide smartly uniformed, trained and well supervised security staff right from Security officer, Security Supervisor, Head Guard, Security Guard and Gunman, who are responsible for Security and Safety of assets.</p>
          `,
          status: "Active",
          logo: null,
          coverImage: null,
        })
        setIsLoading(false)
      }, 1000)
    }

    fetchCompany()
  }, [params.id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Auto-generate slug from name if slug is empty or matches the original name-based slug
    if (
      name === "name" &&
      (formData.slug === "" ||
        formData.slug ===
          formData.name
            .toLowerCase()
            .replace(/[^\w\s]/gi, "")
            .replace(/\s+/g, "-"))
    ) {
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
        title: "Company Updated",
        description: "The company has been successfully updated.",
      })
    }, 1500)
  }

  if (isLoading) {
    return (
      <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">Edit Company</h2>
        </div>
        <div className="flex items-center justify-center h-64">
          <p>Loading company data...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Edit Company</h2>
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
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </div>
  )
}

