import './Industry.scss'
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion"
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function HomeIndustry(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const label = new SplitType(q('.home-indus-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.home-indus-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        const sequence = [
            [label.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.06) }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04), at: .2 }],
        ]
        inView('.home-indus-title-wrap', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" });

        animate('.home-indus-cta-inner', { opacity: 0, transform: ' scale(.9)' }, { duration: 0 })
        animate('.home-indus-cta-outer img', { opacity: 0, transform: ' scale(1.08)' }, { duration: 0 })
        const sequenceButton = [
            ['.home-indus-cta-inner', { opacity: 1, transform: 'none' }, { duration: .8 }],
            ['.home-indus-cta-outer img', { opacity: 1, transform: 'none' }, { duration: .8, at: .2 }],
        ]
        inView('.home-indus-title-wrap', () => {
            timeline(sequenceButton).finished.then(() => {
                q('.home-indus-cta-inner').removeAttribute('style')
                q('.home-indus-cta-outer img').removeAttribute('style')
            })
        }, { margin: "0px 0px -80% 0px" });

        const allItems = document.querySelectorAll('.home-indus-main-item')
        allItems.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.home-indus-main-item-title'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.home-indus-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            let itemLink = new SplitType(el.querySelector('.home-indus-main-item-link span'), { types: 'lines, chars', lineClass: 'split-line' })

            animate(el.querySelector('.line'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.home-indus-main-item-ic'), { opacity: 0, transform: 'scale(.8) translateY(15%)' }, { duration: 0 })
            animate([...itemTitle.chars, ...itemSub.words, ...itemLink.chars], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 });
            animate(el.querySelector('.home-indus-main-item-link svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

            if (idx == allItems.length - 1) {
                animate(el.querySelector('.line-bottom'), { scaleX: 0 }, { duration: 0 })
            }
            const sequenceItem = [
                [el.querySelector('.line'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.home-indus-main-item-ic'), { opacity: 1, transform: 'none' }, { duration: 1.4, at: .2 }],
                [itemTitle.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .3 }],
                [itemLink.chars, { opacity: 1, transform: 'none' }, { duration: 1.2, delay: stagger(.005), at: .4 }],
                [el.querySelector('.home-indus-main-item-link svg'), { opacity: 1, transform: "none" }, { duration: .8, at: "-.8" }],
                [idx == allItems.length - 1 && el.querySelector('.line-bottom'), { scaleX: 1 }, { duration: .9, at: .3 }]
            ]
            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    el.querySelector('.line').removeAttribute('style')
                    el.querySelector('.home-indus-main-item-ic').removeAttribute('style')
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('.home-indus-main-item-link svg').removeAttribute('style')
                    itemLink.revert()
                    if (idx == allItems.length - 1) {
                        el.querySelector('.line-bottom').removeAttribute('style')
                    }
                })
            }, { margin: "-30% 0px -30% 0px" });
        });
    }, [])
    return (
        <section className="home-indus bg-dark" ref={sectionRef}>
            <div className="container grid">
                <div className="home-indus-title-wrap">
                    <div className="home-indus-title-stick">
                        <p className="heading h4 txt-up txt-black home-indus-label">{props.label}</p>
                        <h2 className="heading h0 txt-up txt-black home-indus-title">{props.title}</h2>
                        <div className="home-indus-cta-wrap">
                            <a href="/contact" className="arr-link home-indus-cta" data-cursor="hide">
                                <div className="home-indus-cta-inner">
                                    <div className="ic ic-40 ic-main">
                                        <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10"/>
                                            <path d="M12 5H35V28" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </svg>
                                    </div>
                                    <div className="ic ic-40 ic-clone">
                                        <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10"/>
                                            <path d="M12 5H35V28" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className="home-indus-cta-outer">{props.ctaTxt}</div>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="home-indus-main">
                    <div className="home-indus-main-list">
                        {props.listServices}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HomeIndustry