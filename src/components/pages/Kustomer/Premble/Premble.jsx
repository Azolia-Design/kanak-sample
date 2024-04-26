import "./Premble.scss"
import { animate, timeline, stagger, inView } from "motion";
import { useEffect } from "react";
import SplitType from 'split-type';
import { cleanText } from "@/components/utils/text";


function KustomerPremble(props) {
    useEffect(() => {
        const title = new SplitType(".kustomer-premble-title .heading", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.008), at: 0 }],
        ]
        inView('.kustomer-premble', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])

    return (
        <section className="kustomer-premble bg-dark">
            <div className="container grid">
                <div className="kustomer-premble-title">
                    <h3 className="heading h4 txt-black txt-up">{props.title}</h3>
                </div>
            </div>
            {props.badge}
        </section>
    )
}

export default KustomerPremble