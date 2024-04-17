import './Main.scss';
import { convertDate } from "@utils/text.js"
import { useEffect, useState, useRef } from 'react';

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function CateListItem(props) {
    const itemRef = useRef()

    useEffect(() => {
        const item = itemRef.current

        const category = new SplitType(item.querySelector('.resource-cate-main-item-content-cate'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector('.resource-cate-main-item-content-title'), { types: 'lines, words', lineClass: 'split-line' })
        const sapo = new SplitType(item.querySelector('.resource-cate-main-item-content-des'), { types: 'lines, words', lineClass: 'split-line' })
        const date = new SplitType(item.querySelector('.resource-cate-main-item-content-date'), { types: 'lines, words', lineClass: 'split-line' })

        animate(category.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(sapo.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(date.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.resource-cate-main-item-img img'), { opacity: 0, scale: .8, transformOrigin: "left bottom" }, { duration: 0 })
        animate(item.querySelector('.line:not(.line-ver)'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const itemSequence = []
        if (props.lineVer) {
            animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            itemSequence.push(
                [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1, at: 0 }]
            )
        }

        itemSequence.push(
            [item.querySelector('.line'), { scaleX: 1 }, { duration: 1, at: 0 }],
            [item.querySelector('.resource-cate-main-item-img img'), { opacity: 1, scale: 1 }, { duration: 1, at: 0 }],
            [category.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .2 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.03), at: .3 }],
            [sapo.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: .5 }],
            [date.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.012), at: .7 }],
        )

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                category.revert()
                title.revert()
                sapo.revert()
                date.revert()
                item.querySelector('.line').removeAttribute('style')
            })
        })
    }, [])

    return (
        <>
            <div className={`resource-cate-main-item ${props.idx == 0 && "first-item"}`} ref={itemRef}>
                <a href={`/insights/${props.uid}`} className="resource-cate-main-item-img" data-cursor="ext">
                    <img
                        className='img img-fill'
                        src={props.data.feature_image.url}
                        alt={props.data.feature_image.alt}
                        width={props.data.feature_image.dimensions.width}
                        height={props.data.feature_image.dimensions.height} />
                </a>
                <div className="resource-cate-main-item-content">
                    <a href={`/insights/${props.data.category.toLowerCase().replace(" ", "-")}`} className="txt txt-20 txt-bold resource-cate-main-item-content-cate" data-cursor="txtLink">{props.data.category}</a>
                    <a href={`/insights/${props.uid}`} className="resource-cate-main-item-content-wrap" data-cursor="ext">
                        <h4 className="heading h5 txt-black txt-up resource-cate-main-item-content-title">{props.data.title}</h4>
                        <div className="txt txt-18 txt-med resource-cate-main-item-content-des">{props.data.sapo}</div>
                        <span className="txt txt-18 txt-med resource-cate-main-item-content-date">{convertDate(props.last_publication_date)}</span>
                    </a>
                </div>
                <div className="line"></div>
                {props.lineVer && (
                    <div className="line line-ver"></div>
                )}
            </div>
            {
                props.idx == 0 && (
                    <div className="resource-cate-main-item fake-item"></div>
                )
            }
        </>
    )
}

function ResourceCateList(props) {
    const allItem = props.list
    const [limit, setLimit] = useState(5);

    useEffect(() => {
        animate('.resource-cate-main-line', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const sequence = [
            ['.resource-cate-main-line', { scaleX: 1 }, { duration: 1, at: .2 }]
        ]

        inView('.resource-cate-main', () => {
            timeline(sequence).finished.then(() => {
                document.querySelector('.resource-cate-main-line').removeAttribute('style')
            })
        })
    }, [])

    return (
        <section className="resource-cate-main">
            <div className="container grid">
                <div className="line resource-cate-main-line"></div>
                <div className={`resource-cate-main-grid ${limit >= allItem.length ? 'all-loaded' : ''}`}>
                    {allItem.map((item, idx) => (
                        idx < limit && <CateListItem {...item} idx={idx} key={idx} lineVer={(idx > 0 && (idx + 1) % 2 === 0) && true} />
                    ))}
                </div>
                {/* <div className={`line resource-cate-main-line ${limit >= allItem.length ? 'hidden' : ''}`}></div> */}
                <div className={`resource-cate-main-load ${limit >= allItem.length ? 'hidden' : ''}`}>
                    <button className="resource-cate-main-load-btn" onClick={() => setLimit(limit + 4)}>
                        <div className="resource-cate-main-load-btn-ic">
                            <div className="ic ic-24">
                                {props.icArrowDown}
                            </div>
                        </div>
                        <div className="txt txt-20 txt-med resource-cate-main-load-btn-txt">
                            Load more
                        </div>
                    </button>
                </div>
            </div>
        </section>
    )
}

export default ResourceCateList