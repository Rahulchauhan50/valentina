import { executeQuery } from "@/lib/db"

export interface NewsArticle {
  id: number
  title: string
  slug: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  status: string
  date: string
  created_at: string
  updated_at: string
}

export async function getAllNews(): Promise<NewsArticle[]> {
  return executeQuery<NewsArticle[]>({
    query: `
      SELECT * FROM news 
      WHERE status = 'Published' 
      ORDER BY date DESC
    `,
  })
}

export async function getNewsBySlug(slug: string): Promise<NewsArticle | null> {
  const news = await executeQuery<NewsArticle[]>({
    query: `
      SELECT * FROM news 
      WHERE slug = ? AND status = 'Published'
      LIMIT 1
    `,
    values: [slug],
  })

  return news.length > 0 ? news[0] : null
}

export async function getRecentNews(limit = 3): Promise<NewsArticle[]> {
  return executeQuery<NewsArticle[]>({
    query: `
      SELECT * FROM news 
      WHERE status = 'Published' 
      ORDER BY date DESC 
      LIMIT ?
    `,
    values: [limit],
  })
}

export async function getNewsByCategory(category: string): Promise<NewsArticle[]> {
  return executeQuery<NewsArticle[]>({
    query: `
      SELECT * FROM news 
      WHERE category = ? AND status = 'Published' 
      ORDER BY date DESC
    `,
    values: [category],
  })
}

export async function getAllNewsAdmin(): Promise<NewsArticle[]> {
  return executeQuery<NewsArticle[]>({
    query: `
      SELECT * FROM news 
      ORDER BY date DESC
    `,
  })
}

export async function getNewsById(id: number): Promise<NewsArticle | null> {
  const news = await executeQuery<NewsArticle[]>({
    query: `
      SELECT * FROM news 
      WHERE id = ? 
      LIMIT 1
    `,
    values: [id],
  })

  return news.length > 0 ? news[0] : null
}

export async function createNews(news: Omit<NewsArticle, "id" | "created_at" | "updated_at">): Promise<number> {
  const result = await executeQuery<any>({
    query: `
      INSERT INTO news (title, slug, excerpt, content, image, category, author, status, date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
    values: [
      news.title,
      news.slug,
      news.excerpt,
      news.content,
      news.image,
      news.category,
      news.author,
      news.status,
      news.date,
    ],
  })

  return result.insertId
}

export async function updateNews(id: number, news: Partial<NewsArticle>): Promise<boolean> {
  // Build the SET part of the query dynamically based on the provided fields
  const fields = Object.keys(news).filter((key) => key !== "id" && key !== "created_at")
  if (fields.length === 0) return false

  const setClause = fields.map((field) => `${field} = ?`).join(", ")
  const values = fields.map((field) => news[field as keyof typeof news])

  // Add updated_at and id to values
  values.push(new Date())
  values.push(id)

  const result = await executeQuery<any>({
    query: `
      UPDATE news 
      SET ${setClause}, updated_at = ? 
      WHERE id = ?
    `,
    values,
  })

  return result.affectedRows > 0
}

export async function deleteNews(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      DELETE FROM news 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

