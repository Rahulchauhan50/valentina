"use server"

import { z } from "zod"
import { createFinancialRecord, updateFinancialRecord, deleteFinancialRecord } from "@/lib/models/finance"
import { revalidatePath } from "next/cache"

// Define a schema for financial record form validation
const financialRecordSchema = z.object({
  company_id: z.number().positive("Company ID is required"),
  year: z.string().regex(/^\d{4}$/, "Year must be in YYYY format"),
  quarter: z.enum(["Q1", "Q2", "Q3", "Q4"]),
  revenue: z.number().nonnegative("Revenue must be a non-negative number"),
  expenses: z.number().nonnegative("Expenses must be a non-negative number"),
  profit: z.number(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
})

export type FinancialRecordFormData = z.infer<typeof financialRecordSchema>

export async function createFinancialRecordAction(formData: FinancialRecordFormData) {
  try {
    // Validate the form data
    const validatedData = financialRecordSchema.parse(formData)

    // Create a new financial record
    const recordId = await createFinancialRecord({
      company_id: validatedData.company_id,
      year: validatedData.year,
      quarter: validatedData.quarter,
      revenue: validatedData.revenue,
      expenses: validatedData.expenses,
      profit: validatedData.profit,
      date: validatedData.date,
    })

    // Revalidate the finances page
    revalidatePath("/dashboard/finances")

    return { success: true, recordId }
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
    console.error("Financial record creation error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to create financial record. Please try again." }],
    }
  }
}

export async function updateFinancialRecordAction(id: number, formData: Partial<FinancialRecordFormData>) {
  try {
    // Validate the form data
    const validatedData = financialRecordSchema.partial().parse(formData)

    // Update the financial record
    const success = await updateFinancialRecord(id, {
      company_id: validatedData.company_id,
      year: validatedData.year,
      quarter: validatedData.quarter,
      revenue: validatedData.revenue,
      expenses: validatedData.expenses,
      profit: validatedData.profit,
      date: validatedData.date,
    })

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to update financial record. Record not found." }],
      }
    }

    // Revalidate the finances page
    revalidatePath("/dashboard/finances")

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
    console.error("Financial record update error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to update financial record. Please try again." }],
    }
  }
}

export async function deleteFinancialRecordAction(id: number) {
  try {
    // Delete the financial record
    const success = await deleteFinancialRecord(id)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to delete financial record. Record not found." }],
      }
    }

    // Revalidate the finances page
    revalidatePath("/dashboard/finances")

    return { success: true }
  } catch (error) {
    // Return generic error
    console.error("Financial record deletion error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to delete financial record. Please try again." }],
    }
  }
}

