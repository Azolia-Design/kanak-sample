import { useEffect } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function ResourceCateHero({ ...props }) {
    useEffect(() => {
        let allText = []
        let splitList = []
        const allItem = document.querySelectorAll(".resource-cate-hero-bread-link-wrap")
        allItem.forEach((item, idx) => {
            const breadTxt = new SplitType(item.querySelector('.resource-cate-hero-bread-link'), { types: 'lines, words', lineClass: 'split-line' })
            animate(breadTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            splitList.push(breadTxt)
            if (idx != allItem.length - 1) {
                const slash = item.querySelector('.resource-cate-hero-bread-div')
                animate(slash, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
                allText.push(...breadTxt.words, slash)
            } else {
                allText.push(...breadTxt.words)
            }
        })

        const title = new SplitType('.resource-cate-hero-head-title', { types: 'lines, words', lineClass: 'split-line' })
        const quote = new SplitType('.resource-cate-hero-head-quote', { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(quote.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [allText, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.02), at: .2 }],
            [quote.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: .4 }],
        ]

        inView('.resource-cate-hero-bread', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                quote.revert()
                splitList.map((el, idx) => el.revert())
            })
        })

    }, [])
    return (
        <>
            <div className="txt txt-20 txt-bold resource-cate-hero-bread">
                <div className="resource-cate-hero-bread-link-wrap">
                    <a href="/" className="txt-bold resource-cate-hero-bread-link txt-link">Home</a>
                    <div className="txt txt-14 txt-med resource-cate-hero-bread-div">/</div>
                </div>
                <div className="resource-cate-hero-bread-link-wrap">
                    <a href="/insights" className="txt-bold resource-cate-hero-bread-link txt-link">Insights</a>
                </div>
            </div>
            <div className="txt-bold resource-cate-hero-head">
                <h1 className="heading h0 txt-black txt-up resource-cate-hero-head-title">{props.title}</h1>
                <p className="txt txt-20 txt-black txt-up resource-cate-hero-head-quote">Comprehensive Analysis and Expert Insights into Market Trends, Dynamics, and Future Projections.</p>
            </div>
        </>
    )
}

export default ResourceCateHero