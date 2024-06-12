import { Fragment, useEffect } from 'react';
import './Response.scss';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";

function SustainResponse(props) {
    useEffect(() => {
        const title = new SplitType(".sustainable-response-title", { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        inView('.sustainable-response', () => {
            animate(title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}).finished.then(() => title.revert())
        }, { margin: "-40% 0px -40% 0px" })

        animate(document.querySelector('.sustainable-response-main .line-top'), { scaleX: 0, opacity: 0 }, { duration: 0 })
        animate(document.querySelector('.sustainable-response-main .line-ver'), { scaleY: 0, transformOrigin: 'top', opacity: 0 }, { duration: 0 })

        const lineSequence = [
            [document.querySelector('.sustainable-response-main .line-top'), { scaleX: 1, opacity: 1 }, { duration: 1.4 }],
            [document.querySelector('.sustainable-response-main .line-ver'), { scaleY: 1, opacity: 1 }, { duration: 1.4, at: '<' }]
        ]

        inView('.sustainable-response-main', () => {
            timeline(lineSequence).finished.then(() => {
                document.querySelector('.sustainable-response-main .line-top').removeAttribute('style')
                document.querySelector('.sustainable-response-main .line-ver').removeAttribute('style')
            })
        }, { margin: "-40% 0px -40% 0px" })

        document.querySelectorAll('.sustainable-response-main-item.headline').forEach((item, idx) => {
            const itemTitle = new SplitType(item.querySelector('.sustainable-response-main-item-title'), { types: 'lines, words', lineClass: 'split-line' })
            const itemDesc = new SplitType(item.querySelector('.sustainable-response-main-item-desc'), { types: 'lines, words', lineClass: 'split-line' })

            animate([...itemTitle.words, ...itemDesc.words], { opacity: 1, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelector('.sustainable-response-main-item-img'), { opacity: 0, transform: "translate(2rem, 2rem) scale(.9)", transformOrigin: "right bottom" }, { duration: 0 })
            animate(item.querySelector('.line'), { scaleX: 0, opacity: 0, transformOrigin: window.outerWidth <= 767 ? 'left' : (idx % 2) ? 'left' : 'right' }, { duration: 0 })

            const itemSequence = [
                [itemTitle.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}],
                [itemDesc.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.05), at: '<'}],
                [item.querySelector('.sustainable-response-main-item-img'), { transform: "none", opacity: 1 }, { duration: .6, at: .4,  delay: stagger(.05) }],
                [item.querySelector('.line'), { opacity: 1, scaleX: 1 }, { duration: 1.2, at: .35 }]
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    itemTitle.revert();
                    itemDesc.revert();
                    item.querySelector('.line').removeAttribute('style');
                    item.querySelector('.sustainable-response-main-item-img').removeAttribute('style')
                })
            }, { margin: "-40% 0px -40% 0px" })
        })

        document.querySelectorAll('.sustainable-response-main-item.listing').forEach((item, idx) => {
            const itemDetail = new SplitType(item.querySelectorAll('.sustainable-response-main-item-desc p'), { types: 'lines, words', lineClass: 'split-line' })

            animate(itemDetail.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelectorAll('.sustainable-response-main-item-desc'), { opacity: 0 }, { duration: 0 })
            animate(item.querySelectorAll('.line'), { scaleX: 0, opacity: 0, transformOrigin: window.outerWidth <= 767 ? 'left' : (idx % 2) ? 'left' : 'right' }, { duration: 0 })
            const itemSequence = [
                [item.querySelectorAll('.sustainable-response-main-item-desc'), { opacity: 1 }, { duration: .6, delay: stagger(.05), at: '<' }],
                [itemDetail.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.05), at: '<'}],
                [item.querySelectorAll('.line'), { opacity: 1, scaleX: 1 }, { duration: 1.2, at: .35 }]
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    itemDetail.revert();
                    item.querySelectorAll('.line').forEach((line) => line.removeAttribute('style'));
                    item.querySelectorAll('.sustainable-response-main-item-desc').removeAttribute('style');
                })
            }, { margin: "-40% 0px -40% 0px" })
        })
    }, []);
    return (
        <section className="sustainable-response">
            <div className="container">
                <h2 className="heading h0 txt-black txt-up sustainable-response-title">{props.title}</h2>
                <div className="sustainable-response-main">
                    <div className='sustainable-response-main-headline'>
                        {props.list.map((item, idx) =>
                            <Fragment key={idx}>
                                <div className="sustainable-response-main-item headline">
                                    <h3 className="heading h1 txt-black txt-up sustainable-response-main-item-title">{item.title[0].text}</h3>
                                    <p className="txt txt-18 txt-med sustainable-response-main-item-desc">{item.desc}</p>
                                    <div className="sustainable-response-main-item-img">
                                        <img src={item.thumbnail.url} alt={item.thumbnail.alt} className='img img-fill'/>
                                    </div>
                                    <div className='line line-bot'></div>
                                </div>
                                <div className='sustainable-response-main-listing mod-mb'>
                                <ul className='sustainable-response-main-item listing'>
                                    {item.detail.map((content, idx) =>
                                        <li key={`detail-${idx}`} className='sustainable-response-main-item-desc'>
                                            <p className='txt txt-18 txt-med'>{content.text}</p>
                                            <div className='line line-bot'></div>
                                        </li>
                                    )}
                                </ul>
                            </div>
                            </Fragment>
                        )}
                    </div>
                    <div className='sustainable-response-main-listing'>
                        {props.list.map((item, idx) =>
                            <ul key={idx} className='sustainable-response-main-item listing'>
                                {item.detail.map((content, idx) =>
                                    <li key={`detail-${idx}`} className='sustainable-response-main-item-desc'>
                                        <p className='txt txt-18 txt-med'>{content.text}</p>
                                        <div className='line line-bot'></div>
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                    <div className="line line-top"></div>
                    <div className='line line-ver'></div>
                </div>
            </div>
        </section>
    )
}
export default SustainResponse;