import './Join.scss';
import { useRef, useEffect } from "react";
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function AboutJoin({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    useEffect(() => {
        const label = new SplitType(q('.abt-join-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.abt-join-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.06), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
        ]
        inView('.abt-join', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })


        // Anim Items

        const cultures = document.querySelectorAll('.abt-join-main-item');
        cultures.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.abt-join-main-item-title-txt'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.abt-join-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-top'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.abt-join-main-item-title-dot'), { scale: 0 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(itemSub.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
            animate(el.querySelector('.abt-join-main-item-img img'), { scale: 1.2, opacity: 0 }, { duration: 0 })
            el.querySelector('.line-bot') && animate(el.querySelector('.line-bot'), { scaleX: 0 }, { duration: 0 })

            const sequenceItem = [
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.abt-join-main-item-title-dot'), { scale: 1 }, { duration: .6, at: .1 }],
                [itemTitle.words, { opacity: 1, transform: 'translateY(0%)' }, { duration: .6, delay: stagger(.05), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.005), at: .2 }],
                [el.querySelector('.abt-join-main-item-img img'), { scale: 1, opacity: 1 }, { duration: 1.2, easing: 'ease-out', at: .3 }],
                [el.querySelector('.line-bot') && el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .35 }]
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('.line-top').removeAttribute('style')
                    el.querySelector('.abt-join-main-item-title-dot').removeAttribute('style');
                    el.querySelector('.abt-join-main-item-img img').removeAttribute('style');
                    idx == cultures.length - 1 && el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        })

    }, [])

    return (
        <section className="abt-join bg-dark" ref={sectionRef}>
            <div className="container grid">
                <div className="abt-join-title-wrap">
                    <div className="heading h4 txt-black txt-up abt-join-label">
                        Join our movement
                    </div>
                    <h2 className="heading h0 txt-black txt-up abt-join-title">
                        A Commitment To A <span className="txt-green">greener</span> <span className="txt-green">future</span>
                    </h2>
                </div>
                <div className="abt-join-main">
                    <div className="abt-join-main-item bg-dark" style={{ "--idx": 1, "--pd-bot": 2, "--mg-top": 0 }}>
                        <div className="abt-join-main-item-inner">
                            <div className="line line-top"></div>
                            <div className="abt-join-main-item-content">
                                <div className="abt-join-main-item-title">
                                    <div className="abt-join-main-item-title-dot"></div>
                                    <h3 className="heading h1 txt-up txt-black abt-join-main-item-title-txt">
                                        Expertise
                                    </h3>
                                </div>
                                <p className="txt txt-20 txt-med abt-join-main-item-sub">
                                    With Kanak Naturals, you're signing up for more than sustainability. You're joining hands with a legacy championing responsibility and ingenuity for over 25 years.
                                </p>
                            </div>
                            <div className="abt-join-main-item-img">
                                {props.joinImg1}
                            </div>
                        </div>
                    </div>
                    <div className="abt-join-main-item bg-dark" style={{ "--idx": 2, "--pd-bot": 1, "--mg-top": 2 }}>
                        <div className="abt-join-main-item-inner">
                            <div className="line line-top"></div>
                            <div className="abt-join-main-item-content">
                                <div className="abt-join-main-item-title">
                                    <div className="abt-join-main-item-title-dot"></div>
                                    <h3 className="heading h1 txt-up txt-black abt-join-main-item-title-txt">
                                        Impact
                                    </h3>
                                </div>
                                <p className="txt txt-20 txt-med abt-join-main-item-sub">
                                    Choosing Kanak for your packaging needs directly supports the fight against plastic pollution. Our operations help reduce the massive influx of plastic waste—approximately 400 million metric tons annually—by enhancing recycling and reducing oceanic and landfill waste. With new distribution centers enhancing our delivery efficiency, every Kanak product you choose contributes to a more sustainable planet and a healthier global economy.
                                </p>
                            </div>
                            <div className="abt-join-main-item-img">
                                {props.joinImg2}
                            </div>
                        </div>
                    </div>
                    <div className="abt-join-main-item bg-dark" style={{ "--idx": 3, "--pd-bot": 0, "--mg-top": 1 }}>
                        <div className="abt-join-main-item-inner">
                            <div className="line line-top"></div>
                            <div className="abt-join-main-item-content">
                                <div className="abt-join-main-item-title">
                                    <div className="abt-join-main-item-title-dot"></div>
                                    <h3 className="heading h1 txt-up txt-black abt-join-main-item-title-txt">
                                        Thought-Leadership
                                    </h3>
                                </div>
                                <p className="txt txt-20 txt-med abt-join-main-item-sub">
                                    We lead with renewable materials like rPET, bamboo and sugarcane, superior sustainable solutions that define our 'Kommittment' to making responsibly sourced products the norm. Addressing both ecological and economic impacts, Kanak Naturals combats the $19 billion annual cost of plastic pollution by investing in advanced recycling technologies and minimizing our use of virgin plastics, promoting comprehensive sustainability.
                                </p>
                            </div>
                            <div className="abt-join-main-item-img">
                                {props.joinImg3}
                            </div>
                            <div className="line line-bot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AboutJoin;