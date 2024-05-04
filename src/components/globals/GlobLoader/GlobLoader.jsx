import './GlobLoader.scss';
import { progressPercent } from '@contexts/StoreGlobal';
import {animate, inView, timeline, stagger} from 'motion'
import { useEffect, useRef, useState } from 'react';
import { useProgress } from '@react-three/drei'
import gsap from 'gsap';

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
    const { active, progress, errors, item, loaded, total } = useProgress()
    const [percent, setPercent] = useState(0);
    const loaderRef = useRef();
    const [counter, setCounter] = useState(0);

    function handlePercentChange() {
        activateElement(percent);
    }
    function activateElement(percent) {
        const elements = document.querySelectorAll('.loader-circle-imgs-item');

        // Deactivate all elements
        // elements.forEach(element => element.classList.remove('active'));

        // Activate the selected element
        // elements[index].classList.add('active');
    }

    const calculateDistance = (arr) => {
        let result = [];
        for (let i = 0; i < arr.length - 1; i++) {
            result.push(Math.abs(arr[i] - arr[i + 1]));
        }
        return result;
    }


    // const loadingTo = (dataLoading, idx) => {
    //     let data = dataLoading[idx];
    //     if (data) {
    //         timeline(animate('.loader-circle', { 'left': `${data.width}%` }, { duration: data.distance / 100, delay: (dataLoading[idx - 1].progression) / 100 })).finished.then(() => {
    //             console.log("don")
    //             loadingTo(dataLoading, idx + 1);
    //         })
    //     }
    // }

    useEffect(() => {
        const counter = { value: 0 };
        const ROOT_DURATION = 2.5;
        const ROOT_DELAY = 0.1;
        const loadingProgress = gsap.timeline({
            onComplete: () => {
                loadingProgress.clear();
                // onFinishIntro();
            }
        });

        const loadingTo = (timeline, value, duration) => {
            timeline
                .to('.loader-circle', { left: `${value}%`, duration: duration, ease: 'linear' })
                .to(counter, {
                    value: value, duration: duration, ease: 'none', onUpdate: () => {
                        setCounter(Math.round(counter.value))
                }}, '<=0');
        }

        const distanceArr = calculateDistance(dataLoadingBreakdown.map((item) => item.progression));
        const dataLoading = dataLoadingBreakdown.map((obj, index) => ({...obj, distance: distanceArr[index - 1] || 0}))

        loadingProgress
            .set('.loader-circle', { left: '0%' }, 1.3)
            .set(counter, { value: 0 }, 1)
            dataLoading.map(({ width, distance }) => loadingTo(loadingProgress, width, distance))

        loadingProgress.duration(ROOT_DURATION);
        loadingProgress.delay(ROOT_DELAY);

        document.querySelectorAll(".loader-circle-imgs-item").forEach((item, idx) => {
            animate(item,
                { opacity: [0, 1, 0] },
                { duration: 1, delay: .5 * idx + .2, easing: [0.87, 0, 0.13, 1] }
            )
        })
    }, []);

    useEffect(() => {
        let currPercent = parseInt(loaded / 10 * 100);
        setPercent(currPercent < 10 ? `0${currPercent}` : currPercent);
        if (!active) {
            setTimeout(() => {
                document.querySelector('.loader').classList.add('done-anim')
            }, 2500);
        }
    }, [loaded]);

    return (
        <div className='loader' ref={loaderRef} style={{'--progress': `${percent}%`}}>
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
                            <span className="txt-semi header-sub-label">Sustainable Lifecycle:</span>
                            To kraft responsibly-sourced packaging and products that not only prioritize quality, functionality, and affordability but also champion a profound commitment to enhancing the health and beauty of our planet.
                        </div>
                    </div>
                    <div className="loader-line-inner">
                        <div className="loader-circle">
                            <div className="loader-circle-inner">
                                <div className="loader-circle-inside"></div>
                                <div className="loader-circle-imgs">
                                    {[...Array(11)].map((item, idx) => (
                                        <div
                                            key={idx}
                                            className='loader-circle-imgs-item'>
                                            {props[`load${idx+1}`]}
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