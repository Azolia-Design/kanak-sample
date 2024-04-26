import './ProductList.scss';
import { useEffect, useRef } from 'react';
import { inView, timeline, animate } from "motion"
import { useProductIndex } from '@contexts/StoreGlobal';
import { formatData } from '@utils/text';
import useDebounceCallback from '@hooks/useDebounce';

function HomeProductList(props) {
    const { index, setIndex } = useProductIndex();
    const debounceHover = useDebounceCallback(setIndex, 150);

    useEffect(() => {
        const allItems = document.querySelectorAll(".home-prod-main-item")
        allItems.forEach((el, idx) => {
            animate(el.querySelector('.home-prod-main-item-title'), { opacity: 0, x: -10 }, { duration: 0 })
            animate(el.querySelector('.home-prod-main-item-label'), { opacity: 0, x: -10 }, { duration: 0 })
            animate(el.querySelector('.line'), { transformOrigin: 'left', scaleX: 0 }, { duration: 0 })
            if (idx == allItems.length - 1) {
                animate(el.querySelector('.line-bottom'), { transformOrigin: 'left', scaleX: 0 }, { duration: 0 })
            }
            const sequence = [
                [el.querySelector('.home-prod-main-item-title'), { opacity: 1, x: 0 }, { duration: 1.2 }],
                [el.querySelector('.home-prod-main-item-label'), { opacity: 1, x: 0 }, { duration: 1.2, at: "-1" }],
                [el.querySelector('.line'), { scaleX: 1 }, { duration: .8, at: '<' }],
                [el.querySelector('.line-bottom'), { scaleX: 1 }, { duration: .8, at: "-0.6" }]
            ]
            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    el.querySelector('.home-prod-main-item-title').removeAttribute('style')
                    el.querySelector('.home-prod-main-item-label').removeAttribute('style')
                    el.querySelector('.line').removeAttribute('style')
                    if (idx == allItems.length - 1) {
                        el.querySelector('.line-bottom').removeAttribute('style')
                    }
                })
            }, { margin: "-10% 0px -10% 0px" });
        });
        animate('.home-prod-pdf', { opacity: 0, x: -10 }, { duration: 0 })
        inView('.home-prod-pdf', () => {
            animate('.home-prod-pdf', { opacity: 1, x: 0 }, { duration: .6, delay: .2 }).finished.then(() => {
                document.querySelector('.home-prod-pdf').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })
    }, [])
    return (
        <div className="home-prod-main">
            <div className="home-prod-main-list">
                {props.list.map((item, idx) => (
                    <a
                        key={idx}
                        href={`/katalog?category=${formatData(item.data.name)}`}
                        className={`home-prod-main-item${idx == index.value ? ' active' : ''}`}
                        onMouseEnter={() => debounceHover({ value: idx, direction: 1 })}
                    >
                        <h3 className="heading h6 txt-up txt-black home-prod-main-item-title">
                            {item.data.name}
                        </h3>
                        <div className="txt txt-20 txt-bold home-prod-main-item-label">
                            {(idx + 1) < 10 ? '0' + (idx + 1) : idx + 1}
                        </div>
                        <div className="line">
                            <div className="line-inner"></div>
                        </div>
                        {idx == props.list.length - 1 && (
                            <div className="line line-bottom"></div>
                        )}
                    </a>
                ))}
            </div>
        </div>
    )
}
export default HomeProductList