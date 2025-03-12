import { executeQuery } from "@/lib/db"

export interface Company {
  id: number
  name: string
  slug: string
  description: string
  full_description: string
  image: string
  logo: string
  status: string
  created_at: string
  updated_at: string
}

export async function getAllCompanies(): Promise<Company[]> {
  return executeQuery<Company[]>({
    query: `
      SELECT * FROM companies 
      WHERE status = 'Active' 
      ORDER BY name ASC
    `,
  })
}

export async function getCompanyBySlug(slug: string): Promise<Company | null> {
  const companies = await executeQuery<Company[]>({
    query: `
      SELECT * FROM companies 
      WHERE slug = ? 
      LIMIT 1
    `,
    values: [slug],
  })

  return companies.length > 0 ? companies[0] : null
}

export async function getAllCompaniesAdmin(): Promise<Company[]> {
  return executeQuery<Company[]>({
    query: `
      SELECT * FROM companies 
      ORDER BY name ASC
    `,
  })
}

export async function getCompanyById(id: number): Promise<Company | null> {
  const companies = await executeQuery<Company[]>({
    query: `
      SELECT * FROM companies 
      WHERE id = ? 
      LIMIT 1
    `,
    values: [id],
  })

  return companies.length > 0 ? companies[0] : null
}

export async function createCompany(company: Omit<Company, "id" | "created_at" | "updated_at">): Promise<number> {
  const result = await executeQuery<any>({
    query: `
      INSERT INTO companies (name, slug, description, full_description, image, logo, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
    values: [
      company.name,
      company.slug,
      company.description,
      company.full_description,
      company.image,
      company.logo,
      company.status,
    ],
  })

  return result.insertId
}

export async function updateCompany(id: number, company: Partial<Company>): Promise<boolean> {
  // Build the SET part of the query dynamically based on the provided fields
  const fields = Object.keys(company).filter((key) => key !== "id" && key !== "created_at")
  if (fields.length === 0) return false

  const setClause = fields.map((field) => `${field} = ?`).join(", ")
  const values = fields.map((field) => company[field as keyof typeof company])

  // Add updated_at and id to values
  values.push(new Date())
  values.push(id)

  const result = await executeQuery<any>({
    query: `
      UPDATE companies 
      SET ${setClause}, updated_at = ? 
      WHERE id = ?
    `,
    values,
  })

  return result.affectedRows > 0
}

export async function deleteCompany(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      DELETE FROM companies 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

