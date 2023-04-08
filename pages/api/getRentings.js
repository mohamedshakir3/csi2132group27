import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "GET method only" })
    return
  }

  const sqlQuery =
    "SELECT r.renting_id, r.customer_id, r.rented_date, r.checkout_date, r.paid_status, r.hotel_id, h.hotel_name, h.country, h.stars FROM Renting r JOIN Hotel h ON r.hotel_id = h.hotel_id;"
  const rooms = await query({
    query: sqlQuery,
    values: [],
  })
  res.status(200).json({ results: rooms })
}
