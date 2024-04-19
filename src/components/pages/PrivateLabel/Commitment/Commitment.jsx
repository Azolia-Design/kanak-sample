import "./Commitment.scss"
import { useEffect } from "react"
import ArrowUpRight from "@/components/globals/IcArrow/ArrowUpRight";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import CommitmentMain from "./CommitmentMain";
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

        inView('.private-commitment', () => {
            timeline(titleSequence).finished.then(() => {
                title.revert()
                sub.revert()
                btn.revert()
                document.querySelector('.private-commitment-line-top').removeAttribute('style')
                document.querySelector('.private-commitment-line-bot').removeAttribute('style')
                document.querySelector('.private-commitment-link svg').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="private-commitment">
            <div className="container grid">
                <div className="line private-commitment-line-top"></div>

                <div className="private-commitment-sticky">
                    <div className="private-commitment-sticky-wrapper">
                        <h1 className="heading h0 txt-black txt-up private-commitment-title">{props.newTitle}</h1>
                        <div className="txt txt-18 txt-med private-commitment-sub">{props.sub}</div>
                        <a href="#" className="private-commitment-link" data-cursor="txtLink">
                            <div className="txt txt-18 txt-bold private-commitment-link-txt">{props.btn}</div>
                            <div className="ic ic-16"><ArrowUpRight /></div>
                        </a>
                    </div>
                </div>
                <CommitmentMain list={props.list}></CommitmentMain>
                <div className="line private-commitment-line-bot"></div>
            </div>
        </section>
    )
}



export default PrivateCommitment