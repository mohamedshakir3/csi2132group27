import home from '../styles/Home.module.css'
import SearchBar from '@/components/SearchBar'
import CarouselContainer from '../components/CarouselContainer'
import Header from '../components/Header'

export default function Home() {
  return (
    <>
      <div className={home.background}>
        <Header /> 
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

