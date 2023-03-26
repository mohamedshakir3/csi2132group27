
import { useState } from 'react'
import { forwardRef, useImperativeHandle } from 'react'

export default function Counter ({minCount, maxCount, updateParentState}){
    const [count, setCount] = useState(0)

    const handleIncrement = (inc) => {
        if (count + inc < minCount) return
        if(count + inc > maxCount) return
        setCount(count + inc)
        updateParentState(count + inc)
    }
    return ( 
        <>
        <button onClick={() => handleIncrement(-1)}>-</button>
        <span>{count}</span>
        <button onClick={() => handleIncrement(1)}>+</button>
        </>
    )
}