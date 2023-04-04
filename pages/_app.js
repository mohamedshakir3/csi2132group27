import "../styles/globals.css"
import { useState, createContext, useEffect } from "react"

export const UserContext = createContext({
  user: null,
  signIn: () => {},
  signOut: () => {},
  loggedIn: false,
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

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user))
  }, [user])

  const signOut = () => {
    setUser(null)
    setLoggedIn(false)
  }

  const signIn = (user) => {
    setUser(user)
    setLoggedIn(true)
    console.log("User logged in:" + user)
  }

  return (
    <UserContext.Provider value={{ user, signIn, signOut, loggedIn }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  )
}
