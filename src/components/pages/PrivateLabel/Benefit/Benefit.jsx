import "keen-slider/keen-slider.min.css"
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState } from "react"
import "./Benefit.scss"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function BenefitItem({ data }) {
    return (
        <div className="keen-slider__slide kustomer-benefit-item">
            <div className="ic kustomer-benefit-item-ic">
                <img src={data.icon.url} alt={data.icon.alt} width={data.icon.dimensions.width} className="img img-fill" />
            </div>
            <div className="kustomer-benefit-item-content">
                <h5 className="heading h5 txt-black txt-up kustomer-benefit-item-content-title">{data.title[0].text}</h5>
                <p className="txt txt-18 txt-med kustomer-benefit-item-content-des">{data.subtitle}</p>
            </div>
            <div className="line line-top"></div>
            <div className="line line-ver line-right"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-left"></div>
        </div>
    )
}

function KustomerBenefit(props) {
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
        const title = new SplitType('.kustomer-benefit-title-txt', { types: "lines, words", lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: 0 }],
        ]

        const items = document.querySelectorAll('.kustomer-benefit-item')
        const splitTxt = []
        items.forEach((el, idx) => {
            const timeDelay = idx * .1

            const itemTitle = new SplitType(el.querySelector('.kustomer-benefit-item-content-title'), { types: "lines, words", lineClass: 'split-line' })
            const itemDes = new SplitType(el.querySelector('.kustomer-benefit-item-content-des'), { types: "lines, words", lineClass: 'split-line' })

            animate(el.querySelector('.kustomer-benefit-item-ic img'), { opacity: 0, scale: .9 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(itemDes.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(el.querySelector('.line-top'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
            animate(el.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            animate(el.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
            animate(el.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })

            sequence.push(
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: .6, at: 0 }],
                [el.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: 0 }],
                [el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .6, at: .4 }],
                [el.querySelector('.line-right'), { scaleY: 1 }, { duration: .6, at: .4 }],
                [itemTitle.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: timeDelay }],
                [itemDes.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: timeDelay + .2 }],
                [el.querySelector('.kustomer-benefit-item-ic img'), { opacity: 1, scale: 1 }, { duration: .8, at: timeDelay + .3 }],
            )
            splitTxt.push(itemTitle, itemDes)
        })

        inView('.kustomer-benefit', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                splitTxt.forEach(item => item.revert())
                document.querySelectorAll('.kustomer-benefit-item .line').forEach(item => item.removeAttribute('style'))
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, []);

    return (
        <section className="kustomer-benefit">
            <div className="container">
                <div className="kustomer-benefit-grid">
                    <div className="kustomer-benefit-title">
                        <h3 className="heading h4 txt-black txt-up kustomer-benefit-title-txt">
                            {props.title}
                        </h3>
                    </div>
                    <div className={`keen-slider kustomer-benefit-list`} ref={sliderRef}>
                        {props.list.map((item, idx) => (
                            <BenefitItem key={idx} {...item} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomerBenefit