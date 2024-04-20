import { useEffect, useState, useRef } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';


function CaseRel({ itemLength, uid, data, image, ...props }) {
    const itemRef = useRef();

    useEffect(() => {
        console.log('init anim')
        const item = itemRef.current

        const titleItem = new SplitType(item.querySelector('.casedtl-rel-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const readMore = new SplitType(item.querySelector('.casedtl-rel-main-item-link-txt'), { types: 'lines, words', lineClass: 'split-line' })

        animate(titleItem.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(readMore.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(item.querySelector('.casedtl-rel-main-item-img-inner'), { opacity: 0, scale: 0, transformOrigin: "left bottom" }, { duration: 0 })
        animate(item.querySelector('.casedtl-rel-main-item-link svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })
        if (window.innerWidth >= 768) {
            animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        } else {
            animate(item.querySelector('.line-ver'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        }
        const itemSequence = [
            [titleItem.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.04) }],
            [item.querySelector('.casedtl-rel-main-item-img-inner'), { opacity: 1, scale: 1 }, { duration: 1.2, at: .1 }],
            [readMore.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .2 }],
            [item.querySelector('.casedtl-rel-main-item-link svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: .3 }],
            [item.querySelector('.line-ver'), (window.innerWidth >= 768) ? { scaleY: 1 } : { scaleX: 1 }, { duration: .8, at: .3 }],
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                titleItem.revert()
                readMore.revert()
                item.querySelector('.casedtl-rel-main-item-img-inner').removeAttribute('style')
                item.querySelector('.casedtl-rel-main-item-link svg').removeAttribute('style')
                item.querySelector('.line-ver').removeAttribute('style')

            })
        }, { margin: '-15% -15% -15% -15%' })
    }, [])
    return (
        <a href={`/kase-studies/${uid}`} className={`casedtl-rel-main-item ${itemLength < 2 ? 'single' : ''}`} ref={itemRef} data-cursor='ext'>
            <h4 className="heading h5 txt-up txt-black casedtl-rel-main-item-title">
                {data.title[0].text}
            </h4>
            <div className="casedtl-rel-main-item-link-wrapper">
                <div className="casedtl-rel-main-item-img">
                    <div className="casedtl-rel-main-item-img-inner">
                        <img className='img img-h' src={image?.image_item?.url} alt='' width={image?.image_item?.dimensions.width} height={image?.image_item?.dimensions.height} />
                    </div>
                </div>
                <div className="casedtl-rel-main-item-link">
                    <div className="txt txt-18 txt-bold casedtl-rel-main-item-link-txt">
                        Read more
                    </div>
                    <div className="ic ic-16">
                        {props.icon}
                    </div>
                </div>
                <div className="line line-ver"></div>
            </div>
        </a>
    )
}

function CasedtlRel({ ...props }) {
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
            '(max-width: 767px)': {
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
        if (window.innerWidth < 768) {
            setLimit(1)
        }
    }, [])
    useEffect(() => {
        if (!loaded) return
        const title = new SplitType('.casedtl-rel-title', { types: 'lines, words', lineClass: 'split-line' })

        animate('.casedtl-rel-head .line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.casedtl-rel-head .line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        props.list.length > perView && animate('.casedtl-rel-nav .casedtl-rel-nav-item', { opacity: 0 }, { duration: 0 })

        const sequence = [
            ['.casedtl-rel-head .line-top', { scaleX: 1 }, { duration: 1, at: .3 }],
            ['.casedtl-rel-head .line-bot', { scaleX: 1 }, { duration: .8, at: .5 }],
            props.list.length > perView ? ['.casedtl-rel-nav .casedtl-rel-nav-item', { opacity: 1 }, { duration: .6, at: .5, delay: stagger(.1) }] : [],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .4 }],
        ]
        inView('.casedtl-rel', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                props.list.length > perView && document.querySelector('.casedtl-rel-nav').removeAttribute('style')
                document.querySelector('.casedtl-rel-head .line-top').removeAttribute('style')
                document.querySelector('.casedtl-rel-head .line-bot').removeAttribute('style')
            })
        }, { margin: '-15% 0px -15% 0px' })

        if (window.innerWidth < 767) {
            const btnTxt = new SplitType('.casedtl-rel-load-btn-txt', { types: 'lines, words', lineClass: 'split-line' })
            animate('.casedtl-rel-load-btn', { opacity: 0 }, { duration: 0 })
            animate('.casedtl-rel-load-btn .ic svg', { opacity: 0, transform: 'translateY(-40%) scale(.8)' }, { duration: 0 })
            animate(btnTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            const btnSequence = [
                ['.casedtl-rel-load-btn ', { opacity: 1 }, { duration: .6, at: 0 }],
                ['.casedtl-rel-load-btn  .ic svg', { opacity: 1, transform: "none" }, { duration: .8, at: 0 }],
                [btnTxt.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(0.06), at: .2 }],
            ]

            inView('.casedtl-rel-load-btn ', () => {
                timeline(btnSequence).finished.then(() => {
                    document.querySelector('.casedtl-rel-load-btn ').removeAttribute('style')
                    document.querySelector('.casedtl-rel-load-btn  .ic svg').removeAttribute('style')
                    btnTxt.revert()
                })
            }, { margin: '-15% 0px -15% 0px' })
        }

    }, [loaded])
    return (
        <div className="casedtl-rel">
            <div className="casedtl-rel-head">
                <h3 className="heading h4 txt-up txt-black casedtl-rel-title">
                    Other case studies
                </h3>
                {loaded && instanceRef && props.list.length > perView && (
                    <div className="casedtl-rel-nav">
                        <button className="casedtl-rel-nav-item casedtl-rel-nav-item-prev"
                            onClick={() => { instanceRef.current.prev() }}
                            disabled={instanceRef.current.track.details.rel === 0}>
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                        <button className="casedtl-rel-nav-item casedtl-rel-nav-item-next"
                            onClick={() => { instanceRef.current.next() }}
                            disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                            <div className="ic ic-16">
                                {props.arrIcon}
                            </div>
                        </button>
                    </div>
                )}
                <div className="line line-top"></div>
                <div className="line line-bot"></div>
            </div>
            <div className="casedtl-rel-main">
                <div className={`keen-slider casedtl-rel-main-inner bg-light ${limit >= newList.length ? 'all-loaded' : ''}`} ref={sliderRef} style={{ '--perView': perView }}>
                    {newList.map((chunk, idx) =>
                        idx < limit && (
                            <div className='keen-slider__slide casedtl-rel-main-group' key={idx}>
                                {chunk.map((item, itemIdx) => <CaseRel uid={item.uid} data={item.data} image={item.data.images[0]} icon={props.icArrowExt} itemLength={props.list.length} item={item} key={itemIdx} />)}
                            </div>
                        )
                    )}
                </div>
                <button className={`casedtl-rel-load-btn ${limit >= newList.length ? 'hidden' : ''}`} onClick={(e) => setLimit(limit + 1)}>
                    <div className="casedtl-rel-load-btn-ic">
                        <div className="ic ic-16">
                            {props.icArrowDown}
                        </div>
                    </div>
                    <div className="txt txt-16 txt-med casedtl-rel-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </div>
    )
}
export default CasedtlRel