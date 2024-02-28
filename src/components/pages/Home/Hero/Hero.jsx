import * as ut from '@/js/utils.js';
import './Hero.scss'
import { forwardRef, useEffect, useRef } from 'react';
import useWindowSize from '@hooks/useWindowSize';

const TextEl = forwardRef(function TextEl({...props}, ref) {
    return (<span ref={ref} className="heading h0 txt-up txt-black home-abt-title-top">{props.text}</span>)
})

function HomeHero(props) {
    const el = useRef()
    const cloneEl = useRef()
    const { width, height } = useWindowSize();
    useEffect(() => {
        cloneEl.current.style.cssText = `
            position: absolute;
            top: ${ut.offset(el.current).top}px;
            left: ${ut.offset(el.current).left}px;
            z-index: 99
        `;
    }, [width, height])
    return (
        <>
            <section className="home-hero">
                <div className="container grid">
                    <h1 className="heading h0 txt-black txt-up home-hero-title">
                        {props.title}
                    </h1>
                    <div className="grid home-hero-sub">
                        <div className="home-hero-sub-top">
                            <p className="txt txt-16 txt-med">
                                {props.sub_title}
                            </p>
                        </div>
                        <div className="home-hero-sub-btn-wrap">
                            <a href="./" className="btn btn-main">
                                <div className="txt txt-18 txt-med">Kontact us</div>
                            </a>
                        </div>
                        <div className="home-hero-sub-cta-wrap">
                            <div className="txt txt-18 txt-med">Scroll to Explore</div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="home-abt">
                <div className="container">
                    <h2 className="heading h0 txt-up txt-black home-abt-title">
                        Your Reputation<br/> <TextEl ref={el} text="Our Unwavering Commitment"/>
                    </h2>
                </div>
            </section>
            <TextEl ref={cloneEl} text="Our Unwavering Commitment"/>
        </>
    )
}
export default HomeHero;