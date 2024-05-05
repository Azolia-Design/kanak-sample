import "./Commitment.scss"
import { useEffect } from "react"
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function PrivateCommitment({ ...props }) {
    useEffect(() => {
        const title = new SplitType(".private-commitment-title", { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(".private-commitment-sub", { types: 'lines, words', lineClass: 'split-line' })
        const btn = new SplitType(".private-commitment-link-txt", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(btn.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(document.querySelector('.private-commitment-link svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })
        animate('.private-commitment-line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.private-commitment-line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const titleSequence = [
            ['.private-commitment-line-top', { scaleX: 1 }, { duration: .8, at: .1 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [sub.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .2 }],
            [btn.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: .3 }],
            [document.querySelector('.private-commitment-link svg'), { opacity: 1, transform: "none" }, { duration: .6, at: .35 }],
            ['.private-commitment-line-bot', { scaleX: 1 }, { duration: .8, at: .2 }],
        ]
        if (window.innerWidth > 991) {
            animate('.private-commitment-main-line', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            titleSequence.push(
                ['.private-commitment-main-line', { scaleY: 1 }, { duration: 2, at: .3 }],
            )
        }

        inView('.private-commitment', () => {
            timeline(titleSequence).finished.then(() => {
                title.revert()
                sub.revert()
                btn.revert()
                document.querySelector('.private-commitment-line-top').removeAttribute('style')
                document.querySelector('.private-commitment-line-bot').removeAttribute('style')
                document.querySelector('.private-commitment-link svg').removeAttribute('style')
                document.querySelector('.private-commitment-main-line').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })

        // Anim Item
        const allItems = document.querySelectorAll('.private-commitment-main-item')

        allItems.forEach((item, idx) => {
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
        })
    }, [])
    return (
        <section className="private-commitment">
            <div className="container grid">
                <div className="line private-commitment-line-top"></div>
                <div className="private-commitment-sticky">
                    <div className="private-commitment-sticky-wrapper">
                        <h1 className="heading h0 txt-black txt-up private-commitment-title">{props.newTitle}</h1>
                        <div className="txt txt-18 txt-med private-commitment-sub">{props.sub}</div>
                        <a href="#" className="txt-link private-commitment-link" data-cursor="txtLink">
                            <div className="txt txt-18 txt-bold private-commitment-link-txt">{props.btn}</div>
                            <div className="ic ic-16"><ArrowUpRight /></div>
                        </a>
                    </div>
                </div>
                <div className="private-commitment-main">
                    <div className="line line-ver private-commitment-main-line"></div>
                    <div className="private-commitment-main-inner">
                        {props.renderList}
                    </div>
                </div>
                <div className="line private-commitment-line-bot"></div>
            </div>
        </section>
    )
}



export default PrivateCommitment