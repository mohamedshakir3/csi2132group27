import "../styles/globals.css"
import { useState, createContext, useEffect } from "react"

export const UserContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  loggedIn: false,
  updateUser: () => {},
})

export default function App({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  const [loggedIn, setLoggedIn] = useState(false)

  useEffect(() => {
    const userKey = JSON.parse(localStorage.getItem("user"))
    if (userKey) {
      console.log("Found user in local storage:" + userKey)
      setUser(userKey)
      setLoggedIn(true)
    }
  }, [])

  // useEffect(() => {
  //   localStorage.setItem("user", JSON.stringify(user))
  // }, [user])

  const signOut = () => {
    setUser(null)
    setLoggedIn(false)
    localStorage.removeItem("user")
  }

  const signIn = (user) => {
    setUser(user)
    setLoggedIn(true)
    localStorage.setItem("user", JSON.stringify(user))

    console.log("User logged in:" + user)
  }

  const updateUser = (user) => {
    console.log(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  return (
    <UserContext.Provider
      value={{ user, signIn, signOut, loggedIn, updateUser }}
    >
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
