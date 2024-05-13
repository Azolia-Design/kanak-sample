import './Culture.scss'
import { useEffect } from 'react';
import SplitType from 'split-type';
import { stagger, inView, animate, timeline } from "motion";
function KareerCulture(props) {
    useEffect(() => {
        const title = new SplitType('.kareer-cult-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.kareer-cult-sub', { types: 'lines, words', lineClass: "split-line" });
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(subTitle.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        animate('.kareer-cult-btn-wrap', { opacity: 0, transform: "translateY(10px)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05) }],
            [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: '<' }],
            ['.kareer-cult-btn-wrap', { opacity: 1, transform: "none" }, { duration: .8, at: '-.5' }]
        ]
        inView('.kareer-cult', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert();
                document.querySelector('.kareer-cult-btn-wrap').removeAttribute('style');
            })
        }, { margin: "-30% 0px -30% 0px" });

        const cultures = document.querySelectorAll('.kareer-cult-main-item');
        cultures.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.kareer-cult-main-item-title-txt'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelector('.kareer-cult-main-item-sub'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelector('.line-top'), { scaleX: 0 }, { duration: 0 })
            animate(el.querySelector('.kareer-cult-main-item-title-dot'), { scale: 0 }, { duration: 0 })
            animate(itemTitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
            animate(itemSub.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
            animate(el.querySelector('.kareer-cult-main-item-img img'), { scale: 1.2, opacity: 0 }, { duration: 0 })
            el.querySelector('.line-bot') && animate(el.querySelector('.line-bot'), { scaleX: 0 }, { duration: 0 })

            const sequenceItem = [
                [el.querySelector('.line-top'), { scaleX: 1 }, { duration: 1 }],
                [el.querySelector('.kareer-cult-main-item-title-dot'), { scale: 1 }, { duration: .6, at: .1 }],
                [itemTitle.words, { opacity: 1, transform: 'translateY(0%)' }, { duration: .6, delay: stagger(.1), at: .2 }],
                [itemSub.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.01), at: .2 }],
                [el.querySelector('.kareer-cult-main-item-img img'), { scale: 1, opacity: 1 }, { duration: 1.2, easing: 'ease-out', at: .3 }],
                [idx == cultures.length - 1 && el.querySelector('.line-bot') && el.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .35 }]
            ]

            inView(el, () => {
                timeline(sequenceItem).finished.then(() => {
                    itemTitle.revert()
                    itemSub.revert()
                    el.querySelector('.line-top').removeAttribute('style')
                    el.querySelector('.kareer-cult-main-item-title-dot').removeAttribute('style');
                    el.querySelector('.kareer-cult-main-item-img img').removeAttribute('style');
                    idx == cultures.length - 1 && el.querySelector('.line-bot').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" });
        })
    }, []);
    return (
        <section className="kareer-cult bg-light">
            <div className="line line-top"></div>
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black kareer-cult-title">
                    {props.title}
                </h2>
                <div className="kareer-cult-sub-wrap">
                    <p className="txt txt-18 txt-med kareer-cult-sub">
                        {props.sub}
                    </p>
                    <div className="kareer-cult-btn-wrap">
                        <a
                            href={props.link_list ? props.link_list.url : '#'}
                            className="btn btn-lg"
                            data-cursor="txtLink"
                            data-cursor-txtlink="child"
                            target={props.link_list.target ? props.link_list.target : '_self'}
                        >
                            <div className="txt txt-18 txt-up txt-med" data-cursor-txtlink-child>Views open positions</div>
                        </a>
                    </div>
                </div>
                <div className="kareer-cult-main">
                    {props.list.map((item, idx) => (
                        <div className="kareer-cult-main-item bg-light" key={idx} style={
                            {
                                '--idx': idx + 1,
                                '--pd-bot': 4 - idx - 1,
                                '--mg-top': idx == 0 ? 0 : 4 - idx
                            }
                        }>
                            <div className="kareer-cult-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="kareer-cult-main-item-content">
                                    <div className="kareer-cult-main-item-title">
                                        <div className="kareer-cult-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black kareer-cult-main-item-title-txt">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med kareer-cult-main-item-sub">
                                        {item.sub}
                                    </p>
                                </div>
                                <div className="kareer-cult-main-item-img">
                                    <img src={item.image.url} alt={item.image.alt} width={item.image.dimensions.width} height={item.image.dimensions.height} className='img img-h' />
                                </div>
                                {idx == 3 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
export default KareerCulture