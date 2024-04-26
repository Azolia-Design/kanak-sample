import './Hero.scss';

import { useEffect } from "react";
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function CaseHero({ ...props }) {
    useEffect(() => {
        const title = new SplitType('.case-hero-title', { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType('.case-hero-content-sub', { types: 'lines, words', lineClass: 'split-line' })
        const authorName = new SplitType('.case-hero-content-author-name', { types: 'lines, words', lineClass: 'split-line' })
        const authorJob = new SplitType('.case-hero-content-author-job', { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        // animate('.case-hero-content .line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        // animate('.case-hero-content-author-ava img', { opacity: 0, transform: 'scale(1.2)' }, { duration: 0 })
        // animate(authorName.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        // animate(authorJob.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        // animate('.case-hero-content-author-company', { opacity: 0, transform: 'scale(.9)' }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.02) }],
            [sub.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.01), at: .2 }],
            // ['.case-hero-content .line', { scaleX: 1 }, { duration: .8, at: .2 }],
            // ['.case-hero-content-author-ava img', { opacity: 1, transform: 'none' }, { duration: .5, at: .4 }],
            // [authorName.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.02), at: .5 }],
            // [authorJob.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.02), at: .6 }],
            // ['.case-hero-content-author-company', { opacity: 1, transform: 'none' }, { duration: .5, at: .8 }],
        ]
        inView(".case-hero", () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                sub.revert()
                // authorName.revert()
                // authorJob.revert()
                // document.querySelector('.case-hero-content .line').removeAttribute('style')
                // document.querySelector('.case-hero-content-author-ava img').removeAttribute('style')
                // document.querySelector('.case-hero-content-author-company').removeAttribute('style')
            })
        }, { margin: "-10% 0px -20% 0px" })
    }, [])

    return (
        <section className="case-hero">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up case-hero-title">
                    {props.title}
                </h1>
                <div className="case-hero-content">
                    <p className="txt txt-18 txt-bold case-hero-content-sub">
                        {props.client_quote}
                    </p>
                    {/* <div className="line"></div> */}
                    {/* <div className="case-hero-content-author">
                        <div className="case-hero-content-author-info">
                            <div className="case-hero-content-author-ava">
                                {props.authorAvatar}
                            </div>
                            <div className="case-hero-content-author-inner">
                                <div className="txt txt-18 txt-bold case-hero-content-author-name">
                                    {props.client_name}
                                </div>
                                <div className="txt txt-14 txt-semi case-hero-content-author-job">
                                    {props.client_job}
                                </div>
                            </div>
                        </div>
                        <div className="case-hero-content-author-company">
                            {props.authorCompany}
                        </div>
                    </div> */}
                </div>
            </div>
        </section>
    )
}

export default CaseHero