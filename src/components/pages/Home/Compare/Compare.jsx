import './NewCompare.scss';
import "keen-slider/keen-slider.min.css"
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion"
import { useKeenSlider } from 'keen-slider/react'
import { useEffect, useState, Fragment } from 'react';

function HomeCompare(props) {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [loaded, setLoaded] = useState(false);
    const [sliderRef, instanceRef] = useKeenSlider({
        mode: "snap",
        disabled: true,
        breakpoints: {
            '(max-width: 767px)': {
                disabled: false,
                slides: { perView: 1.5 }
            },
            "(max-width: 476px)": {
                disabled: false
            }
        },
        slides: {
            perView: "auto"
        },
        slideChanged(slider) {
            setCurrentSlide(slider.track.details.rel)
        },
        created() {
            setLoaded(true)
        },
    })
    useEffect(() => {
        if (!loaded) return;
        const title = new SplitType('.home-comp .home-comp-title', { types: 'lines, words', lineClass: 'split-line' });
        const sub = new SplitType('.home-comp .home-comp-sub', { types: 'lines, words', lineClass: 'split-line' });
        animate([...title.words,...sub.words], { transform: 'translateY(100%)', opacity: 0 }, { duration: 0 })
        document.querySelector('.home-comp-main-slide-pagination') && animate('.home-comp-main-slide-pagination .dot', { opacity: 0 }, { duration: 0 })
        animate('.home-comp-title-wrap .line', { scaleX: 0 }, { duration: 0 })

        const sequence = [
            [title.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.05), at: 0 }],
            ['.home-comp-title-wrap .line', { scaleX: 1 }, { duration: .8, at: .1 }],
            [sub.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.01), at: .15 }]
        ]
        inView('.home-comp .home-comp-title', () => {
            timeline(sequence).finished.then(() => {
                title.revert();
                sub.revert();
                document.querySelector('.home-comp-main-slide .line').removeAttribute('style');
            })
        }, { margin: "-20% 0px -20% 0px" })
        inView('.home-comp-main-slide-pagination', () => {
            document.querySelector('.home-comp-main-slide-pagination') && animate('.home-comp-main-slide-pagination .dot', { opacity: 1 }, { duration: .8, delay: stagger(.05) }).finished.then(() => {
                document.querySelectorAll('.home-comp-main-slide-pagination .dot').forEach((item) => item.removeAttribute('style'))
            })
        }, { margin: "-10% 0px -10% 0px" })

        let allItems = document.querySelectorAll('.home-comp-main-slide-item')
        allItems.forEach((el, idx) => {
            let itemTitle = new SplitType(el.querySelector('.home-comp-main-slide-title .heading'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSubTitle = new SplitType(el.querySelectorAll('.home-comp-main-slide-detail-title'), { types: 'lines, words', lineClass: 'split-line' })
            let itemSub = new SplitType(el.querySelectorAll('.home-comp-main-slide-detail-content'), { types: 'lines, words', lineClass: 'split-line' })
            animate(el.querySelectorAll('.home-comp-main-slide-detail-ic'), {opacity: 0, scale: 0.8}, {duration: 0})
            animate(el.querySelectorAll('.home-comp-main-slide-title-ic'), {opacity: 0, scale: 0.8}, {duration: 0})
            animate(document.querySelectorAll('.home-comp-main-slide .line')[idx], {scaleX: 0 }, { duration: 0 })
            animate([...itemTitle.words,...itemSubTitle.words, ...itemSub.words], {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})
            const sequenceItem = [
                [document.querySelectorAll('.home-comp-main-slide .line')[idx], { scaleX: 1 }, { duration: .8, at: 0 }],
                [el.querySelectorAll('.home-comp-main-slide-title-ic'), {opacity: 1, scale: 1}, {duration: 1, at: 0}],
                [itemTitle.words, {opacity: 1, transform: 'none'}, {duration: .8, delay: stagger(.01), at: .1}],
                [itemSubTitle.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.008), at: .1}],
                [itemSub.words, {opacity: 1, transform: 'none'}, {duration: .6, delay: stagger(.008), at: .2}],
                [el.querySelectorAll('.home-comp-main-slide-detail-ic'), {opacity: 1, scale: 1}, {duration: 1, at: .2}],
            ]
            inView(el, () => {
                timeline(sequenceItem, {delay: idx * .2}).finished.then(() => {
                    el.querySelectorAll('.home-comp-main-slide-detail-ic').forEach(el => el.removeAttribute('style'))
                    itemTitle.revert()
                    itemSubTitle.revert();
                    itemSub.revert();
                })
            }, {margin: "-20% -15% -20% -15%"})
        })
    }, [loaded])

    return (
        <section className="home-comp">
            <div className="home-comp-stick bg-light">
                <div className="container grid">
                    <div className="home-comp-title-wrap">
                        <h2 className=" txt-up txt-black home-comp-title">
                            <span className="h2">The Kanak</span>
                            <span className="h0 txt-green">Advantages</span>
                        </h2>
                        <div className="line"></div>
                    </div>
                    <div className='home-comp-sub-wrap'>
                        <h3 className='h5 heading txt-up txt-black home-comp-sub'>Kanak Naturals <br />Dinnerware</h3>
                        <h3 className='h5 heading txt-up txt-black home-comp-sub'>Traditional <br />Dinnerware</h3>
                    </div>
                    <div className='home-comp-main'>
                        <div className='keen-slider home-comp-main-slide' ref={sliderRef}>
                            {props.list.map(({ data }, idx) => (
                                <Fragment key={idx}>
                                    <span className='line'></span>
                                    <div className={`keen-slider__slide grid home-comp-main-slide-item ${currentSlide == idx ? 'active': ''}`}>
                                        <div className='home-comp-main-slide-title'>
                                            <div className='ic ic-80 home-comp-main-slide-title-ic'>
                                                <img src={data.icon.url} alt={data.title} />
                                            </div>
                                            <h3 className='heading h5 txt-up txt-black'>{data.title}</h3>
                                        </div>
                                        <div className='home-comp-main-slide-list'>
                                            <div className='home-comp-main-slide-detail'>
                                                <div className='home-comp-main-slide-detail-ic'>
                                                    {props.imgCompareGood}
                                                </div>
                                                <h4 className='heading h6 txt-up txt-black home-comp-main-slide-detail-title'>Kanak<br />Naturals Dinnerware</h4>
                                                <div className='txt txt-18 txt-med home-comp-main-slide-detail-content'>{data.kanak}</div>
                                            </div>
                                            <div className='home-comp-main-slide-detail'>
                                                <div className='home-comp-main-slide-detail-ic'>
                                                    {props.imgCompareBad}
                                                </div>
                                                <h4 className='heading h6 txt-up txt-black home-comp-main-slide-detail-title'>Traditional<br />Styrofoam Plate</h4>
                                                <div className='txt txt-18 txt-med home-comp-main-slide-detail-content'>{data.other}</div>
                                            </div>
                                        </div>
                                    </div>
                                    { props.list.length - 1 === idx && (<span className='line line-bot'></span>)}
                                </Fragment>
                            ))}
                        </div>
                        <div className='home-comp-main-slide-pagination'>
                            {loaded && instanceRef.current && (
                                <div className="dots">
                                {[...Array(instanceRef.current.track.details.slides.length).keys(),].map((idx) => {
                                    return (
                                    <button
                                        key={idx}
                                        onClick={() => {instanceRef.current?.moveToIdx(idx)}}
                                        className={"dot" + (currentSlide === idx ? " active" : "")}
                                        ><span></span>
                                    </button>
                                    )
                                })}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HomeCompare;