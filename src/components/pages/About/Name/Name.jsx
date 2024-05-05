import './Name.scss';
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';
import { transform } from 'framer-motion';

function AboutName({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.abt-name-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04) }],
        ]
        inView('.abt-name-title', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" });
        scroll(({ y }) => {
            animate('.abt-name-img-inner', { transform: `scale(${window.innerWidth > 767 ? (y.progress * (1 - .22)) + .22 : (y.progress * (1 - .42)) + .42})` }, { duration: 0 })
            animate('.abt-name-img-inner img', { transform: `scale(${(y.progress * - .1) + 1.1})` }, { duration: 0 })
        }, {
            target: q('.abt-name-img-wrap'),
            offset: window.innerWidth > 991 ? ['start end', 'end end'] : ['start end', 'center center']
        })

        const mainTitle = new SplitType(q('.abt-name-main-title'), { types: 'lines, words', lineClass: 'split-line' })
        animate(mainTitle.words, { opacity: .2, transform: "translateY(100%)" }, { duration: 0 });

        const titleAnimsequence = [
            [mainTitle.words, { transform: "none" }, { duration: .6, delay: stagger(.01), at: 0 }],
        ]
        inView(q('.abt-name-main-title'), () => {
            timeline(titleAnimsequence)
        }, { margin: "-10% 0px -10% 0px" })
        const titleColorsequence = [
            [mainTitle.words, { opacity: 1 }, { duration: .4, delay: stagger(.1), easing: 'linear' }],
        ]
        scroll(timeline(titleColorsequence), {
            target: q('.abt-name-main-title'),
            offset: ['start end', 'start start']
        })
    }, [])
    return (
        <section className="abt-name" ref={sectionRef}>
            <div className="container">
                <div className="abt-name-content-wrap">
                    <h2 className="heading h0 txt-up txt-black abt-name-title">
                        Why the name “Kanak”?
                    </h2>
                    <div className="abt-name-img-wrap">
                        <div className="abt-name-img-inner">
                            {props.nameImg}
                        </div>
                    </div>
                </div>
            </div>
            <div className="abt-name-main bg-dark">
                <div className="container grid">
                    <h3 className="heading h2 txt-black txt-up abt-name-main-title">
                        Our name, Kanak—a palindrome that means "gold" in Sanskrit and a symbol of life and nutrition - reflects that life, after all, is a circle, and everything we kreate boasts a positive beginning and end-of-life story.
                    </h3>
                </div>
            </div>
        </section>
    );
}

export default AboutName;