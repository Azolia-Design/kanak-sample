import './PolicyMain.scss'
import { useEffect, useState, useMemo } from 'react';
import * as ut from "@/js/utils"
import { getLenis } from '@components/core/lenis';

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function PolicyMain(props) {
    const [activeToc, setActiveToc] = useState(0)
    const [data, setData] = useState('');
    const [listTOC, setListTOC] = useState([]);
    const [lastUpdated, setLastUpdated] = useState('');
    const [loaded, setLoaded] = useState(false);

    function removeInlineStyledElements(parent) {
        if (!parent) return;

        let heading1 = document?.querySelectorAll('[data-custom-class="heading_1"]')
        let heading2 = document?.querySelectorAll('[data-custom-class="heading_2"]')
        heading1.forEach(heading => {
            if (heading.querySelector('[id]')) {
                heading.id = heading.querySelector('[id]').id;
            }
            heading.innerHTML = heading.textContent
        })

        // Lấy tất cả các phần tử con của parent
        const elements = parent?.querySelectorAll('*');
        elements.forEach(element => {
            if (element.hasAttribute('style')) {
                // Kiểm tra nếu style có chứa 'line-height'
                const style = element.getAttribute('style');
                const isInTable = element.closest('table') !== null;
                if (style.includes('line-height') || isInTable) {
                    return;
                }
                while (element.firstChild) {
                    // Đưa các phần tử con ra khỏi element đã xóa
                    element.parentNode.insertBefore(element.firstChild, element);
                }
                // Xóa element có style inline không chứa 'line-height'
                element.parentNode.removeChild(element);
            }
            if (!element.textContent) {
                element.remove();
            }
        });

        heading1.forEach(heading => {
            if (heading.closest('[id]')) {
                let headingID = heading.closest('[id]')?.id;
                heading.closest('[id]').removeAttribute('id');
                heading.id = headingID;
            }
            heading.innerHTML = heading.textContent
        })
        heading2.forEach(heading => heading.innerHTML = heading.textContent)
    }

    async function fetchDocument(url) {
        try {
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Content-Encoding': 'br'
                }
            });

            const html = await response.text();
            return html;
        }
        catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    }

    useEffect(() => {
        fetchDocument(`https://app.termly.io/api/v1/snippets/websites/613278a6-0f3c-4a81-882b-a826d9d292ce/documents/${props.id}/preview`).then(json => {
            const parsed = JSON.parse(json);
            setData(parsed.content.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ''));
            setLoaded(true);
        });
    })

    const renderTOC = useMemo(() => {
        return (
            listTOC.map((el, idx) => (
                <li key={idx} className={`policy-nav-item ${idx == activeToc ? 'active' : ''}`}>
                    <div className="dot"></div>
                    <button
                        className='txt txt-18 txt-med policy-nav-item-link'
                        onClick={() => {
                            activeScrollTo(el.href.replace('#', ''));
                            setActiveToc(idx)
                        }}
                        data-cursor="hide">
                            {el.content.charAt(0).toUpperCase() + el.content.substring(1).toLowerCase()}
                    </button>
                </li>
            ))
        );
    }, [data, listTOC, activeToc])

    useEffect(() => {
        removeInlineStyledElements(document.querySelector('[data-custom-class="body"]'));
        let headings = document.querySelectorAll('[data-custom-class="heading_1"]')
        const regex = /^\d+\.\s/;
        const filteredHeadings = Array.from(headings).filter(heading => {
            return regex.test(heading.textContent.trim());
        }).map((item) => item.id);
        const list = Array
            .from(document.querySelectorAll('[data-custom-class="link"]'))
            .filter((heading) => regex.test(heading.textContent.trim()))
            .filter((item) => {
                if (item.tagName.toLowerCase() != 'a') {
                    return filteredHeadings.includes(item.closest('a').getAttribute('href')?.replace('#', ''))
                }
                else {
                    return filteredHeadings.includes(item.getAttribute('href')?.replace('#', ''))
                }
            })
            .map((item) => {
                let data;
                if (item.tagName.toLowerCase() != 'a') {
                    data = ({ content: item.textContent.replace(regex, ''), href: item.closest('a').getAttribute('href') });
                }
                else {
                    data = ({ content: item.textContent.replace(regex, ''), href: item.getAttribute('href') });
                }
                return data;
            })
        setListTOC(list);
        setLastUpdated(document.querySelector('[data-custom-class="subtitle"]')?.textContent);
    }, [data])

    function activeScrollTo(id) {
        let header = ut.dom('.header-div-main')
        let el = ut.dom(`[id="${id}"]`)
        getLenis().scrollTo(el, {
            offset: -header.clientHeight
        })
    }

    // function ActiveTocFunc() {
    //     let allHeading = ut.dom('.policy-body-main-richtxt h2');
    //     getLenis().on('scroll', function (inst) {
    //         for (let i = 0; i < allHeading.length; i++) {
    //             let top = allHeading[i].getBoundingClientRect().top;
    //             if (top > 0 && top < (window.innerHeight / 4)) {
    //                 setActiveToc(i)
    //             }
    //         }
    //     })
    // }
    // useEffect(() => {
    //     ActiveTocFunc();

    //     const updateDate = new SplitType('.policy-update-txt', { types: 'lines, words', lineClass: 'split-line' })
    //     const naviTxt = new SplitType('.policy-navtitle-txt', { types: 'lines, words, chars', lineClass: 'split-line' })
    //     const linkList = document.querySelectorAll('.policy-nav-list .policy-nav-item')

    //     animate('.line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
    //     animate('.line-mid', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
    //     animate('.line-ver', { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
    //     animate(updateDate.words, { transform: "translateY(100%)" }, { duration: 0 })
    //     animate(naviTxt.chars, { transform: "translateY(100%)" }, { duration: 0 })
    //     animate(linkList, { opacity: 0, transform: "translateX(10px)" }, { duration: 0 })

    //     const sequence = [
    //         ['.line-top', { scaleX: 1 }, { duration: 1, at: 0 }],
    //         ['.line-mid', { scaleX: 1 }, { duration: .9, at: .2 }],
    //         ['.line-ver', { scaleY: 1 }, { duration: 1.8, at: .6 }],
    //         [updateDate.words, { transform: "none" }, { duration: .4, delay: stagger(.015), at: .5 }],
    //         [naviTxt.chars, { transform: "none" }, { duration: .4, delay: stagger(.005), at: .7 }],
    //         [linkList, { opacity: 1, transform: "none" }, { duration: .35, delay: stagger(.04), at: .85 }],
    //     ]

    //     inView('.policy-main', () => {
    //         timeline(sequence).finished.then(() => {
    //             document.querySelector('.line-top').removeAttribute('style')
    //             document.querySelector('.line-mid').removeAttribute('style')
    //             document.querySelector('.line-ver').removeAttribute('style')
    //             updateDate.revert()
    //             naviTxt.revert()
    //         })
    //     })

    //     // RichTxt Anim
    //     const items = document.querySelectorAll('.policy-body-main-richtxt *:not(astro-slot, ul)')

    //     const splitArray = []
    //     items.forEach((el, idx) => {
    //         const splitTxt = new SplitType(el, { types: 'lines, words', lineClass: 'split-line' })

    //         animate(splitTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
    //         const itemSequence = [
    //             [splitTxt.words, { opacity: 1, transform: "none" }, { duration: .4, at: .05 }],
    //         ]
    //         inView(el, () => {
    //             if (el.tagName == 'LI') {
    //                 el.classList.add('show')
    //             }
    //             timeline(itemSequence).finished.then(() => {
    //                 splitTxt.revert()
    //             })
    //         }, { margin: "-10% 0px -10% 0px" })

    //         // animate(el, { opacity: 0, transform: "translateY(30px)" }, { duration: 0 })

    //         // itemSequence.push(
    //         //     [el, { opacity: 1, transform: "none" }, { duration: .6, at: .4 }]
    //         // )
    //         // splitArray.push(el)
    //     })
    //     // End RichTxt Anim

    // }, [])

    return (
        <section className="policy-main">
            <div className="container grid">
                <div className="line line-top"></div>
                <div className="line line-mid"></div>
                <div className="line line-ver"></div>
                <div className="policy-update">
                    <div className="txt txt-20 txt-med policy-update-txt">{lastUpdated}</div>
                </div>
                <div className="policy-navtitle">
                    <div className="txt txt-20 txt-black txt-up policy-navtitle-txt">Navigation</div>
                </div>
                <div className="policy-nav">
                    <ul className="policy-nav-list" data-lenis-prevent>
                        {renderTOC}
                    </ul>
                </div>
                <div className="policy-body">
                    <div className={`policy-body-main ${loaded ? 'loaded' : ''}`}>
                        <div className="txt txt-18 txt-med richtext policy-body-main-richtxt" dangerouslySetInnerHTML={{ __html: data }}></div>
                        <div className="policy-body-main-loading">{props.icLoad}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PolicyMain