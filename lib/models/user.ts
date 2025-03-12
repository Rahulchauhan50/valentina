import { executeQuery } from "@/lib/db"
import bcrypt from "bcryptjs"

export interface User {
  id: number
  name: string
  email: string
  password: string
  role: "Admin" | "Finance Manager" | "Content Manager" | "Support Staff"
  status: "Active" | "Inactive"
  last_login?: string
  created_at: string
  updated_at: string
}

export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  const users = await executeQuery<User[]>({
    query: `
      SELECT id, name, email, role, status, last_login, created_at, updated_at 
      FROM users 
      ORDER BY name ASC
    `,
  })

  return users
}

export async function getUserById(id: number): Promise<Omit<User, "password"> | null> {
  const users = await executeQuery<User[]>({
    query: `
      SELECT id, name, email, role, status, last_login, created_at, updated_at 
      FROM users 
      WHERE id = ? 
      LIMIT 1
    `,
    values: [id],
  })

  return users.length > 0 ? users[0] : null
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const users = await executeQuery<User[]>({
    query: `
      SELECT * FROM users 
      WHERE email = ? 
      LIMIT 1
    `,
    values: [email],
  })

  return users.length > 0 ? users[0] : null
}

export async function createUser(user: Omit<User, "id" | "last_login" | "created_at" | "updated_at">): Promise<number> {
  // Hash the password
  const hashedPassword = await bcrypt.hash(user.password, 10)

  const result = await executeQuery<any>({
    query: `
      INSERT INTO users (name, email, password, role, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `,
    values: [user.name, user.email, hashedPassword, user.role, user.status],
  })

  return result.insertId
}

export async function updateUser(id: number, user: Partial<Omit<User, "password">>): Promise<boolean> {
  // Build the SET part of the query dynamically based on the provided fields
  const fields = Object.keys(user).filter((key) => key !== "id" && key !== "created_at" && key !== "password")
  if (fields.length === 0) return false

  const setClause = fields.map((field) => `${field} = ?`).join(", ")
  const values = fields.map((field) => user[field as keyof typeof user])

  // Add updated_at and id to values
  values.push(new Date())
  values.push(id)

  const result = await executeQuery<any>({
    query: `
      UPDATE users 
      SET ${setClause}, updated_at = ? 
      WHERE id = ?
    `,
    values,
  })

  return result.affectedRows > 0
}

export async function updateUserPassword(id: number, newPassword: string): Promise<boolean> {
  // Hash the new password
  const hashedPassword = await bcrypt.hash(newPassword, 10)

  const result = await executeQuery<any>({
    query: `
      UPDATE users 
      SET password = ?, updated_at = NOW() 
      WHERE id = ?
    `,
    values: [hashedPassword, id],
  })

  return result.affectedRows > 0
}

export async function updateLastLogin(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      UPDATE users 
      SET last_login = NOW() 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

export async function deleteUser(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      DELETE FROM users 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

