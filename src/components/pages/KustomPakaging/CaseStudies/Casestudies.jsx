import "./Casestudies.scss";
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight"
import { useEffect, useState } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function KustomPackagingCaseStudies({ ...props }) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    const [sliderRef, instanceRef] = useKeenSlider({
        // initial: 0,
        disabled: false,
        slides: {
            perView: 'auto',
        },
        // defaultAnimation: {
        //     duration: 800
        // },
        // breakpoints: {
        //     '(max-width: 991px)': {
        //         disabled: true
        //     },
        // },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    useEffect(() => {
        const label = new SplitType(".kuspack-kasestu-label", { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(".kuspack-kasestu-title", { types: 'lines, words', lineClass: 'split-line' })
        const paragraph = new SplitType(".kuspack-kasestu-des-content", { types: 'lines, words', lineClass: 'split-line' })
        const link = new SplitType(".kuspack-kasestu-des-link .txt", { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(paragraph.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(link.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(".kuspack-kasestu-des-link .ic svg", { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.02), at: .1 }],
            [paragraph.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: .3 }],
            [link.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.02), at: .6 }],
            [".kuspack-kasestu-des-link .ic svg", { opacity: 1, transform: 'none' }, { duration: .4, at: .8 }]
        ]
        inView('.kuspack-kasestu', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                paragraph.revert()
                link.revert()
                document.querySelector(".kuspack-kasestu-des-link .ic svg").removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })


        // Anim Items
        const allItems = document.querySelectorAll('.kuspack-kasestu-main-item')
        allItems.forEach((item, idx) => {
            const label = new SplitType(item.querySelector(".kuspack-kasestu-main-item-label"), { types: 'lines, words', lineClass: 'split-line' })
            const title = new SplitType(item.querySelector(".kuspack-kasestu-main-item-title"), { types: 'lines, words', lineClass: 'split-line' })
            const readMore = new SplitType(item.querySelector('.kuspack-kasestu-main-item-bot-readmore span'), { types: 'lines, words', lineClass: 'split-line' })

            animate(item.querySelector('.line-top'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
            animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
            animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(title.words, { transform: "translateY(100%)" }, { duration: 0 })
            animate(readMore.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            item.querySelector('.kuspack-kasestu-main-item-bot-img img') && animate(item.querySelector('.kuspack-kasestu-main-item-bot-img img'), { opacity: 0, scale: .4, transformOrigin: "left bottom" }, { duration: 0 })
            animate(item.querySelector('.kuspack-kasestu-main-item-bot-readmore .ic svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

            const sequence = [
                [item.querySelector('.line-top'), { scaleX: 1 }, { duration: .4, at: .1 }],
                [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: .5, at: .1 }],
                [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .4 }],
                [label.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.04), at: .1 }],
                [title.words, { transform: "none" }, { duration: .4, delay: stagger(.04), at: .2 }],
                [item.querySelector('.kuspack-kasestu-main-item-bot-img img'), { opacity: 1, scale: 1 }, { duration: .6, at: .3 }],
                [readMore.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .4 }],
                [item.querySelector('.kuspack-kasestu-main-item-bot-readmore .ic svg'), { opacity: 1, transform: "none" }, { duration: .6, at: .5 }]
            ]
            if (props.lastItem) {
                animate(item.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
                sequence.push(
                    [item.querySelector('.line-right'), { scaleY: 1 }, { duration: .8, at: .5 }],
                )
            }

            inView(item, () => {
                timeline(sequence).finished.then(() => {
                    item.querySelector('.line-top').removeAttribute('style')
                    item.querySelector('.line-ver').removeAttribute('style')
                    item.querySelector('.line-bot').removeAttribute('style')
                    label.revert()
                    title.revert()
                    readMore.revert()
                    item.querySelector('.kuspack-kasestu-main-item-bot-img img') && item.querySelector('.kuspack-kasestu-main-item-bot-img img').removeAttribute('style')
                    item.querySelector('.kuspack-kasestu-main-item-bot-readmore .ic svg').removeAttribute('style')
                    if (props.lastItem) item.querySelector('.line-right').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" })
        })
    }, [])

    return (
        <section className="kuspack-kasestu">
            <div className="container grid">
                <div className="heading h4 txt-black txt-up kuspack-kasestu-label">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up kuspack-kasestu-title">{props.title[0].text}</h1>
                <div className="kuspack-kasestu-des">
                    <p className="txt txt-18 txt-med kuspack-kasestu-des-content">{props.des}</p>
                    <a href="/kase-studies" className="kuspack-kasestu-des-link txt-link" data-cursor="txtLink">
                        <div className="txt txt-18 txt-bold">View all kase studies</div>
                        <div className="ic ic-16">
                            <ArrowUpRight />
                        </div>
                    </a>
                </div>
                <div className="kuspack-kasestu-main">
                    <div className="keen-slider kuspack-kasestu-main-wrapper" ref={sliderRef} >
                        {props.renderList}
                    </div>
                </div>
            </div>
        </section>
    )
}


export default KustomPackagingCaseStudies