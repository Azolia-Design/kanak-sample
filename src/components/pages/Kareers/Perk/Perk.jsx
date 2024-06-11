import './Perk.scss';
import { stagger, inView, animate, timeline } from "motion";
import SplitType from 'split-type';
import { useEffect } from 'react';

function KareersPerk(props) {
    useEffect(() => {
        const title = new SplitType('.kareer-perk-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.kareer-perk-sub', { types: 'lines, words', lineClass: "split-line" });

        animate(title.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate(subTitle.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        const sequence = [
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.02)}],
            [subTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.02), at: '<'}]
        ]

        inView('.kareer-perk', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert();
            })
        }, { margin: "-30% 0px -30% 0px" });

        const perks = document.querySelectorAll('.kareer-perk-main-item');
        perks.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.kareer-perk-main-item-title'), { types: 'lines, chars', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kareer-perk-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-right'), {scaleY: 0 }, {duration: 0})
            animate(el.querySelector('.line-bot'), {scaleX: 0 }, {duration: 0})
            animate(itemTitle.chars, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
            animate(itemSub.words, {opacity: 0, transform: 'translateY(12px)'}, {duration: 0})
            animate(el.querySelector('img'), { scale: 0.8, opacity: 0 }, { duration: 0 })

            const sequenceItem = [
                [el.querySelector('img'), {scale: 1, opacity: 1}, {duration: 1, at: '<', delay: window.innerWidth > 991 && (idx % 3) * .2 }],
                [itemTitle.chars, {opacity: 1, transform: 'translateY(0%)'}, {duration: .8, delay: stagger(.01), at: '<'}],
                [itemSub.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.02), at: '<'}],
                [el.querySelector('.line-right'), {scaleY: 1 }, {duration: 1, at: .1, easing: [0.87, 0, 0.13, 1]}],
                [el.querySelector('.line-bot'), {scaleX: 1 }, {duration: 1, easing: [0.87, 0, 0.13, 1], at: .2}],
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('img').removeAttribute('style');
                    el.querySelector('.line-right').removeAttribute('style')
                    el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        })
    }, []);
    return (
        <section className="kareer-perk bg-dark">
            <div className="container">
                <div className="kareer-perk-title-wrap">
                    <h3 className="heading h3 txt-up txt-black kareer-perk-sub">
                        {props.label}
                    </h3>
                    <h2 className="heading h0 txt-up txt-black kareer-perk-title">
                        A Dive into Our Employee <span className="txt-green">Perks Paradise</span>
                    </h2>
                </div>
                <div className="kareer-perk-main">
                    {props.perk_list.map((item, idx) => (
                        <div className="kareer-perk-main-item" key={idx}>
                            <div className="kareer-perk-main-item-inner">
                                <div className="ic ic-60">
                                    <img src={item.icon.url} alt={item.icon.alt} width={item.icon.dimensions.width} height={item.icon.dimensions.height} className='img'/>
                                </div>
                                <h3 className="heading h5 txt-up txt-black kareer-perk-main-item-title">
                                    {item.title}
                                </h3>
                                <p className="txt txt-20 txt-med kareer-perk-main-item-sub">
                                    {item.sub}
                                </p>
                            </div>
                            <div className="line line-right"></div>
                            <div className="line line-bot"></div>
                        </div>
                    ))}
                    <div className="line line-top"></div>
                    <div className="line line-bot"></div>
                </div>
            </div>
        </section>
    )
}
export default KareersPerk