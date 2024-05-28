import { memo, useRef, useEffect, useState, useMemo } from "react";
import cn from 'clsx';
import * as ut from '@/js/utils.js';
import "./styles.scss"
import { getLenis } from '@components/core/lenis';
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import { isEmpty } from "@utils/text";

function ProductPopup({ data, isActive, setIsActive }) {
    const ref = useRef();
    const [currentIndex, setCurrentIndex] = useState(0);

    const isValidData = data.carousel_imgs?.reduce((arr, curr) => arr.concat(!isEmpty(curr.image) && curr.image), [])[0]

    const closePopup = () => {
        getLenis().start()
        setIsActive(false);
        setTimeout(() => setCurrentIndex(0), 200)
    }

    useOutsideAlerter(ref, () => closePopup());

    const handleSwipe = (direction) => {
        const newIndex = currentIndex + direction;
        if (newIndex >= 0 && newIndex < data.carousel_imgs?.length) {
            setCurrentIndex(newIndex);
        }
    };

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                handleSwipe(deltaX > 0 ? -1 : 1);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }, { once: true });
    };

    const renderDots = useMemo(() => {
        let totalPages = data.carousel_imgs?.length;
        const dots = [];

        for (let i = 0; i <= totalPages - 1; i++) {
            if (i <= currentIndex + 3 && i >= currentIndex - 3) {
                let dotClass = '';
                if (i === currentIndex) {
                    dotClass = 'active';
                } else if (i == currentIndex - 2 || i == currentIndex + 2) {
                    dotClass = 'medium';
                } else if (i == currentIndex - 3 || i == currentIndex + 3) {
                    dotClass = 'small';
                }
                else {
                    dotClass = '';
                }

                dots.push(
                    <button
                    key={`pagin-${i}`}
                    className={cn("popup-itemdtl-card-pagi-btn", dotClass)}
                    onClick={() => setCurrentIndex(i)}
                />
            );
            } else if ((i === currentIndex + 4 && currentIndex < totalPages - 4) || (i === currentIndex - 4 && currentIndex > 5)) {
                // dots.push(<span key="ellipsis">...</span>);
            }
        }
        return dots;
    }, [currentIndex, data])


    useEffect(() => {
        if (!isValidData) {
            getLenis().start();
            setIsActive(false);
            setCurrentIndex(0);
        }
        else {
            document.querySelector('.popup-itemdtl-wrap-inner').scrollTo({ top: 0 });
        }
    }, [isActive, isValidData]);

    return (
        isValidData ? <>
            <div className={cn('popup', { "active": isActive })}>
                <div className="container">
                    <div className="popup-itemdtl" ref={ref}>
                        <button className="popup-itemdtl-btn" onClick={closePopup}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 40 40" fill="none" className="ic ic-40">
                                <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                <path d="M5 5L35 35" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                            </svg>
                        </button>
                        <div className="popup-itemdtl-wrap bg-light">
                            <div className="popup-itemdtl-wrap-inner" data-lenis-prevent="true">
                                <div className="heading h3 txt-black txt-up popup-itemdtl-title">{data.title}</div>
                                <div className="popup-itemdtl-card">
                                    <div className="popup-itemdtl-card-img"
                                        onMouseDown={handleMouseDown}
                                    >
                                        {data.carousel_imgs?.map(({ image }, idx) => (
                                            !isEmpty(image) && (
                                                <div key={idx} className={cn("popup-itemdtl-card-img-inner", { "active": idx === currentIndex })}>
                                                    <img className="img" src={image.url} alt={image.alt} width={image.dimensions.width} />
                                                </div>
                                            )
                                        ))}
                                    </div>
                                    {data.carousel_imgs
                                        ?.reduce((arr, curr) => arr.concat(curr.image), []).length > 1 && (
                                            <div className="popup-itemdtl-card-bottom">
                                                <div className="popup-itemdtl-card-pagi">
                                                    {renderDots}
                                                </div>
                                                <div className="popup-itemdtl-card-nav">
                                                    <button className={cn("popup-itemdtl-card-nav-btn prev", { "disable": currentIndex === 0 })} onClick={() => setCurrentIndex(currentIndex - 1)}>
                                                        <div className="ic ic-24">
                                                            <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.00002 19.9706H36.9411" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                                                <path d="M23.7412 6.77075L36.9412 19.9707L23.7425 33.1694" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                    <button className={cn("popup-itemdtl-card-nav-btn next", { "disable": currentIndex === data.carousel_imgs?.length - 1 })} onClick={() => setCurrentIndex(currentIndex + 1)}>
                                                        <div className="ic ic-24">
                                                            <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M3.00002 19.9706H36.9411" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                                                                <path d="M23.7412 6.77075L36.9412 19.9707L23.7425 33.1694" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" strokeLinecap="square" />
                                                            </svg>
                                                        </div>
                                                    </button>
                                                </div>
                                            </div>
                                        )}
                                </div>
                                <div className="popup-itemdtl-content">
                                    <h3 className="heading h3 txt-black txt-up popup-itemdtl-content-title">{data.title}</h3>
                                    <div className="popup-itemdtl-table">
                                        <div className="txt txt-14 txt-med popup-itemdtl-table-head">
                                            <div className="popup-itemdtl-table-code">SKU</div>
                                            <div className="popup-itemdtl-table-size">Size</div>
                                            <div className="popup-itemdtl-table-color">Color</div>
                                            <div className="popup-itemdtl-table-count">Pack / Count</div>
                                            <div className="popup-itemdtl-table-dtl">Details</div>
                                            <div className="popup-itemdtl-table-model">3D Model</div>
                                        </div>
                                        <div className="popup-itemdtl-table-item-wrap" data-lenis-prevent>
                                            <div className="popup-itemdtl-table-item-inner">
                                                {data.variants?.map((item, idx) => (
                                                    <div className="txt txt-16 txt-med popup-itemdtl-table-item" key={idx}>
                                                        <div className="popup-itemdtl-table-item-div desktop" onClick={() => setCurrentIndex(idx)}>
                                                            <div className="popup-itemdtl-table-code">{item.sku ? item.sku : '-'}</div>
                                                            <div className="popup-itemdtl-table-size">{item.size ? item.size : '-'}</div>
                                                            <div className="popup-itemdtl-table-color">{item.color ? item.color : '-'}</div>
                                                            <div className="popup-itemdtl-table-count">{item.pack_count ? item.pack_count : '-'}</div>
                                                            <div className="popup-itemdtl-table-dtl">{item.details ? item.details : '-'}</div>
                                                            <div className="popup-itemdtl-table-model">
                                                                {!isEmpty(item.qr_code) ? (
                                                                    <div className="popup-itemdtl-table-model-inner">
                                                                        <img src={item.qr_code.url} alt={item.qr_code.alt} width={item.qr_code.dimensions.width} />
                                                                    </div>) : '-'
                                                                }
                                                            </div>
                                                        </div>
                                                        <div className="popup-itemdtl-table-item-div tablet">
                                                            <div className="line line-ver line-mid"></div>
                                                            <div className="div-left">
                                                                <div className="wrap popup-itemdtl-table-code" onClick={() => setCurrentIndex(idx)}>
                                                                    <div className="head">SKU</div>
                                                                    {item.sku ? item.sku : '-'}
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-model">
                                                                    <div className="head">3D Model</div>
                                                                    <div className="popup-itemdtl-table-model-inner">
                                                                        {!isEmpty(item.qr_code) ? (
                                                                            <>
                                                                                <img src={item.qr_code.url} alt={item.qr_code.alt} className='popup-itemdtl-table-model-link desk-ver' />
                                                                                {item.qr_code_url.url ?
                                                                                (
                                                                                    <a href={item.qr_code_url.url} target='_blank' className='popup-itemdtl-table-model-link'>
                                                                                        <svg width="100%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M0.869565 12.1739C1.10019 12.1739 1.32137 12.0823 1.48444 11.9192C1.64752 11.7561 1.73913 11.535 1.73913 11.3043V4.54261C1.74005 3.79936 2.03571 3.08682 2.56127 2.56127C3.08682 2.03571 3.79936 1.74005 4.54261 1.73913H11.3043C11.535 1.73913 11.7561 1.64752 11.9192 1.48444C12.0823 1.32137 12.1739 1.10019 12.1739 0.869565C12.1739 0.638942 12.0823 0.417765 11.9192 0.25469C11.7561 0.0916148 11.535 0 11.3043 0H4.54261C3.33826 0.00138087 2.18363 0.480419 1.33202 1.33202C0.480419 2.18363 0.00138087 3.33826 0 4.54261V11.3043C0 11.535 0.0916148 11.7561 0.25469 11.9192C0.417765 12.0823 0.638942 12.1739 0.869565 12.1739Z" fill="#3D3D3D"/>
                                                                                            <path d="M35.4575 0H28.6957C28.4651 0 28.2439 0.0916148 28.0809 0.25469C27.9178 0.417765 27.8262 0.638942 27.8262 0.869565C27.8262 1.10019 27.9178 1.32137 28.0809 1.48444C28.2439 1.64752 28.4651 1.73913 28.6957 1.73913H35.4575C36.2007 1.74005 36.9133 2.03571 37.4388 2.56127C37.9644 3.08682 38.26 3.79936 38.261 4.54261V11.3043C38.261 11.535 38.3526 11.7561 38.5156 11.9192C38.6787 12.0823 38.8999 12.1739 39.1305 12.1739C39.3611 12.1739 39.5823 12.0823 39.7454 11.9192C39.9085 11.7561 40.0001 11.535 40.0001 11.3043V4.54261C39.9987 3.33826 39.5197 2.18363 38.6681 1.33202C37.8165 0.480419 36.6618 0.00138087 35.4575 0Z" fill="#3D3D3D"/>
                                                                                            <path d="M11.3043 38.2609H4.54261C3.79936 38.26 3.08682 37.9643 2.56127 37.4388C2.03571 36.9132 1.74005 36.2007 1.73913 35.4574V28.6957C1.73913 28.4651 1.64752 28.2439 1.48444 28.0808C1.32137 27.9177 1.10019 27.8261 0.869565 27.8261C0.638942 27.8261 0.417765 27.9177 0.25469 28.0808C0.0916148 28.2439 0 28.4651 0 28.6957V35.4574C0.00138087 36.6618 0.480419 37.8164 1.33202 38.668C2.18363 39.5196 3.33826 39.9986 4.54261 40H11.3043C11.535 40 11.7561 39.9084 11.9192 39.7453C12.0823 39.5823 12.1739 39.3611 12.1739 39.1305C12.1739 38.8998 12.0823 38.6787 11.9192 38.5156C11.7561 38.3525 11.535 38.2609 11.3043 38.2609Z" fill="#3D3D3D"/>
                                                                                            <path d="M39.1305 27.8261C38.8999 27.8261 38.6787 27.9177 38.5156 28.0808C38.3526 28.2439 38.261 28.4651 38.261 28.6957V35.4574C38.26 36.2007 37.9644 36.9132 37.4388 37.4388C36.9133 37.9643 36.2007 38.26 35.4575 38.2609H28.6957C28.4651 38.2609 28.2439 38.3525 28.0809 38.5156C27.9178 38.6787 27.8262 38.8998 27.8262 39.1305C27.8262 39.3611 27.9178 39.5823 28.0809 39.7453C28.2439 39.9084 28.4651 40 28.6957 40H35.4575C36.6618 39.9986 37.8165 39.5196 38.6681 38.668C39.5197 37.8164 39.9987 36.6618 40.0001 35.4574V28.6957C40.0001 28.4651 39.9085 28.2439 39.7454 28.0808C39.5823 27.9177 39.3611 27.8261 39.1305 27.8261Z" fill="#3D3D3D"/>
                                                                                            <path d="M32.1736 26.5217V13.4782C32.1736 13.3256 32.1334 13.1756 32.0571 13.0435C31.9808 12.9113 31.871 12.8015 31.7388 12.7252L20.4345 6.20344C20.3023 6.12712 20.1523 6.08694 19.9997 6.08694C19.847 6.08694 19.6971 6.12712 19.5649 6.20344L8.26926 12.7252C8.13707 12.8015 8.0273 12.9113 7.95098 13.0435C7.87466 13.1756 7.83448 13.3256 7.83447 13.4782V26.5217C7.83448 26.6743 7.87466 26.8243 7.95098 26.9565C8.0273 27.0887 8.13707 27.1984 8.26926 27.2747L19.5736 33.7965C19.7058 33.8728 19.8557 33.913 20.0084 33.913C20.161 33.913 20.311 33.8728 20.4432 33.7965L31.7475 27.2747C31.8781 27.1973 31.9861 27.0871 32.0609 26.955C32.1356 26.8229 32.1745 26.6735 32.1736 26.5217ZM19.9997 7.95997L29.5649 13.4782L19.9997 18.9965L10.4432 13.4782L19.9997 7.95997ZM9.5736 14.9843L19.1301 20.5026V31.5374L9.5736 26.0191V14.9843ZM20.8693 31.5374V20.5026L30.4345 14.9843V26.0191L20.8693 31.5374Z" fill="#3D3D3D"/>
                                                                                        </svg>
                                                                                    </a>
                                                                                ) : (
                                                                                    <img src={item.qr_code.url} alt="" className="popup-itemdtl-table-model-link" />
                                                                                )}
                                                                            </>
                                                                        )
                                                                            : '-'
                                                                        }
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="div-right" onClick={() => setCurrentIndex(idx)}>
                                                                <div className="wrap popup-itemdtl-table-size">
                                                                    <div className="head">Size</div>
                                                                    <div className="body">{item.size ? item.size : '-'}</div>
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-color">
                                                                    <div className="head">Color</div>
                                                                    <div className="body">{item.color ? item.color : '-'}</div>
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-count">
                                                                    <div className="head">Pack / Count</div>
                                                                    <div className="body">{item.pack_count ? item.pack_count : '-'}</div>
                                                                </div>
                                                                <div className="wrap popup-itemdtl-table-dtl">
                                                                    <div className="head">Details</div>
                                                                    <div className="body">{item.details ? item.details : '-'}</div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </> : <></>
    )
}
export default memo(ProductPopup);