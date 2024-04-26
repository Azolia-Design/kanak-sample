import './Brand.scss';
import { useKeenSlider } from 'keen-slider/react'
import "keen-slider/keen-slider.min.css"
import { useEffect, useRef, useState } from 'react';
import { brandIndex } from '@contexts/StoreGlobal';
import useSelector from '@/components/hooks/useSelector';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { parseRem } from '@/js/utils';

function HomeBrand(props) {
    const sectionRef = useRef();
    const [currentSlide, setCurrentSlide] = useState(0)
    const q = useSelector(sectionRef);
    const [options, setOptions] = useState({});
    const [sliderRef, instanceRef] = useKeenSlider(options)

    useEffect(() => {
        if (window.innerWidth < 767) {
            setOptions({
                initial: 0,
                mode: "snap",
                disabled: true,
                slides: {
                    perView: "auto",
                    spacing: parseRem(36),
                },
                breakpoints: {
                    '(max-width: 767px)': {
                        disabled: false
                    },
                },
                slideChanged(slider) {
                    brandIndex.set(slider.track.details.rel)
                    setCurrentSlide(slider.track.details.rel)
                },
            })
        }

        const title = new SplitType('.home-brand-title [name="title"]', { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        inView('.home-brand-title', () => {
            animate(title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05) }).finished.then(() => {
                title.revert()
            })
        }, { margin: "-30% 0px -30% 0px" })
        animate('.home-brand .line-ver', { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate('.home-brand .line-bot', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        const sequence = [
            ['.home-brand .line-ver', { scaleY: 1 }, { duration: 1.2, at: '<' }],
            ['.home-brand .line-bot', { scaleX: 1 }, { duration: 1, at: .2 }],
        ]
        inView('.home-brand-canvas', () => {
            timeline(sequence).finished.then(() => {
                q('.line-ver').removeAttribute('style')
                q('.line-bot').removeAttribute('style')
            })
        }, { margin: "-30% 0px -30% 0px" })

        const allItems = document.querySelectorAll('.home-brand-main-item')
        allItems.forEach((el, idx) => {
            const itemTitle = new SplitType(el.querySelector('.home-brand-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            const itemSub = new SplitType(el.querySelector('.home-brand-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })

            animate(el.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
            animate(el.querySelector('.home-brand-main-item-ic'), { opacity: 0, transform: 'scale(.8) translateY(20%)' }, { duration: 0 })
            animate([...itemTitle.words, ...itemSub.words], { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            const sequence = [
                [el.querySelector('.line'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.home-brand-main-item-ic'), { opacity: .8, transform: 'none' }, { duration: .8, at: .1 }],
                [itemTitle.words, { opacity: 1, transform: 'none' }, { duration: .7, delay: stagger(.008), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.006), at: .3 }],
            ]
            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('.line').removeAttribute('style')
                    el.querySelector('.home-brand-main-item-ic').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        });
    }, [])
    return (
        <section className="home-brand" ref={sectionRef}>
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black home-brand-title">{props.title}</h2>
                <div className="home-brand-canvas">
                    <div className="home-brand-canvas-inner">
                        {props.brandThree}
                    </div>
                </div>
                <div className="line line-ver"></div>
                <div className="home-brand-main">
                    <div className='home-brand-main-list keen_slider' ref={sliderRef}>
                        {props.list.map((item, idx) => (
                            <a
                                key={idx}
                                data-cursor="ext"
                                href={`/${item.uid}`}
                                className={`home-brand-main-item keen-slider__slide ${currentSlide == idx ? 'active' : ''}`}
                                onMouseOver={() => { brandIndex.set(idx) }}
                            >
                                <div className="home-brand-main-item-head">
                                    <h3 className="heading h4 txt-up txt-black home-brand-main-item-title">
                                        {item.data.name[0].text}
                                    </h3>
                                    <div className='ic ic-20 home-brand-main-item-ic'>
                                        {props.arrIconDesk}
                                    </div>
                                </div>
                                <div className="home-brand-main-item-body">
                                    <p className="txt txt-18 txt-med home-brand-main-item-sub">
                                        {item.data.sub_title}
                                    </p>
                                </div>
                                <div className="line"></div>
                            </a>
                        ))}
                    </div>
                </div>
                <div className="line line-bot"></div>
            </div>
        </section>
    )
}
export default HomeBrand;