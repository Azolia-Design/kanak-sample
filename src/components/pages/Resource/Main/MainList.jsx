import "./Main.scss"
import { useEffect, useMemo, useState, useRef } from 'react';
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { convertDate } from "@utils/text.js"

import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function FilterItem(props) {
    return (
        <button className={`resource-main-list-head-filter-item ${props.isActive ? 'active' : ''}`} onClick={props.onClick} data-filter={props.name}>
            <div className="txt txt-20 txt-bold resource-main-list-head-filter-item-txt">
                {props.name}
            </div>
            <div className="txt txt-12 txt-medium resource-main-list-head-filter-item-count">
                [{props.count}]
            </div>
            <div className="line"></div>
        </button>
    )
}

function ArticleItem({ data, idx }) {
    const itemRef = useRef()
    useEffect(() => {
        const item = itemRef.current
        const cate = new SplitType(item.querySelector('.resource-main-list-main-item-cate'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(item.querySelector('.resource-main-list-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const des = new SplitType(item.querySelector('.resource-main-list-main-item-subtitle'), { types: 'lines, words', lineClass: 'split-line' })
        const date = new SplitType(item.querySelector('.resource-main-list-main-item-date'), { types: 'lines, words', lineClass: 'split-line' })

        animate(item.querySelector('.resource-main-list-main-item-img-inner'), { opacity: 0, scale: .8, transformOrigin: "left bottom" }, { duration: 0 })
        animate(cate.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(des.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(date.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(item.querySelector('.line'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        item.querySelector('.line-ver') && animate(item.querySelector('.line-ver'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })

        const itemSequence = [
            [item.querySelector('.line-ver'), { scaleY: 1 }, { duration: 1, at: 0 }],
            [item.querySelector('.line'), { scaleX: 1 }, { duration: 1, at: 0 }],
            [item.querySelector('.resource-main-list-main-item-img-inner'), { opacity: 1, scale: 1 }, { duration: .6, at: .2 }],
            [cate.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.05), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.03), at: .2 }],
            [des.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.01), at: .5 }],
            [date.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: "-.4" }]
        ]

        inView(item, () => {
            timeline(itemSequence).finished.then(() => {
                cate.revert()
                title.revert()
                des.revert()
                item.querySelector('.resource-main-list-main-item-img-inner').removeAttribute('style')
                item.querySelector('.line-ver')?.removeAttribute('style')
                item.querySelector('.line').removeAttribute('style')
            })
        })
    }, [])
    return (
        <div className="resource-main-list-main-item" ref={itemRef}>
            <a href={`/insights/${data.uid}`} className="resource-main-list-main-item-img" data-cursor="ext">
                <div className="resource-main-list-main-item-img-inner">
                    <img
                        className='img img-fill'
                        src={data.data.feature_image.url}
                        alt={data.data.feature_image.alt}
                        width={data.data.feature_image.dimensions.width}
                        height={data.data.feature_image.dimensions.height} />
                </div>
            </a>
            <div className="resource-main-list-main-item-content">
                <a href={`/insights/${data.data.category.toLowerCase().replace(" ", "-")}`} className="txt txt-20 txt-bold resource-main-list-main-item-cate" data-cursor="txtLink">
                    {data.data.category}
                </a>
                <a href={`/insights/${data.uid}`} className="resource-main-list-main-item-content-wrap" data-cursor="ext">
                    <h4 href="#" className="heading h5 txt-black txt-up resource-main-list-main-item-title"
                        dangerouslySetInnerHTML={{
                            __html: data.data.title.split(/(\b\w+-\b)/)
                                .filter(part => part !== '-')
                                .map(word => `<span>${word}</span>`)
                                .join('')
                        }}>
                    </h4>
                    <p className="txt txt-18 txt-med resource-main-list-main-item-subtitle">
                        {data.data.sapo}
                    </p>
                    <span className="txt txt-18 txt-med resource-main-list-main-item-date">{convertDate(data.last_publication_date)}</span>
                </a>
            </div>
            <div className="line"></div>
            {idx % 2 == 0 ? (
                <div className="line line-ver"></div>
            ) : ""}
        </div>
    )
}
function ResourceMainList(props) {
    const { data: allItem } = props

    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(8);
    const [categoryToggle, setCategoryToggle] = useState(false)
    const toggleRef = useRef();
    const cateList = []

    useOutsideAlerter(toggleRef, () => { setCategoryToggle(false) })

    allItem.map((el, idx) => {
        !cateList.includes(el.data.category) && cateList.push(el.data.category)
    })

    const renderFilter = useMemo(() => {
        return (
            <>
                <FilterItem name={'All'}
                    count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterList(e), setCategoryToggle(false) }}
                />
                {cateList.map((el, idx) => (
                    <FilterItem name={el}
                        count={allItem.filter(({ data }) => data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e); setCategoryToggle(false) }}
                        key={idx} />
                ))}
            </>
        )
    }, [filter])

    const renderArticles = useMemo(() => (
        itemList.map((data, idx) => (
            (idx < limit) && <ArticleItem key={idx} data={data} idx={idx} />
        ))
    ), [itemList, limit])


    function filterList(e) {
        setItemList([])
        let type = e.target.dataset.filter;
        setFilter(type)
    }

    useEffect(() => {
        if (filter == 'All') {
            setItemList(allItem)
        } else {
            let filterList = allItem.filter(({ data }) => data.category == filter)
            setItemList(filterList)
        }
    }, [filter])

    useEffect(() => {
        const title = new SplitType('.resource-main-list-head-title', { types: 'lines, words, chars', lineClass: 'split-line' })
        const toggle = new SplitType('.resource-main-list-head-filter-toggle .resource-main-list-head-filter-toggle-txt', { types: 'lines, words, chars', lineClass: 'split-line' })

        animate(toggle.chars, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.chars, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.resource-main-list-line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate('.resource-main-list-head-filter-toggle-ic', { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const filterArray = []
        const countArray = []

        const sequence = [
            [title.chars, { opacity: 1, transform: "none" }, { duration: .8, delay: stagger(.01), at: "-.3" }],
            ['.resource-main-list-line', { scaleX: 1 }, { duration: 1, at: "-.8" }],
        ]

        sequence.push(
            [[...toggle.chars, document.querySelector('.resource-main-list-head-filter-toggle-ic')], { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.01), at: "-.6" }]
        )

        document.querySelectorAll('.resource-main-list-head-filter-dropdown .resource-main-list-head-filter-item').forEach((el, idx) => {
            const cate = new SplitType(el.querySelector('.resource-main-list-head-filter-item-txt'), { types: 'lines, words', lineClass: 'split-line' })
            animate(cate.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(el.querySelector('.resource-main-list-head-filter-item-count'), { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            sequence.push(
                [[...cate.words, el.querySelector('.resource-main-list-head-filter-item-count')], { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.1), at: "-.45" }],
            )

            filterArray.push(cate)
            countArray.push(el.querySelector('.resource-main-list-head-filter-item-count'))
        })

        inView('.resource-main-list', () => {
            timeline(sequence).finished.then(() => {
                title.revert();
                filterArray.forEach((el) => el.revert());
                countArray.forEach((el) => el.removeAttribute('style'));
                document.querySelector('.resource-main-list-line').removeAttribute('style')
            })
        })

        // Button Anim
        const btnTxt = new SplitType('.resource-main-list-load-btn-txt', { types: 'lines, words', lineClass: 'split-line' })

        animate('.resource-main-list-load', { opacity: 0 }, { duration: 0 })
        animate('.resource-main-list-load-btn .ic svg', { opacity: 0, transform: 'translateY(-40%) scale(.8)' }, { duration: 0 })
        animate(btnTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const btnSequence = [
            ['.resource-main-list-load', { opacity: 1 }, { duration: 1, at: 0 }],
            ['.resource-main-list-load-btn .ic svg', { opacity: 1, transform: "none" }, { duration: .4, at: "-.6" }],
            [btnTxt.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(0.03), at: "<" }],
        ]

        inView('.resource-main-list-load', () => {
            timeline(btnSequence).finished.then(() => {
                btnTxt.revert()
                document.querySelector('.resource-main-list-load-btn .ic svg').removeAttribute('style')
                document.querySelector('.resource-main-list-load').removeAttribute('style')
            })
        })
        // End Button Anim
    }, [])

    return (
        <div className="resource-main-list">
            <div className="resource-main-list-head">
                <h3 className="heading h4 txt-black txt-up resource-main-list-head-title">Articles</h3>
                <div className="resource-main-list-head-filter" ref={toggleRef}>
                    <button className="resource-main-list-head-filter-toggle" onClick={() => { setCategoryToggle(!categoryToggle) }}>
                        <div className="txt txt-18 txt-bold resource-main-list-head-filter-toggle-txt">
                            {filter == 'All' ? 'Categories' : filter}
                        </div>
                        <div className={`ic ic-20 resource-main-list-head-filter-toggle-ic ${categoryToggle ? 'open' : ''}`}>
                            {props.icDropDown}
                        </div>
                    </button>
                    <div className={`resource-main-list-head-filter-dropdown ${categoryToggle ? 'active' : ''}`}>
                        {renderFilter}
                    </div>
                </div>
            </div>
            <div className="line resource-main-list-line"></div>
            <div className={`resource-main-list-main ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                <div className={`resource-main-list-main-inner`}>
                    {renderArticles}
                </div>
                {/* <div className="line"></div> */}
            </div>
            <div className={`resource-main-list-load ${limit >= itemList.length ? 'hidden' : ''}`}>
                <button className="resource-main-list-load-btn" onClick={() => setLimit(limit + 4)}>
                    <div className="resource-main-list-load-btn-ic">
                        <div className="ic ic-24">
                            {props.icArrowDown}
                        </div>
                    </div>
                    <div className="txt txt-20 txt-med resource-main-list-load-btn-txt">
                        Load more
                    </div>
                </button>
            </div>
        </div>
    )
}
export default ResourceMainList