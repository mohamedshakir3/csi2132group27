import LoginStyles from "../styles/Login.module.css"
import { useState, useContext, useEffect } from "react"
import { UserContext } from "./_app"
import Router from "next/router"
import LoginForm from "@/components/LoginForm"
import RegistrationForm from "@/components/RegistrationForm"

export default function login({ users }) {
  const [register, setRegister] = useState(false)

  const { user, signIn, signOut, loggedIn } = useContext(UserContext)

  return (
    <>
      <div className={LoginStyles.background}>
        <div
          className={
            register ? LoginStyles.form_register : LoginStyles.form_login
          }
        >
          <div className={LoginStyles.form_wrapper}>
            <span className={LoginStyles.header}>
              {register ? "Register" : "User Login"}
            </span>

            {register ? (
              <RegistrationForm users={users} />
            ) : (
              <LoginForm users={users} />
            )}

            {!register && (
              <span className={LoginStyles.signup}>
                Don't have an account?
                <span
                  className={LoginStyles.underline}
                  onClick={() => setRegister(!register)}
                >
                  Sign Up
                </span>
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps() {
  const res = await fetch("http://localhost:3000/api/getUsers")
  const data = await res.json()
  const users = data.results
  console.log(users)
  return {
    props: {
      users,
    },
  }
}
