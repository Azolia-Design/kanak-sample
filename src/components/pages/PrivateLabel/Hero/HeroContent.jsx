import './Hero.scss'
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function PrivateHeroContent(props) {
    useEffect(() => {
        const title = new SplitType(".private-hero-title", { types: 'lines, words', lineClass: 'split-line' })
        const smTitle = new SplitType(".private-hero-content-smtitle", { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(".private-hero-content-sub", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(smTitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.035), at: 0 }],
            [smTitle.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.035), at: .2 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .3 }],
        ]
        inView('.private-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
                smTitle.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <>
            <h1 className="heading txt-180 txt-black txt-up private-hero-title">{props.title[0].text}</h1>
            <div className="private-hero-content">
                <h3 className="heading h4 txt-black txt-up private-hero-content-smtitle">{props.smTitle[0].text}</h3>
                <p className="txt txt-18 txt-med private-hero-content-sub">{props.sub}</p>
            </div>
        </>
    )
}


export default PrivateHeroContent
