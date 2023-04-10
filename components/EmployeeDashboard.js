import DashboardStyles from "../styles/Dashboard.module.css"
import { CiEdit } from "react-icons/ci"
import BookingCard from "../components/BookingCard"
import RentingCard from "../components/RentingCard"
import UserTable from "../components/UserTable"
import CreateBooking from "../components/CreateBooking"
import { useState, useEffect } from "react"
import Link from "next/link"

export default function EmployeeDashboard({
  customers,
  bookings,
  rentings,
  rooms,
}) {
  console.log(bookings)
  const [customer, setCustomer] = useState({})
  const [filterBookings, setFilterBookings] = useState([])
  const [filterRentings, setFilterRentings] = useState([])
  const [showCreateBooking, setShowCreateBooking] = useState(false)

  const handleChange = (e) => {
    setCustomer((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const updateRentings = (renting) => {
    setFilterRentings((prev) => [renting, ...prev])
  }

  const [editable, setEditable] = useState(false)

  const updateBookings = (booking) => {
    setShowCreateBooking(!showCreateBooking)
    setFilterBookings((prev) => [booking, ...prev])
  }

  useEffect(() => {
    setFilterBookings(
      bookings?.filter((booking) => {
        return booking.customer_id === customer?.customer_id
      })
    )
  }, [customer])
  useEffect(() => {
    setFilterRentings(
      rentings?.filter((renting) => {
        return renting.customer_id === customer?.customer_id
      })
    )
    console.log(filterRentings)
  }, [customer])

  const updateDB = async () => {
    const putData = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: customer.customer_id,
        name: customer.customer_name,
        street: customer.street,
        ssn: customer.ssn,
        email: customer.email,
        password: customer.password,
      }),
    }

    const req = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/putCustomer`,
      putData
    )
    const res = await req.json()
    console.log(res)
  }
  const createBooking = () => {}
  const createRenting = () => {}

  return (
    <>
      <div className={DashboardStyles.background}>
        <div className={DashboardStyles.header}>
          <Link href="/">
            <button className={DashboardStyles.home}>Home</button>
          </Link>
        </div>

        <div className={DashboardStyles.employee_dashboard}>
          <div className={DashboardStyles.employee_userpanel}>
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
                  value={customer.customer_name}
                  name="username"
                />
              </span>
              <span style={{ cursor: "pointer" }}>
                <CiEdit onClick={() => setEditable(!editable)} />
              </span>
            </span>
            <span className={DashboardStyles.row}>
              <span>
                User ID:
                <input
                  className={DashboardStyles.input}
                  disabled={!editable}
                  onChange={handleChange}
                  value={customer.customer_id}
                  name="user_id"
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
                  value={customer.email}
                  name="email"
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
                  value={customer.ssn}
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
                  value={customer.street}
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
          <div className={DashboardStyles.employee_bookings}>
            <div className={DashboardStyles.grid_header}>
              <input
                className={DashboardStyles.search_bar}
                placeholder="Search Bookings"
              />
              <button
                className={DashboardStyles.toggle}
                onClick={() => setShowCreateBooking(!showCreateBooking)}
              >
                +
              </button>
            </div>
            <div className={DashboardStyles.container}>
              {showCreateBooking && (
                <CreateBooking
                  customer_id={customer.customer_id}
                  rooms={rooms}
                  updateBookings={(booking) => updateBookings(booking)}
                />
              )}

              {filterBookings?.map((booking) => {
                return (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    employee={true}
                    updateRentings={updateRentings}
                    active={booking.active === 1 ? true : false}
                  />
                )
              })}
            </div>
          </div>

          <div className={DashboardStyles.user_search}>
            <UserTable customers={customers} setCustomer={setCustomer} />
          </div>

          <div className={DashboardStyles.employee_renting}>
            <div className={DashboardStyles.grid_header}>
              <input
                className={DashboardStyles.search_bar}
                placeholder="Search Bookings"
              />
              <button
                className={DashboardStyles.toggle}
                onClick={createRenting}
              >
                +
              </button>
            </div>
            <div className={DashboardStyles.renting_container}>
              {filterRentings?.map((renting) => {
                return (
                  <RentingCard
                    key={renting.id}
                    renting={renting}
                    setRentings={setFilterRentings}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
