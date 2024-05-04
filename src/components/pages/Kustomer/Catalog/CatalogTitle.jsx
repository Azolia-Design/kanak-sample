import { animate, timeline, stagger, inView } from "motion";
import { useEffect } from "react";
import SplitType from 'split-type';

function KustomerCatalogTitle(props) {
    useEffect(() => {
        const label = new SplitType('.kustomer-cata-label', { types: "lines, words", lineClass: 'split-line' })
        const title = new SplitType('.kustomer-cata-title', { types: "lines, words", lineClass: 'split-line' })
        const describe = new SplitType('.kustomer-cata-des .txt', { types: "lines, words", lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(describe.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.02), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: .05 }],
            [describe.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.008), at: .2 }],
        ]

        inView('.kustomer-cata-title-wrap', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                describe.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <>
            <div className="kustomer-cata-title-wrap">
                <div className="heading h4 txt-black txt-up kustomer-cata-label">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up kustomer-cata-title">{props.title}</h1>
            </div>
            <div className="kustomer-cata-des">
                <p className="txt txt-18 txt-med">{props.describe}</p>
            </div>
        </>
    )
}

export default KustomerCatalogTitle;