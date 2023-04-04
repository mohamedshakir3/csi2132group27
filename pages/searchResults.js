import SearchResults from "../styles/SearchResults.module.css"
import Accordian from "../components/Accordian"
import { useRouter } from "next/router"
import { useState, useEffect } from "react"

export default function searchResults({ rooms }) {
  const router = useRouter()

  const query = router.query

  const [filter, setFilter] = useState([])

  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setFilter(
      rooms.filter((item) => {
        return item.hotel_name.toLowerCase().includes(searchQuery.toLowerCase())
      })
    )
  }, [searchQuery])

  useEffect(() => {
    const initialDataFilter = (data) => {
      return data.filter((item) => {
        return (
          item.stars >= parseInt(query.stars) &&
          item.capacity >= parseInt(query.persons)
        )
      })
    }

    try {
      setFilter(initialDataFilter(rooms))
    } catch {}
  }, [query.city, router.isReady])

  return (
    <>
      <div className={SearchResults.background}>
        <div className={SearchResults.wrapper}>
          <section className={SearchResults.grid}>
            <div className={SearchResults.search_panel}>
              <input
                className={SearchResults.search_bar}
                placeholder="Search"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className={SearchResults.search_btn}>Search</button>
              <button className={SearchResults.back_btn}>Home</button>
            </div>
            <div className={SearchResults.filters_panel}>
              <h2>Filter</h2>
              <h3>Price Range</h3>
              <div className={SearchResults.input_container}>
                <input
                  className={SearchResults.price_range_input}
                  placeholder="Min"
                />
                <input
                  className={SearchResults.price_range_input}
                  placeholder="Max"
                />
              </div>
            </div>
            <div className={SearchResults.body}>
              {filter.map((room) => {
                return <Accordian key={room.room_id} data={room} />
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/getRooms")

  const result = await res.json()
  const rooms = result.results
  console.log(rooms)
  return {
    props: {
      rooms,
    },
  }
}
