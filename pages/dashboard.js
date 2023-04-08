import DashboardStyles from "../styles/Dashboard.module.css"
import { CiEdit } from "react-icons/ci"
import BookingCard from "../components/BookingCard"
import RentingCard from "../components/RentingCard"
import { useEffect, useState, useContext } from "react"
import EmployeeDashboard from "../components/EmployeeDashboard"
import ClientDashboard from "../components/ClientDashboard"
import { UserContext } from "@/pages/_app"

export default function dashboard({ customers, bookings, rentings, rooms }) {
  const { user, signIn, signOut, loggedIn } = useContext(UserContext)
  const [component, setComponent] = useState(<h1>Hello</h1>)
  useEffect(() => {
    setComponent(
      user?.type === "employee" ? (
        <EmployeeDashboard
          customers={customers}
          bookings={bookings}
          rentings={rentings}
          rooms={rooms}
        />
      ) : (
        <ClientDashboard
          currentUser={user}
          users={customers}
          bookings={bookings}
          rentings={rentings}
        />
      )
    )
  }, [user])

  //  const component =
  // user.type === "employee" ? (
  //   <EmployeeDashboard
  //     customers={customers}
  //     bookings={bookings}
  //     rentings={rentings}
  //     rooms={rooms}
  //   />
  // ) : (
  //   <ClientDashboard />
  // )
  return component

  // <div className={DashboardStyles.background}>
  //   <div className={DashboardStyles.employee_dashboard}>
  //     <div className={DashboardStyles.userpanel}>
  //       <span className={DashboardStyles.row_center}>
  //         <h2>User Info</h2>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>
  //           User Name:
  //           <input
  //             className={DashboardStyles.input}
  //             disabled={!editable}
  //             onChange={handleChange}
  //             value={content.username}
  //             name="username"
  //           />
  //         </span>
  //         <span style={{ cursor: "pointer" }}>
  //           <CiEdit onClick={() => setEditable(!editable)} />
  //         </span>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>
  //           User ID:
  //           <input
  //             className={DashboardStyles.input}
  //             disabled={!editable}
  //             onChange={handleChange}
  //             value={content.user_id}
  //             name="user_id"
  //           />
  //         </span>
  //         <span style={{ cursor: "pointer" }}>
  //           <CiEdit onClick={() => setEditable(!editable)} />
  //         </span>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>
  //           Email:
  //           <input
  //             className={DashboardStyles.input}
  //             disabled={!editable}
  //             onChange={handleChange}
  //             value={content.email}
  //             name="email"
  //           />
  //         </span>
  //         <span style={{ cursor: "pointer" }}>
  //           <CiEdit onClick={() => setEditable(!editable)} />
  //         </span>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>
  //           SSN:
  //           <input
  //             className={DashboardStyles.input}
  //             disabled={!editable}
  //             onChange={handleChange}
  //             value={content.ssn}
  //             name="ssn"
  //           />
  //         </span>
  //         <span style={{ cursor: "pointer" }}>
  //           <CiEdit onClick={() => setEditable(!editable)} />
  //         </span>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>
  //           Address:
  //           <input
  //             className={DashboardStyles.input}
  //             disabled={!editable}
  //             value={content.street}
  //             onChange={handleChange}
  //             name="street"
  //           />
  //         </span>
  //         <span style={{ cursor: "pointer" }}>
  //           <CiEdit onClick={() => setEditable(!editable)} />
  //         </span>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>Position: N/A</span>
  //       </span>
  //       <span className={DashboardStyles.row}>
  //         <span>Salary: N/A</span>
  //       </span>
  //       <span className={DashboardStyles.row_center}>
  //         <button className={DashboardStyles.update_btn}>Update Info</button>
  //       </span>
  //     </div>
  //     <div className={DashboardStyles.Bookings}>
  //       <div className={DashboardStyles.row_center}>
  //         <h2>Bookings</h2>
  //       </div>
  //       <div className={DashboardStyles.container}>
  //         <BookingCard />
  //         <BookingCard />
  //         <BookingCard />
  //         <BookingCard />
  //       </div>
  //     </div>

  //     <div className={DashboardStyles.renting}>
  //       <div className={DashboardStyles.row_center}>
  //         <h2>Renting</h2>
  //       </div>
  //       <div className={DashboardStyles.renting_container}>
  //         <RentingCard />
  //       </div>
  //     </div>
  //   </div>
  // </div>
}

export async function getStaticProps() {
  const customerRes = await fetch("/api/getCustomers")
  const customerData = await customerRes.json()
  const customers = customerData.results

  const bookingRes = await fetch("http://localhost:3000/api/getBookings")
  const bookingData = await bookingRes.json()
  const bookings = bookingData.results

  const rentingRes = await fetch("http://localhost:3000/api/getRentings")
  const rentingData = await rentingRes.json()
  const rentings = rentingData.results

  const roomRes = await fetch("http://localhost:3000/api/getRooms")
  const roomData = await roomRes.json()
  const rooms = roomData.results

  console.log(rooms)

  return {
    props: {
      customers,
      bookings,
      rentings,
      rooms,
    },
  }
}
