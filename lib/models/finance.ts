import { executeQuery } from "@/lib/db"

export interface FinancialRecord {
  id: number
  company_id: number
  company_name: string
  year: string
  quarter: string
  revenue: number
  expenses: number
  profit: number
  date: string
  created_at: string
  updated_at: string
}

export async function getAllFinancialRecords(): Promise<FinancialRecord[]> {
  return executeQuery<FinancialRecord[]>({
    query: `
      SELECT f.*, c.name as company_name 
      FROM financial_records f
      JOIN companies c ON f.company_id = c.id
      ORDER BY f.date DESC
    `,
  })
}

export async function getFinancialRecordsByCompany(companyId: number): Promise<FinancialRecord[]> {
  return executeQuery<FinancialRecord[]>({
    query: `
      SELECT f.*, c.name as company_name 
      FROM financial_records f
      JOIN companies c ON f.company_id = c.id
      WHERE f.company_id = ?
      ORDER BY f.date DESC
    `,
    values: [companyId],
  })
}

export async function getFinancialRecordsByYear(year: string): Promise<FinancialRecord[]> {
  return executeQuery<FinancialRecord[]>({
    query: `
      SELECT f.*, c.name as company_name 
      FROM financial_records f
      JOIN companies c ON f.company_id = c.id
      WHERE f.year = ?
      ORDER BY f.date DESC
    `,
    values: [year],
  })
}

export async function getFinancialRecordById(id: number): Promise<FinancialRecord | null> {
  const records = await executeQuery<FinancialRecord[]>({
    query: `
      SELECT f.*, c.name as company_name 
      FROM financial_records f
      JOIN companies c ON f.company_id = c.id
      WHERE f.id = ? 
      LIMIT 1
    `,
    values: [id],
  })

  return records.length > 0 ? records[0] : null
}

export async function createFinancialRecord(
  record: Omit<FinancialRecord, "id" | "company_name" | "created_at" | "updated_at">,
): Promise<number> {
  const result = await executeQuery<any>({
    query: `
      INSERT INTO financial_records (company_id, year, quarter, revenue, expenses, profit, date, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
    `,
    values: [
      record.company_id,
      record.year,
      record.quarter,
      record.revenue,
      record.expenses,
      record.profit,
      record.date,
    ],
  })

  return result.insertId
}

export async function updateFinancialRecord(
  id: number,
  record: Partial<Omit<FinancialRecord, "id" | "company_name" | "created_at" | "updated_at">>,
): Promise<boolean> {
  // Build the SET part of the query dynamically based on the provided fields
  const fields = Object.keys(record).filter((key) => key !== "id" && key !== "created_at")
  if (fields.length === 0) return false

  const setClause = fields.map((field) => `${field} = ?`).join(", ")
  const values = fields.map((field) => record[field as keyof typeof record])

  // Add updated_at and id to values
  values.push(new Date())
  values.push(id)

  const result = await executeQuery<any>({
    query: `
      UPDATE financial_records 
      SET ${setClause}, updated_at = ? 
      WHERE id = ?
    `,
    values,
  })

  return result.affectedRows > 0
}

export async function deleteFinancialRecord(id: number): Promise<boolean> {
  const result = await executeQuery<any>({
    query: `
      DELETE FROM financial_records 
      WHERE id = ?
    `,
    values: [id],
  })

  return result.affectedRows > 0
}

