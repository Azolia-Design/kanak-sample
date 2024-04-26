import './GlobLoader.scss';
import { progressPercent } from '@contexts/StoreGlobal';
import {animate} from 'motion'
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei'
function GlobLoaderMain({...props}) {
    const { active, progress, errors, item, loaded, total } = useProgress()
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        let currPercent = parseInt(loaded / 10 * 100);
        setPercent(currPercent < 10 ? `0${currPercent}` : currPercent);

        if (!active) {
            setTimeout(() => {
                document.querySelector('.loader').classList.add('done-anim')        
            }, 1600);
            // progressPercent.set(false)
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