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
        <section className="kuspack-hero">
            <div className="container grid">
                <h1 className="heading txt-180 txt-black txt-up kuspack-hero-title">Kustom Krafted Packaging Solutions</h1>
            </div>
        </section>
    )
}

export default KustomPackagingHero