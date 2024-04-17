import { memo, useMemo, useState, useEffect } from 'react';
import cn from 'clsx';
import { formatData } from '@utils/text';
import { searchURLParams } from '@utils/parse';
import useOutsideAlerter from '@hooks/useOutsideAlerter';

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

function Categories({ data, originCategory, filter, setFilter }) {
    const [currentCategory, setCurrentCategory] = useState(filter.category);
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
        if (!currentCategory) return;
        if (!list.includes(currentCategory)) {
            console.log("run")
            setCurrentCategory(list[0]);
            setFilter({ ...filter, category: list[0] })
        }
        else {
            setCurrentCategory(filter.category)
        }
    }, [list, filter, currentCategory])

    return (
        <div className="katalog-main-cate">
            <ul className="katalog-main-cate-list">
                {list.map((category) => (
                    <Category
                        key={category}
                        isActive={currentCategory === category}
                        onClick={() => {
                            setFilter?.({ ...filter, category })
                            setCurrentCategory(category);
                            window.history.replaceState(null, null, searchURLParams(window.location.href, 'category', formatData(category)));
                        }}>
                        {category}
                    </Category>
                ))}
            </ul>
        </div>
    )
}

export default memo(Categories);

Categories.Dropdown = ({ data, filter, setFilter }) => {
    const [currentCategory, setCurrentCategory] = useState(filter.category);
    const [isDropdown, setIsDropdown] = useState(false);
    const list = useMemo(() => {
        let currList = [...new Set(data.map((item) => item.category))];
        if (!currList.includes(currentCategory)) setCurrentCategory(currList[0]);
        return currList;
    }, [data, currentCategory]);

    useOutsideAlerter(ref, () => { setIsDropdown(false) })

    return (
        <div className={cn("katalog-main-filter-list-dropdown katalog-main-filter-list-dropdown-cate", { "active": isDropdown })}>
            <div className="katalog-main-filter-list-dropdown-inner" ref={ref}>
                {/* {renderFilterDropdownCate} */}
                {list.map((category) =>
                    <button
                        key={category}
                        className={cn('katalog-main-filter-item', { "active": currentCategory === category })}
                        onClick={() => {
                            setFilter({ ...filter, category });
                            setCurrentCategory(category);
                            setIsDropdown(false);
                        }}>
                        <div className="txt txt-20 txt-bold katalog-main-filter-item-txt">
                            {category}
                        </div>
                        <div className="line"></div>
                    </button>
                )}
            </div>
        </div>

    )
}
