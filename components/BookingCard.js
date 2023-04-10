import BookingStyles from "../styles/BookingCard.module.css"
import { MdPeopleAlt } from "react-icons/md"
import { VscStarFull } from "react-icons/vsc"
import { FaBed } from "react-icons/fa"
import { useEffect, useState } from "react"

export default function BookingCard({
  booking,
  employee,
  active,
  updateRentings,
}) {
  const [activeBooking, setActiveBooking] = useState(false)

  useEffect(() => {
    active ? setActiveBooking(true) : setActiveBooking(false)
  }, [active])

  console.log(activeBooking)
  const updateBooking = async () => {
    setActiveBooking(false)
    const put = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: booking.booking_id,
        active: false,
      }),
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/updateBooking`,
      put
    )

    const data = await res.json()
    console.log(data)
  }

  const rentBooking = async () => {
    updateBooking()
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/postRenting`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          checkout_date: booking.checkout_date,
          paid_status: false,
          hotel_id: booking.hotel_id,
          customer_id: booking.customer_id,
        }),
      }
    )
    const data = await res.json()
    console.log(data)
    updateRentings({
      rented_date: new Date(),
      checkout_date: booking.checkout_date,
      paid_status: false,
      hotel_name: booking.hotel_name,
      country: booking.country,
    })
  }

  return (
    <div className={BookingStyles.accordian}>
      <div className={BookingStyles.grid}>
        <div className={BookingStyles.hotel_info}>
          <span className={BookingStyles.country_tag}>
            {booking?.country || ""}
          </span>
          <span className={BookingStyles.hotel_name}>
            {booking?.hotel_name}
            <span className={BookingStyles.stars}>
              {booking?.stars} <VscStarFull />
            </span>
          </span>
          <span className={BookingStyles.room_info}>
            {booking.capacity}
            <span className={BookingStyles.people}>
              <MdPeopleAlt />
            </span>
            {Math.floor(Math.random() * parseInt(booking.capacity)) + 1}
            <span className={BookingStyles.beds}>
              <FaBed />
            </span>
          </span>
        </div>
        <div className={BookingStyles.center_quad}>
          <span className={BookingStyles.check_in}> Check In - Check Out</span>
          <span className={BookingStyles.date}>
            {booking?.checkin_date.toString().slice(0, 10)}-
            {booking?.checkout_date.toString().slice(0, 10)}
          </span>

          {employee && activeBooking && (
            <button onClick={rentBooking}>Rent Room</button>
          )}
          {!activeBooking && "Inactive"}
        </div>
        <div className={BookingStyles.quad}>
          <span className={BookingStyles.price}>
            {booking?.price}
            <span className={BookingStyles.nightly}>/Night</span>
          </span>
        </div>
      </div>
    </div>
  )
}
