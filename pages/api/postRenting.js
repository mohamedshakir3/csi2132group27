import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const body = req.body

  const insert = await query({
    query:
      "INSERT INTO Renting (rented_date, checkout_date, paid_status, hotel_id, customer_id) VALUES (?, ?, ?, ?, ?)",
    values: [
      new Date(),
      new Date(body.checkout_date.toString()),
      body.paid_status,
      body.hotel_id,
      body.customer_id,
    ],
  })

  res
    .status(200)
    .json({ message: insert.insertId ? "success" : { results: insert } })
}
