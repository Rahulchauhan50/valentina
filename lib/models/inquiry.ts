import { executeQuery } from "@/lib/db"

export interface Inquiry {
  id: number
  name: string
  email: string
  phone?: string
  company?: string
  subject: string
  message: string
  status: "New" | "In Progress" | "Resolved"
  created_at: string
  updated_at: string
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  return executeQuery<Inquiry[]>({
    query: `
      SELECT * FROM inquiries 
      ORDER BY created_at DESC
    `,
  })
}

export async function getInquiriesByStatus(status: string): Promise<Inquiry[]> {
  return executeQuery<Inquiry[]>({
    query: `
      SELECT * FROM inquiries 
      WHERE status = ? 
      ORDER BY created_at DESC
    `,
    values: [status],
  })
}

export async function getInquiryById(id: number): Promise<Inquiry | null> {
  const inquiries = await executeQuery<Inquiry[]>({
    query: `
      SELECT * FROM inquiries 
      WHERE id = ? 
      LIMIT 1
    `,
    values: [id],
  })

  return inquiries.length > 0 ? inquiries[0] : null
}

export async function createInquiry(
  inquiry: Omit<Inquiry, "id" | "status" | "created_at" | "updated_at">,
): Promise<number> {
  const result = await executeQuery<any>({
    query: `
      INSERT INTO inquiries (name, email, phone, company, subject, message, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'New', NOW(), NOW())
    `,
    values: [
      inquiry.name,
      inquiry.email,
      inquiry.phone || null,
      inquiry.company || null,
      inquiry.subject,
      inquiry.message,
    ],
  })

  return result.insertId
}

export async function updateInquiryStatus(id: number, status: "New" | "In Progress" | "Resolved"): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      UPDATE inquiries 
      SET status = ?, updated_at = NOW() 
      WHERE id = ?
    `,
    values: [status, id],
  })

  return result.affectedRows > 0
}

export async function deleteInquiry(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      DELETE FROM inquiries 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

