import CarouselStyle from '../styles/Carousel.module.css'
import { useState } from 'react';

export default function CarouselContainer(){

    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
      setIndex(selectedIndex);
    };

    
    return(
        <>
        <div className={CarouselStyle.carousel}>
            <div className={CarouselStyle.image}>
                
                </div>
            </div>
        </>
    )
}