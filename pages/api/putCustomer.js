import { query } from "../lib/db"

export default async function handler(req, res) {
  if (req.method !== "PUT") {
    res.status(405).send({ message: "Only PUT requests allowed" })
    return
  }

  const body = req.body

  const update = await query({
    query:
      "UPDATE Customer SET customer_name = ?, street = ?, ssn = ?, email = ?, password = ? WHERE customer_id = ?;",
    values: [
      body.name,
      body.street,
      body.ssn,
      body.email,
      body.password,
      body.id,
    ],
  })
  const message = update.affectedRows ? "success" : "error"

  res.status(200).json({ response: { message: message, data: body } })
}
