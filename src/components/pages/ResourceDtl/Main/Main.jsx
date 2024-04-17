import "./Main.scss";
import * as prismicH from "@prismicio/client";
import { useEffect, useState } from 'react';
import { convertDate, cleanText } from "@utils/text.js"
import RelatedArticle from "./Related";

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function ResourceMain({ ...props }) {
    const [openTooltip, setOpenTooltip] = useState(false)

    useEffect(() => {
        document.querySelectorAll(".resource-dtl-richtxt-main.richtext .block-img").forEach((el, idx) => {
            if (el.querySelector('img').getAttribute('alt') !== "") {
                let caption = document.createElement("p")
                caption.innerHTML = el.querySelector('img').getAttribute('alt')
                caption.classList.add("block-img-caption")
                el.appendChild(caption)
            }
        })

        cleanText(document.querySelector('.resource-dtl-title'))


        let allText = []
        let heroSplitList = []

        // Hero Anim
        const allItem = document.querySelectorAll(".resource-dtl-bread-link-wrap")
        allItem.forEach((item, idx) => {
            const breadTxt = new SplitType(item.querySelector('.resource-dtl-bread-link'), { types: 'lines, words', lineClass: 'split-line' })
            animate(breadTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            heroSplitList.push(breadTxt)
            if (idx != allItem.length - 1) {
                const slash = item.querySelector('.resource-dtl-bread-div')
                animate(slash, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
                allText.push(...breadTxt.words, slash)
            } else {
                allText.push(...breadTxt.words)
            }
        })
        const title = new SplitType('.resource-dtl-title', { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const heroSequence = [
            [allText, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.02), at: "-.8" }],
        ]

        inView(".resource-dtl-title", () => {
            timeline(heroSequence).finished.then(() => {
                title.revert()
                heroSplitList.forEach(item => item.revert())
            })
        })
        // End Hero Anim

        // Info Slide Anim

        let infoSplitList = []

        animate('.resource-dtl-line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.resource-dtl-richtxt .line-ver', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })

        const sequence = [
            ['.resource-dtl-line', { scaleX: 1 }, { duration: 1, at: "-1" }],
            ['.resource-dtl-richtxt .line-ver', { scaleY: 1 }, { duration: 1, at: "-.8" }],
        ]

        const allInfo = document.querySelectorAll('.resource-dtl-info-stick .resource-dtl-info-item:not(.link)')

        allInfo.forEach((el, idx) => {
            const head = new SplitType(el.querySelector('.resource-dtl-info-item-head'), { types: 'lines, words', lineClass: 'split-line' })
            const content = new SplitType(el.querySelector('.resource-dtl-info-item-content'), { types: 'lines, words', lineClass: 'split-line' })

            animate(head.words, { transform: "translateY(100%)" }, { duration: 0 })
            animate(content.words, { transform: "translateY(100%)" }, { duration: 0 })


            sequence.push(
                [head.words, { transform: "none" }, { duration: .8, at: .4 }],
                [content.words, { transform: "none" }, { duration: .8, at: "-.7" }],
            )
            infoSplitList.push(head, content )
        })

        const allLink = document.querySelectorAll('.resource-dtl-info-stick .resource-dtl-info-item.link .resource-dtl-info-item-link');

        animate(allLink, { opacity: 0, transform: "translateX(-20px) scale(.6)" }, { duration: 0 })
        sequence.push(
            [allLink, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.08), at: .8 }]
        )

        inView('.resource-dtl', () => {
            timeline(sequence).finished.then(() => {
                infoSplitList.forEach(el => el.revert())
                allLink.forEach(item => item.removeAttribute('style'))
            })
        })

        // End Info Slide Anim

        // Sapo Anim

        const sapo = new SplitType('.resource-dtl-richtxt-premble-sapo', { types: 'lines, words', lineClass: 'split-line' })

        animate('.resource-dtl-richtxt-premble-img', { opacity: 0 }, { duration: 0 })
        animate(sapo.words, { transform: "translateY(100%)" }, { duration: 0 })

        const richtxtSequence = [
            ['.resource-dtl-richtxt-premble-img', { opacity: 1 }, { duration: 1, at: .5 }],
            [sapo.words, { transform: "none" }, { duration: .6, delay: stagger(.01), at: "-.7" }],
        ]

        inView('.resource-dtl-richtxt', () => {
            timeline(richtxtSequence).finished.then(() => {
                sapo.revert()
                document.querySelector('.resource-dtl-richtxt').removeAttribute('style')
                document.querySelector('.resource-dtl-richtxt-premble-img').removeAttribute('style')
                // splitArray.forEach(el => el.removeAttribute('style'))
            })
        })
        // End Sapo Anim

        // RichText Anim
        const richTxt = document.querySelectorAll('.resource-dtl-richtxt-main *:not(astro-slot, ul, .block-img-caption)')

        const splitArray = []

        richTxt.forEach((el, idx) => {
            animate(el, { opacity: 0, transform: "translateY(30px)" }, { duration: 0 })

            const inlineRichTxtSequence = [
                [el, { opacity: 1, transform: "none" }, { duration: .6, at: .1 + idx * .05 }]
            ]

            inView(el, () => {
                timeline(inlineRichTxtSequence).finished.then(() => {
                    el.removeAttribute('style')
                })
            })
        })
        // richTxt.forEach((el, idx) => {
        //     animate(el, { opacity: 0, transform: "translateY(30px)" }, { duration: 0 })

        //     richtxtSequence.push(
        //         [el, { opacity: 1, transform: "none" }, { duration: .6, at: .4 }]
        //     )
        //     splitArray.push(el)
        // })
    }, [])

    function copyClipboard(e) {
        e.preventDefault()
        let currentURL = props.url;
        navigator.clipboard.writeText(currentURL)
            .then(function () {
                setOpenTooltip(true)
                setTimeout(() => {
                    setOpenTooltip(false)
                }, 2000)
            })
            .catch(function (err) {
                console.error('Failed to copy: ', err);
            });
    }
    return (
        <section className="resource-dtl">
            <div className="container grid">
                <div className="txt txt-20 txt-bold resource-dtl-bread">
                    <div className="resource-dtl-bread-link-wrap">
                        <a className="resource-dtl-bread-link txt-link" href="/">Home</a>
                        <div className="txt txt-14 txt-semi resource-dtl-bread-div">/</div>
                    </div>
                    <div className="resource-dtl-bread-link-wrap">
                        <a className="resource-dtl-bread-link  txt-link" href="/insights">Insights</a>
                        <div className="txt txt-14 txt-semi resource-dtl-bread-div">/</div>
                    </div>
                    <div className="resource-dtl-bread-link-wrap">
                        <a className="resource-dtl-bread-link txt-link" href={`/insights/${props.data.category.toLowerCase().replaceAll(" ", "-")}`}>
                            {props.data.category}
                        </a>
                    </div>
                </div>
                <h1 className="heading h0 txt-black txt-up resource-dtl-title">{props.data.title}</h1>
                <div className="line resource-dtl-line"></div>
                <div className="resource-dtl-info">
                    <div className="line"></div>
                    <div className="resource-dtl-info-stick">
                        <div className="resource-dtl-info-item">
                            <div className="txt txt-18 txt-med resource-dtl-info-item-head">
                                Category
                            </div>
                            <div className="txt txt-20 txt-bold resource-dtl-info-item-content">
                                {props.data.category}
                            </div>
                        </div>
                        <div className="resource-dtl-info-item">
                            <div className="txt txt-18 txt-med resource-dtl-info-item-head">
                                Updated date
                            </div>
                            <div className="txt txt-20 txt-bold resource-dtl-info-item-content">
                                {convertDate(props.last_publication_date)}
                            </div>
                        </div>
                        <div className="resource-dtl-info-item">
                            <div className="txt txt-18 txt-med resource-dtl-info-item-head">
                                Read time
                            </div>
                            <div className="txt txt-20 txt-bold resource-dtl-info-item-content">
                                {props.data.read_time}
                                {props.data.read_time <= 1 ? " minute" : " minutes"}
                            </div>
                        </div>
                        <div className="resource-dtl-info-item link">
                            <button className="resource-dtl-info-item-link" onClick={(e) => { copyClipboard(e) }} data-cursor="hide">{props.icShare}</button>
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=${props.url}`} target="_blank" className="resource-dtl-info-item-link" data-cursor="hide">{props.icFacebook}</a>
                            <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${props.url}`} target="_blank" className="resource-dtl-info-item-link" data-cursor="hide">{props.icLinked}</a>
                            <div className={`txt txt-16 txt-semi resource-dtl-info-item-link-tooltip ${openTooltip ? 'active' : ""}`}>Link is copied</div>
                        </div>
                    </div>
                </div>
                <div className="resource-dtl-richtxt">
                    <div className="line line-ver"></div>
                    <div className="resource-dtl-richtxt-wrapper">
                        <div className="resource-dtl-richtxt-premble-img">
                            <img
                                src={props.data.feature_image.url}
                                alt={props.data.feature_image.alt}
                                width={props.data.feature_image.dimensions.width}
                                className="img img-fill" />
                        </div>
                        <h2 className="heading h5 txt-black txt-up resource-dtl-richtxt-premble-sapo">{props.data.sapo}</h2>
                        <div className="txt txt-20 txt-med resource-dtl-richtxt-main richtext" dangerouslySetInnerHTML={{ __html: prismicH.asHTML(props.data.content) }}></div>
                    </div>
                </div>
                <div className="line resource-dtl-line"></div>
                <RelatedArticle
                    list={props.relList}
                    icArrow={props.arrIcon}
                    icDropdown={props.icDropDown}
                    client:visible>
                </RelatedArticle>
            </div>
        </section>
    )
}


export default ResourceMain