import { useState } from 'react';
import SliderStyles from '../styles/SliderStyles.module.css';

export default function Slider({ step, min, max, onChange}){
    
    const [minValue, setMinValue] = useState(min);
    const [maxValue, setMaxValue] = useState(max);

    const handleMinChage = (e) => {
        e.preventDefault();
        const value = parseFloat(e.target.value);
        const newMin = Math.min(value, maxValue - step);
        setMinValue(newMin);
    }

    const handleMaxChage = (e) => {
        e.preventDefault();
        const value = parseFloat(e.target.value);
        const newMax = Math.max(value, minValue + step);
        setMaxValue(newMax);
    }

    const minPos = ((minValue - min) / (max - min)) * 100;
    const maxPos = ((maxValue - min) / (max - min)) * 100;
    
    return (
        <>
            <div className={SliderStyles.wrapper}>
                <div className={SliderStyles.input_wrapper}>

                <input 
                    className={SliderStyles.input} 
                    type="range"
                    value={minValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMinChage}
                />
                <input 
                    className={SliderStyles.input} 
                    type="range"
                    value={minValue}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleMinChage}
                />

                </div>
            </div>
            <div className={SliderStyles.control_wrapper}>
                <div className={SliderStyles.control} 
                style={{left: `${minPos}%` }} />
                <div className={SliderStyles.rail}>
                <div
                className={SliderStyles.inner_rail}
                style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
                />
                </div>
                <div className={SliderStyles.control} style={{ left: `${maxPos}%` }} />
            </div>
        </>

        
    )

}