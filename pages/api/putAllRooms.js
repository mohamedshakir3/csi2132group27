import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const room = req.body
  const update = await query({
    query:
      "UPDATE Room SET price = ?, capacity = ?, extendable = ?, hotel_id = ? WHERE room_id = ?;",
    values: [
      room.price,
      room.capacity,
      room.extendable,
      room.hotel_id,
      room.room_id,
    ],
  })
  const message = update.affectedRows ? "success" : "error"

  res.status(200).json({ response: { message: message, data: room } })
}
