import BookingStyles from "../styles/CreateBookingCard.module.css"
import { MdPeopleAlt } from "react-icons/md"
import { VscStarFull } from "react-icons/vsc"
import { FaBed } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function BookingCard({ rooms, customer_id, updateBookings }) {
  const [room, setRoom] = useState({})
  const [booking, setBooking] = useState({
    hotel_id: 0,
    customer_id: customer_id,
    checkin_date: "",
    active: true,
    room_id: 0,
    checkout_date: "",
    hotel_name: "",
    country: "",
    stars: 0,
    price: 0,
    capacity: 0,
  })

  const handleChange = (e) => {
    console.log(e.target.value)
    const selectedRoom = rooms.filter((room) => {
      return room.hotel_id === parseInt(e.target.value)
    })

    setRoom(selectedRoom[0])
    setBooking((prev) => ({
      ...prev,
      hotel_id: selectedRoom[0].hotel_id,
      room_id: selectedRoom[0].room_id,
      hotel_name: selectedRoom[0].hotel_name,
      country: selectedRoom[0].country,
      stars: selectedRoom[0].stars,
      price: selectedRoom[0].price,
      capacity: selectedRoom[0].capacity,
    }))
  }

  const postBooking = async () => {
    console.log(JSON.stringify(booking))
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/postBookings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
      }
    )

    const data = await res.json()
    if (data.message === "success") updateBookings(booking)

    console.log(data)
  }

  return (
    <div className={BookingStyles.accordian}>
      <div className={BookingStyles.grid}>
        <div className={BookingStyles.hotel_info}>
          <span className={BookingStyles.country_tag}>{room.country}</span>
          <span className={BookingStyles.hotel_name}>
            <select
              className={BookingStyles.hotel_dropdown}
              name="hotel"
              onChange={(e) => handleChange(e)}
            >
              {rooms?.map((hotel) => {
                return (
                  <option
                    key={hotel.hotel_id}
                    value={hotel.hotel_id}
                    onChange={() => setHotel(hotel)}
                  >
                    {hotel.hotel_name + "- Room ID:" + hotel.room_id}
                  </option>
                )
              })}
            </select>
            <span className={BookingStyles.stars}>
              {room.stars} <VscStarFull />
            </span>
          </span>
          <span className={BookingStyles.room_info}>
            {room.capacity}
            <span className={BookingStyles.people}>
              <MdPeopleAlt />
            </span>
            {Math.floor(Math.random() * 3) + 1}
            <span className={BookingStyles.beds}>
              <FaBed />
            </span>
          </span>
        </div>
        <div className={BookingStyles.center_quad}>
          <span className={BookingStyles.check_in}> Check In - Check Out</span>
          <span className={BookingStyles.date}>
            <input
              type="date"
              className={BookingStyles.date_input}
              placeholder="Check In"
              name="checkin_date"
              onChange={(e) =>
                setBooking((prev) => {
                  return { ...prev, checkin_date: e.target.value }
                })
              }
            />{" "}
            -
            <input
              type="date"
              className={BookingStyles.date_input}
              placeholder="Check Out"
              name="checkout_date"
              onChange={(e) =>
                setBooking((prev) => {
                  return { ...prev, checkout_date: e.target.value }
                })
              }
            />
          </span>
        </div>
        <div className={BookingStyles.quad}>
          <div className={BookingStyles.price}>
            <span>
              {room.price}
              <span className={BookingStyles.nightly}>/Night</span>
            </span>
            <button onClick={postBooking} className={BookingStyles.submit_btn}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
