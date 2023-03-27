import home from '../styles/Home.module.css'
import SearchBar from '@/components/SearchBar'
import CarouselContainer from '../components/CarouselContainer'
export default function Home() {
  return (
    <>
      <div className={home.background}>
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

