import { NextResponse } from "next/server"
import { withAuth } from "@/lib/middleware/auth"
import { executeQuery } from "@/lib/db"

export async function GET(request: Request) {
  return withAuth(request as any, async (req) => {
    try {
      // Get count of companies
      const companiesResult = await executeQuery<any[]>({
        query: "SELECT COUNT(*) as count FROM companies WHERE status = 'Active'",
      })
      const companiesCount = companiesResult[0].count

      // Get count of news articles
      const newsResult = await executeQuery<any[]>({
        query: "SELECT COUNT(*) as count FROM news WHERE status = 'Published'",
      })
      const newsCount = newsResult[0].count

      // Get count of inquiries
      const inquiriesResult = await executeQuery<any[]>({
        query: "SELECT COUNT(*) as count FROM inquiries WHERE status = 'New'",
      })
      const newInquiriesCount = inquiriesResult[0].count

      // Get total revenue from financial records for current year
      const currentYear = new Date().getFullYear().toString()
      const revenueResult = await executeQuery<any[]>({
        query: "SELECT SUM(revenue) as total FROM financial_records WHERE year = ?",
        values: [currentYear],
      })
      const totalRevenue = revenueResult[0].total || 0

      return NextResponse.json({
        companies: companiesCount,
        news: newsCount,
        newInquiries: newInquiriesCount,
        revenue: totalRevenue,
      })
    } catch (error) {
      console.error("Error fetching dashboard stats:", error)
      return NextResponse.json({ error: "Failed to fetch dashboard stats" }, { status: 500 })
    }
  })
}

