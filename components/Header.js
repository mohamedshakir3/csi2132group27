import HeaderStyles from "../styles/Header.module.css"
import LoginBtn from "./LoginBtn"

export default function Header({ status }) {
  return (
    <div className={HeaderStyles.header}>
      <div className={HeaderStyles.header_text_container}>
        <span className={HeaderStyles.header_text}> e-Hotels </span>
        <span>Placeholder text</span>
      </div>
      <div className={HeaderStyles.login_btn_container}>
        {status ? <h1>You're logged in!</h1> : <LoginBtn />}
      </div>
    </div>
  )
}
