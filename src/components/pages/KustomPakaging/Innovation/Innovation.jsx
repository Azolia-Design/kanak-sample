import { Mouse } from "@/components/core/mouse";
import { parseRem } from "@/js/utils";
import { useEffect, useState } from "react";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import "./Innovation.scss";
import { convertHighlight } from "@/components/utils/text";


function KustomPackagingInnovation({ ...props }) {
    const [idxActive, setIdxActive] = useState(-1);

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }

    useEffect(() => {
        const thumb = document.querySelector('.kuspack-innova-thumb')
        let thumbReq;
        let targetX = 0
        let targetY = 0

        function thumbMove() {
            let curX = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m41
            let curY = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m42
            let wrapTop = document.querySelector(".kuspack-innova-main-thumb").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".kuspack-innova-main-thumb").getBoundingClientRect().left

            let cursorX = Mouse().x
            let cursorY = Mouse().y

            if (document.querySelector('.kuspack-innova-main:hover')) {
                targetX = parseRem(300) - thumb.offsetWidth / 2 + ((cursorX - wrapLeft) / (document.querySelector(".kuspack-innova-main-thumb").offsetWidth) - .5) * parseRem(300)
                targetY = cursorY - wrapTop - document.querySelector(".kuspack-innova-main-thumb").offsetHeight / 2
            } else {
                setIdxActive(-1)
            }
            thumb.style.transform = `translate(${lerp(curX, targetX, .03)}px, ${lerp(curY, targetY, .03)}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }

        inView('.kuspack-innova', () => {
            thumbReq = requestAnimationFrame(thumbMove)
        })


        // Anim Title
        const label = new SplitType(".kuspack-innova-label", { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(".kuspack-innova-title", { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(".kuspack-innova-sub", { types: 'lines, words', lineClass: 'split-line' })
        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(document.querySelector('.kuspack-innova-main-line-left'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(document.querySelector('.kuspack-innova-main-line-right'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })

        const sequence = [
            [document.querySelector('.kuspack-innova-main-line-left'), { scaleY: 1 }, { duration: .8, at: 0 }],
            [label.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.02), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.04), at: .1 }],
            [sub.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.007), at: .2 }],
            [document.querySelector('.kuspack-innova-main-line-right'), { scaleY: 1 }, { duration: .6, at: .85 }],
        ]
        inView('.kuspack-innova', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                sub.revert()
                document.querySelector('.kuspack-innova-main-line-left').removeAttribute('style')
                document.querySelector('.kuspack-innova-main-line-right').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })


        // Anim Item
        const allItems = document.querySelectorAll('.kuspack-innova-item')

        allItems.forEach((item, idx) => {
            const timeDelay = idx * .1

            const title = new SplitType(item.querySelector(".kuspack-innova-item-title"), { types: 'lines, words', lineClass: 'split-line' })
            const sub = new SplitType(item.querySelector(".kuspack-innova-item-sub"), { types: 'lines, words', lineClass: 'split-line' })

            animate(item.querySelector('.line-top'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
            animate(item.querySelector('.line-left'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

            const itemSequence = [
                [item.querySelector('.line-top'), { scaleX: 1 }, { duration: .8, at: timeDelay }],
                [item.querySelector('.line-left'), { scaleY: 1 }, { duration: .8, at: timeDelay }],
                [title.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: .1 + timeDelay }],
                [sub.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.007), at: .2 + timeDelay }],
                [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .2 + timeDelay }]
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    title.revert()
                    sub.revert()
                    item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
                })
            }, { margin: "-20% 0px -20% 0px" })
        })

        return () => {
            cancelAnimationFrame(thumbReq)
        }
    }, [])
    return (
        <section className="kuspack-innova">
            <div className="container grid">
                <div className="kuspack-innova-title-wrap">
                    <div className="heading h5 txt-black txt-up kuspack-innova-label">{props.label}</div>
                    <h1 className="heading h0 txt-black txt-up kuspack-innova-title">{props.newTitle}</h1>
                </div>
                <div className="txt txt-18 txt-med kuspack-innova-sub">{props.newSub}</div>
                <div className="kuspack-innova-main">
                    <div className="kuspack-innova-main-wrap">
                        {props.list.map((item, idx) => (
                            <div className="kuspack-innova-item" key={idx} onMouseEnter={() => { setIdxActive(idx) }}>
                                <div className="ic kuspack-innova-item-icon">
                                    <img
                                        src={item.item_icon.url}
                                        alt=""
                                        width={item.item_icon.dimensions.width}
                                        height={item.item_icon.dimensions.height}
                                    />
                                </div>
                                <h3 className="heading h4 txt-black txt-up kuspack-innova-item-title">
                                    {item.item_title[0].text}
                                </h3>
                                <div className="txt txt-18 txt-med kuspack-innova-item-sub">
                                    {convertHighlight(item.item_sub)}
                                </div>
                                <div className="line line-top" />
                                <div className="line line-ver line-left" />
                                <div className="line line-bot" />
                            </div>
                        ))}
                    </div>
                    <div className="kuspack-innova-main-thumb">
                        <div className="kuspack-innova-thumb">
                            {
                                props.list.map((item, idx) => (
                                    <div className={`kuspack-innova-thumb-inner ${idx === idxActive ? 'active' : ''}`} key={idx}>
                                        <img src={item.item_icon.url}
                                            alt=""
                                            width={item.item_icon.dimensions.width}
                                            height={item.item_icon.dimensions.height}
                                            className="img" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="line line-ver kuspack-innova-main-line-left" />
                    <div className="line line-ver kuspack-innova-main-line-right" />
                </div>
            </div>
        </section>
    )
}

export default KustomPackagingInnovation