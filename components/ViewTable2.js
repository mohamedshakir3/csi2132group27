import Views from "../styles/Views.module.css"
import { useState } from "react"
export default function ViewTable2({ data, header, hotels }) {
  const [hotel, setHotel] = useState(1)
  return (
    <div className={Views.table}>
      <div className={Views.tableHeader}>
        <span>{header.col1} </span>
        <span>{header.col2}</span>
      </div>
      {data.map((row) => {
        if (row.hotel_id !== hotel) return
        return (
          <div className={Views.tableRow}>
            <span>{row.room_id}</span>
            <span>{row.capacity}</span>
          </div>
        )
      })}
      <div className={Views.tableRow}>
        <select
          onChange={(e) => setHotel(parseInt(e.target.value))}
          className={Views.hotel_select}
          name="Hotel Name"
        >
          {hotels.map((hotel) => {
            return (
              <option key={hotel.hotel_id} value={hotel.hotel_id}>
                {hotel.hotel_name}
              </option>
            )
          })}
        </select>
      </div>
    </div>
  )
}
