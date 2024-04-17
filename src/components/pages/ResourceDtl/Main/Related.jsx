import { useEffect, useState, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import { convertDate } from "@utils/text.js"

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";


function Article(props) {
    const itemRef = useRef()
    useEffect(() => {
        const item = itemRef.current

        const label = new SplitType(item.querySelector('.resource-dtl-rel-main-inner-group-item-content-cate'), { types: 'lines, words', lineClass: 'split-line' })
        const titleItem = new SplitType(item.querySelector('.resource-dtl-rel-main-inner-group-item-content-title'), { types: 'lines, words', lineClass: 'split-line' })
        const desc = new SplitType(item.querySelector('.resource-dtl-rel-main-inner-group-item-content-des'), { types: 'lines, words', lineClass: 'split-line' })
        const date = new SplitType(item.querySelector('.resource-dtl-rel-main-inner-group-item-content-date'), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(titleItem.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(desc.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(date.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(item.querySelector('.resource-dtl-rel-main-inner-group-item-img img'), { opacity: 0, scale: 0.8, transformOrigin: "left bottom" }, { duration: 0 })
        animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line:not(.line-ver)'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })


        const itemSequence = [
            [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1, at: .2 }],
            [item.querySelector('.resource-dtl-rel-main-inner-group-item-img img'), { opacity: 1, scale: 1 }, { duration: 1, at: "<" }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.03), at: .3 }],
            [titleItem.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .4 }],
            [desc.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.01), at: .6 }],
            [date.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.012), at: .8 }],
            [item.querySelector('.line:not(.line-ver)'), { scaleX: 1 }, { duration: .8, at: 0 }],
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                titleItem.revert()
                desc.revert()
                label.revert()
                date.revert()
                item.querySelector('.line').removeAttribute('style')
                item.querySelector('.resource-dtl-rel-main-inner-group-item-img img').removeAttribute('style')
            })
        })
    }, [])

    return (
        <div className="resource-dtl-rel-main-inner-group-item" ref={itemRef}>
            <a href={`/insights/${props.uid}`} className="resource-dtl-rel-main-inner-group-item-img" data-cursor="ext">
                <img src={props.data.feature_image.url} alt={props.data.feature_image.alt} width={props.data.feature_image.dimensions.width} className='img img-fill' />
            </a>
            <div className="resource-dtl-rel-main-inner-group-item-content">
                <a href={`/insights/${props.data.category.toLowerCase().replace(" ", "-")}`} className="txt txt-20 txt-bold resource-dtl-rel-main-inner-group-item-content-cate" data-cursor="txtLink">
                    {props.data.category}
                </a>
                <a href={`/insights/${props.uid}`} className='resource-dtl-rel-main-inner-group-item-content-wrap' data-cursor="ext">
                    <h3 className='heading h4 txt-black txt-up resource-dtl-rel-main-inner-group-item-content-title'>
                        {props.data.title}
                    </h3>
                    <p className='txt txt-18 txt-med resource-dtl-rel-main-inner-group-item-content-des'>
                        {props.data.sapo}
                    </p>
                    <span className='txt txt-18 txt-med resource-dtl-rel-main-inner-group-item-content-date'>
                        {convertDate(props.last_publication_date)}
                    </span>
                </a>
                <div className="line line-ver"></div>
                <div className="line"></div>
            </div>
        </div>
    )
}

function RelatedArticle(props) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [limit, setLimit] = useState(999);
    let perView = 2;
    let newList = props.list.reduce((accumulator, currentValue, currentIndex, array) => {
        if (currentIndex % perView === 0) {
            accumulator.push(array.slice(currentIndex, currentIndex + 2));
        }
        return accumulator;
    }, [])
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        disabled: false,
        slides: {
            spacing: 36,
        },
        defaultAnimation: {
            duration: 800
        },
        breakpoints: {
            '(max-width: 991px)': {
                disabled: true
            },
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    useEffect(() => {
        if (!loaded) return

        if (window.innerWidth < 992) {
            setLimit(1)
        }

        const title = new SplitType('.resource-dtl-rel-head-title', { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { transform: "translateY(100%)" }, { duration: 0 })
        animate('.resource-dtl-rel-main-line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.resource-dtl-rel-head-nav', { opacity: 0, transform: "translateX(-20px)" }, { duration: 0 })

        const sequence = [
            [title.words, { transform: "none" }, { duration: .4, delay: stagger(.05), at: "-.2" }],
            ['.resource-dtl-rel-main-line', { scaleX: 1 }, { duration: 1, at: "-.4" }],
            ['.resource-dtl-rel-head-nav', { opacity: 1, transform: "none" }, { duration: 1, at: "-.7" }],
        ]


        inView('.resource-dtl-rel', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                document.querySelector('.resource-dtl-rel-main-line').removeAttribute('style')
                document.querySelector('.resource-dtl-rel-head-nav').removeAttribute('style')
            })
        })


        // Button Anim
        const btnTxt = new SplitType('.resource-dtl-rel-load-btn-txt', { types: 'lines, words', lineClass: 'split-line' })

        animate('.resource-dtl-rel-load', { opacity: 0 }, { duration: 0 })
        animate('.resource-dtl-rel-load-btn .ic svg', { transform: "translateY(-100%)" }, { duration: 0 })
        animate(btnTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const btnSequence = [
            ['.resource-dtl-rel-load', { opacity: 1 }, { duration: 1, at: 0 }],
            ['.resource-dtl-rel-load-btn .ic svg', { transform: "none" }, { duration: .4, at: "-.6" }],
            [btnTxt.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(0.03), at: "<" }],
        ]

        inView('.resource-dtl-rel-load', () => {
            timeline(btnSequence).finished.then(() => {
                btnTxt.revert()
                document.querySelector('.resource-dtl-rel-load-btn .ic svg').removeAttribute('style')
                document.querySelector('.resource-dtl-rel-load').removeAttribute('style')
            })
        })
        // End Button Anim
    }, [loaded])
    return (
        <div className="resource-dtl-rel">
            <div className="resource-dtl-rel-head">
                <h3 className="heading h4 txt-black txt-up resource-dtl-rel-head-title">related articles</h3>
                {loaded && instanceRef && props.list.length > perView && (
                    <div className="resource-dtl-rel-head-nav">
                        <button className="resource-dtl-rel-head-nav-item resource-dtl-rel-head-nav-item-prev"
                            onClick={() => { instanceRef.current.prev() }}
                            disabled={instanceRef.current.track.details.rel === 0}
                            data-cursor="hide">
                            <div className="ic ic-16">
                                {props.icArrow}
                            </div>
                        </button>
                        <button className="resource-dtl-rel-head-nav-item resource-dtl-rel-head-nav-item-next"
                            onClick={() => { instanceRef.current.next() }}
                            disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}
                            data-cursor="hide">
                            <div className="ic ic-16">
                                {props.icArrow}
                            </div>
                        </button>
                    </div>
                )}
            </div>
            <div className="resource-dtl-rel-main">
                <div className="line resource-dtl-rel-main-line"></div>
                <div className={`keen-slider  resource-dtl-rel-main-inner ${limit >= newList.length ? 'all-loaded' : ''}`} ref={sliderRef} style={{ '--perView': perView }}>
                    {newList.map((chunk, idx) =>
                        idx < limit && (
                            <div className="keen-slider__slide resource-dtl-rel-main-inner-group" key={idx}>
                                {chunk.map((item, itemIdx) => <Article {...item} key={itemIdx} />)}
                            </div>
                        )
                    )}
                </div>
            </div>
            <div className={`resource-dtl-rel-load ${limit >= newList.length ? 'hidden' : ''}`}>
                <button className="resource-dtl-rel-load-btn" onClick={() => setLimit(limit + 1)}>
                    <div className="resource-dtl-rel-load-btn-ic">
                        <div className="ic ic-24">
                            {props.icDropdown}
                        </div>
                    </div>
                    <div className="txt txt-16 txt-med resource-dtl-rel-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </div >
    )
}

export default RelatedArticle