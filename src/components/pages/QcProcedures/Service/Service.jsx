import './Service.scss'
import { useEffect } from 'react'
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function ComplianceService({ ...props }) {

    useEffect(() => {
        // Amim Title
        const title = new SplitType(".complian-ser-title", { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(".complian-ser-sub", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.03), at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .1 }],
        ]
        inView('.complian-ser', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })

        // Anim Item
        animate(document.querySelector('.complian-ser-main .line-top'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(document.querySelector('.complian-ser-main .line-left'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(document.querySelector('.complian-ser-main .line-right'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })

        const mainSequence = [
            [document.querySelector('.complian-ser-main .line-top'), { scaleX: 1 }, { duration: .5, at: 0 }],
            [document.querySelector('.complian-ser-main .line-left'), { scaleY: 1 }, { duration: .9, at: 0 }],
            [document.querySelector('.complian-ser-main .line-right'), { scaleY: 1 }, { duration: .4, at: .45 }],
        ]
        document.querySelectorAll('.complian-ser-main .complian-ser-main-item').forEach((el, idx) => {
            let delay = 0;

            if (window.innerWidth > 767) {
                delay = idx % 2 == 0 ? 0 : .35
            } else {
                delay = 0
            }

            const title = new SplitType(el.querySelector(".complian-ser-main-item-title"), { types: 'lines, words', lineClass: 'split-line' })
            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(el.querySelector('.complian-ser-main-item-ic'), { opacity: 0, scale: .8 }, { duration: 0 })
            animate(el.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
            idx % 2 == 0 && animate(el.querySelector('.line-mid'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })

            const itemSequence = [
                [el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .6, at: 0 + delay }],
                [el.querySelector('.complian-ser-main-item-ic'), { opacity: 1, scale: 1 }, { duration: .6, at: .1 + delay }],
                [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.01), at: .25 + delay }],
                [idx % 2 == 0 && el.querySelector('.line-mid'), { scaleY: 1 }, { duration: .6, at: 0 + delay }],
            ]
            inView(el, () => {
                timeline(itemSequence).finished.then(() => {
                    el.querySelector('.line-bot').removeAttribute('style')
                    el.querySelector('.complian-ser-main-item-ic').removeAttribute('style')
                    idx % 2 == 0 && el.querySelector('.line-mid').removeAttribute('style')
                }, { margin: "-500% 0px -500% 0px" })
            })
        })
        inView('.complian-ser-main', () => {
            timeline(mainSequence).finished.then(() => {
                document.querySelector('.complian-ser-main .line-top').removeAttribute('style')
                document.querySelector('.complian-ser-main .line-left').removeAttribute('style')
                document.querySelector('.complian-ser-main .line-right').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })

    }, [])
    return (
        <section className="complian-ser">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up complian-ser-title">{props.newTitle}</h1>
                <div className="txt txt-18 txt-med complian-ser-sub">{props.sub}</div>
                <div className="complian-ser-main">
                    {props.list.map((item, idx) => (
                        <div className="complian-ser-main-item" key={idx}>
                            <div className="complian-ser-main-item-ic">
                                <div className="ic ic-80">
                                    <img src={item.item_icon.url} alt={item.item_icon.alt} width={item.item_icon.dimensions.width} />
                                </div>
                            </div>
                            <h3 className="heading h5 txt-black txt-up complian-ser-main-item-title">{item.item_title[0].text}</h3>
                            {idx % 2 == 0 && (<div className="line line-ver line-mid"></div>)}
                            <div className="line line-bot"></div>
                        </div>
                    ))}
                    <div className="line line-top"></div>
                    <div className="line line-ver line-left"></div>
                    <div className="line line-ver line-right"></div>
                </div>
            </div>
        </section>
    )
}

export default ComplianceService
