import './Value.scss';
import { animate, timeline, stagger, inView, scroll } from "motion"
import * as ut from '@/js/utils.js';
import SplitType from 'split-type';
import { useEffect, useRef } from 'react';

function HomeValue(props) {
    const ref = useRef()
    useEffect(() => {
        let allItems = ut.dom('.home-val-main-item');
        if (window.innerWidth > 767) {
            let totalDis = 0;
            allItems.forEach(el => totalDis += el.clientWidth)
            let disWrap = ut.dom('.home-val-main-inner').clientWidth
            let offset = disWrap - allItems[allItems.length - 1].clientWidth
            let dis1 = allItems[0].clientWidth - (offset / 2);
            let dis2 = totalDis - disWrap
            const itemSequence = [
                [[allItems[1], allItems[2]], { x: [0, -dis1] }, { easing: 'linear' }],
                [[...allItems[1].childNodes].filter(child => !child.classList.contains('line')), { x: [0, -ut.parseRem(25)] }, { easing: 'linear', at: '<' }],
                [allItems[2], { x: [0, -dis2] }, { easing: 'linear' }],
                [[...allItems[2].childNodes].filter(child => !child.classList.contains('line')), { x: [0, -ut.parseRem(25)] }, { easing: 'linear', at: '<' }],
            ]
            scroll(timeline(itemSequence), {
                target: document.querySelector('.home-val'),
                offset: [`${document.querySelector('.home-val-main').offsetTop}px start`, `${document.querySelector('.home-val').clientHeight - window.innerHeight * 1.1}px end`]
            })
            scroll(
                animate('.home-part-stick .home-part-inner', { scale: [1, .8], opacity: [1, .2] }, { easing: 'ease-in', at: '<' }), {
                target: document.querySelector('.home-val-arr'),
                offset: ['start end', `${document.querySelector('.home-val-arr').clientHeight * 1.8}px end`]
            }
            )
            scroll(
                animate('.home-val-arr-inner', { scale: [.2, 1], transformOrigin: 'center top' }, { easing: 'linear' }), {
                target: document.querySelector('.home-val-arr'),
                offset: ['start end', `${window.innerWidth > 991 ? document.querySelector('.home-val-arr').clientHeight * .95 + 'px' : 'end'} end`]
            }
            )
        }

        if (window.innerWidth > 991) {
            scroll(
                animate('.home-val-title', { scale: [.5, 1], y: [-1 * (window.innerHeight * .5), 0] }, { easing: 'linear' }), {
                target: document.querySelector('.home-val-title-wrap'),
                offset: ['start end', 'end end']
            }
            )
        }

        let mainTitle = new SplitType('.home-val-title', { types: 'lines, words', lineClass: 'split-line' })
        animate(mainTitle.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })
        inView('.home-val-title-wrap', () => {
            animate(mainTitle.words, { transform: 'none', opacity: 1 }, { duration: .6, delay: stagger(.03) }).finished.then(() => {
                mainTitle.revert()
            })
        }, { margin: "-30% 0px -30% 0px" })

        allItems.forEach((el, idx) => {
            let itemNumber = new SplitType(el.querySelector('.home-val-main-item-num'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemTitle = new SplitType(el.querySelector('.home-val-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.home-val-main-item-sub'), { types: 'lines', lineClass: 'split-line' })
            let itemLink = new SplitType(el.querySelector('.home-val-main-item-link .txt'), { types: 'lines, chars', lineClass: 'split-line' })
            animate(el.querySelector('.home-val-main-item-ic'), { opacity: 0, scale: 0.8 }, { duration: 0 })
            animate(el.querySelector('.home-val-main-item-link .ic'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })
            if (idx != 0) {
                animate(el.querySelector('.line.line-left'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
            }
            animate([...itemNumber.chars, ...itemTitle.words, ...itemSub.lines, ...itemLink.chars], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            const sequence = [
                [itemNumber.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01) }],
                [itemTitle.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.01), at: .1 }],
                [itemSub.lines, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .3 }],
                [itemLink.chars, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.008), at: .2 }],
                [el.querySelector('.home-val-main-item-ic'), { opacity: 1, scale: 1 }, { duration: 1, at: .5 }],
                [el.querySelector('.home-val-main-item-link .ic'), { opacity: 1, transform: "none" }, { duration: .6, at: .4 }],
                [idx != 0 && el.querySelector('.line.line-left'), { scaleY: 1 }, { duration: 1, at: 0 }]
            ]
            inView(el, () => {
                timeline(sequence, { delay: idx % 2 == 0 ? 0 : idx * .2 }).finished.then(() => {
                    el.querySelector('.home-val-main-item-ic').removeAttribute('style')
                    idx != 0 && el.querySelector('.line.line-left').removeAttribute('style')
                    itemNumber.revert()
                    itemTitle.revert()
                    itemSub.revert()
                    itemLink.revert()
                })
            }, { margin: "-30% -10% -30% -10%" })
        })
    }, [])

    return (
        <div className="home-val-wrap" ref={ref}>
            <div className="home-val-arr">
                <div className="home-val-arr-inner">
                    <svg width="1728" height="1325" viewBox="0 0 1728 1325" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <mask id="svgmask1">
                            <path fillRule="evenodd" mask="url(#svgmask1)" clipRule="evenodd" d="M1033 210.787L864.558 0L696.114 210.787H797.029C789.32 480.211 619.781 1012 0 1012V1325H862.635H865.365H1728V1012C1108.22 1012 938.68 480.211 930.971 210.787H1033Z" fill="white" />
                        </mask>
                        <g clipPath="url(#clip0_1002_23544)" mask="url(#svgmask1)">
                            <rect width="100%" height="100%" fill="var(--cl-bg-dark)" className="bg-dark" />
                            <rect width="1728" height="1325" fill="url(#pattern0)" fillOpacity="1" />
                        </g>
                        <defs>
                            <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="0.16956" height="0.22717">
                                <use xlinkHref="#image01" transform="scale(0.000289352 0.000377358)" />
                            </pattern>
                            <clipPath id="clip0_1002_23544">
                                <rect width="1728" height="1325" fill="white" />
                            </clipPath>
                            <image id="image01" width="586" height="602" xlinkHref={props.bgText.src} />
                        </defs>
                    </svg>
                </div>
            </div>
            <section className="home-val bg-dark" style={{ '--offsetMargin': '100vh' }}>
                <div className="home-val-stick">
                    <div className="container">
                        <div className="home-val-title-wrap">
                            <h2 className="heading h0 txt-up txt-black home-val-title">
                                {props.label} <br /><span className="txt txt-180">{props.title}</span>
                            </h2>
                        </div>
                    </div>
                    <div className="home-val-main">
                        <div className="container">
                            <div className="home-val-main-wrap">
                                <div className="line line-top"></div>
                                <div className="home-val-main-inner">
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
export default HomeValue;