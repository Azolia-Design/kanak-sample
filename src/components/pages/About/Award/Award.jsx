import './Award.scss';
import { getLenis } from '@/components/core/lenis';
import { useEffect, useState, useRef } from "react";
import { animate, inView, scroll, stagger, timeline } from "motion";
import SplitType from "split-type";
import useSelector from "@/components/hooks/useSelector";
import LetterPopup from '@components/globals/LetterPopup'

function AboutAward({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [detailLetter, setDetailLetter] = useState([]);

    useEffect(() => {
        const label = new SplitType(q('.abt-award-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.abt-award-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.06), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
        ]
        inView('.abt-award', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })

        // Anim Item

        const allHeads = document.querySelectorAll('.abt-award-grp-head')
        allHeads.forEach((el, idx) => {
            const title = new SplitType(el.querySelector('.abt-award-grp-head-title'), { types: 'lines, words', lineClass: 'split-line' })

            animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(el.querySelector('.dot'), { opacity: 0, scale: .8 }, { duration: 0 })
            animate(el.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

            const headSequence = [
                [el.querySelector('.line'), { scaleX: 1 }, { duration: 1, at: 0 }],
                [el.querySelector('.dot'), { opacity: 1, scale: 1 }, { duration: .6, at: .2 }],
                [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.05), at: 0 }],
            ]

            inView(el, () => {
                timeline(headSequence).finished.then(() => {
                    el.querySelector('.line').removeAttribute('style')
                    el.querySelector('.dot').removeAttribute('style')
                    title.revert()
                })
            }, { margin: "-10% 0px -10% 0px" })
        })
        const allBodies = document.querySelectorAll('.abt-award-grp-body .abt-award-item')
        allBodies.forEach((el, idx) => {
            const title = new SplitType(el.querySelector('.abt-award-item-content-title'), { types: 'lines, words', lineClass: 'split-line' })
            const txt = new SplitType(el.querySelector('.abt-award-item-content-sub'), { types: 'lines, words', lineClass: 'split-line' })
            const link = new SplitType(el.querySelector('.abt-award-item-content-link span'), { types: 'lines, words', lineClass: 'split-line' })

            el.querySelector('.line-ver') && animate(el.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            animate(el.querySelector('.abt-award-item-img-wrap'), { opacity: 0, scale: .8 }, { duration: 0 })
            animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(txt.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(link.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(el.querySelector('.abt-award-item-content-link svg'), { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

            const bodySequence = [
                [el.querySelector('.line-ver') && el.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1, at: 0 }],
                [el.querySelector('.abt-award-item-img-wrap'), { opacity: 1, scale: 1 }, { duration: .6, at: 0 }],
                [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.05), at: 0 }],
                [txt.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.005), at: .2 }],
                [link.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.03), at: .3 }],
                [el.querySelector('.abt-award-item-content-link svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: .4 }],
            ]

            inView(el, () => {
                timeline(bodySequence).finished.then(() => {
                    el.querySelector('.abt-award-item-img-wrap').removeAttribute('style')
                    title.revert()
                    txt.revert()
                    link.revert()
                    el.querySelector('.abt-award-item-content-link svg').removeAttribute('style')
                    el.querySelector('.line-ver') && el.querySelector('.line-ver').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" })
        })

    }, [])

    return (
        <>
            <section className="abt-award" ref={sectionRef}>
                <div className="container grid">
                    <div className="abt-award-title-wrap">
                        <div className="heading h4 txt-black txt-up abt-award-label">
                            Awards & Endorsements
                        </div>
                        <h2 className="heading h0 txt-black txt-up abt-award-title">
                            Celebrating Impact Over <span className="txt-green">Accolades</span>
                        </h2>
                    </div>
                    <div className="abt-award-grp">
                        <div className="abt-award-grp-head">
                            <div className="dot"></div>
                            <h3 className="heading h4 txt-black txt-up abt-award-grp-head-title">
                                Awards
                            </h3>
                            <div className="line"></div>
                        </div>
                        <div className="abt-award-grp-body top">
                            <div className="abt-award-item">
                                <div className="abt-award-item-img-wrap">
                                    {props.abtAwardTop}
                                </div>
                                <div className="abt-award-item-content">
                                    <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                        PLMA 2022 Best Plate Award
                                    </h3>
                                    <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                        Our Sustainables® 9” Octi-Square Plate has clinched the <span className="txt-bold">PLMA 2022 Best Plate Award</span> in the Home & Household category, standing out among thousands with its innovative, eco-friendly design.
                                    </p>
                                    <a href="/kustomers/retail#kustomer-sus" className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink">
                                        <span>View Sustainables® Collection</span>
                                        <div className="ic ic-16">
                                            {props.icArrExt}
                                        </div>
                                    </a>
                                </div>
                            </div>
                        </div>
                        <div className="abt-award-grp-head">
                            <div className="dot"></div>
                            <h3 className="heading h4 txt-black txt-up abt-award-grp-head-title">
                                {props.endorsements_title[0].text}
                            </h3>
                            <div className="line"></div>
                        </div>
                        <div className="abt-award-grp-body bot">
                            {props.endorsements_list.map((el, idx) => (
                                <div className="abt-award-item" key={idx}>
                                    <div className="abt-award-item-img-wrap">
                                        <img src={el.item_icon.url} alt={el.item_icon.alt} width={el.item_icon.dimensions.width} className='img img-fit' />
                                    </div>
                                    <div className="abt-award-item-content">
                                        <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                            {el.item_title[0].text}
                                        </h3>
                                        <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                            {el.item_subtitle[0].text}
                                        </p>
                                        <button className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink" onClick={() => { setIsOpenPopup(true); setDetailLetter(el.item_letter); getLenis().stop() }}>
                                            <span>{idx === 0 ? "View pledge" : "View letter"}</span>
                                            <div className="ic ic-16">
                                                {props.icArrExt}
                                            </div>
                                        </button>
                                    </div>
                                    {idx % 2 == 0 && (
                                        <div className="line line-ver"></div>
                                    )}
                                </div>
                            ))}
                            {/* <div className="abt-award-item">
                            <div className="abt-award-item-img-wrap">
                                {props.abtAwardBot1}
                            </div>
                            <div className="abt-award-item-content">
                                <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                    DEI Commitment with McDonalds
                                </h3>
                                <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                    We pledge along with McDonald's to demonstrate a commitment to diversity, equity and inclusion in ways meaningful to our organization and that also accelerate change and innovation throughout our collective value chain.
                                </p>
                                <a href="#" className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink">
                                    <span>View pledge</span>
                                    <div className="ic ic-16">
                                        {props.icArrExt}
                                    </div>
                                </a>
                            </div>
                            <div className="line line-ver"></div>
                        </div> */}
                            {/* <div className="abt-award-item">
                            <div className="abt-award-item-img-wrap">
                                {props.abtAwardBot2}
                            </div>
                            <div className="abt-award-item-content">
                                <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                    A “Smart” Retailer's Endorsement
                                </h3>
                                <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                    Since my involvement with the Kanak Naturals team that started over 5 years, I have found Kanak company to be world class in many ways. The product quality is excellent, consistent and their delivery has been on time.
                                </p>
                                <a href="#" className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink">
                                    <span>View letter</span>
                                    <div className="ic ic-16">
                                        {props.icArrExt}
                                    </div>
                                </a>
                            </div>
                        </div> */}
                        </div>
                    </div>
                </div>
            </section>
            <LetterPopup
                isActive={isOpenPopup}
                setIsActive={setIsOpenPopup}
                data={detailLetter} />
        </>
    )
}
export default AboutAward