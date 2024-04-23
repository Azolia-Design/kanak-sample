import './Hero.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function AboutHero({...props}) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.abt-hero-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(document.querySelectorAll('.abt-hero-sub'), { types: 'lines, words', lineClass: 'split-line' })

        animate([...title.words, ...sub.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate('.abt-hero-img-wrap', {opacity: 0, transform: 'scale(.9)'}, {duration: 0})
        const sequence = [
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.04)}],
            [sub.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.01), at: .3}],
            ['.abt-hero-img-wrap', {opacity: 1, transform: 'none'}, {duration: .8, at: .2}],
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
                <h1 className="heading txt-180 txt-up txt-black abt-hero-title">
                    Know us
                </h1>
                <div className="abt-hero-sub-wrap">
                    <p className="txt txt-20 txt-med abt-hero-sub">
                        Founded in 2005, Kanak embarked on a mission to harness the untapped potential of sugarcane and bamboo, crafting Eco-conscious consumer goods that do not compromise on quality or functionality.
                    </p>
                    <p className="txt txt-20 txt-med abt-hero-sub">
                        Family-owned and proudly debt-free, we wave the flag for the planet over profit, crafting quality that doesn't bow down to the convenience of wastefulness.
                    </p>
                </div>
                <div className="abt-hero-img-wrap bg-light">
                    {props.heroImg}
                </div>
            </div>
        </section>
    );
}

export default AboutHero;