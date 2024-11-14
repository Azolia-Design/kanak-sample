import './Quality.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';
import { transform } from 'framer-motion';

function AviQuality({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.avi-miss-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04) }],
        ]
        inView('.avi-miss-title', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" });
        scroll(({ y }) => {
            animate('.avi-miss-img-inner', { transform: `scale(${window.innerWidth > 767 ? (y.progress * (1 - .22)) + .22 : (y.progress * (1 - .42)) + .42})` }, { duration: 0 })
            animate('.avi-miss-img-inner img', { transform: `scale(${(y.progress * - .1) + 1.1})` }, { duration: 0 })
        }, {
            target: q('.avi-miss-img-wrap'),
            offset: window.innerWidth > 991 ? ['start end', 'end end'] : ['start end', 'center center']
        })

        const mainTitle = new SplitType(q('.avi-miss-main-title'), { types: 'lines, words', lineClass: 'split-line' })
        animate(mainTitle.words, { opacity: .2, transform: "translateY(100%)" }, { duration: 0 });

        const titleAnimsequence = [
            [mainTitle.words, { transform: "none" }, { duration: .6, delay: stagger(.01), at: 0 }],
        ]
        inView(q('.avi-miss-main-title'), () => {
            timeline(titleAnimsequence)
        }, { margin: "-10% 0px -10% 0px" })
        const titleColorsequence = [
            [mainTitle.words, { opacity: 1 }, { duration: .4, delay: stagger(.1), easing: 'linear' }],
        ]
        scroll(timeline(titleColorsequence), {
            target: q('.avi-miss-main-title'),
            offset: ['start end', 'start start']
        })
    }, [])
    return (
        <section className="avi-miss" ref={sectionRef}>
            <div className="container">
                <div className="avi-miss-content-wrap">
                    <h2 className="heading h0 txt-up txt-black avi-miss-title">
                        {props.title}
                    </h2>
                    <div className="avi-miss-img-wrap">
                        <div className="avi-miss-img-inner">
                            {props.thumbnail}
                        </div>
                    </div>
                </div>
            </div>
            <div className="avi-miss-main bg-dark">
                <div className="container grid">
                    <h3 className="heading h2 txt-black txt-up avi-miss-main-title">
                        {props.subtitle}
                    </h3>
                </div>
            </div>
        </section>
    );
}

export default AviQuality;