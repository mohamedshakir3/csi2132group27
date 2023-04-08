import HeaderStyles from "../styles/Header.module.css"
import LoginBtn from "./LoginBtn"
import Profile from "./Profile"

export default function Header({ status }) {
  return (
    <div className={HeaderStyles.header}>
      <div className={HeaderStyles.header_text_container}>
        <span className={HeaderStyles.header_text}> e-Hotels </span>
        <span>Placeholder text</span>
      </div>
      <div className={HeaderStyles.login_btn_container}>
        {status ? <Profile /> : <LoginBtn />}
      </div>
    </div>
  )
}
