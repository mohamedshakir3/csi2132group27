import LoginStyles from "../styles/Login.module.css"
import { Countries } from "../public/Countries.js"
import { useRef, useContext } from "react"
import { UserContext } from "../pages/_app"
import Router from "next/router"

export default function RegistrationForm({ users }) {
  const { user, signIn, signOut, loggedIn } = useContext(UserContext)

  const nameRef = useRef()
  const SSNRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const stateRef = useRef()
  const countryRef = useRef()
  const zipCodeRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()

  const registerUser = async () => {
    const email = emailRef.current.value.trim()
    const password = passwordRef.current.value.trim()
    const name = nameRef.current.value.trim()
    const SSN = SSNRef.current.value.trim()
    const address = addressRef.current.value.trim()
    const city = cityRef.current.value.trim()
    const state = stateRef.current.value.trim()
    const country = countryRef.current.value.trim()
    const zipCode = zipCodeRef.current.value.trim()

    const post = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        street: address,
        postal: zipCode,
        city,
        state,
        country,
        ssn: SSN,
        date_of_reg: new Date().toJSON().slice(0, 19).replace("T", " "),
        email,
        password,
      }),
    }
    const res = await fetch("http://localhost:3000/api/postCustomer", post)
    const response = await res.json()
    console.log(response)
    if (response === "success") {
      console.log("success")
      signIn({
        email,
        password,
        id: 3,
        type: "customer",
      })
      Router.push("/")
    }
  }

  return (
    <>
      <form
        className={LoginStyles.registration_form}
        onSubmit={(e) => {
          e.preventDefault()
          registerUser()
        }}
      >
        <span className={LoginStyles.form_row}>
          <input
            auto-complete="name"
            placeholder="Full Name"
            ref={nameRef}
            className={LoginStyles.name}
          />
          <input className={LoginStyles.SSN} placeholder="SSN" ref={SSNRef} />
        </span>
        <span className={LoginStyles.form_row}>
          <input
            auto-complete="street-address"
            placeholder="Street Address"
            className={LoginStyles.address}
            ref={addressRef}
          />
          <input
            list="countries"
            placeholder="Country"
            className={LoginStyles.country}
            auto-complete="country"
            ref={countryRef}
            multiple
          />
          <datalist>
            {Countries.map((country, index) => {
              return (
                <option key={country.code} value={country.code}>
                  {country.name}
                </option>
              )
            })}
          </datalist>
        </span>
        <span className={LoginStyles.form_row}>
          <input
            auto-complete="address-level2"
            placeholder="City"
            className={LoginStyles.city}
            ref={cityRef}
          />
          <input
            auto-complete="address-level1"
            placeholder="Province/State"
            className={LoginStyles.province}
            ref={stateRef}
          />
          <input
            auto-complete="postal-code"
            placeholder="Zip/Postal Code"
            className={LoginStyles.postal_code}
            ref={zipCodeRef}
          />
        </span>
        <span className={LoginStyles.form_row}>
          <input
            className={LoginStyles.email}
            placeholder="Email"
            auto-complete="email"
            ref={emailRef}
          />
          <input
            className={LoginStyles.signup_password}
            placeholder="Password"
            auto-complete="new-password"
            type="password"
            ref={passwordRef}
          />
        </span>
        <span className={LoginStyles.form_row_centered}>
          <button type="submit" className={LoginStyles.register_btn}>
            REGISTER
          </button>
        </span>
      </form>
    </>
  )
}
