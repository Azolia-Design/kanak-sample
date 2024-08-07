import { useCatalogIndex } from "@contexts/StoreGlobal";
import SplitType from 'split-type';
import { useEffect, useState } from 'react';
import useDebounceCallback from "@hooks/useDebounce";
import { animate, timeline, stagger, inView } from "motion";

function KustomerCatalogGroup({ ...props }) {
    const { index, setIndex } = useCatalogIndex();
    const debounceHover = useDebounceCallback(setIndex, 200);

    useEffect(() => {
        setIndex(0);

        document.querySelectorAll('.kustomer-cata-main-content').forEach((el) => {
            const sequence = []
            let title
            let subtitle
            if (!props.isSingle) {
                title = new SplitType(el.querySelector('.kustomer-cata-main-content-des-title'), { types: "lines, words", lineClass: 'split-line' })
                subtitle = new SplitType(el.querySelector('.kustomer-cata-main-content-des-subtitle'), { types: "lines, words", lineClass: 'split-line' })

                animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
                animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

                sequence.push(
                    [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: 0 }],
                    [subtitle.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.008), at: .15 }],
                )
            }

            const delayItem = .1
            const splitArray = []
            el.querySelectorAll('.kustomer-cata-main-content-list-item').forEach((listItem, idx) => {
                animate(listItem.querySelector('.line'), { transformOrigin: 'left', scaleX: 0 }, { duration: 0 })

                const title = new SplitType(listItem.querySelector('.kustomer-cata-main-content-list-item-name'), { types: "lines, words", lineClass: 'split-line' })
                animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
                animate(listItem.querySelector('.kustomer-cata-main-content-list-item-count'), { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

                sequence.push(
                    [listItem.querySelector('.line'), { scaleX: 1 }, { duration: .8, at: .3 + delayItem * idx }],
                    [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.015), at: "<" }],
                    [listItem.querySelector('.kustomer-cata-main-content-list-item-count'), { opacity: 1, transform: "none" }, { duration: .6, at: .5 + delayItem * idx }],
                )
                if (idx == el.querySelectorAll('.kustomer-cata-main-content-list-item').length - 1) {
                    animate(listItem.querySelector('.line-bot'), { transformOrigin: 'left', scaleX: 0 }, { duration: 0 })
                    sequence.push(
                        [listItem.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: "<" }],
                    )
                }
                splitArray.push(title)
            })

            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    if (!props.isSingle) {
                        title.revert()
                        subtitle.revert()
                    }
                    splitArray.forEach(item => item.revert())
                    el.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
                    el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-10% 0px -10% 0px" })
        })
    }, []);
    return (
        <div className={`kustomer-cata-main-content`}>
            <div className="kustomer-cata-main-content-des">
                {!props.isSingle && (
                    <>
                        <h3 className="heading h4 txt-black txt-up kustomer-cata-main-content-des-title">{props.data.title[0]?.text}</h3>
                        <p className="txt txt-18 txt-med kustomer-cata-main-content-des-subtitle">{props.data.sub}</p>
                    </>
                )}
            </div>
            {props.card}
            <div className="kustomer-cata-main-content-list">
                {props.data.list.map((item, idx) => (
                    <a
                        key={item.uid}
                        href={`/katalog?kustomer=${props.currPage}&category=${item.uid}`}
                        className={`kustomer-cata-main-content-list-item ${index == (props.listItem.findIndex(listItem => listItem.uid == item.uid)) ? "active" : ''}`}
                        onMouseEnter={() => debounceHover(props.listItem.findIndex(listItem => listItem.uid == item.uid))}
                        data-cursor="txtLink"
                    >
                        <div className="heading h6 txt-black txt-up kustomer-cata-main-content-list-item-name">
                            {item.data.name}
                        </div>
                        <div className="txt txt-20 txt-bold kustomer-cata-main-content-list-item-count">
                            <div className="kustomer-cata-main-content-list-item-count-txt">
                                {(idx + 1).toString().padStart(2, '0')}
                            </div>
                            <div className="ic ic-24 ic-main">
                                <svg width="100%"viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 13.5L13 3.5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
                                    <path d="M4.07227 3.5H13.0002V12.4271" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                </svg>
                            </div>
                        </div>
                        <div className="line">
                            <div className="line-inner"></div>
                        </div>
                        {idx === props.data.list.length - 1 && (
                            <div className="line-bot"></div>
                        )}
                    </a>
                ))}
            </div>
        </div>
    )
}

export default KustomerCatalogGroup;