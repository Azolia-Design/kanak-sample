import { memo, useMemo, useState, useEffect, useRef } from 'react';
import cn from 'clsx';
import { formatData } from '@utils/text';
import { updateQueryParam } from '@utils/parse';
import useOutsideAlerter from '@hooks/useOutsideAlerter';
import ArrowDropdown from "@components/globals/IcArrow/ArrowDropdown.jsx";

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

function Categories({ data, originCategory, filter, setFilter, setLimit }) {
    const ref = useRef();
    const [isDropdown, setIsDropdown] = useState(false);
    const [currentCategory, setCurrentCategory] = useState(filter.category);
    useOutsideAlerter(ref, () => setIsDropdown(false))
    const list = useMemo(() => {
        let currList = [...new Set(data.map((item) => item.category))];

        const indexMap = {};
        originCategory.forEach((element, index) => {
            indexMap[element] = index;
        });

        currList.sort((a, b) => {
            return indexMap[a] - indexMap[b];
        });
        return currList;
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
    },[])

    useEffect(() => {
        // console.log(data);
    },[data])
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
                        key={category}
                        isActive={currentCategory === category}
                        onClick={() => {
                            setFilter?.({ ...filter, category })
                            setCurrentCategory(category);
                            setIsDropdown(false);
                            setLimit?.(4);
                            window.history.replaceState(null, null, updateQueryParam([{ key: 'category', value: formatData(category) }]));
                        }}>
                        {category}
                    </Category>
                ))}
            </ul>
        </div>
    )
}

export default memo(Categories);