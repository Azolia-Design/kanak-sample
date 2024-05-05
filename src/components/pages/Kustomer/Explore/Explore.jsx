import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { convertHighlight } from "@utils/text";

import ExploreItem from "./ExploreItem"

function KustomerExplore({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".kustomer-explore-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const titleSequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: "-.4" }],
        ]

        inView('.kustomer-explore-title', () => {
            timeline(titleSequence).finished.then(() => {
                title.revert()
                document.querySelector('.kustomer-explore-main-line-bot').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })

        animate(document.querySelector('.kustomer-explore-main-line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        const lineSequence = [
            [document.querySelector('.kustomer-explore-main-line-bot'), { scaleX: 1 }, { duration: .8, at: .2 }]
        ]
        inView('.kustomer-explore-main-line-bot', () => {
            timeline(lineSequence).finished.then(() => {
                document.querySelector('.kustomer-explore-main-line-bot').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <section className="kustomer-explore">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up kustomer-explore-title">{props.title}</h1>
                <div className="kustomer-explore-main">
                    {props.renderList}
                    <div className="line kustomer-explore-main-line-bot"></div>
                </div>
            </div>
        </section>
    )
}

export default KustomerExplore