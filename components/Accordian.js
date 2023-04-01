import AccordianStyles from '../styles/AccordianStyles.module.css'
import { MdPeopleAlt } from 'react-icons/md'
import { VscStarFull } from "react-icons/vsc";
import { FaBed } from "react-icons/fa";

export default function Accordian({data}){




    return (
        <div className={AccordianStyles.accordian}>
            <div className={AccordianStyles.grid}>
            <div className={AccordianStyles.image_wrapper}/>

            <div className={AccordianStyles.hotel_info}>
                <span className={AccordianStyles.country_tag}>{data.country}</span>
                <span className={AccordianStyles.hotel_name}>{data.hotel_name} 
                    <span className={AccordianStyles.stars}>
                        {[...Array(data.stars)].map((e, i) => <VscStarFull/>)}
                    </span>
                </span>
                <span className={AccordianStyles.room_info}>
                       {data.capacity}

                        <span className={AccordianStyles.people}>
                            
                            <MdPeopleAlt/>
                        </span>
                        3
                        <span className={AccordianStyles.beds}>
                            
                            <FaBed/>
                        </span>
                    {data.extendable === 1 ? <span className={AccordianStyles.extendable}> Extendable </span> : <></>}
                    </span>
                    <span>{data.amenity}</span>
                </div>
                <div className={AccordianStyles.quad}>
                    <button className={AccordianStyles.toggle}>+</button>
                    <span className={AccordianStyles.price}>{data.price}<span className={AccordianStyles.nightly}>/Night</span></span>
                </div>


            </div>
        </div>
    )
}