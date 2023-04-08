import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "GET method only" })
    return
  }

  const sqlQuery =
    "SELECT r.*, h.hotel_name, h.country, h.city, h.stars, a.amenity FROM Room r INNER JOIN Hotel h ON r.hotel_id = h.hotel_id LEFT JOIN Amenity a ON r.room_id = a.room_id;"

  const rooms = await query({
    query: sqlQuery,
    values: [],
  })
  res.status(200).json({ results: rooms })
}
