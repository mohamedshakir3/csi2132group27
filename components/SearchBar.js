import React from 'react'
import Searchbar from '../styles/SearchBar.module.css'
import Neumorphic from '../styles/Neumorphic.module.css'
import Counter from '@/components/Counter'
import { useState } from 'react'

import { cities }from '../public/Cities.js'

import Router from 'next/router'
import { Hint } from 'react-autocomplete-hint'

export default function SearchBar() {


    const [city, setCity] = useState("")
    const [from, setFrom] = useState("")
    const [to, setTo] = useState("")
    const [stars, setStars] = useState(0)
    const [persons, setPersons] = useState(0)



  return (
    <>
    <div className={Searchbar.searchBar}>
        <div className={Searchbar.selector}>
        <label htmlFor="city">City</label>

        <Hint options={cities} allowTabFill>
            <input 
                className={`${Searchbar.custom_select} ${Neumorphic.selector_box_shadow}`}
                value={city}
                onChange = {e => setCity(e.target.value)}
                placeholder="Where are you staying?"
            />
        </Hint>
            
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
        <button className={Searchbar.search_button} onClick={()=>
        Router.push({
            pathname: '/searchResults',
            query:  {
                city, 
                from,
                to,
                stars,
                persons
            }
        })}>Search</button> 
    </>       
  )
}