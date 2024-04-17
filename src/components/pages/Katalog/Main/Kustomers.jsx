import { memo, useId, useState } from 'react';
import cn from 'clsx';
import { formatData } from '@utils/text';
import { searchURLParams } from '@utils/parse';

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
    const [isDropdown, setIsDropdown] = useState(false);
    return (
        <div className={cn("katalog-main-filter-list-dropdown", { "active": isDropdown })}>
            <div className="katalog-main-filter-list-dropdown-inner">
                <Kustomer isActive={filter.kustomer === 'All'} onClick={() => {
                    setFilter?.({ ...filter, kustomer: 'All' })
                    window.history.replaceState(null, null, searchURLParams(window.location.href, 'kustomer', ''));
                }}>
                    All
                </Kustomer>
                {list.map((kustomer) =>
                    <Kustomer key={useId()} isActive={filter.kustomer === kustomer} onClick={() => {
                        setFilter?.({ ...filter, kustomer })
                        window.history.replaceState(null, null, searchURLParams(window.location.href, 'kustomer', formatData(kustomer)));
                    }}>
                        {kustomer}
                    </Kustomer>
                )}
            </div>
        </div>
    )
}

export default memo(Kustomers);