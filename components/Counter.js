
import { useState } from 'react'
import { useEffect } from 'react'
import Neumorphic from '../styles/Neumorphic.module.css'
import SearchBar from '../styles/SearchBar.module.css'

export default function Counter ({minCount, maxCount, updateParentState}){
    const [count, setCount] = useState(0)

    //Q: How do remove origin


    const handleIncrement = (inc) => {
        if (count + inc < minCount) return
        if(count + inc > maxCount) return
        setCount(count + inc)
        // updateParentState(count + inc)
    }

    
    
    return ( 
        <>
        <button className={Neumorphic.button} onClick={() => handleIncrement(-1)}>-</button>
        <span className={SearchBar.text_color}>{count}</span>
        <button className={Neumorphic.button} onClick={() => handleIncrement(1)}>+</button>
        </>
    )
}