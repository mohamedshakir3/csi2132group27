import ProfileStyle from "../styles/Profile.module.css"
import { useState } from "react"
import Dropdown from "../components/Dropdown"

export default function Profile() {
  const [open, setOpen] = useState(false)

  return (
    <div className={ProfileStyle.profile_btn}>
      <div
        className={ProfileStyle.profile_image}
        onClick={() => setOpen(!open)}
      ></div>
      {open && <Dropdown />}
    </div>
  )
}
