import './Hero.scss'
import { useEffect } from 'react';
import { timeline, stagger } from "motion"
import SplitType from 'split-type';
import { getLenis } from '@/components/core/lenis';

function HomeHero(props) {
    useEffect(() => {
        const title = new SplitType('.home-hero-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.home-hero-sub-top p', { types: 'lines, words', lineClass: "split-line" });;
        const sequence = [
            [title.words, { opacity: [0, 1], transform: ["translateY(100%)", "none"]}, {duration: .8, delay: stagger(.05)}],
            ['.home-hero-sub', { opacity: [0, 1], transform: ["translateY(12px)", "none"]}, {duration: .8, at: '-.5'}],
            [subTitle.words, { opacity: [0, 1], transform: ["translateY(100%)", "none"]}, {duration: .6, delay: stagger(.01), at: "<"}],
            ['.home-hero-sub-btn-wrap .btn', { opacity: [0, 1]}, {duration: .6, at: '<'}],
            ['.home-hero-sub-cta-wrap .txt', { opacity: [0, 1], transform: ["translateY(10px)", "none"]}, {duration: .6, at: '<'}],
            ['.video-badge', { opacity: [0, 1], transform: ["scale(.8)", "none"]}, {duration: 1, at: '<'}],
        ]
        timeline(sequence).finished.then(() => {
            title.revert()
            subTitle.revert()
            document.querySelector('.home-hero-sub').removeAttribute('style')
            document.querySelector('.home-hero-sub-btn-wrap .btn').removeAttribute('style')
            document.querySelector('.home-hero-sub-cta-wrap .txt').removeAttribute('style')
            document.querySelector('.video-badge').removeAttribute('style')
        })
    }, [])
    
    function scrollDown() {
        getLenis().scrollTo(window.innerHeight)
        // console.log(getLenis)
    }

    return (
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
                        <a href="/contact" className="btn btn-main" data-cursor="txtLink" data-cursor-txtlink="child">
                            <div className="txt txt-18 txt-med txt-up" data-cursor-txtlink-child=''><span className="txt-kanak">K</span>ontact us</div>
                        </a>
                    </div>
                    <button onClick={() => scrollDown()} className="home-hero-sub-cta-wrap" data-cursor="txtLink" data-cursor-txtlink="child">
                        <div className="txt txt-18 txt-med" data-cursor-txtlink-child>
                            Scroll <span className="hide-dk">Down</span><span className="hide-mb">to Explore</span>
                        </div>
                    </button>
                </div>
                {props.badgeMb}
            </div>
        </section>
    )
}
export default HomeHero;