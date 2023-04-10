import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const body = req.body
  const insert = await query({
    query:
      "INSERT INTO Booking (hotel_id, customer_id, booking_date, checkin_date,active, room_id, checkout_date) VALUES (?, ?, ?, ?, ?, ?, ?)",
    values: [
      body.hotel_id,
      body.customer_id,
      new Date(),
      new Date(body.checkin_date.toString()),
      body.active,
      body.room_id,
      new Date(body.checkout_date.toString()),
    ],
  })
  res
    .status(200)
    .json({ message: insert.insertId ? "success" : { error, results: insert } })
}
