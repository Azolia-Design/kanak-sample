import { useEffect } from "react"
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
function KustomerAwardContent(props) {
    useEffect(() => {
        const title = new SplitType('.kustomer-award-head-title', { types: 'lines, words', lineClass: 'split-line' })
        const label = new SplitType('.kustomer-award-head-label', { types: 'lines, words', lineClass: 'split-line' })
        const describe = new SplitType('.kustomer-award-content-des p', { types: 'lines, words', lineClass: 'split-line' })
        const viewAll = new SplitType('.kustomer-award-content-link .txt', { types: 'lines, words', lineClass: 'split-line' })

        animate('.kustomer-award-head-img img', { opacity: 0, transform: "scale(.8) translateY(40%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(describe.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        // animate('.kustomer-award-content-btn', { opacity: 0, transform: "translateY(20%)" }, { duration: 0 })
        animate(viewAll.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.kustomer-award-content-link svg', { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })
        animate('.kustomer-award-product-qr-wrap', { opacity: 0, transform: "translateY(20%)" }, { duration: 0 })
        animate('.kustomer-award-product', { opacity: 0, transform: "translateY(10%)" }, { duration: 0 })


        const sequence = [
            ['.kustomer-award-product', { opacity: 1, transform: "none" }, { duration: 1, at: 0 }],
            ['.kustomer-award-head-img img', { opacity: 1, transform: "scale(1) translateY(0)" }, { duration: .6, at: 0 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: .1 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: .2 }],
            [describe.words, { opacity: 1, transform: 'none' }, { duration: .3, delay: stagger(.004), at: .3 }],
            ['.kustomer-award-product-qr-wrap', { opacity: 1, transform: "none" }, { duration: .6, at: .5 }],
            [viewAll.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.01), at: .5 }],
            ['.kustomer-award-content-link svg', { opacity: 1, transform: "none" }, { duration: .4, at: .6 }],
            // ['.kustomer-award-content-btn', { opacity: 1, transform: "none" }, { duration: .6, at: .6 }],
        ]

        inView(".kustomer-award", () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                describe.revert()
                viewAll.revert()
                document.querySelector('.kustomer-award-head-img img').removeAttribute('style')
                document.querySelector('.kustomer-award-product-qr-wrap').removeAttribute('style')
                document.querySelector('.kustomer-award-content-link svg').removeAttribute('style')
                document.querySelector('.kustomer-award-product').removeAttribute('style')
            })
        }, { margin: "-40% 0px -40% 0px" })
    }, [])
    return (
        <>
            <div className="kustomer-award-head">
                <div className="kustomer-award-head-img">
                    <img src={props.medal.url} alt={props.medal.alt} />
                    {props.imgPLMA}
                </div>
                <div className="heading h4 txt-black txt-up kustomer-award-head-label">
                    {props.label}
                </div>
                <h1 className="heading h0 txt-black txt-up kustomer-award-head-title">
                    {props.title}
                </h1>
            </div>
            <div className="kustomer-award-content">
                <div className="txt txt-18 txt-med kustomer-award-content-des">
                    {props.describe}
                </div>
                <a href="/katalog?category=plates--platters" className="kustomer-award-content-link txt-link" data-cursor="txtLink">
                        <div className="txt txt-18 txt-bold">{props.btn}</div>
                        <ArrowUpRight />
                    </a>
            </div>
        </>
    )
}
export default KustomerAwardContent;