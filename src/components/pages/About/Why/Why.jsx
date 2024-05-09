import './Why.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';
import { delay, transform } from 'framer-motion';

function AboutWhy(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {

        // Anim Title
        const label = new SplitType(q('.abt-why-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.abt-why-title'), { types: 'lines, words', lineClass: 'split-line' })
        let linkTxt;
        if (window.innerWidth > 991) {
            linkTxt = new SplitType(q('.abt-why-link.mod-dk span'), { types: 'lines, words', lineClass: 'split-line' })
            animate(q('.abt-why-link.mod-dk svg'), { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })
        } else {
            linkTxt = new SplitType(q('.abt-why-link.mod-tb span'), { types: 'lines, words', lineClass: 'split-line' })
            animate(q('.abt-why-link.mod-tb svg'), { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })
        }
        animate(linkTxt.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate([...label.words, ...title.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(q('.line-ver'), { transformOrigin: 'top', scaleY: 0 }, { duration: 0 })
        const sequence = [
            [q('.line-ver'), { scaleY: 1 }, { duration: 1.2, at: 0 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.1), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
            [linkTxt.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.1), at: .14 }],
            [q('.abt-why-link.mod-dk svg'), { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.1), at: .24 }],
            [q('.abt-why-link.mod-tb svg'), { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.1), at: .24 }],
        ]
        inView('.abt-why', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
                q('.line-ver').removeAttribute('style')
                q('.abt-why-link.mod-tb svg').removeAttribute('style')
                q('.abt-why-link.mod-dk svg').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" });


        // Anim Item
        animate(q('.abt-why-img-wrap'), { opacity: 0, scale: .9 }, { duration: 0 })

        
        const subtitle = new SplitType('.abt-why-body', { types: 'lines, words', lineClass: 'split-line' })
        animate(subtitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const itemSequence = [
            [q('.abt-why-img-wrap'), { opacity: 1, scale: 1 }, { duration: .6, at: 0 }],
            [subtitle.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.005), at: 1 }]
        ]

        inView(".abt-why-content-wrap", () => {
            timeline(itemSequence).finished.then(() => {
                q('.abt-why-img-wrap').removeAttribute('style')
                subtitle.revert();
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="abt-why" ref={sectionRef}>
            <div className="container grid">
                <div className="abt-why-title-wrap">
                    <div className="heading h4 txt-black txt-up abt-why-label">
                        Why Kanak?
                    </div>
                    <h2 className="heading h0 txt-black txt-up abt-why-title">
                        Pioneering a Sustainable Future with Every Product
                    </h2>
                    <a href="/katalog" className="txt txt-18 txt-bold abt-why-link txt-link mod-dk" data-cursor="txtLink">
                        <span>View Product Katalog</span>
                        <div className="ic ic-16">
                            {props.icArrExt}
                        </div>
                    </a>
                    <div className="line-ver"></div>
                </div>
                <div className="abt-why-content-wrap">
                    <div className="abt-why-img-wrap">{props.thumbnail}</div>
                    <div className="abt-why-body-wrap">
                        <div className="txt txt-18 txt-med abt-why-body">
                            {props.subtitle}
                        </div>
                        <a href="./katalog" className="txt txt-18 txt-bold abt-why-link txt-link mod-tb" data-cursor="txtLink">
                            <span>View Product Katalog</span>
                            <div className="ic ic-16">
                                {props.icArrExt}
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default AboutWhy;