import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from 'keen-slider/react'
import ExploreInner from "./ExploreInner";
import ArrowUpRight from "@/components/globals/IcArrow/ArrowUpRight.jsx";
import { useEffect, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function ExploreItem({ ...props }) {
    const itemRef = useRef()

    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        disabled: true,
        slides: {
            perView: 'auto',
        },
        defaultAnimation: {
            duration: 800
        },
        breakpoints: {
            '(max-width: 767px)': {
                disabled: false
            },
        },
    })

    useEffect(() => {
        const item = itemRef.current

        const label = new SplitType(item.querySelector(".kustomer-explore-main-item-main-label"), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector(".kustomer-explore-main-item-main-title"), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.kustomer-explore-main-item-line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(item.querySelector('.kustomer-explore-main-item-list-line'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(item.querySelector('.kustomer-explore-main-item-main-img img'), { opacity: 0, scale: .8, transformOrigin: 'right bottom' }, { duration: 0 })


        const sequence = [
            [item.querySelector('.kustomer-explore-main-item-line'), { scaleX: 1 }, { duration: .8, at: 0 }],
            [item.querySelector('.kustomer-explore-main-item-list-line'), { scaleY: 1 }, { duration: .6, at: .23 }],
            [label.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .2 }],
            [item.querySelector('.kustomer-explore-main-item-main-img img'), { opacity: 1, scale: 1 }, { duration: .6, at: .4 }],
        ]

        inView(item, () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
                item.querySelector('.kustomer-explore-main-item-line').removeAttribute('style')
                item.querySelector('.kustomer-explore-main-item-list-line').removeAttribute('style')
                item.querySelector('.kustomer-explore-main-item-main-img img').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <div className="kustomer-explore-main-item" ref={itemRef}>
            <div className="line kustomer-explore-main-item-line"></div>
            <a href={props.link_to} className="kustomer-explore-main-item-main bg-light" data-cursor="ext">
                <div className="heading h5 txt-black txt-up kustomer-explore-main-item-main-label">{props.label[0].text}</div>
                <h2 className="heading h1 txt-black txt-up kustomer-explore-main-item-main-title">{props.title[0].text}</h2>
                <div className="kustomer-explore-main-item-main-link">
                    <div className="txt txt-18 txt-bold kustomer-explore-main-item-main-link-txt">Learn more</div>
                    <ArrowUpRight />
                </div>
                <div className="kustomer-explore-main-item-main-img">
                    <img src={props.img.url} alt={props.img.alt} width={props.img.dimensions.width} className="img img-fill" />
                </div>
            </a>
            <div className="keen-slider kustomer-explore-main-item-list" ref={sliderRef}>
                <div className="line line-ver kustomer-explore-main-item-list-line"></div>
                {props.solutions.map((item) =>
                    <ExploreInner key={item[0].uid} {...item[0]} />
                )}
            </div>
        </div>
    )
}


export default ExploreItem