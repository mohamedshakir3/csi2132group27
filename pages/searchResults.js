import home from '../styles/Home.module.css'
import SearchResults from '../styles/SearchResults.module.css'
import Accordian from '../components/Accordian' 
import Slider from '../components/Slider'
import { useState, useEffect } from 'react';

export default function searchResults(){

    const [data, setData] = useState([])

    useEffect(() => {
        const getData = async() =>{
            const response = await fetch('http://localhost:3000/api/getData')
            const res = await response.json()
            setData(res.results)
            console.log(res.results)
        }
        getData()
    },[])

    

    return (
        <>
            <div className={SearchResults.background}> 
            <div className={SearchResults.wrapper}>

                <section className={SearchResults.grid}>
                    <div className={SearchResults.search_panel}>
                        <input className={SearchResults.search_bar}placeholder='Search' />
                        <button className={SearchResults.search_btn}>Search</button>
                        <button className={SearchResults.back_btn}>Home</button>
                    </div>
                    <div className={SearchResults.filters_panel}>
                        <h2>Filter</h2>
                        <h3>Price Range</h3>
                        <div className={SearchResults.input_container}>
                            <input className={SearchResults.price_range_input} placeholder='Min' />
                            <input className={SearchResults.price_range_input} placeholder='Max' />
                        </div>

                    </div>
                    <div className={SearchResults.body}>
                        {data.map((item) => {
                            return <Accordian key={item.hotel_id} data={item} />
                        })}
                        {/* <Accordian content={"Example Content"} />
                        <Accordian content={"Example content"} />
                        <Accordian content={"Example content"} />
                        <Accordian content={"Example content"} />
                        <Accordian content={"Example content"} /> */}

                    </div>
                </section>
            </div>
            </div>

        </> 

    )

}
