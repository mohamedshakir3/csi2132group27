import Link from "next/link"
import ProfileStyle from "../styles/Profile.module.css"
import { FiSettings } from "react-icons/fi"
import { CiLogout } from "react-icons/ci"
import { UserContext } from "@/pages/_app"
import { useContext } from "react"

export default function Dropdown() {
  const { user, signIn, signOut, loggedIn, updateUser } =
    useContext(UserContext)
  console.log(user)
  return (
    <div className={ProfileStyle.dropdown}>
      <div className={ProfileStyle.dropdown_content}>
        <div className={ProfileStyle.dropdown_row}>
          <Link className={ProfileStyle.link} href="/dashboard">
            <FiSettings size={"2em"} />
            Dashboard
          </Link>
        </div>
        <div className={ProfileStyle.dropdown_row}>
          <button onClick={signOut}>
            <CiLogout size={"2em"} />
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
