import DashboardStyles from "../styles/Dashboard.module.css"
import { CiEdit } from "react-icons/ci"
import BookingCard from "../components/BookingCard"
import RentingCard from "../components/RentingCard"
import { useState, useEffect, useContext } from "react"
import { UserContext } from "@/pages/_app"
import Link from "next/link"

export default function ClientDashboard(props) {
  const users = props.users
  const currentUser = props.currentUser
  const bookings = props.bookings
  const rentings = props.rentings
  const [filterBookings, setFilterBookings] = useState([])
  const [filterRentings, setFilterRentings] = useState([])

  const [content, setContent] = useState({})

  const { user, signIn, signOut, loggedIn, updateUser } =
    useContext(UserContext)

  useEffect(() => {
    setContent({
      name: currentUser?.name,
      id: currentUser?.id,
      email: currentUser?.email,
      ssn: currentUser?.ssn,
      address: currentUser?.address,
      password: currentUser?.password,
      type: currentUser?.type,
    })
  }, [currentUser])

  useEffect(() => {
    setFilterBookings(
      bookings?.filter((booking) => {
        return booking.customer_id === currentUser?.id
      })
    )
    console.log(filterBookings)
  }, [bookings, currentUser])

  useEffect(() => {
    setFilterRentings(
      rentings?.filter((renting) => {
        return renting.customer_id === currentUser?.id
      })
    )
    console.log(filterRentings)
  }, [rentings, currentUser])
  const handleChange = (e) => {
    setContent((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const updateDB = async () => {
    updateUser(content)

    console.log(content)
    const body = {
      id: content.user_id,
      name: content.name,
      street: content.address,
      ssn: content.ssn,
      email: content.email,
      password: content.password,
    }
    console.log(body)
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: content.id,
        name: content.name,
        street: content.address,
        ssn: content.ssn,
        email: content.email,
        password: content.password,
      }),
    }

    const req = await fetch(
      "https://csi2132group27.vercel.app/api/putCustomer",
      putData
    )
    const res = await req.json()
    console.log(res)
  }

  const [editable, setEditable] = useState(false)
  return (
    <div className={DashboardStyles.background}>
      <div className={DashboardStyles.header}>
        <Link href="/">
          <button className={DashboardStyles.home}>Home</button>
        </Link>
      </div>
      <div className={DashboardStyles.dashboard}>
        <div className={DashboardStyles.userpanel}>
          <span className={DashboardStyles.row_center}>
            <h1>User Info</h1>
          </span>
          <span className={DashboardStyles.row}>
            <span>
              User Name:
              <input
                className={DashboardStyles.input}
                disabled={!editable}
                onChange={handleChange}
                value={content.name || ""}
                name="username"
              />
            </span>
            <span style={{ cursor: "pointer" }}>
              <CiEdit onClick={() => setEditable(!editable)} />
            </span>
          </span>
          <span className={DashboardStyles.row}>
            <span>
              Email:
              <input
                className={DashboardStyles.input}
                disabled={!editable}
                onChange={handleChange}
                value={content.email}
                name="email"
              />
            </span>

            <span style={{ cursor: "pointer" }}>
              <CiEdit onClick={() => setEditable(!editable)} />
            </span>
          </span>
          <span className={DashboardStyles.row}>
            <span>
              Password:
              <input
                className={DashboardStyles.input}
                disabled={!editable}
                onChange={handleChange}
                value={content.password}
                name="password"
              />
            </span>

            <span style={{ cursor: "pointer" }}>
              <CiEdit onClick={() => setEditable(!editable)} />
            </span>
          </span>
          <span className={DashboardStyles.row}>
            <span>
              SSN:
              <input
                className={DashboardStyles.input}
                disabled={!editable}
                onChange={handleChange}
                value={content.ssn}
                name="ssn"
              />
            </span>
            <span style={{ cursor: "pointer" }}>
              <CiEdit onClick={() => setEditable(!editable)} />
            </span>
          </span>
          <span className={DashboardStyles.row}>
            <span>
              Address:
              <input
                className={DashboardStyles.input}
                disabled={!editable}
                value={content.address}
                onChange={handleChange}
                name="street"
              />
            </span>

            <span style={{ cursor: "pointer" }}>
              <CiEdit onClick={() => setEditable(!editable)} />
            </span>
          </span>

          <span className={DashboardStyles.row_center}>
            <button onClick={updateDB} className={DashboardStyles.update_btn}>
              Update Info
            </button>
          </span>
        </div>
        <div className={DashboardStyles.Bookings}>
          <div className={DashboardStyles.row_center}>
            <h1>Bookings</h1>
          </div>
          <div className={DashboardStyles.container}>
            {filterBookings?.map((booking) => {
              return (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  employee={false}
                  active={booking.active}
                />
              )
            })}
          </div>
        </div>

        <div className={DashboardStyles.renting}>
          <div className={DashboardStyles.row_center}>
            <h1>Renting</h1>
          </div>
          <div className={DashboardStyles.renting_container}>
            {filterRentings?.map((renting) => {
              return <RentingCard key={renting.id} renting={renting} />
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
