import home from '../styles/home.module.css'
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
