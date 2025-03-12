import { NextResponse } from "next/server"
import { createInquiry } from "@/lib/models/inquiry"
import { z } from "zod"

// Define a schema for contact form validation
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().optional(),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate the request body
    const validatedData = contactFormSchema.parse(body)

    // Create a new inquiry
    const inquiryId = await createInquiry({
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone,
      company: validatedData.company,
      subject: validatedData.subject,
      message: validatedData.message,
    })

    return NextResponse.json({ success: true, inquiryId })
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Return validation errors
      return NextResponse.json(
        {
          success: false,
          errors: error.errors.map((err) => ({
            path: err.path.join("."),
            message: err.message,
          })),
        },
        { status: 400 },
      )
    }

    console.error("Error creating inquiry:", error)
    return NextResponse.json({ error: "Failed to submit contact form" }, { status: 500 })
  }
}

