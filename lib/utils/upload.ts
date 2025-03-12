import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"

export async function saveFile(file: File): Promise<string> {
  try {
    // Generate a unique filename
    const filename = `${uuidv4()}-${file.name}`

    // Convert the file to a buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Define the upload directory and ensure it exists
    const uploadDir = path.join(process.cwd(), "public", "uploads")

    // Save the file to the uploads directory
    const filePath = path.join(uploadDir, filename)
    await writeFile(filePath, buffer)

    // Return the public URL for the file
    return `/uploads/${filename}`
  } catch (error) {
    console.error("Error saving file:", error)
    throw new Error("Failed to save file")
  }
}

