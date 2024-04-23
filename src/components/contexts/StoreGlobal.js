import { atom } from 'nanostores';
import { useStore } from '@nanostores/react';

/**
 * Chứa state dùng chung nhiều nơi.
 * @param {*} props
 * @returns
 */

const productIndex = atom(0);
function useProductIndex() {
    const index = useStore(productIndex);

    const setIndex = (value) => productIndex.set(value);

    return { index, setIndex };
}
export { useProductIndex };

export const brandIndex = atom(0);

export const progressPercent = atom(0);
