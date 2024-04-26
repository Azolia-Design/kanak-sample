import './Solution.scss'
import { useEffect, useRef } from 'react';
import { animate, timeline, stagger, inView } from "motion"
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function KustomPackagingSolution(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const label = new SplitType(q('.kuspack-solution-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.kuspack-solution-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(q('.kuspack-solution-sub'), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.1), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04), at: .2 }],
            [sub.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.005), at: .4 }],
        ]
        inView('.kuspack-solution-title-wrap', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
                sub.revert()
            })
        }, { margin: "-20% 0px -20% 0px" });

        const allItems = document.querySelectorAll('.kuspack-solution-main-item')
        allItems.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.kuspack-solution-main-item-title'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kuspack-solution-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            let itemLink = new SplitType(el.querySelector('.kuspack-solution-main-item-link'), { types: 'lines, chars', lineClass: 'split-line' })

            animate(el.querySelector('.line'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.kuspack-solution-main-item-ic'), { opacity: 0, transform: 'scale(.8) translateY(15%)' }, { duration: 0 })
            animate([...itemTitle.chars, ...itemSub.words, ...itemLink.chars], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 });
            if (idx == allItems.length - 1) {
                animate(el.querySelector('.line-bottom'), { scaleX: 0 }, { duration: 0 })
            }
            const sequenceItem = [
                [el.querySelector('.line'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.kuspack-solution-main-item-ic'), { opacity: 1, transform: 'none' }, { duration: 1.4, at: .2 }],
                [itemTitle.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .3 }],
                [itemLink.chars, { opacity: 1, transform: 'none' }, { duration: 1.2, delay: stagger(.005), at: .4 }],
                [idx == allItems.length - 1 && el.querySelector('.line-bottom'), { scaleX: 1 }, { duration: .9, at: .3 }]
            ]
            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    el.querySelector('.line').removeAttribute('style')
                    el.querySelector('.kuspack-solution-main-item-ic').removeAttribute('style')
                    itemTitle.revert()
                    itemSub.revert()
                    itemLink.revert()
                    if (idx == allItems.length - 1) {
                        el.querySelector('.line-bottom').removeAttribute('style')
                    }
                })
            }, { margin: "-30% 0px -30% 0px" });
        });
    }, [])
    return (
        <section className="kuspack-solution bg-dark" ref={sectionRef}>
            <div className="container grid">
                <div className="kuspack-solution-title-wrap">
                    <div className="kuspack-solution-title-stick">
                        <p className="heading h4 txt-up txt-black kuspack-solution-label">{props.label}</p>
                        <h2 className="heading h0 txt-up txt-black kuspack-solution-title">{props.title}</h2>
                        <div className="txt txt-18 txt-med kuspack-solution-sub">{props.sub}</div>
                    </div>
                </div>
                <div className="kuspack-solution-main">
                    <div className="kuspack-solution-main-list">
                        {props.listServices}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default KustomPackagingSolution