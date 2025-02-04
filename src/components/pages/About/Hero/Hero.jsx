import './Hero.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function AboutHero({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.abt-hero-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(document.querySelectorAll('.abt-hero-sub'), { types: 'lines, words', lineClass: 'split-line' })

        animate([...title.words, ...sub.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.abt-hero-img-wrap', { opacity: 0, transform: 'scale(.9)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04) }],
            [sub.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .3 }],
            ['.abt-hero-img-wrap', { opacity: 1, transform: 'none' }, { duration: .8, at: .2 }],
        ]
        inView('.abt-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                sub.revert()
                q('.abt-hero-img-wrap').removeAttribute('style');
            })
        }, { margin: "-20% 0px -20% 0px" });
    }, [])
    return (
        <section className="abt-hero" ref={sectionRef}>
            <div className="container grid">
                <h1 className="heading txt-180 txt-up txt-black abt-hero-title">{props.title}</h1>
                <div className="txt txt-18 txt-med abt-hero-sub">{props.subtitle}</div>
                <div className="abt-hero-img-wrap bg-light">
                    {props.thumbnail}
                </div>
            </div>
        </section>
    );
}

export default AboutHero;