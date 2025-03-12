import { NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  return withAuth(request as any, async (req) => {
    try {
      // Get recent inquiries
      const inquiries = await executeQuery<any[]>({
        query: `
          SELECT id, name, subject, status, created_at 
          FROM inquiries 
          ORDER BY created_at DESC 
          LIMIT 5
        `,
      })

      // Get recent news articles
      const news = await executeQuery<any[]>({
        query: `
          SELECT id, title, author, status, created_at 
          FROM news 
          ORDER BY created_at DESC 
          LIMIT 5
        `,
      })

      // Format the activities
      const activities = [
        ...inquiries.map((inquiry) => ({
          type: "inquiry",
          id: inquiry.id,
          title: `New inquiry from ${inquiry.name}`,
          subtitle: inquiry.subject,
          status: inquiry.status,
          date: inquiry.created_at,
        })),
        ...news.map((article) => ({
          type: "news",
          id: article.id,
          title: `News article published: "${article.title}"`,
          subtitle: `By ${article.author}`,
          status: article.status,
          date: article.created_at,
        })),
      ]
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 5)

      return NextResponse.json(activities)
    } catch (error) {
      console.error("Error fetching recent activity:", error)
      return NextResponse.json({ error: "Failed to fetch recent activity" }, { status: 500 })
    }
  })
}

