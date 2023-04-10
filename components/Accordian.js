import AccordianStyles from "../styles/AccordianStyles.module.css"
import { MdPeopleAlt } from "react-icons/md"
import { VscStarFull } from "react-icons/vsc"
import { FaBed } from "react-icons/fa"
import { useState } from "react"
import Router from "next/router"

export default function Accordian({ data, customer_id, checkIn, checkOut }) {
  const [success, setSuccess] = useState(false)
  const createBooking = async () => {
    if (!customer_id) return Router.push("/login")
    const booking = {
      hotel_id: data.hotel_id,
      customer_id: customer_id,
      room_id: data.room_id,
      active: true,
      checkin_date: checkIn,
      checkout_date: checkOut,
    }

    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(booking),
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/postBookings`,
      post
    )
    const result = await res.json()

    if (result.message === "success") {
      setSuccess(true)
      Router.push("/dashboard")
    }
    console.log(result)
  }

  return (
    <div className={AccordianStyles.accordian}>
      <div className={AccordianStyles.grid}>
        <div className={AccordianStyles.image_wrapper} />

        <div className={AccordianStyles.hotel_info}>
          <span className={AccordianStyles.country_tag}>{data.country}</span>
          <span className={AccordianStyles.hotel_name}>
            {data.hotel_name}
            <span className={AccordianStyles.stars}>
              {[...Array(data.stars)].map((e, i) => (
                <VscStarFull key={i} />
              ))}
            </span>
          </span>
          <span className={AccordianStyles.room_info}>
            {data.capacity}
            <span className={AccordianStyles.people}>
              <MdPeopleAlt />
            </span>
            3
            <span className={AccordianStyles.beds}>
              <FaBed />
            </span>
            {data.extendable === 1 ? (
              <span className={AccordianStyles.extendable}> Extendable </span>
            ) : (
              <></>
            )}
          </span>
          <span>{data.amenity}</span>
        </div>
        <div className={AccordianStyles.quad}>
          {success ? (
            <span style={{ color: "#678978" }}>Success! Redirecting...</span>
          ) : (
            <button onClick={createBooking} className={AccordianStyles.toggle}>
              +
            </button>
          )}

          <span className={AccordianStyles.price}>
            {data.price}
            <span className={AccordianStyles.nightly}>/Night</span>
          </span>
        </div>
      </div>
    </div>
  )
}
