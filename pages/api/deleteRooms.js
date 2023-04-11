import { query } from "../../lib/db"

export default async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).send({ message: "Only POST requests allowed" })
    return
  }

  const body = req.body
  const update = await query({
    query: "DELETE FROM Room WHERE hotel_id = ?;",
    values: [body.hotel_id],
  })
  const message = update.affectedRows ? "success" : "error"

  res.status(200).json({ response: { message: message, data: update } })
}
