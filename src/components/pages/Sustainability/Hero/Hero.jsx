import './Hero.scss';
import { animate, stagger, inView } from "motion";
import { useEffect, useRef } from 'react';
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function SustainHero(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.sustainable-hero-title'), { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        inView(sectionRef.current, () => {
            animate(title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04) }).finished.then(() => title.revert());
        });
    }, []);
    return(
        <section className="sustainable-hero" ref={sectionRef}>
            <div className="container">
                <h1 className="heading h0 txt-black txt-up sustainable-hero-title">
                    Pioneering <span className="txt-180">Responsibly</span> <span className="txt-180">Sourced</span> Products
                </h1>
            </div>
        </section>
    )
}
export default SustainHero;
