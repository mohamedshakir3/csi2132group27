import EditHotels from "../styles/EditHotels.module.css"
import HotelTable from "../components/HotelTable"
import RoomTable from "../components/RoomTable"
import { useState } from "react"
import Link from "next/link"

export default function editHotels({ hotels, rooms }) {
  const [roomState, setRoomState] = useState([...rooms])
  return (
    <div className={EditHotels.background}>
      <div className={EditHotels.main_header}>
        <Link href="/dashboard">
          <button className={EditHotels.return}>Return</button>
        </Link>
      </div>
      <div className={EditHotels.container}>
        <div className={EditHotels.wrapper}>
          <HotelTable
            rooms={roomState}
            setRooms={setRoomState}
            hotels={hotels}
          />
          <RoomTable rooms={roomState} setRooms={setRoomState} />
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/getAllHotels`)
  const data = await res.json()

  const resRooms = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAllRooms`
  )
  const rooms = await resRooms.json()

  return {
    props: {
      hotels: data.results,
      rooms: rooms.results,
    },
  }
}
