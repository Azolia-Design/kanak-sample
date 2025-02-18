import './Hero.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function AviraHero(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.avi-hero-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(document.querySelectorAll('.avi-hero-sub'), { types: 'lines, words', lineClass: 'split-line' })

        animate([...title.words, ...sub.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.avi-hero-img-wrap', { opacity: 0, transform: 'scale(.9)' }, { duration: 0 })
        animate('.avi-hero-brc', { opacity: 0, transform: 'translateY(40%)' }, { duration: 0 })
        const sequence = [
            ['.avi-hero-brc', { opacity: 1, transform: 'none' }, { duration: .8 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04), at: .2 }],
            [sub.words, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.01), at: .3 }],
            ['.avi-hero-img-wrap', { opacity: 1, transform: 'none' }, { duration: .8, at: .2 }],
        ]
        inView('.avi-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                sub.revert()
                q('.avi-hero-img-wrap').removeAttribute('style');
                q('.avi-hero-brc').removeAttribute('style');
            })
        }, { margin: "-20% 0px -20% 0px" });
    }, [])
    return (
        <section className="avi-hero" ref={sectionRef}>
            <div className="container grid">
                <div className="avi-hero-brc">
                    <div className="avi-hero-brc-img">
                        {props.brcLogo}
                    </div>
                    
                </div>
                <h1 className="heading h0 txt-up txt-black avi-hero-title">
                    {props.title}
                </h1>
                <div className="txt txt-18 txt-med avi-hero-sub">
                    {props.subtitle}
                </div>
                
                <div className="avi-hero-img-wrap bg-light">
                    {props.heroImg}
                </div>
            </div>
        </section>
    );
}

export default AviraHero;