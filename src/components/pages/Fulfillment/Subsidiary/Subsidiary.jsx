import { useEffect } from "react"
import SplitType from 'split-type';
import { animate, stagger, inView } from "motion";
import SubsidiaryItem from "./SubsidiaryItem"

import './Subsidiary.scss';
function FulfillSubsidiary({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".fulfill-subsidiary-title", { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        inView('.fulfill-subsidiary', () => {
            animate(title.words, {opacity: 1, transform: 'none'}, {duration: .5, delay: stagger(.02)}).finished.then(() => {
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])

    return (
        <section className="fulfill-subsidiary">
            <div className="container">
                <h2 className="heading h1 txt-black txt-up fulfill-subsidiary-title">{props.title}</h2>
                <div className="fulfill-subsidiary-listing">
                    {props.list.map((data, idx) => (
                        <SubsidiaryItem key={idx} icArrowExt={props.icArrowExt} {...data}/>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default FulfillSubsidiary