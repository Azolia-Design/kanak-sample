import { useEffect } from 'react';
import './Practice.scss';
import SplitType from 'split-type';
import { stagger, inView, animate, timeline } from "motion";
import ArrowUpRight from '@components/globals/IcArrow/ArrowUpRight';
import IcDown from '@/components/globals/IcArrow/ArrowDown';

function SustainPractice(props) {
    useEffect(() => {
        const title = new SplitType('.sustainable-practice-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.sustainable-practice-subtitle', { types: 'lines, words', lineClass: "split-line" });
        const link = new SplitType('.sustainable-practice-link .txt', { types: 'lines, words', lineClass: 'split-line' })

        animate([...title.words, ...subTitle.words, ...link.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate(".sustainable-practice-link svg", { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

        const sequence = [
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}],
            [subTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.005), at: '<'}],
            [link.words, { opacity: 1, transform: 'none' }, { duration: .5, delay: stagger(.01), at: .3 }],
            [".sustainable-practice-link svg", { opacity: 1, transform: 'none' }, { duration: .4, at: .35 }]
        ]
        inView('.sustainable-practice', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
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
    return (
        <section className="sustainable-practice">
            <div className="container">
                <div className="sustainable-practice-wrap">
                    <h2 className='heading h0 txt-black txt-up sustainable-practice-title'>
                        {props.title}
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
    )
}
export default SustainPractice;