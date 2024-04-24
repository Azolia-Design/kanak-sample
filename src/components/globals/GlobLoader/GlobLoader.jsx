import './GlobLoader.scss';
import { useStore } from '@nanostores/react';
import { progressPercent } from '@contexts/StoreGlobal';
import {animate} from 'motion'
import { useEffect } from 'react';
function GlobLoaderMain({...props}) {
    const percent = useStore(progressPercent);

    useEffect(() => {
        if (percent == false) return;
        document.querySelector('.loader').style.setProperty('--progress', `${percent}%`);
        document.querySelector('.loader-count-top-num').innerText = percent < 10 ? `0${parseInt(percent)}` : parseInt(percent);
        console.log(percent)
        if (percent === 100) {
            setTimeout(() => {
                document.querySelector('.loader').classList.add('done-anim')    
            }, 1600);
            progressPercent.set(false)
        }
    }, [percent])
    return (
        <div className='loader' style={{'--progress': '00'}}>
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
                            <div className="heading txt-black loader-count-top-num">00</div>
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