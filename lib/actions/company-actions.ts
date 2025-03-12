"use server"

import { z } from "zod"
import { createCompany, updateCompany, deleteCompany } from "@/lib/models/company"
import { revalidatePath } from "next/cache"

// Define a schema for company form validation
const companyFormSchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  fullDescription: z.string().min(50, "Full description must be at least 50 characters"),
  status: z.enum(["Active", "Inactive", "Draft"]),
  logo: z.string().optional(),
  image: z.string().optional(),
})

export type CompanyFormData = z.infer<typeof companyFormSchema>

export async function createCompanyAction(formData: CompanyFormData) {
  try {
    // Validate the form data
    const validatedData = companyFormSchema.parse(formData)

    // Create a new company
    const companyId = await createCompany({
      name: validatedData.name,
      slug: validatedData.slug,
      description: validatedData.description,
      full_description: validatedData.fullDescription,
      image: validatedData.image || "",
      logo: validatedData.logo || "",
      status: validatedData.status,
    })

    // Revalidate the companies page
    revalidatePath("/companies")
    revalidatePath("/dashboard/companies")

    return { success: true, companyId }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      }
    }

    // Return generic error
    console.error("Company creation error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to create company. Please try again." }],
    }
  }
}

export async function updateCompanyAction(id: number, formData: Partial<CompanyFormData>) {
  try {
    // Validate the form data
    const validatedData = companyFormSchema.partial().parse(formData)

    // Update the company
    const success = await updateCompany(id, {
      name: validatedData.name,
      slug: validatedData.slug,
      description: validatedData.description,
      full_description: validatedData.fullDescription,
      image: validatedData.image,
      logo: validatedData.logo,
      status: validatedData.status,
    })

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to update company. Company not found." }],
      }
    }

    // Revalidate the companies pages
    revalidatePath("/companies")
    revalidatePath(`/companies/${formData.slug}`)
    revalidatePath("/dashboard/companies")

    return { success: true }
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return {
        success: false,
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      }
    }

    // Return generic error
    console.error("Company update error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to update company. Please try again." }],
    }
  }
}

export async function deleteCompanyAction(id: number) {
  try {
    // Delete the company
    const success = await deleteCompany(id)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to delete company. Company not found." }],
      }
    }

    // Revalidate the companies page
    revalidatePath("/companies")
    revalidatePath("/dashboard/companies")

    return { success: true }
  } catch (error) {
    // Return generic error
    console.error("Company deletion error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to delete company. Please try again." }],
    }
  }
}

