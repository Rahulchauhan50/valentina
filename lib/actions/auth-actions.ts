"use server"

import { z } from "zod"
import { getUserByEmail, updateLastLogin } from "@/lib/models/user"
import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { redirect } from "next/navigation"

// Define a schema for login form validation
const loginFormSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

export async function login(formData: LoginFormData) {
  try {
    // Validate the form data
    const validatedData = loginFormSchema.parse(formData)

    // Get the user from the database
    const user = await getUserByEmail(validatedData.email)

    // Check if user exists
    if (!user) {
      return {
        success: false,
        errors: [{ path: "email", message: "Invalid email or password" }],
      }
    }

    // Check if user is active
    if (user.status !== "Active") {
      return {
        success: false,
        errors: [{ path: "email", message: "Your account is inactive. Please contact an administrator." }],
      }
    }

    // Check if password is correct
    const passwordMatch = await bcrypt.compare(validatedData.password, user.password)
    if (!passwordMatch) {
      return {
        success: false,
        errors: [{ path: "password", message: "Invalid email or password" }],
      }
    }

    // Update last login time
    await updateLastLogin(user.id)

    // Create a JWT token
    const token = await new SignJWT({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1d")
      .sign(new TextEncoder().encode(process.env.JWT_SECRET || "default_secret"))

    // Set the token in a cookie
    cookies().set("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    })

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
    console.error("Login error:", error)
    return {
      success: false,
      errors: [{ path: "form", message: "Failed to log in. Please try again." }],
    }
  }
}

export async function logout() {
  cookies().delete("auth_token")
  redirect("/dashboard")
}

