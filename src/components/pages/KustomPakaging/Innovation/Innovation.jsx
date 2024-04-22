import { Mouse } from "@/components/core/mouse";
import { parseRem } from "@/js/utils";
import { useEffect, useState } from "react";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import "./Innovation.scss";


function KustomPackagingInnovation({ ...props }) {
    const [idxActive, setIdxActive] = useState(-1);

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }

    useEffect(() => {
        const thumb = document.querySelector('.kuspack-innova-thumb')
        let thumbReq;
        let targetX = 0
        let targetY = 0

        function thumbMove() {
            let curX = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m41
            let curY = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m42
            let wrapTop = document.querySelector(".kuspack-innova-main-thumb").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".kuspack-innova-main-thumb").getBoundingClientRect().left

            let cursorX = Mouse().x
            let cursorY = Mouse().y

            if (document.querySelector('.kuspack-innova-main:hover')) {
                targetX = parseRem(300) - thumb.offsetWidth / 2 + ((cursorX - wrapLeft) / (document.querySelector(".kuspack-innova-main-thumb").offsetWidth) - .5) * parseRem(300)
                targetY = cursorY - wrapTop - document.querySelector(".kuspack-innova-main-thumb").offsetHeight / 2
            } else {
                setIdxActive(-1)
            }
            thumb.style.transform = `translate(${lerp(curX, targetX, .03)}px, ${lerp(curY, targetY, .03)}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }

        inView('.kuspack-innova', () => {
            thumbReq = requestAnimationFrame(thumbMove)
        })
        return () => {
            cancelAnimationFrame(thumbReq)
        }
    }, [])
    return (
        <section className="kuspack-innova">
            <div className="container grid">
                <div className="kuspack-innova-title-wrap">
                    <div className="heading h5 txt-black txt-up kuspack-innova-label">{props.label}</div>
                    <h1 className="heading h0 txt-black txt-up kuspack-innova-title">{props.newTitle}</h1>
                </div>
                <div className="txt txt-18 txt-med kuspack-innova-sub">{props.sub}</div>
                <div className="kuspack-innova-main">
                    <div className="kuspack-innova-main-wrap">
                        {props.list.map((item, idx) => (
                            <div className="kuspack-innova-item" key={idx} onMouseEnter={() => { setIdxActive(idx) }}>
                                <div className="ic kuspack-innova-item-icon">
                                    <img
                                        src={item.item_icon.url}
                                        alt=""
                                        width={item.item_icon.dimensions.width}
                                        height={item.item_icon.dimensions.height}
                                    />
                                </div>
                                <h3 className="heading h4 txt-black txt-up kuspack-innova-item-title">
                                    {item.item_title[0].text}
                                </h3>
                                <div className="txt txt-18 txt-med kuspack-innova-item-sub">
                                    {item.item_sub}
                                </div>
                                <div className="line line-top" />
                                <div className="line line-ver line-left" />
                                <div className="line line-bot" />
                            </div>
                        ))}
                    </div>
                    <div className="kuspack-innova-main-thumb">
                        <div className="kuspack-innova-thumb">
                            {
                                props.list.map((item, idx) => (
                                    <div className={`kuspack-innova-thumb-inner ${idx === idxActive ? 'active' : ''}`} key={idx}>
                                        <img src={item.item_icon.url}
                                            alt=""
                                            width={item.item_icon.dimensions.width}
                                            height={item.item_icon.dimensions.height}
                                            className="img" />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="line line-ver kuspack-innova-main-line-left" />
                    <div className="line line-ver kuspack-innova-main-line-right" />
                </div>
            </div>
        </section>
    )
}

export default KustomPackagingInnovation