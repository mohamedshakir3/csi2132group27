import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const hotel = req.body
  const update = await query({
    query:
      "INSERT INTO Hotel (hotel_name, stars, street, email, phone, manager_id, chain_id) VALUES (?,?,?,?,?,?,?,?);",
    values: [
      hotel.hotel_name,
      hotel.stars,
      hotel.street,
      hotel.email,
      hotel.phone,
      hotel.manager_id,
      hotel.chain_id,
      hotel.hotel_id,
    ],
  })
  const message = update.affectedRows ? "success" : "error"

  res.status(200).json({ response: { message: message, data: hotel } })
}
