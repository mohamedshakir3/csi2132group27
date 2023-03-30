import AccordianStyles from '../styles/AccordianStyles.module.css'

export default function Accordian({content}){
    return (
        <div className={AccordianStyles.accordian}>
            {content}
        </div>
    )
}