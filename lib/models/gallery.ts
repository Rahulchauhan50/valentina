import { executeQuery } from "@/lib/db"

export interface GalleryItem {
  id: number
  title: string
  category: string
  description: string
  image: string
  date: string
  created_at: string
  updated_at: string
}

export async function getAllGalleryItems(): Promise<GalleryItem[]> {
  return executeQuery<GalleryItem[]>({
    query: `
      SELECT * FROM gallery 
      ORDER BY date DESC
    `,
  })
}

export async function getGalleryItemsByCategory(category: string): Promise<GalleryItem[]> {
  return executeQuery<GalleryItem[]>({
    query: `
      SELECT * FROM gallery 
      WHERE category = ? 
      ORDER BY date DESC
    `,
    values: [category],
  })
}

export async function getGalleryItemById(id: number): Promise<GalleryItem | null> {
  const items = await executeQuery<GalleryItem[]>({
    query: `
      SELECT * FROM gallery 
      WHERE id = ? 
      LIMIT 1
    `,
    values: [id],
  })

  return items.length > 0 ? items[0] : null
}

export async function createGalleryItem(item: Omit<GalleryItem, "id" | "created_at" | "updated_at">): Promise<number> {
  const result = await executeQuery<any>({
    query: `
      INSERT INTO gallery (title, category, description, image, date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, NOW(), NOW())
    `,
    values: [item.title, item.category, item.description, item.image, item.date],
  })

  return result.insertId
}

export async function updateGalleryItem(id: number, item: Partial<GalleryItem>): Promise<boolean> {
  // Build the SET part of the query dynamically based on the provided fields
  const fields = Object.keys(item).filter((key) => key !== "id" && key !== "created_at")
  if (fields.length === 0) return false

  const setClause = fields.map((field) => `${field} = ?`).join(", ")
  const values = fields.map((field) => item[field as keyof typeof item])

  // Add updated_at and id to values
  values.push(new Date())
  values.push(id)

  const result = await executeQuery<any>({
    query: `
      UPDATE gallery 
      SET ${setClause}, updated_at = ? 
      WHERE id = ?
    `,
    values,
  })

  return result.affectedRows > 0
}

export async function deleteGalleryItem(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      DELETE FROM gallery 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

