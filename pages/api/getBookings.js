import { query } from "../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "GET method only" })
    return
  }

  const sqlQuery =
    "SELECT b.booking_id, b.customer_id, b.checkin_date, b.checkout_date, b.active, r.room_id, h.hotel_id, h.hotel_name, h.country, h.stars, r.price, r.capacity FROM Booking b INNER JOIN Room r ON b.room_id = r.room_id INNER JOIN Hotel h ON r.hotel_id = h.hotel_id;"

  const bookings = await query({
    query: sqlQuery,
    values: [],
  })
  res.status(200).json({ results: bookings })
}

// SELECT b.booking_id, b.checkin_date, b.checkout_date, b.active, r.room_id, h.hotel_id, h.hotel_name, h.country, h.stars, r.price, r.capacity
// FROM Booking b
// INNER JOIN Room r ON b.room_id = r.room_id
// INNER JOIN Hotel h ON r.hotel_id = h.hotel_id;
