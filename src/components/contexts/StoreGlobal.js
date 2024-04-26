import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';

/**
 * Chứa state dùng chung nhiều nơi.
 * @param {*} props
 * @returns
 */

const productIndex = atom({
    value: 0,
    direction: 1,
});
function useProductIndex() {
    const index = useStore(productIndex);
    const setIndex = (value) => productIndex.set(value);

    return { index, setIndex };
}
export { useProductIndex };

const isProductLock = atom(false);

function useLockProduct() {
    const isLock = useStore(isProductLock);

    const setLock = (value) => isProductLock.set(value);

    return { isLock, setLock };
}
export { useLockProduct };

export const brandIndex = atom(0);

export const progressPercent = atom(0);
