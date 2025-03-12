import { NextResponse } from "next/server"
import { saveFile } from "@/lib/utils/upload"
import { withAuth } from "@/lib/middleware/auth"

export async function POST(request: Request) {
  return withAuth(request as any, async (req) => {
    try {
      const formData = await request.formData()
      const file = formData.get("file") as File

      if (!file) {
        return NextResponse.json({ error: "No file provided" }, { status: 400 })
      }

      // Save the file and get the public URL
      const fileUrl = await saveFile(file)

      return NextResponse.json({ url: fileUrl })
    } catch (error) {
      console.error("File upload error:", error)
      return NextResponse.json({ error: "Failed to upload file" }, { status: 500 })
    }
  })
}

