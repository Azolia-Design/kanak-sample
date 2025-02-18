import './Main.scss'
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight";
import { useEffect, useState, useRef, Fragment } from 'react'
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import { getLenis } from '@components/core/lenis';

function Item({ ...props }) {
    const itemRef = useRef();

    useEffect(() => {
        const item = itemRef.current
        const title = new SplitType(item.querySelector('.fulfill-main-content-item-head-title'), { types: "lines,words", lineClass: 'split-line' })
        const sub = new SplitType(item.querySelectorAll('.fulfill-main-content-item-sub p'), { types: "lines,words", lineClass: 'split-line' })
        const subLink = new SplitType(item.querySelectorAll('.fulfill-main-content-item-sub-link span'), { types: "lines,words", lineClass: 'split-line' })
        let allSub = [...sub.words, ...subLink.words, ...item.querySelectorAll('.fulfill-main-content-item-sub-link .ic')]

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(allSub, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(item.querySelector('.fulfill-main-content-item-img'), { opacity: 0, transform: 'translateY(2rem)' }, { duration: 0 })
        const itemSequence = [
            [item.querySelector('.line'), { scaleX: 1 }, { duration: .6, at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.02), at: 0.05 }],
            [allSub, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.0025), at: .25 }],
            [item.querySelector('.fulfill-main-content-item-img'), { opacity: 1, transform: 'none' }, { duration: .6, at: .3 }],
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                title.revert()
                sub.revert()
                subLink.revert()
                item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
            })
        }, { margin: '-20% 0px -20% 0px' })
    }, []);

    return (
        <div className={`fulfill-main-content-item ${props.isActive ? 'active' : ''}`} onMouseEnter={props.mouseEnter} ref={itemRef}>
            <div className="line line-top"></div>
            <div className="fulfill-main-content-item-head">
                <div className="heading h3 txt-black txt-up fulfill-main-content-item-head-title" dangerouslySetInnerHTML={{ __html: props.data.title[0].text.replace('\n', "<br>") }}></div>
                <div className="dot"></div>
            </div>
            <div className="txt txt-18 txt-med fulfill-main-content-item-sub">
                {props.data.describe.map((el, idx) => (
                    <Fragment key={idx}>
                        <p>{el.text}</p>
                        {idx < props.data.describe.length - 1 && <br />}
                    </Fragment>
                ))}
                {/* {props.data.title[0].text.includes('We have you covered') &&
                    <div className="fulfill-main-content-item-sub-link-grp">
                        <a href="https://www.pakway.net/" className="txt txt-18 txt-med txt-link fulfill-main-content-item-sub-link" data-cursor="txtLink" target='_blank'>
                            <span>Visit Pakway</span>
                            <div className="ic ic-16">
                                <ArrowUpRight />
                            </div>
                        </a>
                        <a href="https://aviranaturals.com/" className="txt txt-18 txt-med txt-link fulfill-main-content-item-sub-link" data-cursor="txtLink" target='_blank'>
                            <span>Visit Avira</span>
                            <div className="ic ic-16">
                                <ArrowUpRight />
                            </div>
                        </a>
                    </div>
                } */}
            </div>
            <div className="fulfill-main-content-item-img">
                <div className="fulfill-main-content-item-img-inner">
                    <img src={props.data.image.url} alt={props.data.image.alt} width={props.data.image.dimensions.width} className='img img-fill' />
                </div>
            </div>
        </div>
    )
}
function FulfillMain({ ...props }) {
    const [idxActive, setIdxActive] = useState(0);

    useEffect(() => {
        // Anim Img
        animate('.fulfill-main-img', { opacity: 0, transform: "translateY(6rem)" }, { duration: 0 })

        const imgSquence = [
            ['.fulfill-main-img', { opacity: 1, transform: "none" }, { duration: .6, at: 0 }],
        ]

        inView('.fulfill-main-img', () => {
            timeline(imgSquence).finished.then(() => {
                document.querySelector('.fulfill-main-img').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })

        // Anima List
        const title = new SplitType(".fulfill-main-content-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.fulfill-main-thumb', { opacity: 0, transform: "translateY(2rem)" }, { duration: 0 })

        const listSequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            ['.fulfill-main-thumb', { opacity: 1, transform: "none" }, { duration: .6, at: .2 }],
        ]
        inView('.fulfill-main-content', () => {
            timeline(listSequence).finished.then(() => {
                title.revert()
                document.querySelector('.fulfill-main-thumb').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })

        let allItem = document.querySelectorAll('.fulfill-main-content-item');
        getLenis().on('scroll', function (inst) {
            for (let i = 0; i < allItem.length; i++) {
                let top = allItem[i].getBoundingClientRect().top;
                if (top > 0 && top < (window.innerHeight / 2)) {
                    setIdxActive(i)
                }
            }
        })
    }, [])

    return (
        <section className="fulfill-main">
            <div className="fulfill-main-img bg-light">
                <div className="line"></div>
                <div className="fulfill-main-img-inner">
                    {props.heroBg}
                </div>
            </div>
            <div className="container grid">
                <div className="line fulfill-main-content-line"></div>
                <div className="fulfill-main-content">
                    <div className="heading h1 txt-black txt-up fulfill-main-content-title">{props.title}</div>
                    <div className="fulfill-main-content-list">
                        {props.list.map((el, idx) => (
                            <Item
                                key={el.uid}
                                data={el.data}
                                isActive={idxActive == idx}
                                mouseEnter={(e) => setIdxActive(idx)}>
                            </Item>
                        ))}
                    </div>
                </div>

                <div className="fulfill-main-thumb">
                    <div className="fulfill-main-thumb-sticky">
                        {props.list.map(({ data }, idx) => (
                            <div className={`fulfill-main-thumb-inner ${idxActive === idx ? "active" : ''}`} key={idx}>
                                <img src={data.image.url} alt={data.image.alt} width={data.image.dimensions.width} className='img img-fill' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    )
}


export default FulfillMain
