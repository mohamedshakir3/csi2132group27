import RentingStyles from "../styles/RentingCard.module.css"
import { MdPeopleAlt } from "react-icons/md"
import { VscStarFull } from "react-icons/vsc"
import { FaBed } from "react-icons/fa"

export default function RentingCard({ renting }) {
  return (
    <div className={RentingStyles.accordian}>
      <div className={RentingStyles.grid}>
        <div className={RentingStyles.hotel_info}>
          <span className={RentingStyles.country_tag}>
            {" "}
            {renting?.country}{" "}
          </span>
          <span className={RentingStyles.hotel_name}>
            {renting?.hotel_name}
            <span className={RentingStyles.stars}>
              {renting?.stars} <VscStarFull />
            </span>
          </span>
          <span className={RentingStyles.room_info}>
            {3}
            <span className={RentingStyles.people}>
              <MdPeopleAlt />
            </span>
            {3}
            <span className={RentingStyles.beds}>
              <FaBed />
            </span>
          </span>
        </div>
        <div className={RentingStyles.center_quad}>
          <span className={RentingStyles.check_in}> Rented From - To</span>
          <span className={RentingStyles.date}>04-20-2023 - 04-25-2023 </span>
        </div>
        <div className={RentingStyles.quad}>
          <span className={RentingStyles.price}>
            Paid?
            <span className={RentingStyles.nightly}>
              {renting?.paid_status === 1 ? "Yes" : "No"}
            </span>
          </span>
        </div>
      </div>
    </div>
  )
}
