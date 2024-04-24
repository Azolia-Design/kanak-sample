import { useEffect, useState } from "react";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import './Benefit.scss'

function KustomPackagingBenefit({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".kuspack-benefit-title-txt", { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
        ]


        // Anim Item

        const allItems = document.querySelectorAll('.kuspack-benefit-item')
        const splitArray = []
        allItems.forEach((el, idx) => {
            const timeDelay = idx * .1

            const itemTitle = new SplitType(el.querySelector('.kuspack-benefit-item-title'), { types: "lines, words", lineClass: 'split-line' })
            const itemSub = new SplitType(el.querySelector('.kuspack-benefit-item-sub'), { types: "lines, words", lineClass: 'split-line' })

            animate(el.querySelector('.kuspack-benefit-item-ic img'), { opacity: 0, scale: .9 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(itemSub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(el.querySelector('.line-top'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
            animate(el.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            animate(el.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
            animate(el.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })

            sequence.push(
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: .6, at: timeDelay }],
                [el.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: timeDelay }],
                [el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .6, at: .4 + timeDelay }],
                [el.querySelector('.line-right'), { scaleY: 1 }, { duration: .6, at: .4 + timeDelay }],
                [itemTitle.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .2 + timeDelay }],
                [itemSub.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .3 + timeDelay }],
                [el.querySelector('.kuspack-benefit-item-ic img'), { opacity: 1, scale: 1 }, { duration: .8, at: .4 + timeDelay }],
            )
            splitArray.push(itemTitle, itemSub)
        })

        inView('.kuspack-benefit', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                splitArray.forEach(item => item.revert())
                document.querySelectorAll('.kuspack-benefit-item .line').forEach(item => item.removeAttribute('style'))
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="kuspack-benefit">
            <div className="container">
                <div className="kuspack-benefit-grid">
                    <div className="kuspack-benefit-title">
                        <div className="heading h0 txt-black txt-up kuspack-benefit-title-txt">{props.newTitle}</div>
                    </div>
                    {props.list.map((item, idx) => (
                        <div className="kuspack-benefit-item" key={idx}>
                            <div className="kuspack-benefit-item-ic">
                                <img src={item.item_icon.url} alt={item.item_icon.alt} width={item.item_icon.dimensions.width} className='img' />
                            </div>
                            <h4 className="heading h5 txt-black txt-up kuspack-benefit-item-title">{item.item_title[0].text}</h4>
                            <div className="txt txt-18 txt-med kuspack-benefit-item-sub">{item.item_sub}</div>
                            <div className="line line-top"></div>
                            <div className="line line-ver line-right"></div>
                            <div className="line line-bot"></div>
                            <div className="line line-ver line-left"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default KustomPackagingBenefit
