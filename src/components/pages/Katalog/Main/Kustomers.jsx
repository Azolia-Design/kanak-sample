import { memo, useId, useState, useRef } from 'react';
import cn from 'clsx';
import { formatData } from '@utils/text';
import { updateQueryParam } from '@utils/parse';
import useOutsideAlerter from '@hooks/useOutsideAlerter';
import ArrowDropdown from "@components/globals/IcArrow/ArrowDropdown.jsx";

function Kustomer({ isActive, children, onClick }) {
    return (
        <button className={cn('katalog-main-filter-item', { "active": isActive })} onClick={onClick}>
            <div className="txt txt-20 txt-bold katalog-main-filter-item-txt">
                {children}
            </div>
            <div className="line"></div>
        </button>
    )
}

function Kustomers({ list, filter, setFilter }) {
    const ref = useRef();
    const [isDropdown, setIsDropdown] = useState(false);
    useOutsideAlerter(ref, () => setIsDropdown(false))
    return (
        <>
            <button
                ref={ref}
                className={cn("katalog-main-filter-list-toggle-btn katalog-main-filter-list-toggle-btn-kustomer", { "active": isDropdown })}
                onClick={(e) => setIsDropdown(!isDropdown)}>
                <div className="txt txt-18 txt-bold katalog-main-filter-list-toggle-txt">
                    <div className="katalog-main-filter-list-toggle-txt-wrap">
                        <div className="txt-16 txt-up txt-black katalog-main-filter-list-toggle-txt-head">Kustomer</div>
                        <div className="katalog-main-filter-list-toggle-txt-title">
                            {filter.kustomer}
                        </div>
                    </div>
                </div>
                <div className={`ic ic-20 katalog-main-filter-list-toggle-ic`}>
                    <ArrowDropdown />
                </div>
            </button>
            <div
                ref={ref}
                className={cn("katalog-main-filter-list-dropdown", { "active": isDropdown })}>
                <div className="katalog-main-filter-list-dropdown-inner">
                    <Kustomer isActive={filter.kustomer === 'All'} onClick={() => {
                        setFilter?.({ category: 'All', kustomer: 'All' })
                        setIsDropdown(false);
                        window.history.replaceState(null, null, updateQueryParam([
                            { key: 'kustomer', value: '' },
                            { key: 'category', value: '' }
                        ]));
                    }}>
                        All
                    </Kustomer>
                    {list.map((kustomer) =>
                        <Kustomer key={useId()} isActive={filter.kustomer === kustomer} onClick={() => {
                            setFilter?.({ category: 'All', kustomer })
                            setIsDropdown(false);
                            window.history.replaceState(null, null, updateQueryParam([
                                { key: 'kustomer', value: formatData(kustomer) },
                                { key: 'category', value: '' }
                            ]));
                        }}>
                            {kustomer}
                        </Kustomer>
                    )}
                </div>
            </div>
        </>
    )
}

export default memo(Kustomers);