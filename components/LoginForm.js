import LoginStyles from "../styles/Login.module.css"
import { useState, useContext } from "react"
import { UserContext } from "@/pages/_app"
import Router from "next/router"

export default function LoginForm({ users }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const { user, signIn, signOut, loggedIn } = useContext(UserContext)

  const checkCredentials = () => {
    users.forEach((user) => {
      if (user.email === username && user.password === password) {
        console.log("User found and passowrd matches.")
        signIn({
          email: user.email,
          password: user.password,
          id: user.user_id,
          type: user.user_type,
        })
        Router.push("/")
      }
      if (user.email === username && user.password !== password) {
        console.log("User found but password does not match.")
      }
    })
  }

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          checkCredentials()
        }}
      >
        <span className={LoginStyles.form_row}>
          <input
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            className={LoginStyles.username}
          />
        </span>
        <span className={LoginStyles.form_row}>
          <input
            placeholder="Password"
            type="password"
            className={LoginStyles.password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </span>
        <span className={LoginStyles.form_row_centered}>
          <button type="submit" className={LoginStyles.login_btn}>
            LOG IN
          </button>
        </span>
      </form>
    </>
  )
}
