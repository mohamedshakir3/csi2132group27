import Views from "../styles/Views.module.css"
export default function ViewTable({ data, header }) {
  return (
    <div className={Views.table}>
      <div className={Views.tableHeader}>
        <span>{header.col1} </span>
        <span>{header.col2}</span>
      </div>
      {data.map((row) => {
        return (
          <div className={Views.tableRow}>
            <span>{row.city}</span>
            <span>{row.rooms_available}</span>
          </div>
        )
      })}
    </div>
  )
}
