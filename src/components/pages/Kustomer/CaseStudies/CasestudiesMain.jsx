import { useEffect, useRef, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import ArrowUpRight from "@/components/globals/IcArrow/ArrowUpRight"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function CaseStudiesItem({ ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current
        const label = new SplitType(item.querySelector(".kustomer-kasestu-main-item-label"), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector(".kustomer-kasestu-main-item-title"), { types: 'lines, words', lineClass: 'split-line' })
        const readMore = new SplitType(item.querySelector('.kustomer-kasestu-main-item-bot-readmore span'), { types: 'lines, words', lineClass: 'split-line' })

        animate(item.querySelector('.line-top'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { transform: "translateY(100%)" }, { duration: 0 })
        animate(readMore.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.kustomer-kasestu-main-item-bot-img img'), { opacity: 0, scale: .4, transformOrigin: "left bottom" }, { duration: 0 })
        animate(item.querySelector('.kustomer-kasestu-main-item-bot-readmore .ic svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

        const sequence = [
            [item.querySelector('.line-top'), { scaleX: 1 }, { duration: .4, at: .1 }],
            [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: .5, at: .1 }],
            [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .4 }],
            [label.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.04), at: .1 }],
            [title.words, { transform: "none" }, { duration: .4, delay: stagger(.04), at: .2 }],
            [item.querySelector('.kustomer-kasestu-main-item-bot-img img'), { opacity: 1, scale: 1 }, { duration: .6, at: .3 }],
            [readMore.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .4 }],
            [item.querySelector('.kustomer-kasestu-main-item-bot-readmore .ic svg'), { opacity: 1, transform: "none" }, { duration: .6, at: .5 }]
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
                item.querySelector('.kustomer-kasestu-main-item-bot-img img').removeAttribute('style')
                item.querySelector('.kustomer-kasestu-main-item-bot-readmore .ic svg').removeAttribute('style')
                if (props.lastItem) item.querySelector('.line-right').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])

    return (
        <a href={`/kase-studies/${props.data.uid}`} className="keen-slider__slide kustomer-kasestu-main-item bg-light" ref={itemRef} data-cursor="drag">
            <div className="txt txt-20 txt-bold kustomer-kasestu-main-item-label">{props.data.data.category}</div>
            <h3 className="heading h4 txt-black txt-up kustomer-kasestu-main-item-title">{props.data.data.title[0].text}</h3>
            <div className="kustomer-kasestu-main-item-bot">
                <div className="kustomer-kasestu-main-item-bot-img">
                    <img src={props.data.data.images[0]?.image_item?.url} alt={props.data.data.images[0]?.image_item?.alt} className="img img-fill" />
                </div>
                <div className="txt txt-18 txt-bold kustomer-kasestu-main-item-bot-readmore">
                    <span>Read more</span>
                    <div className="ic ic-16">
                        <ArrowUpRight />
                    </div>
                </div>
            </div>
            <div className="line line-top"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver"></div>
            {props.lastItem === "lastItem" && (
                <div className="line line-ver line-right"></div>
            )}
        </a>
    )
}


function CaseStudiesMain({ ...props }) {
    const allItem = props.list
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

    return (
        <div className="kustomer-kasestu-main">
            <div className="keen-slider kustomer-kasestu-main-wrapper" ref={sliderRef} >
                {allItem.map((item, idx) => (
                    <CaseStudiesItem data={item} lastItem={`${(idx == allItem.length - 1) ? 'lastItem' : ''}`} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default CaseStudiesMain