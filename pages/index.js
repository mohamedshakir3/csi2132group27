import home from "../styles/Home.module.css"
import SearchBar from "@/components/SearchBar"
import CarouselContainer from "../components/CarouselContainer"
import Header from "../components/Header"
import { useContext } from "react"
import { UserContext } from "./_app"

export default function Home() {
  const { user, signIn, signOut, loggedIn } = useContext(UserContext)

  return (
    <>
      <div className={home.background}>
        <Header status={loggedIn} />
        <div className={home.center}>
          <CarouselContainer />
          <div className={home.absolute_searchbar}>
            <SearchBar />
          </div>
        </div>
      </div>
    </>
  )
}
