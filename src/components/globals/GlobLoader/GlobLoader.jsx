import './GlobLoader.scss';
import { progressPercent } from '@contexts/StoreGlobal';
import {animate} from 'motion'
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei'
function GlobLoaderMain({...props}) {
    const { active, progress, errors, item, loaded, total } = useProgress()
    const [percent, setPercent] = useState(0);

    function handlePercentChange() {
        activateElement(percent);
    }
    function activateElement(percent) {
        const elements = document.querySelectorAll('.loader-circle-imgs-item');
        const index = percent < 100 ? Math.floor(Math.random() * 12) : 11;

        // Deactivate all elements
        elements.forEach(element => element.classList.remove('active'));

        // Activate the selected element
        elements[index].classList.add('active');
    }

    useEffect(() => {
        let elements = document.querySelectorAll('.loader-circle-imgs-item');
        handlePercentChange(elements);
    }, [percent]);

    useEffect(() => {
        let currPercent = parseInt(loaded / 10 * 100);
        setPercent(currPercent < 10 ? `0${currPercent}` : currPercent);
        if (!active) {
            setTimeout(() => {
                document.querySelector('.loader').classList.add('done-anim')
            }, 1600);
        }
    }, [loaded]);


    return (
        <div className='loader' style={{'--progress': `${percent}%`}}>
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
                            From plant to product to compost and back again, Kanak is all about coming full circle.
                        </div>
                    </div>
                    <div className="loader-line-inner">
                        <div className="loader-circle">
                            <div className="loader-circle-inner">
                                <div className="loader-circle-inside"></div>
                                <div className="loader-circle-imgs">
                                    <div className="loader-circle-imgs-item active">
                                        {props.load1}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load2}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load3}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load4}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load5}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load6}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load7}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load8}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load9}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load10}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load11}
                                    </div>
                                    <div className="loader-circle-imgs-item">
                                        {props.load12}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='loader-count'>
                        <div className="loader-count-top">
                            <div className="heading txt-black loader-count-top-num">{percent}</div>
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