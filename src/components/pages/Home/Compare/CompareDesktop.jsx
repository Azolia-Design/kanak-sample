import './Compare.scss';
import { animate, timeline, stagger, inView, scroll } from "motion";
import { useEffect, useState, useRef } from 'react';
import SplitType from 'split-type';

const MainItem = ({ data, type, image, title, content, currentIndex }) => {
    return (
        <div className={`home-comp-main-item ${type}`}>
            {image}
            <h3 className={`heading h5 txt-up txt-black home-comp-main-item-title ${type}`}>
                {title}
            </h3>
            <div className="home-comp-main-item-list">
                {data.map(({ data }, idx) => (
                    <p className={`txt txt-18 txt-med home-comp-main-item-list-item${idx == currentIndex ? ' active' : ''}`} key={idx}>
                        {data[content]}
                    </p>
                ))}
            </div>
        </div>
    )
}

function HomeCompareDesktop(props) {
    const ref = useRef();
    const [index, setIndex] = useState(0);

    const onUpdateProgress = (progress) => {
        const numberOfBreakPoints = props.list.length;
        const step = 1 / numberOfBreakPoints;
        const breakPoints = Array.from({ length: numberOfBreakPoints + 1 }, (_, index) => parseFloat((index * step).toPrecision(2)));

        for (let i = 0; i < breakPoints.length - 1; i++) {
            const startPoint = breakPoints[i];
            const endPoint = breakPoints[i + 1];

            if (progress >= startPoint && progress < endPoint) {
                let idx = Math.floor(progress * 5)
                setIndex(idx);
            }
        }
    }

    useEffect(() => {
        scroll(({y}) => {
            y.progress > 0 ? document.querySelector('.home-comp-main-prog-line').classList.add('active') : document.querySelector('.home-comp-main-prog-line').classList.remove('active')
            onUpdateProgress(y.progress);
            animate('.home-comp-main-prog-line circle', {strokeDasharray: `${y.progress}, 1` }, {duration: 0})
        }, {
            target: ref.current,
            offset: ["start start", "end end"]
        })

        const title = new SplitType('.home-comp-title', { types: 'lines, words', lineClass: 'split-line' })
        const titleItemGood = new SplitType('.home-comp-main-item-title.good', { types: 'lines, words', lineClass: 'split-line' });
        const titleItemBad = new SplitType('.home-comp-main-item-title.bad', { types: 'lines, words', lineClass: 'split-line' });
        const subItemGood = new SplitType('.home-comp-main-item.good .home-comp-main-item-list-item.active', { types: 'lines, words', lineClass: 'split-line' });
        const subItemBad = new SplitType('.home-comp-main-item.bad .home-comp-main-item-list-item.active', { types: 'lines, words', lineClass: 'split-line' });
        const listTitle = new SplitType('.home-comp-main-prog-list-item.active', {types: 'lines, words', lineClass: 'split-line'});
        animate([...title.words, ...titleItemGood.words, ...titleItemBad.words, ...subItemGood.words, ...subItemBad.words, ...listTitle.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
        animate('.home-comp-main-item .ic', {scale: .9, opacity: 0}, {duration: 0})
        animate('.home-comp-main-prog-dot, .home-comp-main-prog-line svg', {scale: 1.1, opacity: 0}, {duration: 0})
        animate('.home-comp-main-prog-plates', {scale: .9, opacity: 0}, {duration: 0})
        animate('.home-comp-main-prog-dash', {opacity: 0}, {duration: 0})

        const sequence = [
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05)}],
            ['.home-comp-main-prog-dot, .home-comp-main-prog-line svg', {rotate: 0, scale: 1, opacity: 1}, {duration: 1, at: .2}],
            ['.home-comp-main-prog-dash', {rotate: 0,scale: 1, opacity: 1}, {duration: 1, at: .15}],
            ['.home-comp-main-prog-plates', {scale: 1, opacity: 1}, {duration: 1, at: .2}],
            ['.home-comp-main-item.good .ic', {scale: 1, opacity: 1}, {duration: .8, at: .2}],
            ['.home-comp-main-item.bad .ic', {scale: 1, opacity: 1}, {duration: .8, at: .25}],
            [titleItemGood.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05), at: 0.3}],
            [titleItemBad.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05), at: 0.35}],
            [subItemGood.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.04), at: 0.4}],
            [subItemBad.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.04), at: 0.45}],
            [listTitle.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05), at: 0.35}],
        ]

        inView('.home-comp-main-prog', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                titleItemGood.revert()
                titleItemBad.revert()
                subItemGood.revert()
                subItemBad.revert()
                listTitle.revert()
            })
        }, { margin: "-30% 0px -30% 0px" });
    }, []);

    return (
        <section className="home-comp desk-ver" ref={ref}>
            <div className="home-comp-stick bg-light">
                <div className="container">
                    <div className="home-comp-title-wrap">
                        <h2 className="h0 heading txt-up txt-black home-comp-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="home-comp-main grid">
                        <MainItem
                            data={props.list}
                            image={props.imgCompareGood}
                            title={"Kanak Naturals Dinnerware"}
                            currentIndex={index}
                            content={"kanak"}
                            type={"good"}
                        />
                        <div className="home-comp-main-prog">
                            <div className="home-comp-main-prog-inner">
                                <div className="home-comp-main-prog-plates">
                                    {props.imgComparePlates}
                                </div>
                                <div className="home-comp-main-prog-dot">
                                    {props.imgCompareDot}
                                </div>
                                <div className="home-comp-main-prog-dash">
                                    {props.imgCompareDash}
                                </div>
                                <div className="home-comp-main-prog-line">
                                    {props.plateLine}
                                </div>
                                <div className="home-comp-main-prog-list">
                                    {props.list.map(({ data }, idx) => (
                                        <h4 className={`heading h3 txt-up txt-black home-comp-main-prog-list-item${idx == index ? " active" : ""}`} key={idx}>
                                            {data.title}
                                        </h4>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <MainItem
                            data={props.list}
                            image={props.imgCompareBad}
                            title={"Traditional Dinnerware"}
                            currentIndex={index}
                            content={"other"}
                            type={"bad"}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default HomeCompareDesktop;


