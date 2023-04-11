import EditRooms from "../styles/EditRooms.module.css"
import EditHotels from "../styles/EditHotels.module.css"
import { useState, useEffect } from "react"
export default function RoomTable({ rooms }) {
  const [roomState, setRoomstate] = useState([...rooms])
  const [statuses, setStatuses] = useState([])
  const [renderError, setRenderError] = useState(false)
  const [renderSuccess, setRenderSuccess] = useState(false)

  const handleChange = (e) => {
    setRoomstate(
      roomState.map((room, i) => {
        return i == parseInt(e.target.name.slice(-1))
          ? (room = {
              ...room,
              [e.target.name.substring(0, e.target.name.length - 1)]:
                e.target.value,
            })
          : room
      })
    )
  }

  const updateRooms = async () => {
    roomState.map(async (hotel) => {
      const putData = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(hotel),
      }

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/putAllRooms`,
        putData
      )
      const data = await res.json()
      data.response.message === "success"
        ? setStatuses((prev) => [...prev, true])
        : setStatuses((prev) => [...prev, false])
      statuses.includes(false) ? setRenderError(true) : setRenderSuccess(true)
    })
  }
  useEffect(() => {
    console.log(roomState)
  }, [roomState])

  //   useEffect(() => {
  //     statuses.includes(false) ? setRenderError(true) : setRenderSuccess(true)
  //   }, [statuses])

  return (
    <>
      <div className={EditHotels.header}>
        <button onClick={updateRooms} className={EditHotels.save}>
          Save
        </button>
        {renderError ? (
          <span className={EditHotels.error}>Error Occured!</span>
        ) : (
          renderSuccess && <span className={EditHotels.success}>Success!</span>
        )}
      </div>
      <div className={EditRooms.table}>
        <div className={EditRooms.tableHeader}>
          <span> Price </span>
          <span>Capacity</span>
          <span>View Type</span>
          <span>Extendable</span>
          <span>Hotel ID</span>
        </div>

        {roomState?.map((room, i) => {
          return (
            <div key={room.room_id} className={EditRooms.tableRow}>
              <input
                name={"price" + i}
                className={EditRooms.hotel}
                value={room.price}
                onChange={handleChange}
                type="number"
                pattern="^\d*(\.\d{0,2})?$"
              />
              <input
                className={EditRooms.stars}
                type="number"
                name={"capacity" + i}
                value={room.capacity}
                onChange={handleChange}
              />
              <input
                name={"view_type" + i}
                value={room.view_type}
                className={EditRooms.address}
                onChange={handleChange}
              />
              <input
                name={"extendable" + i}
                value={room.extendable}
                className={EditRooms.stars}
                onChange={handleChange}
                min={0}
                max={1}
                type="number"
              />
              <input
                name={"hotel_id" + i}
                value={room.hotel_id}
                className={EditRooms.stars}
                onChange={handleChange}
                type="number"
              />
            </div>
          )
        })}
      </div>
    </>
  )
}
