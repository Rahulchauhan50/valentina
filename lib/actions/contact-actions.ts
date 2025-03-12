"use server"

import { createInquiry } from "@/lib/models/inquiry"
import { z } from "zod"

// Define a schema for contact form validation
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate the form data
    const validatedData = contactFormSchema.parse(formData)

    // Create a new inquiry
    const inquiryId = await createInquiry({
      name: `${validatedData.firstName} ${validatedData.lastName}`,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      subject: validatedData.subject,
      message: validatedData.message,
    })

    return { success: true, inquiryId }
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
    console.error("Contact form submission error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to submit the form. Please try again." }],
    }
  }
}

