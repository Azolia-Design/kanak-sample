import "./Collection.scss"
import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function BenefitItem({ data }) {
    return (
        <div className="keen-slider__slide private-collection-item">
            <div className="ic private-collection-item-ic">
                <img src={data.icon.url} alt={data.icon.alt} width={data.icon.dimensions.width} className="img img-fill" />
            </div>
            <div className="private-collection-item-content">
                <h5 className="heading h5 txt-black txt-up private-collection-item-content-title">{data.title[0].text}</h5>
                <p className="txt txt-18 txt-med private-collection-item-content-des">{data.subtitle}</p>
            </div>
            <div className="line line-top"></div>
            <div className="line line-ver line-right"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-left"></div>
        </div>
    )
}

function PrivateCollection(props) {
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

    // useEffect(() => {
    //     const title = new SplitType('.private-collection-title-txt', { types: "lines, words", lineClass: 'split-line' })
    //     animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

    //     const sequence = [
    //         [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: 0 }],
    //     ]

    //     const items = document.querySelectorAll('.private-collection-item')
    //     const splitTxt = []
    //     items.forEach((el, idx) => {
    //         const timeDelay = idx * .1

    //         const itemTitle = new SplitType(el.querySelector('.private-collection-item-content-title'), { types: "lines, words", lineClass: 'split-line' })
    //         const itemDes = new SplitType(el.querySelector('.private-collection-item-content-des'), { types: "lines, words", lineClass: 'split-line' })

    //         animate(el.querySelector('.private-collection-item-ic img'), { opacity: 0, scale: .9 }, { duration: 0 })
    //         animate(itemTitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
    //         animate(itemDes.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
    //         animate(el.querySelector('.line-top'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
    //         animate(el.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
    //         animate(el.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
    //         animate(el.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })

    //         sequence.push(
    //             [el.querySelector('.line-top'), { scaleX: 1 }, { duration: .6, at: 0 }],
    //             [el.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: 0 }],
    //             [el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .6, at: .4 }],
    //             [el.querySelector('.line-right'), { scaleY: 1 }, { duration: .6, at: .4 }],
    //             [itemTitle.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: timeDelay }],
    //             [itemDes.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: timeDelay + .2 }],
    //             [el.querySelector('.private-collection-item-ic img'), { opacity: 1, scale: 1 }, { duration: .8, at: timeDelay + .3 }],
    //         )
    //         splitTxt.push(itemTitle, itemDes)
    //     })

    //     inView('.private-collection', () => {
    //         timeline(sequence).finished.then(() => {
    //             title.revert()
    //             splitTxt.forEach(item => item.revert())
    //             document.querySelectorAll('.private-collection-item .line').forEach(item => item.removeAttribute('style'))
    //         })
    //     }, { margin: "-20% 0px -20% 0px" })
    // }, []);
    useEffect(() => { console.log(props); }, [])
    return (
        <section className="private-collection">
            <div className="container">
                <div className="private-collection-grid">
                    <h3 className="heading h0 txt-black txt-up private-collection-title">
                        THE SUSTAINABLES® COLLECTION
                    </h3>
                    <div className="private-collection-img">
                        <div className="private-collection-img-inner bg-light">
                            {props.img}
                        </div>
                    </div>
                    <a href="#" className="btn private-collection-btn tablet">
                        <h5 className="heading h5 txt-black txt-up private-collection-btn-title">See Sustainables® products</h5>
                    </a>
                    <div className={`keen-slider private-collection-list`} ref={sliderRef}>
                        <a href="#" className="btn private-collection-btn">
                            <div className="private-collection-btn-ic">
                                <div className="ic ic-40">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 40 40" fill="none">
                                        <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                        <path d="M12 5H35V28" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square" />
                                    </svg></div>
                            </div>
                            <h5 className="heading h5 txt-black txt-up private-collection-btn-title">See Sustainables® products</h5>
                            <div className="line line-top"></div>
                            <div className="line line-ver line-right"></div>
                            <div className="line line-bot"></div>
                            <div className="line line-ver line-left"></div>
                        </a>
                        {props.list.map((item, idx) => (
                            <BenefitItem key={idx} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PrivateCollection