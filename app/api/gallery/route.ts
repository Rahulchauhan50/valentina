import { NextResponse } from "next/server"
import { getAllGalleryItems } from "@/lib/models/gallery"

export async function GET() {
  try {
    const galleryItems = await getAllGalleryItems()
    return NextResponse.json(galleryItems)
  } catch (error) {
    console.error("Error fetching gallery items:", error)
    return NextResponse.json({ error: "Failed to fetch gallery items" }, { status: 500 })
  }
}

