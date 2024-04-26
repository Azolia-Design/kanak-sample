import './Product.scss';
import { useRef, useEffect } from 'react';
import { useProductIndex } from '@contexts/StoreGlobal';
import { scroll } from "motion"

function HomeProduct(props) {
    const { index, setIndex } = useProductIndex();
    const onChangeIndex = (direction) => setIndex({ value: index.value + direction, direction })
    useEffect(() => {
        scroll(({y}) => {
            if (document.querySelectorAll('.home-prod-cards-inner').length >= 1) {
                if (y.progress >= (window.innerWidth < 767 ? .76 : .9)) {
                    if (!document.querySelector('.home-prod-cards-inner').classList.contains('active')) {
                        document.querySelector('.home-prod-cards-inner').classList.add('active')
                    }
                } else {
                    if (document.querySelector('.home-prod-cards-inner').classList.contains('active')) {
                        document.querySelector('.home-prod-cards-inner').classList.remove('active')
                    }
                }
            }
        }, {
            target: document.querySelector('.home-prod-cards-inner'),
            offset: ['start end', "center center"]
        })
    }, [])
    return (
        <>
            <div className="home-prod-cards">
                <div className="home-prod-cards-inner">
                    <div className="home-prod-cards-top">
                        <div className="heading h6 txt-up txt-black home-prod-cards-top-txt">
                            Product Kategories
                        </div>
                        <div className="home-prod-cards-nav">
                            <button
                                className={`home-prod-cards-nav-item prev ${index.value === 0 ? 'disable' : ''}`}
                                onClick={() => onChangeIndex(-1)}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                            <button
                                className={`home-prod-cards-nav-item next ${index.value == props.list.length - 1 ? 'disable' : ''}`}
                                onClick={() => onChangeIndex(1)}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="home-prod-cards-middle">
                        <div className="home-prod-cards-middle-inner"></div>
                    </div>
                    <div className="home-prod-cards-bottom">
                        <div className="home-prod-cards-bottom-txt-wrap">
                            {props.list.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`heading h5 txt-up txt-black home-prod-cards-bottom-txt ${index.value === idx ? 'active' :''}`}>
                                    {item.data.name}
                                </div>
                            ))}
                        </div>
                        <div className="home-prod-cards-qr-wrap">
                            {props.itemList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={`home-prod-cards-qr ${index.value === idx ? 'active': ''}`}>
                                    <img src={item.data.qr.url} alt="" className="ic ic-80" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className='home-prod-cards-pagination'>
                    {props.list.map((_, idx) => (
                        <button
                            key={idx}
                            className={`home-prod-cards-pagination-dot ${index.value === idx ? 'active' : ''}`}>
                            <span></span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="home-prod-pdf">
                <a href="/Kanak_Catalog_Print_spreads_lowRes.pdf" className="home-prod-pdf-link">
                    <div className="home-prod-pdf-link-ic">
                        <div className="ic ic-32">
                            {props.PDFIcon}
                        </div>
                    </div>
                    <div className="txt txt-20 txt-med home-prod-pdf-link-txt">
                        Download Catalog
                    </div>
                </a>
            </div>
        </>

    )
}
export default HomeProduct;