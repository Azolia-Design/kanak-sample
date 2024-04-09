import { useRef, useEffect } from 'react';
import './Product.scss';
import { useStore } from '@nanostores/react';
import { useProductIndex } from '@contexts/StoreGlobal';
import { scroll } from "motion"
import cn from 'clsx';

function HomeProduct(props) {
    const { index, setIndex } = useProductIndex();

    useEffect(() => {
        setIndex(0);
        scroll(({y}) => {
            if (document.querySelectorAll('.home-prod-cards-inner').length >= 1) {
                if (y.progress >= .9) {
                    document.querySelector('.home-prod-cards-inner').classList.add('active')
                } else {
                    setIndex(0);
                    document.querySelector('.home-prod-cards-inner').classList.remove('active')
                }
            }
        }, {
            target: document.querySelector('.home-prod-cards-inner'),
            offset: ["start end", "center center"]
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
                                className={cn('home-prod-cards-nav-item prev', { 'disable': index === 0 })}
                                onClick={() => setIndex(index - 1)}>
                                <div className="ic ic-40">
                                    {props.arrIcon}
                                </div>
                            </button>
                            <button
                                className={cn('home-prod-cards-nav-item next', { 'disable': index == props.list.length - 1 })}
                                onClick={() => setIndex(index + 1)}>
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
                                    className={cn('heading h5 txt-up txt-black home-prod-cards-bottom-txt', { 'active': idx === index })}>
                                    {item.data.name}
                                </div>
                            ))}
                        </div>
                        <div className="home-prod-cards-qr-wrap">
                            {props.itemList.map((item, idx) => (
                                <div
                                    key={idx}
                                    className={cn('home-prod-cards-qr', { 'active': idx === index })}>
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
                            className={cn('home-prod-cards-pagination-dot', { 'active': idx === index })}>
                            <span></span>
                        </button>
                    ))}
                </div>
            </div>
            <div className="home-prod-pdf">
                <a href="#" className="home-prod-pdf-link">
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