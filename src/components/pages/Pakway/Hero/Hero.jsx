import './Hero.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function PakwayHero({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.pak-hero-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(document.querySelectorAll('.pak-hero-sub'), { types: 'lines, words', lineClass: 'split-line' })

        animate([...title.words, ...sub.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate('.pak-hero-img-wrap', { opacity: 0, transform: 'scale(.9)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04) }],
            [sub.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .3 }],
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
                    Pakway: Turning Waste into Worth
                </h1>
                <div className="pak-hero-sub-wrap">
                    <p className="txt txt-18 txt-med pak-hero-sub">
                        Pakway, a UK-based company recently acquired by Kanak Naturals, leads the packaging industry with its specialized production of rPET food packaging. This partnership focuses on repurposing ocean-bound plastics into high-quality, responsibly sourced products, meeting global sustainability demands.
                    </p>
                    <p className="txt txt-18 txt-med pak-hero-sub">
                        By innovating recycling processes, Pakway ensures each package not only contributes to a cleaner planet but also exemplifies significant environmental stewardship. Together, we're transforming waste into valuable resources, making a tangible impact—one package at a time.
                    </p>
                </div>
                <div className="pak-hero-img-wrap bg-light">
                    {props.heroImg}
                </div>
            </div>
        </section>
    );
}

export default PakwayHero;