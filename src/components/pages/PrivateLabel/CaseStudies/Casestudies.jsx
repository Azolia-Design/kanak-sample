import "./Casestudies.scss";
import CaseStudiesMain from "./CasestudiesMain";
import ArrowUpRight from "@/components/globals/IcArrow/ArrowUpRight"
import { useEffect } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function PrivateCaseStudies({ ...props }) {
    useEffect(() => {
        const label = new SplitType(".private-kasestu-label", { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(".private-kasestu-title", { types: 'lines, words', lineClass: 'split-line' })
        const paragraph = new SplitType(".private-kasestu-des-content", { types: 'lines, words', lineClass: 'split-line' })
        const link = new SplitType(".private-kasestu-des-link .txt", { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(paragraph.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(link.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(".private-kasestu-des-link .ic svg", { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.02), at: .1 }],
            [paragraph.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: .3 }],
            [link.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.02), at: .6 }],
            [".private-kasestu-des-link .ic svg", { opacity: 1, transform: 'none' }, { duration: .4, at: .8 }]
        ]
        inView('.private-kasestu', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                paragraph.revert()
                link.revert()
                document.querySelector(".private-kasestu-des-link .ic svg").removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })
    }, [])
    return (
        <section className="private-kasestu">
            <div className="container grid">
                <div className="heading h4 txt-black txt-up private-kasestu-label">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up private-kasestu-title">{props.title}</h1>
                <div className="private-kasestu-des">
                    <p className="txt txt-18 txt-med private-kasestu-des-content">{props.des}</p>
                    <a href="/kase-studies" className="private-kasestu-des-link txt-link" data-cursor="txtLink">
                        <div className="txt txt-18 txt-bold">View all kase studies</div>
                        <div className="ic ic-16">
                            <ArrowUpRight />
                        </div>
                    </a>
                </div>
                <CaseStudiesMain list={props.list} />
            </div>
        </section>
    )
}


export default PrivateCaseStudies