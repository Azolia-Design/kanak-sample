import './Hero.scss';
import { useEffect } from 'react'
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function ComplianceHero({ ...props }) {

    useEffect(() => {
        const title = new SplitType(".complian-hero-title", { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(".complian-hero-sub", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.complian-hero-img-inner img', { transform: 'scale(1.2)', opacity: 0 }, { duration: 0 });

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.035), at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .1 }],
            ['.complian-hero-img-inner img', { transform: 'none', opacity: 1 }, { duration: 1.2, at: 0.1 }],

        ]
        inView('.complian-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
                document.querySelector('.complian-hero-img-inner img').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <section className='complian-hero'>
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up complian-hero-title">{props.title[0].text}</h1>
                <div className="txt txt-20 txt-med complian-hero-sub">{props.sub}</div>
            </div>
            <div className="complian-hero-img">
                <div className="line"></div>
                <div className="complian-hero-img-inner">
                    {props.heroBg}
                </div>
            </div>
        </section>
    )
}

export default ComplianceHero