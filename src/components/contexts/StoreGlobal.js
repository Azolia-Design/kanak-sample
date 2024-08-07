import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';

/**
 * Chứa state dùng chung nhiều nơi.
 * @param {*} props
 * @returns
 */

const productIndex = atom({
    value: 0,
    direction: 0,
});
function useProductIndex() {
    const index = useStore(productIndex);
    const setIndex = (value) => productIndex.set(value);

    return { index, setIndex };
}
export { useProductIndex };

const catalogIndex = atom(0);
function useCatalogIndex() {
    const index = useStore(catalogIndex);
    const setIndex = (value) => catalogIndex.set(value);

    return { index, setIndex };
}
export { useCatalogIndex };

const isProductLock = atom(false);

function useLockProduct() {
    const isLock = useStore(isProductLock);

    const setLock = (value) => isProductLock.set(value);

    return { isLock, setLock };
}
export { useLockProduct };

export const brandIndex = atom(0);

export const progressPercent = atom(0);
