import './Hero.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function PakwayHero(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.pak-hero-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(document.querySelectorAll('.pak-hero-sub'), { types: 'lines, words', lineClass: 'split-line' })

        animate([...title.words, ...sub.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.pak-hero-img-wrap', { opacity: 0, transform: 'scale(.9)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04) }],
            [sub.words, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.01), at: .3 }],
            ['.pak-hero-img-wrap', { opacity: 1, transform: 'none' }, { duration: .8, at: .2 }],
        ]
        inView('.pak-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                sub.revert()
                q('.pak-hero-img-wrap').removeAttribute('style');
            })
        }, { margin: "-20% 0px -20% 0px" });
    }, [])
    return (
        <section className="pak-hero" ref={sectionRef}>
            <div className="container grid">
                <h1 className="heading h0 txt-up txt-black pak-hero-title">
                    {props.title}
                </h1>
                <div className="txt txt-18 txt-med pak-hero-sub">
                    {props.subtitle}
                </div>
                <div className="pak-hero-img-wrap bg-light">
                    {props.heroImg}
                </div>
            </div>
        </section>
    );
}

export default PakwayHero;