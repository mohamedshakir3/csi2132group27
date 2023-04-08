import UserTableStyles from "../styles/UserTableStyles.module.css"
import { useState, useEffect } from "react"

export default function UserTable({ customers, setCustomer }) {
  const [filter, setFilter] = useState([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    setFilter(
      customers.filter((customer) => {
        return customer.customer_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
      })
    )
  }, [searchQuery])
  return (
    <div className={UserTableStyles.grid}>
      <input
        onChange={(e) => setSearchQuery(e.target.value)}
        className={UserTableStyles.search_bar}
        placeholder="Search User"
      />

      <div className={UserTableStyles.header}>
        <span>ID</span>
        <span>Name</span>
      </div>

      {filter.map((customer) => {
        return (
          <div
            key={customer.id}
            onClick={() => setCustomer(customer)}
            style={{ cursor: "pointer" }}
            className={UserTableStyles.row}
          >
            <span>{customer.customer_id}</span>
            <span>{customer.customer_name}</span>
          </div>
        )
      })}
    </div>
  )
}
