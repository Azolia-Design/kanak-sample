import './GlobLoader.scss';
import { useStore } from '@nanostores/react';
import { progressPercent } from '@contexts/StoreGlobal';
function GlobLoader() {
    const percent = useStore(progressPercent);
    return (
        <div className={`loader ${percent == 100 ? 'done-anim' : ''}`}>
            <div className="loader-wrap">
                <div className="loader-line">
                    <div className="loader-line-inner">
                        <div className="loader-circle" style={{'--progress': `${parseInt(percent)}%`}}>
                            <div className="loader-circle-inner">
                                <div className="loader-circle-inside"></div>
                            </div>
                        </div>
                    </div>
                    <div className={`loader-count ${percent == 100 ? 'done-anim' : ''}`}>
                        <div className="loader-count-top">
                            <div className="heading txt-black loader-count-top-num">{percent < 10 ? `0${parseInt(percent)}` : parseInt(percent)}</div>
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
export default GlobLoader;