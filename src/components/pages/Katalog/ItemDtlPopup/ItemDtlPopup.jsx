import { useEffect, useState, useRef } from "react"
import "./ItemDtlPopup.scss"
import * as ut from '@/js/utils.js';
import { getLenis } from '@/components/core/lenis';
import { useKeenSlider } from 'keen-slider/react'
import useOutsideAlerter from "@hooks/useOutsideAlerter";
import "keen-slider/keen-slider.min.css"

function GlobalPopup({ ...props }) {
    const [isOpenPopup, setIsOpenPopup] = useState(false);
    const [loaded, setLoaded] = useState(false);
    // const [sliderRef, sliderInst] = useKeenSlider({
    //     initial: 0,
    //     slidesPerView: 'auto',
    //     loop: true,
    //     created() {
    //         setLoaded(true);
    //     },
    // });

    // useOutsideAlerter(toggleRef, () => { setIsOpenTagDropdow(false) })


    useEffect(() => {
        if (window.innerWidth < 768) {
            document.querySelector('.popup-itemdtl-table-item-wrap').removeAttribute('data-lenis-prevent')
            document.querySelector('.popup-itemdtl-wrap').setAttribute('data-lenis-prevent', '#')
        }
        function changeName(data) {
            document.querySelector('.popup-itemdtl-content-title').innerHTML = data;
            document.querySelector('.popup-itemdtl-title').innerHTML = data;
        }

        function changeListVariants(data) {
            document.querySelector('.popup-itemdtl-table-item-inner').innerHTML = data;
        }

        function changeListThumb(data) {
            document.querySelector('.popup-itemdtl-card-img-inner').innerHTML = data;
        }
        function changeListPagi(data) {
            const parent = document.querySelector('.popup-itemdtl-card-pagi');
            let cloner = parent.childNodes[0];
            parent.innerHTML = '';
            for (let i = 0; i < data; i++) {
                parent.appendChild(cloner.cloneNode(true));
            }
        }

        const Popup = {
            open: (data) => {
                getLenis().stop()
                setIsOpenPopup(true);
                changeName(data.querySelector('.data-name').innerHTML);
                changeListVariants(data.querySelector('.data-variants').innerHTML);
                let thumb = `<div class="keen-slider__slide">${data.querySelector('.data-thumb').innerHTML}</div>` + data.querySelector('.data-carousel').innerHTML;
                changeListThumb(thumb);
                changeListPagi(document.querySelector('.popup-itemdtl-card-img-inner').childNodes.length)

                if (window.innerWidth > 991) {
                    let forceHeight = ut.parseRem(33) + document.querySelector('.popup-itemdtl-card-img-inner').childNodes.length * ut.parseRem(64);
                    if (forceHeight > window.innerHeight - ut.parseRem(200)) {
                        document.querySelector('.popup-itemdtl-table').style.height = window.innerHeight - ut.parseRem(400) - ut.parseRem(252) + 'px';
                    } else {
                        document.querySelector('.popup-itemdtl-table').style.height = forceHeight + 'px';
                    }
                } else if (window.innerWidth > 767) {
                    // document.querySelector('.popup-itemdtl-table').style.height = ut.parseRem(600) + 'px';
                } else {

                }
            },
            close: () => {
                getLenis().start()
                setIsOpenPopup(false);
                setLoaded(false);
            }
        };

        document.querySelectorAll("[data-popup]").forEach((el) => {
            if (el.getAttribute('data-popup') === "close") {
                el.addEventListener("click", function (e) {
                    Popup.close();
                });
            }
            if (el.getAttribute('data-popup') === "open") {
                el.addEventListener("click", function (e) {
                    Popup.open(e.target);
                });
            }
        });
    }, [])
    return (
        <div className={`popup ${isOpenPopup ? "active" : ""}`}>
            <div className="container grid">
                <div className="popup-itemdtl">
                    <button className="popup-itemdtl-btn" data-popup="close">
                        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 40 40" fill="none" className="ic ic-40">
                            <path d="M5 35L35 5" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                            <path d="M5 5L35 35" stroke="currentColor" strokeWidth="4" strokeMiterlimit="10" />
                        </svg>
                    </button>
                    <div className="popup-itemdtl-wrap">
                        <div className="popup-itemdtl-wrap-inner">
                            <div className="heading h3 txt-black txt-up popup-itemdtl-title">Molded Fiber PLATES</div>
                            <div className="popup-itemdtl-card">
                                <div className="popup-itemdtl-card-img">
                                    <div className="keen-slider popup-itemdtl-card-img-inner">
                                    </div>
                                </div>
                                <div className="popup-itemdtl-card-bottom">
                                    <div className="popup-itemdtl-card-pagi">
                                        <button className="popup-itemdtl-card-pagi-btn"></button>
                                    </div>
                                    <div className="popup-itemdtl-card-nav">
                                        <button className="popup-itemdtl-card-nav-btn prev">
                                            <div className="ic ic-24">
                                                {props.arrIcon}
                                            </div>
                                        </button>
                                        <button className="popup-itemdtl-card-nav-btn next">
                                            <div className="ic ic-24">
                                                {props.arrIcon}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="popup-itemdtl-content">
                                <h3 className="heading h3 txt-black txt-up popup-itemdtl-content-title">Molded Fiber PLATES</h3>
                                <div className="popup-itemdtl-table">
                                    <div className="txt txt-14 txt-med popup-itemdtl-table-head">
                                        <div className="popup-itemdtl-table-code">SKU</div>
                                        <div className="popup-itemdtl-table-size">Size</div>
                                        <div className="popup-itemdtl-table-color">Color</div>
                                        <div className="popup-itemdtl-table-count">Pack / Count</div>
                                        <div className="popup-itemdtl-table-dtl">Details</div>
                                        <div className="popup-itemdtl-table-model">3D Model</div>
                                    </div>
                                    <div className="popup-itemdtl-table-item-wrap" data-lenis-prevent="#">
                                        <div className="popup-itemdtl-table-item-inner">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlobalPopup