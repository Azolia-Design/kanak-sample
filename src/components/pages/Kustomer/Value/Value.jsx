import './Value.scss';
import { animate, timeline, stagger, inView, scroll } from "motion"
import * as ut from '@/js/utils.js';
import SplitType from 'split-type';
import { useEffect, useRef } from 'react';
import { cleanText } from '@utils/text';

function KustomerValue(props) {
    const ref = useRef();
    useEffect(() => {
        let allItems = ut.dom('.kustomer-val-main-item');

        let mainTitle = new SplitType('.kustomer-val-title', { types: 'lines, words', lineClass: 'split-line' });
        let subTitle = new SplitType('.kustomer-val-subtitle', { types: 'lines, words', lineClass: 'split-line' });

        animate(mainTitle.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })
        animate(subTitle.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })

        const titleSequence = [
            [mainTitle.words, { transform: 'none', opacity: 1 }, { duration: .6, delay: stagger(.03) }],
            [subTitle.words, { transform: 'none', opacity: 1 }, { duration: .8, delay: stagger(.006), at: .1 }],
        ]
        inView('.kustomer-val-title-wrap', () => {
            timeline(titleSequence).finished.then(() => {
                mainTitle.revert()
                subTitle.revert()
            })
        }, { margin: "-30% 0px -30% 0px" })

        allItems.forEach((el, idx) => {
            let itemLabel = new SplitType(el.querySelector('.kustomer-val-main-item-label'), { types: 'lines, words, chars', lineClass: 'split-line' })
            let itemTitle = new SplitType(el.querySelector('.kustomer-val-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kustomer-val-main-item-sub'), { types: 'lines', lineClass: 'split-line' })
            let itemLink = new SplitType(el.querySelector('.kustomer-val-main-item-link .txt'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.kustomer-val-main-item-ic'), { opacity: 0, scale: 0.8 }, { duration: 0 })
            if (idx != 0) {
                animate(el.querySelector('.line.line-left'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
            }
            animate([...itemLabel.chars, ...itemTitle.words, ...itemSub.lines, ...itemLink.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(el.querySelector('.kustomer-val-main-item-link svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })
            const sequence = [
                [itemLabel.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.008) }],
                [itemTitle.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .1 }],
                [itemSub.lines, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .3 }],
                [itemLink.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.04), at: .2 }],
                [el.querySelector('.kustomer-val-main-item-link svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: .4 }],
                [idx != 0 && el.querySelector('.line.line-left'), { scaleY: 1 }, { duration: 1, at: 0 }]
            ]

            if (window.innerWidth > 767) {
                sequence.push(
                    [el.querySelector('.kustomer-val-main-item-ic'), { opacity: 1, scale: 1 }, { duration: 1, at: .5 }],
                )
            } else {
                sequence.push(
                    [el.querySelector('.kustomer-val-main-item-ic'), { opacity: 1, scale: 1 }, { duration: 1, at: .1 }],
                )
            }
            inView(el, () => {
                timeline(sequence, { delay: idx % 2 == 0 ? 0 : idx * .2 }).finished.then(() => {
                    el.querySelector('.kustomer-val-main-item-ic').removeAttribute('style')
                    idx != 0 && el.querySelector('.line.line-left').removeAttribute('style')
                    itemLabel.revert()
                    itemTitle.revert()
                    itemSub.revert()
                    itemLink.revert()
                    document.querySelectorAll('.kustomer-val-main-item-link svg').forEach(item => item.removeAttribute('style'))
                })
            }, { margin: "-30% -10% -30% -10%" })
        })
    }, [])
    return (
        <div className="kustomer-val-wrap" ref={ref}>
            <section className="kustomer-val bg-dark">
                <div className="kustomer-val-stick">
                    <div className="container">
                        <div className="kustomer-val-title-wrap">
                            <h2 className="heading h0 txt-up txt-black kustomer-val-title">
                                {props.title}
                            </h2>
                            <p className='heading h6 txt-black txt-up kustomer-val-subtitle'>{props.describe}</p>
                        </div>
                    </div>
                    <div className="kustomer-val-main">
                        <div className="container">
                            <div className="kustomer-val-main-wrap">
                                <div className="line line-top"></div>
                                <div className="kustomer-val-main-inner">
                                    {props.list}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
export default KustomerValue;