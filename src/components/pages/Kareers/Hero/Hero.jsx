import './Hero.scss';
import { useEffect } from 'react';
import { timeline, stagger, animate } from "motion"
import SplitType from 'split-type';

function KareersHero({ ...props }) {
    useEffect(() => {
        const title = new SplitType('.kareer-hero-title', { types: 'lines, words', lineClass: "split-line" });
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 });
        animate('.kareer-hero-bg-inner img', { transform: 'scale(1.2)', opacity: 0 }, { duration: 0 });

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.05) }],
            ['.kareer-hero-bg-inner img', { transform: 'none', opacity: 1 }, { duration: 1.2, at: 0.1 }],
        ]
        timeline(sequence).finished.then(() => {
            title.revert();
            document.querySelector('.kareer-hero-bg-inner img').removeAttribute('style')
        })
    }, []);
    return (
        <section className="kareer-hero">
            <div className="container grid">
                <h1 className="heading txt-180 txt-up txt-black kareer-hero-title">
                    {props.title}
                </h1>
            </div>
            <div className="kareer-hero-bg bg-light">
                <div className="kareer-hero-bg-inner">
                    <div className="line line-top"></div>
                    {props.heroBg}
                </div>
            </div>
        </section>
    )
}
export default KareersHero