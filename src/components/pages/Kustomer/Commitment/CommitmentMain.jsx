import { useEffect, useState, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { parseRem } from "@/js/utils";

function CommitItem({ title, describle, img, idx, ...props }) {
    const itemRef = useRef()
    useEffect(() => {
        const item = itemRef.current

        const title = new SplitType(item.querySelector('.kustomer-commit-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const describe = new SplitType(item.querySelector('.kustomer-commit-main-item-des p'), { types: 'lines. words', lineClass: 'split-line' })

        animate(title.words, { transform: "translateY(100%)" }, { duration: 0 })
        animate(describe.lines, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelectorAll(".line-inner"), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(item.querySelector('.kustomer-commit-main-item-img'), { opacity: 0, scale: .9 }, { duration: 0 })

        let lineList = []
        item.querySelectorAll(".line-inner").forEach((el, idx) => {
            lineList.push(el)
        })
        const itemSequence = [
            [lineList, { scaleX: 1 }, { duration: .8, delay: stagger(.4), at: 0 }],
            [item.querySelector('.kustomer-commit-main-item-img'), { opacity: 1, scale: 1 }, { duration: .6, at: .1 }],
            [title.words, { transform: "none" }, { duration: .6, delay: stagger(.04), at: .1 }],
            [describe.lines, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .35 }],
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                title.revert()
                describe.revert()
                lineList.forEach(item => item.removeAttribute('style'))
                item.querySelector('.kustomer-commit-main-item-img').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <div className="kustomer-commit-main-item" {...props} ref={itemRef}>
            <div className="kustomer-commit-main-item-img">
                <img src={img.url} alt={img.alt} width={img.dimensions.width} />
            </div>
            <h3 className="heading h4 txt-black txt-up kustomer-commit-main-item-title">{title}</h3>
            <div className="txt txt-18 txt-med kustomer-commit-main-item-des">
                <p>{describle}</p>
            </div>
            <div className="kustomer-commit-main-item-bg"></div>
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
    )
}

function KustomerCommitMain(props) {
    let allItem = props.list;
    const contentList = allItem.map((item, idx) => ({ title: item.data.title, describle: item.data.describle, image: item.data.image, idx: idx }));
    const thumbList = allItem.map((item, idx) => ({ image: item.data.image, idx: idx }));

    const [activeIc, setActiveIc] = useState(-1)

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }
    useEffect(() => {
        const thumb = document.querySelector('.kustomer-commit-main-thumb-wrapper')
        let thumbReq;
        let targetX = 0
        let targetY = 0

        function thumbMove() {
            let curX = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m41
            let curY = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m42

            let cursorX = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-left'))
            let cursorY = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--cursor-top'))
            let wrapTop = document.querySelector(".kustomer-commit-main-thumb").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".kustomer-commit-main-thumb").getBoundingClientRect().left

            if (document.querySelector('.kustomer-commit-main:hover')) {
                targetX = - thumb.offsetWidth / 2 + ((cursorX - wrapLeft) / (document.querySelector(".kustomer-commit-main-thumb").offsetWidth) - .5) * parseRem(300)
                targetY = cursorY - wrapTop - thumb.offsetHeight / 2 - document.querySelector(".kustomer-commit-main-thumb").offsetHeight / 2
            } else {
                setActiveIc(-1)
            }
            thumb.style.transform = `translate(${lerp(curX, targetX, .03)}px, ${lerp(curY, targetY, .03)}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }

        inView('.kustomer-commit-main', () => {
            thumbReq = requestAnimationFrame(thumbMove)
        })
        return () => {
            cancelAnimationFrame(thumbReq)
        }
    }, [])
    return (
        <div className="kustomer-commit-main">
            <div className="kustomer-commit-main-wrapper">
                {contentList.map((item, idx) =>
                    <CommitItem
                        img={item.image}
                        title={item.title[0].text}
                        describle={item.describle}
                        idx={idx}
                        key={idx}
                        onMouseEnter={() => { setActiveIc(item.idx) }}
                        onMouseLeave={() => { setActiveIc(-1) }}
                    />
                )}
            </div>
            <div className="kustomer-commit-main-thumb">
                <div className="kustomer-commit-main-thumb-wrapper">
                    {thumbList.map((thumb, thumbIdx) => (
                        <div className={`kustomer-commit-main-thumb-item ${activeIc == thumb.idx ? 'active' : ''}`} key={thumbIdx}>
                            <img src={thumb.image.url} alt={thumb.image.alt} width={thumb.image.dimensions.width} className="img" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default KustomerCommitMain
