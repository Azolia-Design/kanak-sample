import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

import { useEffect } from "react"
import "./Hero.scss"

function KatalogHero({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".katalog-hero-title", { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(".katalog-hero-subtitle", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })


        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .1 }],
        ]
        inView('.katalog-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="katalog-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up katalog-hero-title">{props.title}</h1>
                <div className="txt txt-20 txt-black txt-up katalog-hero-subtitle">{props.newSub}</div>
            </div>
        </section>
    )
}

export default KatalogHero
