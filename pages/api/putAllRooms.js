import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const room = req.body
  const update = await query({
    query:
      "UPDATE Room SET price = ?, capacity = ?, view_type = ?, extendable = ?, hotel_id = ? WHERE room_id = ?;",
    values: [
      parseFloat(room.price),
      room.capacity,
      room.view_type,
      room.extendable,
      room.hotel_id,
      room.room_id,
    ],
  })
  const message = update.affectedRows ? "success" : "error"
  res.status(200).json({ response: { message: message, data: room } })
}
