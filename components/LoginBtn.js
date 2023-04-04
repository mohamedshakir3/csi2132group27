import Neumorphic from "../styles/Neumorphic.module.css"
import Link from "next/link"

export default function LoginBtn() {
  return (
    <>
      <Link href="/login">
        <button className={Neumorphic.login_btn}>Log in</button>
      </Link>
    </>
  )
}
