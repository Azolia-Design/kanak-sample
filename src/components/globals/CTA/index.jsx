import './styles.scss';
import { animate, timeline, stagger, inView, scroll } from "motion"
import { useEffect } from 'react';
import SplitType from 'split-type';

function GlobalCTA(props) {
    useEffect(() => {
        const title = new SplitType('.global-cta-title', { types: 'lines, words', lineClass: 'split-line' })
        animate('.global-cta-main', { opacity: 0, transform: 'translateY(10%)' }, { duration: 0 })
        animate(title.words, { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })
        animate('.global-cta-main-tail-btn', { opacity: 0 }, { duration: 0 })
        animate('.global-cta-main-tail .line', { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        const sequence = [
            ['.global-cta-main', { transform: 'none', opacity: 1 }, { duration: .8 }],
            [title.words, { transform: 'none', opacity: 1 }, { duration: .8, delay: stagger(0.06), at: .1 }],
            ['.global-cta-main-tail .line', { scaleX: 1 }, { duration: .6, at: .1 }],
            ['.global-cta-main-tail-btn', { opacity: 1 }, { duration: .8, at: .2 }]
        ]
        inView('.global-cta-main', () => {
            timeline(sequence).finished.then(() => {
                title.revert();
                document.querySelector('.global-cta-main').removeAttribute('style');
                document.querySelector('.global-cta-main-tail-btn').removeAttribute('style');
                document.querySelector('.global-cta-main-tail .line').removeAttribute('style');
            })
        }, { margin: '-30% 0px -30% 0px' })
    }, [])
    return (
        <section className="global-cta">
            <div className="global-cta-bg bg-light">
                {props.background}
            </div>
            <div className="container grid">
                <div className="global-cta-main bg-light">
                    <div className="global-cta-main-head">
                        <h2 className="heading h1 txt-up txt-black global-cta-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="global-cta-main-tail">
                        <div className="line"></div>
                        <a href="/contact?src=request" className="btn btn-lg btn-wide global-cta-main-tail-btn" data-cursor="txtLink" data-cursor-txtlink="child">
                            <div className="txt txt-18 txt-med txt-up" data-cursor-txtlink-child>
                            Request a quote
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="line line-bot"></div>
        </section>
    )
}
export default GlobalCTA;
