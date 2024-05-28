import { useEffect, useMemo, useState, useRef } from 'react';
import CaseItem from '../CaseItem/CaseItem.jsx'
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

import './Main.scss';

function FilterItem({ ...props }) {
    return (
        <button className={`case-filter-item ${props.isActive ? 'active' : ''}`} onClick={props.onClick} data-filter={props.name}>
            <div className="txt txt-20 txt-bold case-filter-item-txt">
                {props.name}
            </div>
            <div className="txt txt-12 txt-medium case-filter-item-count">
                [{props.count}]
            </div>
            <div className="line"></div>
        </button>
    )
}

function CaseMain({ ...props }) {
    const { list: allItem } = props;
    const [layout, setLayout] = useState('grid');
    const [filter, setFilter] = useState('All');
    const [itemList, setItemList] = useState(allItem);
    const [limit, setLimit] = useState(4);
    const [categoryToggle, setCategoryToggle] = useState(false)
    const toggleRef = useRef();

    useOutsideAlerter(toggleRef, () => { setCategoryToggle(false) })

    const renderFilter = useMemo(() => {
        return (
            <>
                <FilterItem name={'All'}
                    count={allItem.length}
                    isActive={filter == 'All'}
                    onClick={(e) => { filterList(e) }} />
                {props.cateList.map((el, idx) => (
                    <FilterItem name={el}
                        count={allItem.filter((item) => item.data.category == el).length}
                        isActive={filter == el}
                        onClick={(e) => { filterList(e) }}
                        key={idx} />
                ))}
            </>
        )
    }, [filter])

    const renderCases = useMemo(() => {
        return (itemList.map((item, idx) => (
            idx < limit ? <CaseItem key={item.uid} {...item} icArrowExt={props.icArrowExt} lineTop={idx < 2} /> : ''
        )))
    }, [itemList, limit, filter])

    function filterList(e) {
        let type = e.target.dataset.filter;
        if (filter !== type) {
            setItemList([])
            setFilter(type)
        }
        window.innerWidth <= 991 && setCategoryToggle(false)
    }
    useEffect(() => {
        if (filter == 'All') {
            setItemList(allItem)
        } else {
            let filterList = allItem.filter((item) => item.data.category == filter)
            setItemList(filterList)
        }
    }, [filter])

    useEffect(() => {
        // Animation Filter
        const toggle = new SplitType('.case-filter-list-toggle-txt', { types: 'lines, words', lineClass: 'split-line' })

        animate('.case-filter .line-top', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate('.case-filter-view-item', { opacity: 0 }, { duration: 0 })
        animate(toggle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate('.case-filter-list-toggle .ic', { opacity: 0, transform: "translateY(20%)" }, { duration: 0 })
        animate('.case-filter .line-bot', { scaleX: 0, transformOrigin: "left" }, { duration: 0 })

        const sequence = [
            ['.case-filter .line-top', { scaleX: 1 }, { duration: 1, at: 0 }],
            ['.case-filter .line-bot', { scaleX: 1 }, { duration: .8, at: .2 }],
            ['.case-filter-view-item', { opacity: 1 }, { duration: .8, delay: stagger(.1), at: .4 }],
            [toggle.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .3 }],
            ['.case-filter-list-toggle .ic', { opacity: 1, transform: "none" }, { duration: .6, at: .4 }],
        ]
        let splitTitles = []
        document.querySelectorAll('.case-filter-list-dropdown .case-filter-item').forEach((item, idx) => {
            const label = new SplitType(item.querySelectorAll('.case-filter-item-txt'), { types: 'lines, words', lineClass: 'split-line' })
            animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelectorAll('.case-filter-item-count'), { opacity: 0, transform: "translateY(50%)" }, { duration: 0 })
            sequence.push(
                [label.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.02), at: .2 + .04 * idx }],
                [item.querySelectorAll('.case-filter-item-count'), { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.015), at: .3 + .06 * idx }]
            )
            splitTitles.push(label)
        })

        inView('.case-filter', () => {
            timeline(sequence).finished.then(() => {
                splitTitles.map((split, idx) => {
                    split.revert()
                })
                toggle.revert()
                document.querySelector('.case-filter .line-top').removeAttribute('style')
                document.querySelector('.case-filter .line-bot').removeAttribute('style')
                document.querySelector('.case-filter-view-item').removeAttribute('style')
                document.querySelector('.case-filter-list-toggle .ic').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })
        // End Animation Filter

        // Button Anim
        const btnTxt = new SplitType('.case-list-load-btn-txt', { types: 'lines, words', lineClass: 'split-line' })
        animate('.case-list-load', { opacity: 0 }, { duration: 0 })
        animate('.case-list-load .ic svg', { opacity: 0, transform: 'translateY(-40%) scale(.8)' }, { duration: 0 })
        animate(btnTxt.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const btnSequence = [
            ['.case-list-load', { opacity: 1 }, { duration: .6, at: 0 }],
            ['.case-list-load .ic svg', { opacity: 1, transform: "none" }, { duration: .8, at: 0 }],
            [btnTxt.words, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(0.06), at: .2 }],
        ]

        inView('.case-list-load', () => {
            timeline(btnSequence).finished.then(() => {
                document.querySelector('.case-list-load').removeAttribute('style')
                document.querySelector('.case-list-load .ic svg').removeAttribute('style')
                btnTxt.revert()
            })
        })
        // End Button Anim
    }, [])

    return (
        <section className="case-main">
            <div className="case-filter">
                <div className="container">
                    <div className="line line-top"></div>
                    <div className="case-filter-inner">
                        <div className="case-filter-list" ref={toggleRef}>
                            <button className="case-filter-list-toggle" onClick={(e) => { setCategoryToggle(!categoryToggle) }}>
                                <div className="txt txt-18 txt-bold case-filter-list-toggle-txt">
                                    {filter == 'All' ? 'Categories' : filter}
                                </div>
                                <div className={`ic ic-20 case-filter-list-toggle-ic ${categoryToggle ? 'open' : ''}`}>
                                    {props.icDropdown}
                                </div>
                            </button>
                            <div className={`case-filter-list-dropdown ${categoryToggle ? 'active' : ''}`}>
                                <div className="case-filter-list-dropdown-inner">
                                    {renderFilter}
                                </div>
                            </div>
                        </div>
                        <div className="case-filter-view">
                            <button className={`case-filter-view-item ${layout == 'list' && 'active'}`} onClick={() => setLayout('list')}>
                                <div className="ic ic-16">
                                    {props.icViewList}
                                </div>
                            </button>
                            <button className={`case-filter-view-item ${layout == 'grid' && 'active'}`} onClick={() => setLayout('grid')}>
                                <div className="ic ic-16">
                                    {props.icViewGrid}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="line line-bot"></div>
                </div>
            </div>
            <div className="case-list">
                <div className="container">
                    <div className={`case-list-inner ${layout == 'list' ? 'layout-list' : ''} ${limit >= itemList.length ? 'all-loaded' : ''}`}>
                        {renderCases}
                    </div>
                    <div className={`case-list-load ${limit >= itemList.length ? 'hidden' : ''}`}>
                        <button className="case-list-load-btn" onClick={() => setLimit(limit + 4)}>
                            <div className="case-list-load-btn-ic">
                                <div className="ic ic-24">
                                    {props.icArrowDown}
                                </div>
                            </div>
                            <div className="txt txt-20 txt-med case-list-load-btn-txt">
                                Load more
                            </div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default CaseMain