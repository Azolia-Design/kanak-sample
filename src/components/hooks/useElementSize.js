import { useState, useEffect } from "react";
function getElementSize(element) {
    const [elementSize, setElementSize] = useState({
        width: 0,
        height: 0,
    });

    useEffect(() => {
        if (!element) return;
        setElementSize({
            width: document.querySelector(element).offsetWidth,
            height: document.querySelector(element).offsetHeight,
        });
    }, []);
    return elementSize;
}
export default getElementSize