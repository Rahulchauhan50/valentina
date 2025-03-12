"use server"

import { z } from "zod"
import { createNews, updateNews, deleteNews } from "@/lib/models/news"
import { revalidatePath } from "next/cache"

// Define a schema for news form validation
const newsFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  slug: z
    .string()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens"),
  excerpt: z.string().min(20, "Excerpt must be at least 20 characters"),
  content: z.string().min(100, "Content must be at least 100 characters"),
  category: z.string().min(1, "Category is required"),
  author: z.string().min(2, "Author name must be at least 2 characters"),
  status: z.enum(["Published", "Draft"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  image: z.string().optional(),
})

export type NewsFormData = z.infer<typeof newsFormSchema>

export async function createNewsAction(formData: NewsFormData) {
  try {
    // Validate the form data
    const validatedData = newsFormSchema.parse(formData)

    // Create a new news article
    const newsId = await createNews({
      title: validatedData.title,
      slug: validatedData.slug,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      category: validatedData.category,
      author: validatedData.author,
      status: validatedData.status,
      date: validatedData.date,
      image: validatedData.image || "",
    })

    // Revalidate the news pages
    revalidatePath("/news")
    revalidatePath("/dashboard/news")

    return { success: true, newsId }
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
    console.error("News creation error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to create news article. Please try again." }],
    }
  }
}

export async function updateNewsAction(id: number, formData: Partial<NewsFormData>) {
  try {
    // Validate the form data
    const validatedData = newsFormSchema.partial().parse(formData)

    // Update the news article
    const success = await updateNews(id, {
      title: validatedData.title,
      slug: validatedData.slug,
      excerpt: validatedData.excerpt,
      content: validatedData.content,
      category: validatedData.category,
      author: validatedData.author,
      status: validatedData.status,
      date: validatedData.date,
      image: validatedData.image,
    })

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to update news article. Article not found." }],
      }
    }

    // Revalidate the news pages
    revalidatePath("/news")
    revalidatePath(`/news/${formData.slug}`)
    revalidatePath("/dashboard/news")

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
    console.error("News update error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to update news article. Please try again." }],
    }
  }
}

export async function deleteNewsAction(id: number) {
  try {
    // Delete the news article
    const success = await deleteNews(id)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to delete news article. Article not found." }],
      }
    }

    // Revalidate the news pages
    revalidatePath("/news")
    revalidatePath("/dashboard/news")

    return { success: true }
  } catch (error) {
    // Return generic error
    console.error("News deletion error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to delete news article. Please try again." }],
    }
  }
}

