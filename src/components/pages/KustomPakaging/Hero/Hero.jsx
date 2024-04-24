import './Hero.scss'
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function KustomPackagingHero({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".kuspack-hero-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.035), at: 0 }],
        ]
        inView('.kuspack-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])

    return (
        <h1 className="heading txt-180 txt-black txt-up kuspack-hero-title">{props.title[0].text}</h1>
    )
}

export default KustomPackagingHero