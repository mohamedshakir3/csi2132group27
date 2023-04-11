import SearchResults from "../styles/SearchResults.module.css"
import Accordian from "../components/Accordian"
import Neumorphic from "../styles/Neumorphic.module.css"
import Searchbar from "../styles/SearchBar.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState, useEffect, useContext } from "react"
import Counter from "../components/Counter"
import { Hint } from "react-autocomplete-hint"
import { cities } from "../public/Cities.js"
import { UserContext } from "./_app"
export default function searchResults({ rooms }) {
  const { user, signIn, signOut, loggedIn } = useContext(UserContext)

  const router = useRouter()

  const query = router.query
  const [city, setCity] = useState("")

  const [filter, setFilter] = useState([])

  const [queryObj, setQueryObj] = useState({
    city: query.city,
    stars: query.stars,
    persons: query.persons,
    minPrice: 0,
    maxPrice: 1000,
    searchBar: "",
  })

  const navigateToViews = () => {
    router.push({
      pathname: "/views",
      query,
    })
  }

  useEffect(() => {
    setFilter(
      rooms.filter((item) => {
        return (
          item.hotel_name
            .toLowerCase()
            .includes(queryObj.searchBar.toLowerCase()) &&
          item.stars >= parseInt(queryObj.stars) &&
          item.capacity >= parseInt(queryObj.persons) &&
          item.price >= parseInt(queryObj.minPrice) &&
          item.price <= parseInt(queryObj.maxPrice)
          //(bookings.filter(booking => booking.room_id === item.room_id).length > 0) ? (bookings.filter(booking => booking.room_id === item.room_id)[0].checkIn > query.checkin_date && bookings.filter(booking => booking.room_id === item.room_id)[0].checkout < query.checkout_date) ? false  : true : true
        )
      })
    )
  }, [queryObj])

  const setStars = (value) => {
    setQueryObj({ ...queryObj, stars: value })
  }
  const setPersons = (value) => {
    setQueryObj({ ...queryObj, persons: value })
  }
  const handleChange = (e) => {
    setQueryObj({ ...queryObj, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const initialDataFilter = (data) => {
      return data.filter((item) => {
        return (
          item.stars >= parseInt(query.stars) &&
          item.capacity >= parseInt(query.persons)
        )
      })
    }
    setQueryObj({ ...queryObj, city: query.city })
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
                name="searchBar"
                onChange={handleChange}
              />
              <button
                onClick={navigateToViews}
                className={SearchResults.search_btn}
              >
                Views
              </button>
              <Link className={SearchResults.back_btn} href="/">
                Home
              </Link>
            </div>
            <div className={SearchResults.filters_panel}>
              <h2>Filter</h2>
              <h3>Price Range</h3>
              <div className={SearchResults.input_container}>
                <input
                  className={SearchResults.price_range_input}
                  placeholder="Min"
                  type="number"
                  name="minPrice"
                  onChange={(e) => handleChange(e)}
                  value={queryObj.minPrice}
                />
                <input
                  className={SearchResults.price_range_input}
                  placeholder="Max"
                  type="number"
                  name="maxPrice"
                  onChange={(e) => handleChange(e)}
                  value={queryObj.maxPrice}
                />
              </div>
              <h3>Persons</h3>

              <div className={SearchResults.counter}>
                <Counter
                  minCount={0}
                  maxCount={10}
                  default={parseInt(queryObj.persons)}
                  updateParentState={setPersons}
                />
              </div>
              <h3>Stars</h3>
              <div className={SearchResults.counter}>
                <Counter
                  minCount={0}
                  maxCount={5}
                  defaultValue={parseInt(queryObj.persons)}
                  updateParentState={setStars}
                />
              </div>
              <h3>City</h3>
              <Hint options={cities} allowTabFill>
                <input
                  className={SearchResults.city}
                  onChange={handleChange}
                  name="city"
                  placeholder="City"
                  value={queryObj.city}
                />
              </Hint>
            </div>
            <div className={SearchResults.body}>
              {filter.map((room) => {
                return (
                  <Accordian
                    key={room.room_id}
                    data={room}
                    customer_id={user?.id}
                    checkIn={query?.from}
                    checkOut={query?.to}
                  />
                )
              })}
            </div>
          </section>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch(`${process.env.API_URL}/api/getRooms`)

  const result = await res.json()
  const rooms = result.results
  console.log(rooms)
  return {
    props: {
      rooms,
    },
  }
}
