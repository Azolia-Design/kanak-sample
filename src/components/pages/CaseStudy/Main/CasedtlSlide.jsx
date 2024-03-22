import { useEffect, useState } from 'react'
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function CasedtlSlide({ ...props }) {
    const [loaded, setLoaded] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })

    useEffect(() => {
        animate('.casedtl-slide-line-ver', { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate('.casedtl-slide-stick-line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate('.casedtl-slide-main', { opacity: 0 }, { duration: 0 })

        const sequence = [
            ['.casedtl-slide .casedtl-slide-line-ver', { scaleY: 1 }, { duration: 1, at: 0 }],
            ['.casedtl-slide-stick-line', { scaleX: 1 }, { duration: 1, at: 0 }],
            ['.casedtl-slide-main', { opacity: 1 }, { duration: 1, at: 1 }]
        ]

        // document.querySelectorAll('.casedtl-slide-main-pagi-item').forEach((item, idx) => {
        //     animate(item, { opacity: 0 }, { duration: 0 })

        //     sequence.push(
        //         [item, { opacity: 1 }, { duration: 1, delay: .5, at: 5 + idx * 1 }],
        //     )
        // })
        requestAnimationFrame(() => {
            inView('.casedtl-slide', () => {
                timeline(sequence).finished.then(() => {
                    document.querySelector('.casedtl-slide-line-ver').removeAttribute('style')
                    document.querySelector('.casedtl-slide-stick-line').removeAttribute('style')
                    document.querySelector('.casedtl-slide-main').removeAttribute('style')

                })
            })
        })
    }, [])
    return (
        <div className="casedtl-slide">
            <div className="line line-ver casedtl-slide-line-ver"></div>
            <div className="casedtl-slide-stick">
                <div className="line casedtl-slide-stick-line"></div>
                <div className="casedtl-slide-main">
                    <div className="keen-slider casedtl-slide-main-inner" ref={sliderRef}>
                        {props.data.images.map((item, idx) => (
                            <div className="keen-slider__slide casedtl-slide-main-inner-item" key={idx}>
                                <img src={item.image_item.url} alt="" className="img img-fill" />
                            </div>
                        ))}
                    </div>
                    <div className="casedtl-slide-main-control">
                        <div className="line"></div>
                        <div className="casedtl-slide-main-pagi">
                            {loaded && instanceRef && (
                                props.data.images.map((item, idx) => (
                                    <button className={"casedtl-slide-main-pagi-item" + (currentSlide === idx ? " active" : "")} key={idx}
                                        onClick={() => {
                                            instanceRef.current?.moveToIdx(idx)
                                        }}>
                                    </button>
                                ))
                            )}
                        </div>
                        <div className="casedtl-slide-main-nav">
                            {loaded && instanceRef && (
                                <>
                                    <button className="casedtl-slide-main-nav-item casedtl-slide-main-nav-item-prev"
                                        onClick={() => { instanceRef.current.prev() }}
                                        disabled={instanceRef.current.track.details.rel === 0}>
                                        <div className="ic ic-40">
                                            {props.arrIcon}
                                        </div>
                                    </button>
                                    <button className="casedtl-slide-main-nav-item casedtl-slide-main-nav-item-next"
                                        onClick={() => { instanceRef.current.next() }}
                                        disabled={instanceRef.current.track.details.rel === instanceRef.current.track.details.maxIdx}>
                                        <div className="ic ic-40">
                                            {props.arrIcon}
                                        </div>
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CasedtlSlide