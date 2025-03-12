"use server"

import { z } from "zod"
import { createUser, updateUser, updateUserPassword, deleteUser } from "@/lib/models/user"
import { revalidatePath } from "next/cache"

// Define a schema for user form validation
const userFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters").optional(),
    confirmPassword: z.string().optional(),
    role: z.enum(["Admin", "Finance Manager", "Content Manager", "Support Staff"]),
    status: z.enum(["Active", "Inactive"]),
  })
  .refine(
    (data) => {
      if (data.password && data.confirmPassword && data.password !== data.confirmPassword) {
        return false
      }
      return true
    },
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    },
  )

export type UserFormData = z.infer<typeof userFormSchema>

export async function createUserAction(formData: UserFormData) {
  try {
    // Validate the form data
    const validatedData = userFormSchema.parse(formData)

    if (!validatedData.password) {
      return {
        success: false,
        errors: [{ path: "password", message: "Password is required for new users" }],
      }
    }

    // Create a new user
    const userId = await createUser({
      name: validatedData.name,
      email: validatedData.email,
      password: validatedData.password,
      role: validatedData.role,
      status: validatedData.status,
    })

    // Revalidate the users page
    revalidatePath("/dashboard/users")

    return { success: true, userId }
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
    console.error("User creation error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to create user. Please try again." }],
    }
  }
}

export async function updateUserAction(id: number, formData: Partial<UserFormData>) {
  try {
    // Validate the form data (excluding password fields)
    const { password, confirmPassword, ...userData } = userFormSchema.partial().parse(formData)

    // Update the user
    const success = await updateUser(id, {
      name: userData.name,
      email: userData.email,
      role: userData.role,
      status: userData.status,
    })

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to update user. User not found." }],
      }
    }

    // Update password if provided
    if (password && password === confirmPassword) {
      await updateUserPassword(id, password)
    }

    // Revalidate the users page
    revalidatePath("/dashboard/users")

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
    console.error("User update error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to update user. Please try again." }],
    }
  }
}

export async function deleteUserAction(id: number) {
  try {
    // Delete the user
    const success = await deleteUser(id)

    if (!success) {
      return {
        success: false,
        errors: [{ path: "form", message: "Failed to delete user. User not found." }],
      }
    }

    // Revalidate the users page
    revalidatePath("/dashboard/users")

    return { success: true }
  } catch (error) {
    // Return generic error
    console.error("User deletion error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to delete user. Please try again." }],
    }
  }
}

