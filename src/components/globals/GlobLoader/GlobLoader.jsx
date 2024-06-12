import './GlobLoader.scss';
import { animate } from 'motion'
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import cn from 'clsx';

const dataLoadingBreakdown = [
    { progression: 0, width: 0 },
    { progression: 20, width: 10 },
    { progression: 25, width: 24 },
    { progression: 43, width: 41 },
    { progression: 56, width: 50 },
    { progression: 66, width: 52 },
    // { progression: 71, width: 60 },
    { progression: 75, width: 76 },
    { progression: 85, width: 80 },
    { progression: 95, width: 99 },
    { progression: 100, width: 100 }
]

function GlobLoaderMain({ ...props }) {
    const loaderRef = useRef();
    const ROOT_DURATION = 3;
    const [counter, setCounter] = useState('00');
    const [preventLoading, setPreventLoading] = useState(false);

    const calculateDistance = (arr) => {
        let result = [];
        for (let i = 0; i < arr.length - 1; i++) {
            result.push(Math.abs(arr[i] - arr[i + 1]));
        }
        return result;
    }

    useEffect(() => {
        if (Boolean(window.sessionStorage.getItem('loadedScreen'))) {
            setPreventLoading(true)
        }
        else {
            const counter = { value: 0 };
            const ROOT_DELAY = 0.1;
            const loadingProgress = gsap.timeline({
                onComplete: () => {
                    loadingProgress.clear();
                    document.querySelector('.loader').classList.add('done-anim')
                    window.sessionStorage.setItem('loadedScreen', true)
                }
            });

            const loadingTo = (timeline, value, duration) => {
                timeline
                    .to('.loader-circle', { left: `${value}%`, duration: duration, ease: 'linear' })
                    .to(counter, {
                        value: value, duration: duration, ease: 'none', onUpdate: () => {
                            setCounter(Math.round(counter.value) < 10 ? `0${Math.round(counter.value)}`: Math.round(counter.value))
                    }}, '<=0');
            }

            const distanceArr = calculateDistance(dataLoadingBreakdown.map((item) => item.progression));
            const dataLoading = dataLoadingBreakdown.map((obj, index) => ({...obj, distance: distanceArr[index - 1] || 0}))

            gsap.to('.loader-wrap', { opacity: 1, duration: 0.4 });
            loadingProgress
                .set('.loader-circle', { left: '0%' }, 1.3)
                .set(counter, { value: 0 }, 1)
                dataLoading.map(({ width, distance }) => loadingTo(loadingProgress, width, distance))

            loadingProgress.duration(ROOT_DURATION);
            loadingProgress.delay(ROOT_DELAY);

            const allImgs = document.querySelectorAll(".loader-circle-imgs-item");
            allImgs.forEach((item, idx) => {
                animate(item,
                    { opacity: idx == allImgs.length - 1 ? [0, 1, 1] : idx == 0 ? [1, 1, 0] : [0, 1, 0]},
                    { duration: (ROOT_DURATION / allImgs.length) + .2, delay: idx * ((ROOT_DURATION / allImgs.length)), easing: 'ease-in-out' }
                )
            })
        }
    }, [preventLoading]);

    return (
        <div className={cn('loader', { 'hidden': preventLoading })} ref={loaderRef}>
            <div className="loader-wrap">
                <div className="loader-line">
                    <div className="loader-logo">
                        {props.logo}
                    </div>
                    <div className="loader-sub">
                        <div className="ic ic-32">
                            {props.recycleIc}
                        </div>
                        <div className="txt txt-10 txt-med header-sub-txt">
                            <span className="txt-semi header-sub-label">Our mission:</span>
                            To kraft responsibly-sourced packaging and products that not only prioritize quality, functionality, and affordability but also champion a profound commitment to enhancing the health and beauty of our planet.
                        </div>
                    </div>
                    <div className="loader-line-inner">
                        <div className="loader-circle">
                            <div className="loader-circle-inner">
                                <div className="loader-circle-inside"></div>
                                <div className="loader-circle-imgs">
                                    {[...Array(12)].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className='loader-circle-imgs-item'>
                                            {props[`load${idx + 1}`]}
                                            {idx + 1}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='loader-count'>
                        <div className="loader-count-top">
                            <div className="heading txt-black loader-count-top-num">{counter}</div>
                            <div className="heading txt-black loader-count-top-unit">%</div>
                        </div>
                        <div className="loader-count-bot">
                            <div className="heading txt-up txt-black loader-count-bot-txt">Loading...</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default GlobLoaderMain;