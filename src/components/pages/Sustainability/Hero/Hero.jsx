import './Hero.scss';
import * as ut from '@/js/utils.js';
import { animate, stagger, inView } from "motion";
import { useEffect, useRef, forwardRef } from 'react';
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';
import useWindowSize from '@hooks/useWindowSize';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (
        <div ref={ref} className={`heading h0 txt-black txt-up sustainable-hero-title-grp title-bot ${props.abs ? 'clone-el' : ''}`} style={props.abs && { position: 'absolute'}}>
            {props.children}
        </div>
    )
})

function SustainHero(props) {
    const sectionRef = useRef();
    const el = useRef()
    const cloneEl = useRef();
    const q = useSelector(sectionRef);
    const { width, height } = useWindowSize();
    useEffect(() => {
        const titleTop = new SplitType(q('.sustainable-hero-title-grp:not(.title-bot)'), { types: 'lines, words', lineClass: 'split-line' })
        const titleBot = new SplitType('.sustainable-hero-title-grp.title-bot.clone-el', { types: 'lines, words', lineClass: "split-line" });
        animate([...titleTop.words, ...titleBot.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})

        inView(sectionRef.current, () => {
            animate([...titleTop.words, ...titleBot.words], { opacity: 1, transform: ['translateY(100%)', 'none'] }, { duration: .8, delay: stagger(.04) }).finished.then(() => {
                // titleTop.revert();
                // titleBot.revert();
            });
        })
    }, []);

    useEffect(() => {
        const elRect = ut.offset(el.current);
        cloneEl.current.style.cssText = `
            position: absolute;
            top: ${elRect.top}px;
            left: ${elRect.left}px;
            z-index: 999
        `;
        console.log(elRect);
    }, [width, height])
    return(
        <>
            <section className="sustainable-hero" ref={sectionRef}>
                <div className="container">
                    <h1 className="heading h0 txt-black txt-up sustainable-hero-title">
                        <div className='sustainable-hero-title-grp'>
                            Pioneering <span className="txt-180">Responsibly</span>
                        </div>
                        <TextEl ref={el}>
                            <span className="txt-180">Sourced</span> <span>Products</span>
                        </TextEl>
                    </h1>
                </div>
            </section>
            <TextEl ref={cloneEl} abs={true}>
                <span className="txt-180">Sourced</span> <span>Products</span>
            </TextEl >
        </>
    )
}
export default SustainHero;
