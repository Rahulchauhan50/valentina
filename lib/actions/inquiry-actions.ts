"use server"

import { z } from "zod"
import { updateInquiryStatus, deleteInquiry } from "@/lib/models/inquiry"
import { revalidatePath } from "next/cache"

// Define a schema for inquiry status update validation
const inquiryStatusSchema = z.object({
  status: z.enum(["New", "In Progress", "Resolved"]),
})

export type InquiryStatusData = z.infer<typeof inquiryStatusSchema>

export async function updateInquiryStatusAction(id: number, formData: InquiryStatusData) {
  try {
    // Validate the form data
    const validatedData = inquiryStatusSchema.parse(formData)

    // Update the inquiry status
    const success = await updateInquiryStatus(id, validatedData.status)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to update inquiry status. Inquiry not found." }],
      }
    }

    // Revalidate the inquiries page
    revalidatePath("/dashboard/inquiries")

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
    console.error("Inquiry status update error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to update inquiry status. Please try again." }],
    }
  }
}

export async function deleteInquiryAction(id: number) {
  try {
    // Delete the inquiry
    const success = await deleteInquiry(id)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to delete inquiry. Inquiry not found." }],
      }
    }

    // Revalidate the inquiries page
    revalidatePath("/dashboard/inquiries")

    return { success: true }
  } catch (error) {
    // Return generic error
    console.error("Inquiry deletion error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to delete inquiry. Please try again." }],
    }
  }
}

