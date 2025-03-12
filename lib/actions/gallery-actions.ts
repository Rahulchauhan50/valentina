"use server"

import { z } from "zod"
import { createGalleryItem, updateGalleryItem, deleteGalleryItem } from "@/lib/models/gallery"
import { revalidatePath } from "next/cache"

// Define a schema for gallery item form validation
const galleryItemSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  category: z.string().min(1, "Category is required"),
  description: z.string().optional(),
  image: z.string().min(1, "Image is required"),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
})

export type GalleryItemFormData = z.infer<typeof galleryItemSchema>

export async function createGalleryItemAction(formData: GalleryItemFormData) {
  try {
    // Validate the form data
    const validatedData = galleryItemSchema.parse(formData)

    // Create a new gallery item
    const itemId = await createGalleryItem({
      title: validatedData.title,
      category: validatedData.category,
      description: validatedData.description || "",
      image: validatedData.image,
      date: validatedData.date,
    })

    // Revalidate the gallery page
    revalidatePath("/gallery")
    revalidatePath("/dashboard/gallery")

    return { success: true, itemId }
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
    console.error("Gallery item creation error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to create gallery item. Please try again." }],
    }
  }
}

export async function updateGalleryItemAction(id: number, formData: Partial<GalleryItemFormData>) {
  try {
    // Validate the form data
    const validatedData = galleryItemSchema.partial().parse(formData)

    // Update the gallery item
    const success = await updateGalleryItem(id, {
      title: validatedData.title,
      category: validatedData.category,
      description: validatedData.description,
      image: validatedData.image,
      date: validatedData.date,
    })

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to update gallery item. Item not found." }],
      }
    }

    // Revalidate the gallery page
    revalidatePath("/gallery")
    revalidatePath("/dashboard/gallery")

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
    console.error("Gallery item update error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to update gallery item. Please try again." }],
    }
  }
}

export async function deleteGalleryItemAction(id: number) {
  try {
    // Delete the gallery item
    const success = await deleteGalleryItem(id)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to delete gallery item. Item not found." }],
      }
    }

    // Revalidate the gallery page
    revalidatePath("/gallery")
    revalidatePath("/dashboard/gallery")

    return { success: true }
  } catch (error) {
    // Return generic error
    console.error("Gallery item deletion error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to delete gallery item. Please try again." }],
    }
  }
}

