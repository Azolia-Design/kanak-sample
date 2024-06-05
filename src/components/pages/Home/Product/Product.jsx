import './Product.scss';
import { useRef, useEffect } from 'react';
import { useProductIndex } from '@contexts/StoreGlobal';
import { scroll } from "motion";
import cn from 'clsx';

function HomeProduct(props) {
    const { index, setIndex } = useProductIndex();
    const onChangeIndex = (direction) => setIndex({ value: index.value + direction, direction })
    useEffect(() => {
        scroll(({ y }) => {
            if (document.querySelectorAll('.home-prod-cards-inner').length >= 1) {
                if (y.progress >= (window.innerWidth <= 767 ? .76 : .9)) {
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
                    <div className="home-prod-cards-middle" data-cursor="ext">
                        <div className="home-prod-cards-middle-inner"></div>
                        <a href={`/katalog?category=${props.list[index.value].uid}`} className="home-prod-cards-middle-link"></a>
                    </div>
                    <div className="home-prod-cards-bottom">
                        <div className="home-prod-cards-bottom-txt-wrap">
                            {props.list.map((item, idx) => (
                                <a
                                    key={idx}
                                    href={`/katalog?category=${item.uid}`}
                                    className={`heading h5 txt-up txt-black home-prod-cards-bottom-txt ${index.value === idx ? 'active' : ''}`}>
                                    {item.data.name}
                                    <div className="ic ic-16">
                                        <svg width="100%"viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M3 13.5L13 3.5" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10"/>
                                            <path d="M4.07227 3.5H13.0002V12.4271" stroke="currentColor" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="square"/>
                                        </svg>
                                    </div>
                                </a>
                            ))}
                        </div>
                        <div className="home-prod-cards-qr-wrap">
                            {props.itemList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={cn("home-prod-cards-qr", { "active": index.value === idx, "hidden": !item.data.qr.url })}>
                                    <img src={item.data.qr.url} alt="" className="ic ic-80" />
                                        {item.data.qr_url.url ?
                                            (
                                                <a href={item.data.qr_url.url} target={item.data.qr_url.target ? item.data.qr_url.target : ''} className='home-prod-cards-qr-link'>
                                                    {props.QR3DExplore}
                                                </a>
                                            ) : (
                                                <img src={item.data.qr.url} alt="" className="home-prod-cards-qr-link ic ic-40" />
                                            )
                                        }
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
                <a href="/contact?src=download" className="btn-outline home-prod-pdf-link" data-cursor="hide">
                    <div className="btn-outline-ic home-prod-pdf-link-ic">
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