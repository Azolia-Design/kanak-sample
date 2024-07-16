import './Header.scss'
import cn from 'clsx';
import { Fragment, useEffect, useRef, useState } from 'react';
import { parseRem } from '@/js/utils';
import { getLenis } from '@components/core/lenis';
import useOutsideAlerter from '@hooks/useOutsideAlerter';

import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function HeaderGlobal(props) {
    const dropdownRef = useRef(null);
    const [navOpen, setNavOpen] = useState(false);
    const [dropdownIdx, setDropdownIdx] = useState(-1);
    const [isHide, setIsHide] = useState(false);
    const [isSubHide, setIsSubHide] = useState(false);

    useOutsideAlerter(dropdownRef, () => setDropdownIdx(-1));
    useEffect(() => {
        let missionStartHidden = document.querySelector('.header').clientHeight - document.querySelector('.header-sub').clientHeight - 40
        getLenis().on('scroll', function (inst) {
            if (inst.direction == 1) {
                if (inst.scroll >= missionStartHidden) {
                    setIsHide(true);
                    setIsSubHide(true);
                    if (document.querySelector('.casedtl-slide-stick-line')) {
                        document.querySelector('.casedtl-slide-stick-line').classList.add('hidden')
                    }
                    setDropdownIdx(-1);
                } else {
                    setIsHide(false);
                    setIsSubHide(false);
                    if (document.querySelector('.casedtl-slide-stick-line')) {
                        document.querySelector('.casedtl-slide-stick-line').classList.remove('hidden')
                    }
                }
            } else if (inst.direction == -1) {
                if (inst.scroll >= missionStartHidden) {
                    setIsSubHide(true);
                    setIsHide(false);
                    if (document.querySelector('.casedtl-slide-stick-line')) {
                        document.querySelector('.casedtl-slide-stick-line').classList.remove('hidden')
                    }
                } else {
                    setIsHide(false);
                    setIsSubHide(false);
                    if (document.querySelector('.casedtl-slide-stick-line')) {
                        document.querySelector('.casedtl-slide-stick-line').classList.add('hidden')
                    }
                }
            }
        })
    }, [])
    useEffect(() => {
        if (window.innerWidth < 992) {
            if (navOpen) {
                getLenis().stop()
                navAnim.open()

                if (window.innerWidth <= 991) {
                    setIsSubHide(true)
                }

            } else {
                getLenis().start()
                setIsSubHide(false)
            }
        }
    }, [navOpen])

    const navAnim = {
        open: () => {
            // Anim Info
            const navInfo = document.querySelector('.nav-info')
            const footerTxt = new SplitType(navInfo.querySelector('.nav-info-footer'), { types: "lines, words", lineClass: 'split-line' })

            animate(navInfo.querySelector('.line-ver'), { scaleY: 0, transformOrigin: "top" }, { duration: 0 })
            animate(navInfo.querySelector('.nav-info-btn'), { opacity: 0, transform: "translateY(2rem)" }, { duration: 0 })
            animate(footerTxt.words, { transform: "translateY(100%)" }, { duration: 0 })


            const openSequence = [
                [navInfo.querySelector('.line-ver'), { scaleY: 1 }, { duration: .8, at: .2 }],
                [navInfo.querySelector('.nav-info-btn'), { opacity: 1, transform: "none" }, { duration: .6, at: .4 }],
                [footerTxt.words, { transform: "none" }, { duration: .4, delay: stagger(.03), at: .5 }],
            ]
            const infoSplit = []
            navInfo.querySelectorAll('.nav-info-item').forEach((item, idx) => {
                const headTxt = new SplitType(item.querySelector('.nav-info-item-head'), { types: "lines, words", lineClass: 'split-line' })
                const contentTxt = new SplitType(item.querySelector('.nav-info-item-content'), { types: "lines, words", lineClass: 'split-line' })

                animate(headTxt.words, { transform: "translateY(100%)" }, { duration: 0 })
                animate(contentTxt.words, { transform: "translateY(100%)" }, { duration: 0 })
                openSequence.push(
                    [headTxt.words, { transform: "none" }, { duration: .4, delay: stagger(.02), at: .2 }],
                    [contentTxt.words, { transform: "none" }, { duration: .4, delay: stagger(.008), at: .3 }],
                )
                infoSplit.push(headTxt, contentTxt)
            })


            inView('.nav-info', () => {
                timeline(openSequence).finished.then(() => {
                    footerTxt.revert()
                    infoSplit.forEach(item => item.revert())
                })
            })
            // Anim Main
            const navMain = document.querySelector('.nav-main')

            const mainSequence = []
            const mainSplit = []

            const mainItem = document.querySelectorAll('.nav-main-wrap .nav-main-item').forEach((el, idx) => {
                const headTxt = new SplitType(el.querySelector('.nav-main-item-head-txt'), { types: "lines, words, chars", lineClass: 'split-line' })
                const icon = el.querySelector('.nav-main-item-head-ic')
                const line = el.querySelector('.line')
                animate(headTxt.chars, { transform: "translateY(100%)" }, { duration: 0 })
                animate(line, { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

                icon && animate(icon, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

                const elements = [...headTxt.chars];
                if (icon) {
                    elements.push(icon);
                }
                mainSequence.push(
                    [line, { scaleX: 1 }, { duration: 1, at: idx * .05 }],
                    [elements, { opacity: 1, transform: "none" }, { duration: .4, delay: stagger(.005), at: .2 + idx * .05 }],
                );
                mainSplit.push(headTxt)
            })

            inView('.nav-main', () => {
                timeline(mainSequence).finished.then(() => {
                    mainSplit.forEach(el => el.revert())
                    document.querySelectorAll('.nav-main-item-head-ic').forEach(el => el.removeAttribute('style'))
                    document.querySelectorAll('.nav-main-wrap .nav-main-item .line').forEach(el => el.removeAttribute('style'))
                })
            })
        },
        close: () => {
            const navInfo = document.querySelector('.nav-info')
            const navMain = document.querySelector('.nav-main')
        }
    }
    function menuOnClick(e, idx, islLastItem) {
        e.preventDefault()
        if (window.innerWidth > 991) {
            let dropdownEl = document.querySelector(`.header-dropdown[data-dropdown-idx="${idx}"]`)
            setDropdownIdx(idx);
            // setIsHide(false);
            dropdownEl.style.top = `${document.querySelector('.header-main').getBoundingClientRect().height}px`

            if (!islLastItem) {
                dropdownEl.style.left = `${e.target.getBoundingClientRect().left - parseRem(20)}px`
            } else {
                dropdownEl.style.left = `${e.target.getBoundingClientRect().left + e.target.clientWidth - dropdownEl.clientWidth}px`

            }
        } else {
            let slideEl = document.querySelector(`.nav-main-item-dropdown[data-dropdown-idx="${idx}"]`)

            if (!slideEl.classList.contains('active')) {
                document.querySelectorAll('.nav-main-item-dropdown').forEach(item => {
                    item.style.setProperty('height', "0")
                    item.classList.remove('active')
                })
                document.querySelectorAll('.nav-main-item-head').forEach(item => { item.classList.remove("active") })

                let height = slideEl.querySelector('.nav-main-item-dropdown-inner').clientHeight
                slideEl.style.setProperty('height', `${height}px`)
                slideEl.classList.add('active')
                e.target.classList.add('active')
                if (islLastItem) {
                    setTimeout(() => {
                        document.querySelector('.nav-main').scrollTo({
                            top: document.querySelector('.nav-main').clientHeight + height,
                            left: 0,
                            behavior: "smooth",
                        })
                    }, 610);
                }
            } else {
                document.querySelectorAll('.nav-main-item-dropdown').forEach(item => {
                    item.style.setProperty('height', "0")
                    item.classList.remove('active')
                })
                document.querySelectorAll('.nav-main-item-head').forEach(item => { item.classList.remove("active") })
            }
        }
    }

    return (
        <>
            <header className={cn("header header-div-main", { "on-hide": isHide })}>
                <div className="container grid">
                    <div className="header-main">
                        <div className="header-main-inner">
                            <a href="/" className="header-logo">
                                {props.logo}
                            </a>
                            <div className="header-menu">
                                {props.pages.map((page, idx) => (
                                    <Fragment key={idx}>
                                        <div className={cn("header-menu-item", { "active": props.pathname === page.link })}>
                                            <a
                                                href={page.link}
                                                data-dropdown-idx={idx}
                                                className={cn("header-menu-item-link txt-link", { "on-dropdown": idx === dropdownIdx })}
                                                onClick={(e) => {
                                                    if (page.type != 'dropdown') return;
                                                    menuOnClick(e, idx, idx === props.pages.length - 1);
                                                }}>
                                                <span className="txt txt-14 txt-up txt-semi" dangerouslySetInnerHTML={{ __html: page.name.replaceAll('[','<span class="txt-kanak">').replaceAll(']','</span>') }}></span>
                                                {page.type == 'dropdown' && (
                                                    <div className={cn("ic ic-14 header-menu-item-ic", { "active": idx === dropdownIdx })}>
                                                        <svg width="100%" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M2.59246 3.5L5.99935 6.89947L9.40624 3.5L10.4528 4.54656L5.99935 9.00001L1.5459 4.54656L2.59246 3.5Z" fill="currentColor" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </a>
                                        </div>
                                        {idx !== props.pages.length - 1 && (
                                            <span className="txt txt-14 txt-semi txt-div">/</span>
                                        )}
                                    </Fragment>
                                ))}
                            </div>
                            <div className="line"></div>
                        </div>
                    </div>
                    <div className={`header-sub ${isSubHide ? "isHide" : ""}`}>
                        <div className="ic ic-32">
                            {props.recycleIc}
                        </div>
                        <div className="txt txt-10 txt-med header-sub-txt">
                            <span className="txt-semi header-sub-label">
                                Our mission:
                            </span>
                            To kraft responsibly-sourced packaging and products that not only prioritize quality, functionality, and affordability but also champion a profound commitment to enhancing the health and beauty of our planet.
                        </div>
                    </div>
                    <div className={`header-toggle ${navOpen ? 'active' : ''}`}>
                        <button className="txt txt-16 txt-semi txt-up header-toggle-link" onClick={() => (setNavOpen(!navOpen))}>
                            <span className="header-toggle-link-txt header-toggle-link-txt-open">
                                Menu
                            </span>
                            <span className="header-toggle-link-txt header-toggle-link-txt-close">
                                Close
                            </span>
                        </button>
                    </div>
                </div>
            </header>
            <div className="header-dropdowns" ref={dropdownRef}>
                {props.pages.map((page, idx) => {
                    if (page.type == 'dropdown') {
                        return (
                            <div className={cn("header-dropdown", { "active": idx === dropdownIdx })} key={idx} data-dropdown-idx={idx}>
                                <div className={`header-dropdown-inner ${page.name.toLowerCase().replaceAll('[','').replaceAll(']','').replaceAll(' ', '-')}`}>
                                    {page.sub_menu.map((el, idx) => (
                                        <a
                                            key={idx}
                                            href={el.url}
                                            className={cn("header-dropdown-item bg-light", { "active": el.url === props.pathname })}>
                                            <span className="txt txt-14 txt-up txt-semi" dangerouslySetInnerHTML={{ __html: el.name.replaceAll('[','<span class="txt-kanak">').replaceAll(']','</span>') }}></span>
                                            <div className="header-dropdown-item-ic">
                                                <div className="ic ic-16">
                                                    {props.extIcon}
                                                </div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
            <div className={cn("header header-div-sub", { "on-hide": isHide })}>
                <div className="container grid">
                    <a href="/contact" className="header-cta" data-cursor="txtLink" data-cursor-txtlink="child">
                        <div className="header-cta-head">
                            {props.headFlag}
                        </div>
                        <div className='header-cta-body'>
                            <div className="txt txt-16 txt-up txt-med header-cta-body-txt" data-cursor-txtlink-child data-cursor-txtlink-top>
                                <span className="txt-kanak">K</span>ontact us
                            </div>
                            <div className="header-cta-body-bg" style={{ backgroundImage: `url('${props.bodyFlag}')` }}></div>
                        </div>
                        <div className="header-cta-tail">
                            {props.tailFlag}
                        </div>
                    </a>
                </div>
            </div>
            <div className="nav">
                <div className={`nav-inner bg-light ${navOpen ? 'active' : ''}`}>
                    <div className="container grid">
                        <div className="nav-info">
                            <div className="line line-ver"></div>
                            <div className="nav-info-wrap">
                                <div className="nav-info-item">
                                    <div className="txt txt-14 txt-med nav-info-item-head">Get in touch</div>
                                    <a href="mailto:info@kanaknaturals.com" target='_blank' className="heading h6 txt-black txt-up nav-info-item-content">info@kanaknaturals.com</a>
                                </div>
                                <div className="nav-info-item">
                                    <div className="txt txt-14 txt-med nav-info-item-head">Contact</div>
                                    <a href="tel:+1 (260) 490 4790" className="heading h6 txt-black txt-up nav-info-item-content">+1 (260) 490-4790</a>
                                </div>
                                <div className="nav-info-item">
                                    <div className="txt txt-14 txt-med nav-info-item-head">Headquarters</div>
                                    <a href="https://maps.app.goo.gl/YxM91MZmzBCW5F1C6" target='_blank' className="heading h6 txt-black txt-up nav-info-item-content">321 Hovan Drive, Fort Wayne, IN 46825</a>
                                </div>
                                <a href="/contact" className="btn btn-lg btn-wide nav-info-btn">
                                    <div className="heading txt-16 txt-black txt-up"><span className='txt-kanak'>K</span>ontact us</div>
                                </a>
                            </div>
                            <div className="txt txt-16 txt-semi nav-info-footer">⁠©⁠ {props.currYear} KANAK NATURALS </div>
                        </div>
                        <div className="nav-main" data-lenis-prevent="#">
                            <div className="nav-main-wrap">
                                {props.pages.map((page, idx) => (
                                    <div href='#' className="nav-main-item" key={idx}>
                                        <a href={page.type == 'dropdown' ? '#' : page.link} data-dropdown-idx={idx} onClick={page.type == 'dropdown' ? (e) => { menuOnClick(e, idx, idx === props.pages.length - 1) } : null} className="nav-main-item-head">
                                            <span className="heading h3 txt-black txt-up nav-main-item-head-txt" dangerouslySetInnerHTML={{ __html: page.name.replaceAll('[','<span class="txt-kanak">').replaceAll(']','</span>') }}></span>
                                            {page.type == "dropdown" && (
                                                <div className="nav-main-item-head-ic">
                                                    <div className="ic">
                                                        {props.icDropdown}
                                                    </div>
                                                </div>
                                            )}
                                        </a>
                                        {page.type == "dropdown" && (
                                            <div className="nav-main-item-dropdown" data-dropdown-idx={idx} >
                                                <div className="nav-main-item-dropdown-inner">
                                                    {page.sub_menu.map((el, elIdx) => (
                                                        <a href={el.url} className="heading h5 txt-black txt-up nav-main-item-dropdown-item hello" key={elIdx} dangerouslySetInnerHTML={{ __html: el.name.replaceAll('[','<span class="txt-kanak">').replaceAll(']','</span>') }}>
                                                        </a>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        <div className="line"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HeaderGlobal;