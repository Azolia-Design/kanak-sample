import gsap from 'gsap';
import { useEffect, useState, useRef } from 'react';
import './Footer.scss';
import useDevice from '@hooks/useDevice';
import { getLenis } from '@components/core/lenis';

const ContactItem = ({ label, content, link = "#", target }) => {
    return (
        <div className="ft-left-body-list-item">
            <div className="txt txt-18 txt-med ft-left-body-label">{label}</div>
            <a href={link} className="heading h6 txt-up txt-black ft-left-body-txt txt-link" target={target} data-cursor="txtLink">
                {content}
            </a>
        </div>
    )
}
const MenuItem = ({ link = "#", children }) => {
    return (
        <a href={link} className="ft-right-body-link txt-link-child" data-cursor="txtLink" data-cursor-txtlink="child">
            <div className="dot"></div>
            <div className="txt txt-18 txt-med ft-right-body-link-txt" data-cursor-txtlink-child>{children}</div>
        </a>
    )
}
const MenuColumn = ({ title, children, tail, tail_link, isOpen, onClick, onClickTail }) => {
    const contentHeight = useRef();
    const { isMobile } = useDevice();
    return (
        <div className="ft-right-col">
            <div className="line line-left"></div>
            <button className={`ft-head${isOpen ? ' active' : ''}`} onClick={isMobile ? onClick : null}>
                <h3 className="heading h6 txt-up txt-black ft-right-head-title">{title}</h3>
                <div className="line line-bottom"></div>
                {isMobile && (
                    <div className='ic ic-20 ft-right-head-title-arr'>
                        <svg width="100%" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.41 8.58997L12 13.17L16.59 8.58997L18 9.99997L12 16L6 9.99997L7.41 8.58997Z" fill="#212121" />
                        </svg>
                    </div>
                )}
            </button>
            {isMobile ?
                (<div className="ft-right-body"
                    ref={contentHeight}
                    style={
                        isOpen
                            ? { height: contentHeight.current.scrollHeight }
                            : { height: "0px" }
                    }>{children}</div>)
                : (
                    <div className="ft-right-body">
                        {children}
                    </div>
                )
            }
            <div className="ft-tail">
                <div className="line line-top"></div>
                {tail_link ? (
                    <a href={tail_link} className="txt txt-12 txt-bold txt-up ft-right-tail-link txt-link">
                        {tail}
                    </a>
                ) : (
                    <button onClick={() => onClickTail && onClickTail()} className="txt txt-12 txt-bold txt-up ft-right-tail-link txt-link">
                        {tail}
                    </button>
                )}

            </div>
        </div>
    )
}

const CopyRight = ({ children }) => {
    return (
        <>
            <div className="line line-top"></div>
            <p className="txt txt-12 txt-bold ft-copy">
                ⁠©⁠ {children} Kanak Naturals. All rights reserved.
            </p>
        </>
    )
}

function GlobalFooter(props) {
    const [activeIndex, setActiveIndex] = useState(null);

    const accordionClick = (index) => {
        setActiveIndex((prevIndex) => (prevIndex === index ? null : index));
    };
    return (
        <footer className="ft bg-light">
            <div className="container grid">
                {!props.hideLine && (
                    <div className="line line-top"></div>
                )}
                <div className="ft-left">
                    <div className="ft-head">
                        <div className="ft-logo">
                            {props.logo}
                        </div>
                        <a href="https://www.linkedin.com/company/kanaknaturals" target='__blank' className="ft-left-body-social-item txt-bg-link hide-dk">
                            {props.imgLinkedIn}
                        </a>
                        <div className="line line-bottom"></div>
                    </div>
                    <div className="ft-left-body">
                        <div className="ft-left-body-list">
                            <ContactItem label="Get in touch" content="info@kanaknaturals.com" link="mailto:info@kanaknaturals.com" />
                            <ContactItem label="Contact" content="+1 (260) 490 4790" link="tel:+1 (260) 490-4790" />
                            <ContactItem label="Headquarters" content="321 Hovan Drive, Fort Wayne, IN 46825" link="https://maps.app.goo.gl/YxM91MZmzBCW5F1C6" target="_blank" />
                        </div>
                        <div className="ft-left-body-social">
                            <a href="https://www.linkedin.com/company/kanaknaturals" target='__blank' className="ft-left-body-social-item txt-bg-link hide-mb">
                                {props.imgLinkedIn}
                            </a>
                        </div>
                        <a href="/contact" className="heading h1 txt-up txt-black ft-left-body-title txt-link-bold">
                            Let's talk!
                            <div className="ic ic-48">
                                <svg width="100%" viewBox="0 0 48 49" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 42.0703L42 6.07031" stroke="currentColor" strokeWidth="8" strokeMiterlimit="10"/>
                                    <path d="M14.3999 6.07031H41.9999V33.6703" stroke="currentColor" strokeWidth="8" strokeMiterlimit="10" strokeLinecap="square"/>
                                </svg>
                            </div>
                        </a>
                    </div>
                    <div className="ft-tail">
                        <CopyRight>{props.currYear}</CopyRight>
                    </div>
                </div>
                <div className="ft-right">
                    <MenuColumn
                        title="Products & Services"
                        tail_link="/terms-and-conditions"
                        tail="Terms of Use"
                        isOpen={activeIndex === 0}
                        onClick={() => accordionClick(0)}
                    >
                        <MenuItem link='/katalog'>Product Katalog</MenuItem>
                        <MenuItem link='/private-label'>Private Label</MenuItem>
                        <MenuItem link='/kustom-packaging-solutions'>Kustom Packaging Solutions</MenuItem>
                        <MenuItem link='/qc-procedures'>Testing, QC & Kompliance</MenuItem>
                    </MenuColumn>
                    <MenuColumn
                        title="Kustomers"
                        tail_link="/privacy-policy"
                        tail="Privacy Policy"
                        isOpen={activeIndex === 1}
                        onClick={() => accordionClick(1)}
                    >
                        {props.list?.map((item, idx) => {
                            return (
                                <MenuItem link={`/kustomers/${item.uid}`} key={idx}>{item.data.title}</MenuItem>
                            )
                        })}
                    </MenuColumn>
                    <MenuColumn
                        title="About"
                        tail="Back to top"
                        isOpen={activeIndex === 2}
                        onClick={() => accordionClick(2)}
                        onClickTail={() => { getLenis().scrollTo(0) }}
                    >
                        <MenuItem link="/about">Know Us</MenuItem>
                        <MenuItem link="/pakway">Pakway</MenuItem>
                        <MenuItem link="/avira-naturals">Avira Naturals</MenuItem>
                        <MenuItem link="/sustainability">Sustainability Kommitment</MenuItem>
                        <MenuItem link="/fulfillment">Fulfillment</MenuItem>
                        <MenuItem link="/kase-studies">Kase Studies</MenuItem>
                        <MenuItem link="/kareers">Kareers</MenuItem>
                    </MenuColumn>
                </div>
                <div className='ft-copyright-mb'>
                    <div className="txt txt-12 txt-bold ft-copyright-mb-wrap">
                        <a href="/terms-and-conditions" className="txt-link ft-copyright-mb-link">TERMS OF USE</a>
                        <span className="ft-copyright-mb-div">-</span>
                        <a href="/privacy-policy" className="txt-link txt-up ft-copyright-mb-link">PRIVACY POLICY</a>
                    </div>
                    <CopyRight>{props.currYear}</CopyRight>
                </div>
            </div>
        </footer>
    )
}

export default GlobalFooter;