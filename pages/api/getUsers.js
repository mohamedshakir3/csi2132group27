import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "GET method only" })

    return
  }
  const sqlQuery =
    "SELECT 'employee' AS user_type, employee_id AS user_id, employee_name AS name, street, postal_code, city, state, country, ssn, position, salary, email, password FROM Employee UNION SELECT 'customer' AS user_type, customer_id AS user_id, customer_name AS name, street, postal_code, city, state, country, ssn, NULL AS position, NULL AS salary, email, password FROM Customer;"

  const users = await query({
    query: sqlQuery,
    values: [],
  })
  res.status(200).json({ results: users })
}
