import { useEffect, useState, useRef } from "react"
import { parseRem } from "@/js/utils";
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";
import './Commit.scss';

function SustainCommit(props){
    const [index, setIndex] = useState(-1);
    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }

    useEffect(() => {
        const thumb = document.querySelector('.sustainable-commit-thumb-wrap')
        let thumbReq;
        let targetX = 0
        let targetY = 0

        function thumbMove() {
            let curX = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m41
            let curY = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m42

            let cursorX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-left'))
            let cursorY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-top'))
            let wrapTop = document.querySelector(".sustainable-commit-thumb").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".sustainable-commit-thumb").getBoundingClientRect().left

            if (document.querySelector('.sustainable-commit-listing:hover')) {
                targetX = - thumb.offsetWidth / 2 + ((cursorX - wrapLeft) / (document.querySelector(".sustainable-commit-thumb").offsetWidth) - .5) * parseRem(300)
                targetY = cursorY - wrapTop - thumb.offsetHeight / 2 - document.querySelector(".sustainable-commit-thumb").offsetHeight / 2
            } else {
                setIndex(-1)
            }
            thumb.style.transform = `translate(${lerp(curX, targetX, .03)}px, ${lerp(curY, targetY, .03)}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }

        inView('.sustainable-commit-listing', () => {
            thumbReq = requestAnimationFrame(thumbMove)
        })

        const title = new SplitType(".sustainable-commit-title", { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        inView('.sustainable-commit', () => {
            animate(title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}).finished.then(() => title.revert())
        }, { margin: "-40% 0px -40% 0px" })

        document.querySelectorAll('.sustainable-commit-item').forEach((item) => {
            const title = new SplitType(item.querySelector('.sustainable-commit-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            const describe = new SplitType(item.querySelector('.sustainable-commit-item-desc p'), { types: 'lines. words', lineClass: 'split-line' })

            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(describe.lines, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelectorAll(".line-inner"), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
            animate(item.querySelector('.sustainable-commit-item-ic'), { opacity: 0, scale: .9 }, { duration: 0 })

            let lineList = []
            item.querySelectorAll(".line-inner").forEach((el, idx) => {
                lineList.push(el)
            })
            const itemSequence = [
                [lineList, { scaleX: 1 }, { duration: .8, delay: stagger(.4), at: 0 }],
                [item.querySelector('.sustainable-commit-item-ic'), { opacity: 1, scale: 1 }, { duration: .6, at: .1 }],
                [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .1 }],
                [describe.lines, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .35 }],
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    title.revert()
                    describe.revert()
                    lineList.forEach(item => item.removeAttribute('style'))
                    item.querySelector('.sustainable-commit-item-ic').removeAttribute('style')
                })
            }, { margin: "-10% 0px -10% 0px" })
        })
        return () => {
            cancelAnimationFrame(thumbReq)
        }
    }, [])


    return (
        <section className="sustainable-commit">
            <div className="container">
                <h2 className="heading h0 txt-black txt-up sustainable-commit-title">{props.title}</h2>
                <div className='sustainable-commit-listing'>
                    {props.list.map((item, idx) => (
                        <div
                            key={idx}
                            className='sustainable-commit-item'
                            onMouseEnter={() => setIndex(idx)}
                            onMouseLeave={() => setIndex(-1)}
                            >
                            <div className='sustainable-commit-item-ic'>
                                <img src={item.icon.url} alt={item.icon.alt} />
                            </div>
                            <h3 className='heading h4 txt-black txt-up sustainable-commit-item-title'>{item.title[0].text}</h3>
                            <div className="txt txt-18 txt-med sustainable-commit-item-desc">
                                <p>{item.desc}</p>
                            </div>
                            <div className="sustainable-commit-item-bg"></div>
                            {idx % 2 != 0 && (
                                <div className="line line-ver"></div>
                            )}
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                            <div className="line">
                                <div className="line-inner"></div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='sustainable-commit-thumb'>
                    <div className="sustainable-commit-thumb-wrap">
                        {props.list.map(({ icon }, idx) => (
                            <div key={`ic-${idx}`} className={`sustainable-commit-thumb-item ${index == idx ? 'active' : ''}`}>
                                <img src={icon.url}  alt={icon.alt} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SustainCommit;