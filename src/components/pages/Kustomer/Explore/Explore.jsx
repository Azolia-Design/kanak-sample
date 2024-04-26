import "./Explore.scss"
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

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
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="kustomer-explore">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up kustomer-explore-title">{props.title}</h1>
                <div className="kustomer-explore-main">
                    {props.groupItems.map((item, idx) =>
                        <ExploreItem
                            key={item.uid}
                            title={item.data.title}
                            label={item.data.name}
                            solutions={item.list}
                            img={props.listImg[idx]}
                            link_to={idx === 0 ? "/private-label" : "/kustom-packaging-solutions"}
                        />
                    )}
                </div>
            </div>
        </section>
    )
}

export default KustomerExplore