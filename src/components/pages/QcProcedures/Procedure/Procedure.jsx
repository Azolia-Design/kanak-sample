import './Procedure.scss'
import { useEffect } from 'react'
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight"

function ComplianceProcedure({ ...props }) {
    useEffect(() => {
        // Anim Title
        const label = new SplitType(".complian-proce-label", { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(".complian-proce-title", { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType(".complian-proce-sub", { types: 'lines, words', lineClass: 'split-line' })
        const link = new SplitType(".complian-proce-link-txt", { types: 'lines, words', lineClass: 'split-line' })

        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(link.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(document.querySelector('.complian-proce-link .ic'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

        const sequence = [
            [label.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.005), at: 0 }],
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.035), at: 0.1 }],
            [sub.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.006), at: 0.25 }],
            [link.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.02), at: 0.3 }],
            [document.querySelector('.complian-proce-link .ic'), { opacity: 1, transform: "none" }, { duration: .6, at: .45 }],
        ]
        inView('.complian-proce', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                sub.revert()
                link.revert()
                document.querySelector('.complian-proce-link .ic').removeAttribute('style');
            })
        }, { margin: "-40% 0px -20% 0px" })

        // Anim Item
        const procedures = document.querySelectorAll('.complian-proce-main-item');
        procedures.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.complian-proce-main-item-title-txt'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.complian-proce-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-top'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.complian-proce-main-item-title-dot'), { scale: 0 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(itemSub.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
            animate(el.querySelector('.complian-proce-main-item-img img'), { scale: 1.2, opacity: 0 }, { duration: 0 })
            el.querySelector('.line-bot') && animate(el.querySelector('.line-bot'), { scaleX: 0 }, { duration: 0 })

            const sequenceItem = [
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.complian-proce-main-item-title-dot'), { scale: 1 }, { duration: .6, at: .1 }],
                [itemTitle.words, { opacity: 1, transform: 'translateY(0%)' }, { duration: .6, delay: stagger(.05), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.005), at: .2 }],
                [el.querySelector('.complian-proce-main-item-img img'), { scale: 1, opacity: 1 }, { duration: 1.2, easing: 'ease-out', at: .3 }],
                [el.querySelector('.line-bot') && el.querySelector('.line-bot') && el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .35 }]
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
                    el.querySelector('.complian-proce-main-item-title-dot').removeAttribute('style');
                    el.querySelector('.complian-proce-main-item-img img').removeAttribute('style');
                    el.querySelector('.line-bot') && el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        })
    }, [])
    return (
        <section className='complian-proce'>
            <div className="line complian-proce-line"></div>
            <div className="container grid">
                <div className="heading h4 txt-black txt-up complian-proce-label">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up complian-proce-title">{props.title[0].text}</h1>
                <div className="complian-proce-sub-wrap">
                    <p className="txt txt-18 txt-med complian-proce-sub">{props.newDes}</p>
                    <a href="/contact" className='txt txt-18 txt-bold complian-proce-link' data-cursor="txtLink" >
                        <div className="complian-proce-link-txt">{props.btn}</div>
                        <div className="ic ic-16"><ArrowUpRight /></div>
                    </a>
                </div>
                <div className="complian-proce-main">
                    {props.list.map((item, idx) => (
                        <div className="complian-proce-main-item bg-light" key={idx} style={
                            {
                                '--idx': idx + 1,
                                '--pd-bot': props.list.length - idx - 1,
                                '--mg-top': idx == 0 ? 0 : props.list.length - idx
                            }
                        }>
                            <div className="complian-proce-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="complian-proce-main-item-content">
                                    <div className="complian-proce-main-item-title">
                                        <div className="complian-proce-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black complian-proce-main-item-title-txt">
                                            {item.item_title[0].text}
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med complian-proce-main-item-sub">
                                        {item.item_des}
                                    </p>
                                </div>
                                <div className="complian-proce-main-item-img">
                                    <div className="ic">
                                        <img src={item.item_image.url} alt={item.item_image.alt} width={item.item_image.dimensions.width} height={item.item_image.dimensions.height} className='img img-h' />
                                    </div>
                                </div>
                                {idx == props.list.length - 1 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ComplianceProcedure