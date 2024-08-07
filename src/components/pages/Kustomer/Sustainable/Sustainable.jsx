import "./Sustainable.scss"
import ArrowDown from "@components/globals/IcArrow/ArrowDown.jsx";
import ArrowDropdown from "@components/globals/IcArrow/ArrowDropdown.jsx";
import { useEffect, useState, useRef, useMemo } from "react"
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { animate, timeline, stagger, inView } from "motion";
import { getLenis } from '@components/core/lenis';

import cn from 'clsx';
import SplitType from 'split-type';
import ProductPopup from "@components/globals/ProductPopup";


function SustainableItem(props) {
    const itemRef = useRef()
    const [animationStarted, setAnimationStarted] = useState(false);

    useEffect(() => {
        const item = itemRef.current
        const name = new SplitType(item.querySelector('.kustomer-sus-main-table-item-info-name'), { types: "lines,words", lineClass: 'split-line' })
        if (animationStarted) {
            timeline().cancel();
            name.revert();
            item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
            item.querySelector('.kustomer-sus-main-table-item-img').removeAttribute('style');
            item.querySelector('.kustomer-sus-main-table-item-info-qr-inner').removeAttribute('style');
        }

        animate(item.querySelector('.line-left'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-right'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(item.querySelector('.line-mid'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(item.querySelector('.line-qr'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
        animate(name.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.kustomer-sus-main-table-item-info-qr-inner'), { opacity: 0, scale: .9 }, { duration: 0 })
        animate(item.querySelector('.kustomer-sus-main-table-item-img'), { opacity: 0, scale: .9 }, { duration: 0 })

        const sequence = [
            [item.querySelector('.line-left'), { scaleY: 1 }, { duration: .6, at: 0 }],
            [item.querySelector('.kustomer-sus-main-table-item-img'), { opacity: 1, scale: 1 }, { duration: .6, at: .2 }],
            [item.querySelector('.line-mid'), { scaleX: 1 }, { duration: .4, at: .35 }],
            [item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .45, at: .5 }],
            [item.querySelector('.line-right'), { scaleY: 1 }, { duration: .5, at: .6 }],
            [item.querySelector('.line-qr'), { scaleY: 1 }, { duration: .4, at: .6 }],
            [name.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: .5 }],
            [item.querySelector('.kustomer-sus-main-table-item-info-qr-inner'), { opacity: 1, scale: 1 }, { duration: .6, at: .45 }]
        ]

        inView(item, () => {
            timeline(sequence).finished.then(() => {
                setAnimationStarted(false);
                setTimeout(() => {
                    name.revert();
                    item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'));
                    item.querySelector('.kustomer-sus-main-table-item-img').removeAttribute('style');
                    item.querySelector('.kustomer-sus-main-table-item-info-qr-inner').removeAttribute('style');
                }, 1000)
            })
        })
    }, [props.filter])

    return (
        <div className="kustomer-sus-main-table-item" ref={itemRef}>
            <div className="kustomer-sus-main-table-item-img" onClick={props.onClick}>
                <div className="kustomer-sus-main-table-item-img-inner data-thumb">
                    <img src={props.data.thumbnail.url} alt={props.data.thumbnail.alt} width={props.data.thumbnail.dimensions.width} className="img" />
                </div>
            </div>
            <div className="kustomer-sus-main-table-item-info">
                <div className="line line-mid"></div>
                <h4 className="heading h6 txt-black txt-up kustomer-sus-main-table-item-info-name" onClick={props.onClick}>
                    {props.data.title}
                </h4>
                <div className={cn("kustomer-sus-main-table-item-info-qr", { "hidden": !props.data.qr?.url })}>
                    <div className="line line-ver line-qr"></div>
                    <div className="kustomer-sus-main-table-item-info-qr-inner">
                        <img src={props.data.qr?.url} alt={props.data.qr?.alt} className="ic ic-80"/>
                        {props.data.qr_url.url ?
                            (
                                <a href={props.data.qr_url.url} target={props.data.qr_url.target ? props.data.qr_url.target : ''} className='kustomer-sus-main-table-item-info-qr-link'>
                                    {props.QR3DExplore}
                                </a>
                            ) : (
                                <img src={props.data.qr.url} alt="" className="kustomer-sus-main-table-item-info-qr-link ic ic-40" />
                            )
                        }
                    </div>
                </div>
            </div>
            <div className="line line-ver line-left"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-right"></div>
        </div>
    )
}

function KustomerSustain(props) {
    const allItem = props.productList
    const [filter, setFilter] = useState(0);
    const [listLength, setListLength] = useState(props.cateList[0].list.length);
    const [limit, setLimit] = useState(9999);
    const [isDropdown, setIsDropdown] = useState(false);
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [detailProductData, setDetailProductData] = useState([]);

    const toggleRef = useRef();
    useOutsideAlerter(toggleRef, () => setIsDropdown(false))

    const renderList = useMemo(() => {
        let list = props.cateList[filter].list.map((uid) => allItem.filter((item) => item.uid == uid)[0]);
        setListLength(list.length);
        return (
            list.map(({ data }, idx) => (
                idx < limit && (
                    <SustainableItem
                        data={data}
                        key={idx}
                        filter={filter}
                        QR3DExplore={props.QR3DExplore}
                        onClick={() => {
                            setIsOpenPopup(true);
                            setDetailProductData(data);
                            getLenis().stop();
                        }}
                    />
                )
            ))
        )
    }, [filter, limit]);

    useEffect(() => {
        if (window.innerWidth < 768) {
            setLimit(4)
        }
        const subtitle = new SplitType('.kustomer-sus-head-sub', { types: "lines,words", lineClass: 'split-line' })

        animate('.kustomer-sus-head-img', { opacity: 0, transform: "translateY(30%) scale(.9)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.kustomer-sus-main-line-top', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(".kustomer-sus-main-cate-list-item", { opacity: 0, transform: "translateX(20px)" }, { duration: 0 })
        animate('.kustomer-sus-pdf', { opacity: 0, transform: "translateY(2rem)" }, { duration: 0 })

        const sequence = [
            ['.kustomer-sus-head-img', { opacity: 1, transform: "none" }, { duration: .6, at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.0085), at: .15 }],
            ['.kustomer-sus-pdf', { opacity: 1, transform: "none" }, { duration: .4, at: .3 }],
            ['.kustomer-sus-main-line-top', { scaleX: 1 }, { duration: .6, at: .2 }],
            [".kustomer-sus-main-cate-list-item", { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.05), at: .2 }]
        ]

        inView('.kustomer-sus', () => {
            timeline(sequence).finished.then(() => {
                subtitle.revert();
                document.querySelector('.kustomer-sus-head-img').removeAttribute('style');
                document.querySelector('.kustomer-sus-main-line-top').removeAttribute('style');
                document.querySelectorAll('.kustomer-sus-main-cate-list-item').forEach(item => item.removeAttribute('style'))
            })
        })

        // Btn Anima

        animate('.kustomer-sus-main-load', { opacity: 0, transform: "translateY(2rem)" }, { duration: 0 })

        const btnSequence = [
            ['.kustomer-sus-main-load', { opacity: 1, transform: "none" }, { duration: .8, at: 0 }],
        ]

        inView('.kustomer-sus-main-load', () => {
            timeline(btnSequence).finished.then(() => {
                document.querySelector('.kustomer-sus-main-load').removeAttribute('style')
            })
        }, { margin: '-30% 0px -30% 0px' })
    }, [])

    return (
        <section className={`kustomer-sus ${isOpenPopup ? 'active' : ''}`} id="Sustainable">
            <div className="container grid">
                <div className="kustomer-sus-head">
                    <div className="kustomer-sus-head-img">
                        {props.sustainable}
                    </div>
                    <span className="heading h6 txt-black txt-up kustomer-sus-head-sub">
                        {props.subtitle}
                    </span>
                    <div className="kustomer-sus-pdf">
                        <a href="/Kanak_Sales_Sheet_01.pdf" className="btn-outline pdf-link kustomer-sus-pdf-link" data-cursor="hide">
                            <div className="btn-outline-ic kustomer-sus-pdf-link-ic">
                                <div className="ic ic-32">
                                    {props.PDFIcon}
                                </div>
                            </div>
                            <div className="txt txt-20 txt-med kustomer-sus-pdf-link-txt">
                                Download Sustainable Catalog
                            </div>
                        </a>
                    </div>
                </div>
                <div className="kustomer-sus-main">
                    <div className="line kustomer-sus-main-line-top"></div>
                    <div className="kustomer-sus-main-cate" ref={toggleRef}>
                        <div className="bg-light kustomer-sus-main-cate-toggle">
                            <button className="kustomer-sus-main-cate-toggle-btn" onClick={(e) => { setIsDropdown(!isDropdown) }}>
                                <div className="kustomer-sus-main-cate-toggle-btn-wrap">
                                    <div className="txt txt-16 txt-black txt-up kustomer-sus-main-cate-toggle-label">type</div>
                                    <div className="txt h5 txt-black txt-up kustomer-sus-main-cate-toggle-txt">{props.cateList[filter].name}</div>
                                </div>
                                <ArrowDropdown className={cn("ic ic-24 kustomer-sus-main-cate-toggle-ic", { "active": isDropdown })} />
                            </button>
                        </div>
                        <div className={cn('kustomer-sus-main-cate-list', { 'active': isDropdown })}>
                            {props.cateList.map((el, idx) => (
                                <button className={`kustomer-sus-main-cate-list-item ${filter == idx ? 'active' : ''}`}
                                    key={idx}
                                    data-cursor="txtLink"
                                    data-cursor-txtlink="child"
                                    onClick={() => { setFilter(idx); setIsDropdown(false) }}>
                                    <div className="dot"></div>
                                    <span className="heading h6 txt-black txt-up kustomer-sus-main-cate-list-item-txt" data-cursor-txtlink-child="true">{el.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className="kustomer-sus-main-table">
                        {renderList}
                        <div className={`kustomer-sus-main-load ${limit >= listLength ? 'hidden' : ''}`}>
                            <button className="kustomer-sus-main-load-btn" onClick={() => setLimit(limit + 4)}>
                                <div className="kustomer-sus-main-load-btn-ic">
                                    <div className="ic ic-16">
                                        <ArrowDown />
                                    </div>
                                </div>
                                <div className="txt txt-16 txt-med kustomer-sus-main-load-btn-txt">
                                    Load more
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
                <ProductPopup
                    isActive={isOpenPopup}
                    setIsActive={setIsOpenPopup}
                    data={detailProductData}
                />
            </div>
        </section>
    )
}

export default KustomerSustain
