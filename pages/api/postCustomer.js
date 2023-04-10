import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const body = req.body

  const insert = await query({
    query:
      "INSERT INTO Customer (customer_name, street, postal_code, city, state, country, ssn, date_of_reg, email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    values: [
      body.name,
      body.street,
      body.postal,
      body.city,
      body.state,
      body.country,
      body.ssn,
      new Date(body.date_of_reg.toString()),
      body.email,
      body.password,
    ],
  })
  const id = insert.insertId
  res
    .status(200)
    .json({ message: insert.insertId ? "success" : error, results: insert })
}
