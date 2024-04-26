import './style.scss'
import { getLenis } from '@/components/core/lenis';
import { isEmpty } from '@/components/utils/text';
import { useEffect } from 'react';

function LetterPopup({ isActive, setIsActive, data, ...props }) {
    const closePopup = () => {
        getLenis().start()
        setIsActive(false);
    }
    return (
        <div className={`popup ${isActive ? "active" : ""}`}>
            <div className="container grid">
                <div className="popup-letter">
                    <button className="popup-letter-btn" onClick={closePopup}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 40 40" fill="none" className="ic ic-40">
                            <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                            <path d="M5 5L35 35" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                        </svg>
                    </button>
                    <div className="popup-letter-inner" data-lenis-prevent="#">
                        <div className="popup-letter-img">
                            {!isEmpty(data) && (
                                <img src={data.url} alt={data.alt} width={data.dimensions.width} className='img' />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LetterPopup
