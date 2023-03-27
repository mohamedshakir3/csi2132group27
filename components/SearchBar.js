import Searchbar from '../styles/SearchBar.module.css'
import Neumorphic from '../styles/Neumorphic.module.css'
import Counter from '@/components/Counter'

import { useState } from 'react'

export default function SearchBar() {



    const [city, setCity] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [stars, setStars] = useState(0)
    const [persons, setPersons] = useState(0)




    const handleQuery = () => {
        console.log(city + " " + from + " " + to + " " + stars+ " " + persons)
    }

  return (
    <>
    <div className={Searchbar.searchBar}>
        <div className={Searchbar.selector}>
            <label htmlFor="city">City</label>
            <select className={`${Searchbar.custom_select} ${Neumorphic.selector_box_shadow}`} name="city" id="city" onChange={() => setCity(event.target.value)}>
                <option value="default">Select a city</option>
                <option value="newyork">New York</option>
                <option value="losangeles">Los Angeles</option>
                <option value="chicago">Chicago</option>
                <option value="houston">Houston</option>
            </select>
        </div>
        <div className={Searchbar.selector}>
            <label htmlFor="from">Check-in</label>
            <input className={`${Searchbar.custom_date} ${Neumorphic.selector_box_shadow}`} type="date" id="from" name="from" onChange={() => setFrom(event.target.value)} />
        </div>
        <div className={Searchbar.selector}>
            <label htmlFor="to">Check-out</label>
            <input className={`${Searchbar.custom_date} ${Neumorphic.selector_box_shadow}`} type="date" id="to" name="to" onChange={() => setTo(event.target.value)} />
        </div>
        <div className={Searchbar.selector}>
            <label htmlFor="Stars">Stars</label>
            <div className={Searchbar.counter}>
                <Counter minCount = {0} maxCount={5} updateParentState={setStars}/>
            </div>
        </div>
        <div className={Searchbar.selector}>
            <label htmlFor="Person">Persons</label>
            <div className={Searchbar.counter}>
                <Counter minCount = {0} maxCount={10} updateParentState={setPersons}/>
            </div>
        </div>
    </div>
    <button className={Searchbar.search_button} onClick={handleQuery}>Search</button>

    </>       
  )
}