import './PolicyMain.scss'
import { useEffect, useState } from 'react';
import * as ut from "@/js/utils"
import { getLenis } from '@/components/core/lenis';


import SplitType from 'split-type';
import { animate, timeline, stagger, inView, createStyleString } from "motion";


function PolicyMain({ ...props }) {
    const [activeToc, setActiveToc] = useState(0)

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

        animate('.line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.line-mid', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.line-ver', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(updateDate.words, { transform: "translateY(100%)" }, { duration: 0 })
        animate(naviTxt.chars, { transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            ['.line-top', { scaleX: 1 }, { duration: 1, at: 0 }],
            ['.line-mid', { scaleX: 1 }, { duration: .9, at: "-.85" }],
            ['.line-ver', { scaleY: 1 }, { duration: 1.8, at: "-.4" }],
            [updateDate.words, { transform: "none" }, { duration: .4, delay: stagger(.04), at: .5 }],
            [naviTxt.chars, { transform: "none" }, { duration: .4, delay: stagger(.01), at: .5 }],
        ]

        const linkList = document.querySelectorAll('.policy-nav-list .policy-nav-item')

        linkList.forEach((el, idx) => {
            // el.querySelector('.dot')

            animate(el, { opacity: 0, transform: "translateX(-10px)" }, { duration: 0 })
            sequence.push(
                [el, { opacity: 1, transform: "none" }, { duration: .4, at: "-.35" }],
            )

            // animate(el.querySelector('.dot'), { opacity: 0, transform: "translateX(-10px)" }, { duration: 0 })
            // animate(el.querySelector('.policy-nav-item-link'), { opacity: 0, transform: "translateX(-10px)" }, { duration: 0 })

            // sequence.push(
            //     [el.querySelector('.dot'), { opacity: 1, transform: "none" }, { duration: .4, at: "-.3" }],
            //     [el.querySelector('.policy-nav-item-link'), { opacity: 1, transform: "none" }, { duration: .4, at: "-.4" }]
            // )
        })

        inView('.policy-main', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.line-top').removeAttribute('style')
                document.querySelector('.line-mid').removeAttribute('style')
                document.querySelector('.line-ver').removeAttribute('style')
                updateDate.revert()
                naviTxt.revert()

            })
        })
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
                                <button className='txt txt-18 txt-med policy-nav-item-link' onClick={(e) => { activeScrollTo(e) }} data-scrollto={encodeURI(el.content)}>{el.content.charAt(0).toUpperCase() + el.content.substring(1).toLowerCase()}</button>
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