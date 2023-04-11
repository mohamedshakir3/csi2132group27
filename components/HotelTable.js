import Hotels from "../styles/Hotels.module.css"
import EditHotels from "../styles/EditHotels.module.css"
import { useState, useEffect } from "react"
import { TiDelete } from "react-icons/ti"
export default function HotelTable({ hotels, rooms, setRooms }) {
  const [hotelState, setHotelState] = useState([...hotels])
  const [statuses, setStatuses] = useState([])
  const [renderError, setRenderError] = useState(false)
  const [renderSuccess, setRenderSuccess] = useState(false)

  const handleChange = (e) => {
    setHotelState(
      hotelState.map((hotel, i) => {
        return i == parseInt(e.target.name.slice(-1))
          ? (hotel = {
              ...hotel,
              [e.target.name.substring(0, e.target.name.length - 1)]:
                e.target.value,
            })
          : hotel
      })
    )
  }

  const updateHotels = async () => {
    hotelState.map(async (hotel) => {
      const putData = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/putAllHotels`,
        putData
      )
      const data = await res.json()
      data.response.message === "success"
        ? setStatuses((prev) => [...prev, true])
        : setStatuses((prev) => [...prev, false])
      statuses.includes(false) ? setRenderError(true) : setRenderSuccess(true)
    })
  }

  const deleteHotel = async (i) => {
    const deleteData = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotel_id: hotelState[i].hotel_id,
      }),
    }
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deleteHotel`,
      deleteData
    )
    const data = await res.json()

    if (data.response.message === "success") {
      setHotelState(hotelState.filter((hotel, index) => index !== i))
    }
    const deleteRooms = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        hotel_id: hotelState[i].hotel_id,
      }),
    }

    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/deleteRooms`,
      deleteRooms
    )
    const data2 = await res2.json()

    setRooms(rooms.filter((room) => room.hotel_id !== hotelState[i].hotel_id))
  }

  useEffect(() => {
    console.log(hotelState)
  }, [hotelState])

  //   useEffect(() => {
  //     statuses.includes(false) ? setRenderError(true) : setRenderSuccess(true)
  //   }, [statuses])

  return (
    <>
      <div className={EditHotels.header}>
        <button onClick={updateHotels} className={EditHotels.save}>
          Save
        </button>
        {renderError ? (
          <span className={EditHotels.error}>Error Occured!</span>
        ) : (
          renderSuccess && <span className={EditHotels.success}>Success!</span>
        )}
      </div>
      <div className={Hotels.table}>
        <div className={Hotels.tableHeader}>
          <span> Hotel Name</span>
          <span>Stars</span>
          <span>Address</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Manager ID</span>
          <span>Chain ID</span>
        </div>

        {hotelState?.map((hotel, i) => {
          return (
            <div key={hotel.hotel_id} className={Hotels.tableRow}>
              <span>
                <TiDelete
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteHotel(i)}
                />
                <input
                  name={"hotel_name" + i}
                  className={Hotels.hotel}
                  value={hotel.hotel_name}
                  onChange={handleChange}
                />
              </span>
              <input
                className={Hotels.stars}
                type="number"
                name={"stars" + i}
                value={hotel.stars}
                onChange={handleChange}
              />
              <input
                name={"street" + i}
                value={hotel.street}
                className={Hotels.address}
                onChange={handleChange}
              />
              <input
                name={"email" + i}
                value={hotel.email}
                className={Hotels.email}
                onChange={handleChange}
              />
              <input
                name={"phone" + i}
                value={hotel.phone}
                className={Hotels.phone}
                onChange={handleChange}
                type="number"
              />
              <input
                name={"manager_id" + i}
                className={Hotels.manager_id}
                value={hotel.manager_id}
                onChange={handleChange}
                type="number"
              />
              <input
                type="number"
                name={"chain_id" + i}
                className={Hotels.chain_id}
                value={hotel.chain_id}
                onChange={handleChange}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
