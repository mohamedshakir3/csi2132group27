import { query } from "../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "GET method only" })
    return
  }

  const sqlQuery = "SELECT * FROM Customer"

  const customers = await query({
    query: sqlQuery,
    values: [],
  })
  res.status(200).json({ results: customers })
}
