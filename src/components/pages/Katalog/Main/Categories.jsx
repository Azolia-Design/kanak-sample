import { memo, useMemo, useState, useEffect, useRef } from 'react';
import cn from 'clsx';
import { updateQueryParam } from '@utils/parse';
import useOutsideAlerter from '@hooks/useOutsideAlerter';
import ArrowDropdown from "@components/globals/IcArrow/ArrowDropdown.jsx";
import { getLenis } from '@/components/core/lenis';

function Category({ children, isActive, onClick }) {
    return (
        <li className={cn('katalog-main-cate-item', { "active": isActive })}>
            <button className="katalog-main-cate-item-inner" data-cursor="txtLink" data-cursor-txtlink="child" onClick={onClick}>
                <div className="dot"></div>
                <div className="txt txt-20 txt-black txt-up katalog-main-cate-item-txt" data-cursor-txtlink-child="true">{children}</div>
            </button>
        </li>
    )
}

function Categories({ data, cateList, filter, setFilter, setLimit }) {
    const ref = useRef();
    const [isDropdown, setIsDropdown] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(filter.category);
    useOutsideAlerter(ref, () => setIsDropdown(false))
    const list = useMemo(() => {
        let currList = new Set(data.map((item) => item.category));
        return cateList.filter(category => currList.has(category.uid))
    }, [data, filter, currentCategory]);

    useEffect(() => {
        if (currentCategory) {
            setCurrentCategory(filter.category)
        }
    }, [list])
    useEffect(() => {
        if (window.innerWidth > 767) {
            document.querySelector('.katalog-main-cate-list').removeAttribute('data-lenis-prevent')
        }
    }, [])

    return (
        <div className="katalog-main-cate">
            <button
                ref={ref}
                className={cn("katalog-main-filter-list-toggle-btn katalog-main-filter-list-toggle-btn-cate bg-light", { "active": isDropdown })}
                onClick={(e) => setIsDropdown(!isDropdown)}>
                <div className="txt txt-18 txt-bold katalog-main-filter-list-toggle-txt">
                    <div className="katalog-main-filter-list-toggle-txt-wrap">
                        <div className="txt-16 txt-up txt-black katalog-main-filter-list-toggle-txt-head">Product</div>
                        <div className="katalog-main-filter-list-toggle-txt-title">
                            {filter.category}
                        </div>
                    </div>
                </div>
                <div className={`ic ic-20 katalog-main-filter-list-toggle-ic`}>
                    <ArrowDropdown />
                </div>
            </button>
            <ul
                ref={ref}
                className={cn("katalog-main-cate-list", { "active": isDropdown })}
                data-lenis-prevent
            >
                {list.map((category) => (
                    <Category
                        key={category.uid}
                        isActive={currentCategory === category.uid}
                        onClick={() => {
                            setFilter?.({ ...filter, category: category.uid })
                            setCurrentCategory(category.uid);
                            setIsDropdown(false);
                            window.innerWidth < 768 && setLimit?.(4);
                            window.history.replaceState(null, null, updateQueryParam([{ key: 'category', value: category.uid }]));
                            getLenis().scrollTo(document.querySelector('.katalog-main'), {
                                offset: window.innerWidth < 768 ? 0 : -100
                            });
                        }}>
                        {category.name}
                    </Category>
                ))}
            </ul>
        </div>
    )
}

export default memo(Categories);