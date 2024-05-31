import { memo, useId, useState, useRef } from 'react';
import cn from 'clsx';
import { updateQueryParam } from '@utils/parse';
import useOutsideAlerter from '@hooks/useOutsideAlerter';
import ArrowDropdown from "@components/globals/IcArrow/ArrowDropdown.jsx";
import { getLenis } from '@/components/core/lenis';

function Kustomer({ isActive, children, onClick, isEmpty }) {
    return (
        <button className={cn('katalog-main-filter-item', { "active": isActive })} onClick={onClick}>
            <div className="txt txt-20 txt-bold katalog-main-filter-item-txt">
                {children}
            </div>
            <div className="line"></div>
        </button>
    )
}

function Kustomers({ list, filter, setFilter, setLimit, allItem }) {
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
                            {list.find((kustomer) => kustomer.uid === filter.kustomer)?.title || 'All'}
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
                        window.innerWidth < 768 && setLimit?.(4);
                        window.innerWidth < 768 && getLenis().scrollTo(document.querySelector('.katalog-main'));
                        window.history.replaceState(null, null, updateQueryParam([
                            { key: 'kustomer', value: '' },
                            { key: 'category', value: '' }
                        ]));
                    }}>
                        All
                    </Kustomer>
                    {list.map((kustomer) =>
                        allItem.filter((item) => item.data.tag_grp.some((target) => target.tags.uid == kustomer.uid)).length !== 0 && (
                            <Kustomer key={useId()}
                                isActive={filter.kustomer === kustomer.uid}
                                onClick={() => {
                                    setFilter?.({ category: 'All', kustomer: kustomer.uid })
                                    setIsDropdown(false);
                                    window.innerWidth < 768 && setLimit?.(4);
                                    window.innerWidth < 768 && getLenis().scrollTo(document.querySelector('.katalog-main'));
                                    window.history.replaceState(null, null, updateQueryParam([
                                        { key: 'kustomer', value: kustomer.uid },
                                        { key: 'category', value: '' }
                                    ]));
                            }}>
                                {kustomer.title}
                            </Kustomer>
                    )
                    )}
                </div>
            </div>
        </>
    )
}

export default memo(Kustomers);