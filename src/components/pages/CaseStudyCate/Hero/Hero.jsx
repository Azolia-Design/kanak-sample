import './Hero.scss';
import { useEffect } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function CaseCateHero({ ...props }) {
    useEffect(() => {
        let breadcrumbText = []
        let splitList = []
        const allItem = document.querySelectorAll(".case-cate-hero-bread-link-wrap")
        allItem.forEach((item, idx) => {
            const breadTxt = new SplitType(item.querySelector('.case-cate-hero-bread-link'), { types: 'lines, words', lineClass: 'split-line' })
            animate(breadTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            splitList.push(breadTxt)
            if (idx != allItem.length - 1) {
                const slash = item.querySelector('.case-cate-hero-bread-div')
                animate(slash, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
                breadcrumbText.push(...breadTxt.words, slash)
            } else {
                breadcrumbText.push(...breadTxt.words)
            }
        })

        const title = new SplitType('.case-cate-hero-title', { types: 'lines, words', lineClass: 'split-line' })
        const subTitle = new SplitType('.case-cate-hero-content-sub', { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subTitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [breadcrumbText, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04)}],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.02), at: .1 }],
            [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.01), at: .2 }],
        ]

        inView('.case-cate-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert()
                splitList.forEach(el => el.revert())
            })
        }, { margin: "-10% 0px 10% 0px" })
    }, [])
    return (
        <section className="case-cate-hero">
            <div className="container grid">
                <div className="case-cate-hero-title-wrap">
                    <div className="case-cate-hero-bread">
                        <div className="case-cate-hero-bread-link-wrap">
                            <a href="/" className="txt txt-20 txt-bold case-cate-hero-bread-link">
                                Home
                            </a>
                            <div className="txt txt-14 txt-semi case-cate-hero-bread-div">/</div>
                        </div>
                        <div className="case-cate-hero-bread-link-wrap">
                            <a href="/kase-studies" className="txt txt-20 txt-bold case-cate-hero-bread-link">
                                Kase Studies
                            </a>
                        </div>
                    </div>
                    <h1 className="heading h0 txt-black txt-up case-cate-hero-title">
                        {props.title}
                    </h1>
                </div>
                <div className="case-cate-hero-content">
                    <p className="txt txt-18 txt-bold case-cate-hero-content-sub">
                        {props.client_quote}
                    </p>
                </div>
            </div>
        </section>
    )
}

export default CaseCateHero