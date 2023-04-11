import Views from "../styles/Views.module.css"
import ViewTable from "../components/ViewTable"
import ViewTable2 from "../components/ViewTable2"
import Router from "next/router"
import { useRouter } from "next/router"
export default function views({ available_rooms, room_capacity, hotels }) {
  const router = useRouter()

  const query = router.query

  const handleReturn = () => {
    Router.push({
      pathname: "/searchResults",
      query,
    })
  }
  return (
    <div className={Views.background}>
      <div classname={Views.top_bar}>
        <button onClick={handleReturn} className={Views.return}>
          Return
        </button>
      </div>
      <div className={Views.container}>
        <ViewTable
          header={{ col1: "City", col2: "Available Rooms" }}
          data={available_rooms}
        />
        <ViewTable2
          header={{ col1: "Room ID", col2: "Capacity" }}
          data={room_capacity}
          hotels={hotels}
        />
      </div>
    </div>
  )
}

export async function getServerSideProps() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAvailableRooms`
  )
  const data = await res.json()

  const resCap = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getRoomCapacity`
  )
  const dataCap = await resCap.json()

  const resHotel = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/getAllHotels`
  )
  const dataHotel = await resHotel.json()

  return {
    props: {
      available_rooms: data.results,
      room_capacity: dataCap.results,
      hotels: dataHotel.results,
    },
  }
}
