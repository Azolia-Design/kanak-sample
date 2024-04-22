import { useEffect, useRef } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function CommitmentItem({ ...props }) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current

        const title = new SplitType(item.querySelector(".private-commitment-main-item-content-title"), { types: 'lines, words', lineClass: 'split-line' })
        const des = new SplitType(item.querySelector(".private-commitment-main-item-content-des"), { types: 'lines, words', lineClass: 'split-line' })

        animate(item.querySelector('.private-commitment-main-item-img img'), { opacity: 0, scale: .8, transformOrigin: "left bottom" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(des.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })


        const sequence = [
            [item.querySelector('.private-commitment-main-item-img img'), { opacity: 1, scale: 1 }, { duration: .7 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [des.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .2 }],
            [item.querySelector('.line'), { scaleX: 1 }, { duration: .55, at: .2 }],
        ]
        inView(item, () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                des.revert()
                item.querySelector('.line').removeAttribute('style')
                item.querySelector('.private-commitment-main-item-img img').removeAttribute('style')

            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <div className="private-commitment-main-item" ref={itemRef}>
            <div className="private-commitment-main-item-img">
                <img src={props.image.url} alt={props.image.alt} width={props.image.dimensions.width} className="img img-fill" />
            </div>
            <div className="private-commitment-main-item-content">
                <h3 className="heading h4 txt-black txt-up private-commitment-main-item-content-title">
                    {props.title[0].text}
                </h3>
                <div className="private-commitment-main-item-content-info">
                    <div className="txt txt-18 txt-med private-commitment-main-item-content-des">
                        {props.subtitle}
                    </div>
                </div>
            </div>
            <div className="line"></div>
        </div>
    )
}

function CommitmentMain({ ...props }) {
    useEffect(() => {
        animate('.private-commitment-main-line', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        const sequence = [
            ['.private-commitment-main-line', { scaleY: 1 }, { duration: 2 }],
        ]
        inView(".private-commitment-main", () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.private-commitment-main-line').removeAttribute('style')
            })
        })
    }, [])
    return (
        <div className="private-commitment-main">
            <div className="line line-ver private-commitment-main-line"></div>
            <div className="private-commitment-main-inner">
                {props.list.map((item, idx) => (
                    <CommitmentItem {...item} key={idx} />
                ))}
            </div>
        </div>
    )
}

export default CommitmentMain