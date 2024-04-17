import './PolicyMain.scss'
import { useEffect, useState } from 'react';
import * as ut from "@/js/utils"
import { getLenis } from '@/components/core/lenis';


import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";


function PolicyMain({ ...props }) {
    const [activeToc, setActiveToc] = useState(0)
    const [richTxtIdx, setRichTxtIdx] = useState(0)

    function activeScrollTo(e) {
        let header = ut.dom('.header-div-main')
        let el = ut.dom(`.policy-body-main-richtxt h2[data-scrollto="${e.target.getAttribute('data-scrollto')}"]`)
        getLenis().scrollTo(el, {
            offset: -header.clientHeight
        })
    }

    function ActiveTocFunc() {
        let allHeading = ut.dom('.policy-body-main-richtxt h2');
        getLenis().on('scroll', function (inst) {
            for (let i = 0; i < allHeading.length; i++) {
                let top = allHeading[i].getBoundingClientRect().top;
                if (top > 0 && top < (window.innerHeight / 4)) {
                    setActiveToc(i)
                }
            }
        })
    }
    useEffect(() => {
        ActiveTocFunc();

        const updateDate = new SplitType('.policy-update-txt', { types: 'lines, words', lineClass: 'split-line' })
        const naviTxt = new SplitType('.policy-navtitle-txt', { types: 'lines, words, chars', lineClass: 'split-line' })
        const linkList = document.querySelectorAll('.policy-nav-list .policy-nav-item')

        animate('.line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.line-mid', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.line-ver', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(updateDate.words, { transform: "translateY(100%)" }, { duration: 0 })
        animate(naviTxt.chars, { transform: "translateY(100%)" }, { duration: 0 })
        animate(linkList, { opacity: 0, transform: "translateX(10px)" }, { duration: 0 })

        const sequence = [
            ['.line-top', { scaleX: 1 }, { duration: 1, at: 0 }],
            ['.line-mid', { scaleX: 1 }, { duration: .9, at: .2 }],
            ['.line-ver', { scaleY: 1 }, { duration: 1.8, at: .6 }],
            [updateDate.words, { transform: "none" }, { duration: .4, delay: stagger(.015), at: .5 }],
            [naviTxt.chars, { transform: "none" }, { duration: .4, delay: stagger(.005), at: .7 }],
            [linkList, { opacity: 1, transform: "none" }, { duration: .35, delay: stagger(.04), at: .85 }],
        ]

        inView('.policy-main', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.line-top').removeAttribute('style')
                document.querySelector('.line-mid').removeAttribute('style')
                document.querySelector('.line-ver').removeAttribute('style')
                updateDate.revert()
                naviTxt.revert()
            })
        })

        // RichTxt Anim
        const items = document.querySelectorAll('.policy-body-main-richtxt *:not(astro-slot, ul)')

        const splitArray = []
        items.forEach((el, idx) => {
            const splitTxt = new SplitType(el, { types: 'lines, words', lineClass: 'split-line' })

            animate(splitTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            const itemSequence = [
                [splitTxt.words, { opacity: 1, transform: "none" }, { duration: .4, at: .05 }],
            ]
            inView(el, () => {
                if (el.tagName == 'LI') {
                    el.classList.add('show')
                }
                timeline(itemSequence).finished.then(() => {
                    splitTxt.revert()
                })
            }, { margin: "-10% 0px -10% 0px" })

            // animate(el, { opacity: 0, transform: "translateY(30px)" }, { duration: 0 })

            // itemSequence.push(
            //     [el, { opacity: 1, transform: "none" }, { duration: .6, at: .4 }]
            // )
            // splitArray.push(el)
        })
        // End RichTxt Anim

    }, [])

    return (
        <section className="policy-main">
            <div className="container grid">
                <div className="line line-top"></div>
                <div className="line line-mid"></div>
                <div className="line line-ver"></div>
                <div className="policy-update">
                    <div className="txt txt-20 txt-med policy-update-txt">Last updated {props.last_update}</div>
                </div>
                <div className="policy-navtitle">
                    <div className="txt txt-20 txt-black txt-up policy-navtitle-txt">Navigation</div>
                </div>
                <div className="policy-nav">
                    <ul className="policy-nav-list">
                        {props.title_list.map((el, idx) => (
                            <li key={idx} className={`policy-nav-item ${idx == activeToc ? 'active' : ''}`}>
                                <div className="dot"></div>
                                <button className='txt txt-18 txt-med policy-nav-item-link' onClick={(e) => { activeScrollTo(e) }} data-scrollto={encodeURI(el.content)} data-cursor="txtLink">{el.content.charAt(0).toUpperCase() + el.content.substring(1).toLowerCase()}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="policy-body">
                    <div className="policy-body-main">
                        <div className="txt txt-20 txt-med policy-body-main-richtxt">
                            {props.content}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PolicyMain