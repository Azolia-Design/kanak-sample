import { useEffect, forwardRef, useRef } from 'react';
import './Practice.scss';
import * as ut from '@/js/utils.js';
import SplitType from 'split-type';
import { stagger, inView, animate, timeline } from "motion";
import ArrowUpRight from '@components/globals/IcArrow/ArrowUpRight';
import useWindowSize from '@hooks/useWindowSize';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (
        <div ref={ref} className={`heading h0 txt-black txt-up sustainable-practice-title-grp title-bot ${props.abs ? 'clone-el' : ''}`} style={props.abs && { position: 'absolute'}}>
            {props.children}
        </div>
    )
})

function SustainPractice(props) {
    const el = useRef()
    const cloneEl = useRef();
    const { width, height } = useWindowSize();

    useEffect(() => {
        const titleTop = new SplitType('.sustainable-practice-title-grp:not(.title-bot)', { types: 'lines, words', lineClass: 'split-line' })
        const titleBot = new SplitType('.sustainable-practice-title-grp.title-bot.clone-el', { types: 'lines, words', lineClass: "split-line" });

        // const title = new SplitType('.sustainable-practice-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.sustainable-practice-subtitle', { types: 'lines, words', lineClass: "split-line" });
        const link = new SplitType('.sustainable-practice-link .txt', { types: 'lines, words', lineClass: 'split-line' })

        animate([...titleTop.words, ...titleBot.words, ...subTitle.words, ...link.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate(".sustainable-practice-link svg", { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

        const sequence = [
            [[...titleTop.words, ...titleBot.words], {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}],
            [subTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.005), at: '<'}],
            [link.words, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.01), at: .3 }],
            [".sustainable-practice-link svg", { opacity: 1, transform: 'none' }, { duration: .4, at: .35 }]
        ]
        inView('.sustainable-practice', () => {
            timeline(sequence).finished.then(() => {
                titleTop.revert()
                titleBot.revert()
                subTitle.revert();
                link.revert();
                document.querySelector(".sustainable-practice-link svg").removeAttribute('style')
            })
        }, { margin: "-30% 0px -30% 0px" });

        document.querySelectorAll('.sustainable-practice-item').forEach((item) => {
            const itemTitle = new SplitType(item.querySelector('.sustainable-practice-item-title'), { types: 'lines, words', lineClass: "split-line" });
            const itemDesc = new SplitType(item.querySelector('.sustainable-practice-item-desc'), { types: 'lines, words', lineClass: "split-line" });

            animate([...itemTitle.words, ...itemDesc.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
            animate(item.querySelectorAll('.sustainable-practice-item-ic .ic'), { opacity: 0, transform: 'scale(.8) translateY(15%)' }, { duration: 0 })
            item.querySelector('.line') && animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

            const itemSequence = [
                [item.querySelectorAll('.sustainable-practice-item-ic .ic'), { opacity: 1, transform: 'none' }, { duration: 1, delay: stagger(.05), at: .2 }],
                [itemTitle.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05), at: '<'}],
                [itemDesc.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.005), at: '<'}],
                [item.querySelector('.line'), { scaleX: 1 }, {duration: .8, at: '<'}]
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    itemTitle.revert()
                    itemDesc.revert();
                    item.querySelector('.line') && item.querySelector('.line').removeAttribute('style');
                    item.querySelectorAll('.sustainable-practice-item-ic .ic').forEach((ic) => ic.removeAttribute('style'));
                })
            }, { margin: "-40% 0px -40% 0px" });
        })
    }, [])

    useEffect(() => {
        const elRect = ut.offset(el.current);
        cloneEl.current.style.cssText = `
            position: absolute;
            top: ${elRect.top}px;
            left: ${elRect.left}px;
            z-index: 3
        `;
    }, [width, height])
    return (
        <>
            <section className="sustainable-practice">
                <div className="container">
                    <div className="sustainable-practice-wrap">
                        <h2 className='heading h0 txt-black txt-up sustainable-practice-title'>
                            {/* {props.title} */}
                            <TextEl ref={el}>
                                Our
                            </TextEl>
                            <div className='sustainable-practice-title-grp'>
                                <span className="txt-green">Sustainability</span> <span>Practices</span>
                            </div>
                        </h2>
                        <p className='txt txt-18 txt-med sustainable-practice-subtitle'>{props.subtitle}</p>
                        <a href="/about" className='txt-link sustainable-practice-link' data-cursor="txtLink">
                            <span className='txt txt-18 txt-bold'>Get to Know Us</span>
                            <ArrowUpRight />
                        </a>
                    </div>
                </div>
                <div className='container grid'>
                    <div className='sustainable-practice-listing'>
                        {props.list}
                    </div>
                </div>
            </section>
            <TextEl ref={cloneEl} abs={true}>
                Our
            </TextEl >
        </>
    )
}
export default SustainPractice;