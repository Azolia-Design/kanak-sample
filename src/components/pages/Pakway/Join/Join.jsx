import './Join.scss';
import { useRef, useEffect } from "react";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function PakwayJoin(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    useEffect(() => {
        const label = new SplitType(q('.pak-join-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.pak-join-title'), { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.06), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
        ]
        inView('.pak-join', () => {
            timeline(sequence).finished.then(() => {
                label.revert()
                title.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })


        // Anim Items

        const cultures = document.querySelectorAll('.pak-join-main-item');
        cultures.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.pak-join-main-item-title-txt'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.pak-join-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-top'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.pak-join-main-item-title-dot'), { scale: 0 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(itemSub.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
            animate(el.querySelector('.pak-join-main-item-img img'), { scale: 1.2, opacity: 0 }, { duration: 0 })
            el.querySelector('.line-bot') && animate(el.querySelector('.line-bot'), { scaleX: 0 }, { duration: 0 })

            const sequenceItem = [
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.pak-join-main-item-title-dot'), { scale: 1 }, { duration: .6, at: .1 }],
                [itemTitle.words, { opacity: 1, transform: 'translateY(0%)' }, { duration: .6, delay: stagger(.05), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.005), at: .2 }],
                [el.querySelector('.pak-join-main-item-img img'), { scale: 1, opacity: 1 }, { duration: 1.2, easing: 'ease-out', at: .3 }],
                [el.querySelector('.line-bot') && el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .35 }]
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('.line-top').removeAttribute('style')
                    el.querySelector('.pak-join-main-item-title-dot').removeAttribute('style');
                    el.querySelector('.pak-join-main-item-img img').removeAttribute('style');
                    idx == cultures.length - 1 && el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        })

    }, [])

    return (
        <section className="pak-join bg-dark" ref={sectionRef}>
            <div className="container grid">
                <div className="pak-join-title-wrap">
                    <div className="heading h4 txt-black txt-up pak-join-label">{props.label}</div>
                    <h2 className="heading h0 txt-black txt-up pak-join-title">{props.title}</h2>
                </div>
                <div className="pak-join-main">
                    {props.list.map((el, idx) => (
                        <div className="pak-join-main-item bg-dark"
                            key={idx}
                            style={
                                {
                                    "--idx": idx + 1,
                                    "--pd-bot": props.list.length - idx,
                                    "--mg-top": idx == 0 ? 0 : props.list.length - idx
                                }
                            }>
                            <div className="pak-join-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="pak-join-main-item-content">
                                    <div className="pak-join-main-item-title">
                                        <div className="pak-join-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black pak-join-main-item-title-txt">
                                            {el.title[0].text}
                                        </h3>
                                    </div>
                                    {/* <p className="txt txt-20 txt-med pak-join-main-item-sub" dangerouslySetInnerHTML={{ __html: el.subtitle.replace('9% of plastic waste', '<span class="txt-bold">9% of plastic waste</span>') }}></p> */}
                                    <p className="txt txt-20 txt-med pak-join-main-item-sub">{el.subtitle}</p>
                                </div>
                                <div className="pak-join-main-item-img">
                                    <img
                                        src={el.icon.url}
                                        className="img-fill"
                                        alt={el.icon.alt || ""}
                                        width={el.icon?.dimensions.width}
                                        height={el.icon?.dimensions.height}
                                    />
                                </div>
                                {idx == props.list.length - 1 && (
                                    <div className="line line-bot"></div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default PakwayJoin;