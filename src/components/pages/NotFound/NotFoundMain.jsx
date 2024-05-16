import './NotFoundMain.scss';
import { useEffect } from 'react';

const currYear = new Date().getFullYear()

function NotFoundMain(props) {
    return (
        <section className='notfound'>
            <div className="container">
                <div className="grid notfound-grid">
                    {props.gridItems}
                    <div className="notfound-item notfound-item-title">
                        <div className='notfound-item-title-inner'>
                            <div className="heading h1 txt-black txt-up">oops...!</div>
                            <h1 className='txt txt-20 txt-med'>Maybe you got a broken link, or maybe you made a misprint in the address bar.</h1>
                        </div>
                    </div>
                    <div className='notfound-item notfound-item-btn-wrap'>
                        <a href="/" className='btn notfound-item-btn'>
                            <div className="txt txt-18 txt-med txt-up">Back to home</div>
                        </a>
                    </div>
                    <div className="notfound-item notfound-item-large notfound-item-number-1">
                        {props.number4}
                    </div>
                    <div className="notfound-item notfound-item-large notfound-item-mainbowl">
                        {props.mainbowl}
                    </div>
                    <div className="notfound-item notfound-item-large notfound-item-number-2">
                        {props.number4}
                    </div>
                    <div className="notfound-copy">
                        <div className="txt txt-12 txt-bold notfound-copy-txt">⁠©⁠ {currYear} Kanak Naturals. All rights reserved.</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default NotFoundMain;