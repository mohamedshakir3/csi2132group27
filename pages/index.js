import home from '../styles/Home.module.css'
import SearchBar from '@/components/SearchBar'
export default function Home() {
  return (
    <>
      <div className={home.background}>
        <div className={home.center}>
          <SearchBar />
        </div>
      </div>
    </>
  )
}

