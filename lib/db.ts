import mysql from "mysql2/promise"

// Create a connection pool to the MySQL database
export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST || "localhost",
  user: process.env.MYSQL_USER || "root",
  password: process.env.MYSQL_PASSWORD || "",
  database: process.env.MYSQL_DATABASE || "valentina_industries",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

// Helper function to execute SQL queries
export async function executeQuery<T>({ query, values = [] }: { query: string; values?: any[] }): Promise<T> {
  try {
    const connection = await pool.getConnection()
    try {
      const [results] = await connection.execute(query, values)
      return results as T
    } finally {
      connection.release()
    }
  } catch (error) {
    console.error("Database query error:", error)
    throw new Error("Database query failed")
  }
}

