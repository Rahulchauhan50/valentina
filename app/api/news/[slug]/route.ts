import { NextResponse } from "next/server"
import { getNewsBySlug } from "@/lib/models/news"

export async function GET(request: Request, { params }: { params: { slug: string } }) {
  try {
    const news = await getNewsBySlug(params.slug)

    if (!news) {
      return NextResponse.json({ error: "News article not found" }, { status: 404 })
    }

    return NextResponse.json(news)
  } catch (error) {
    console.error("Error fetching news article:", error)
    return NextResponse.json({ error: "Failed to fetch news article" }, { status: 500 })
  }
}

