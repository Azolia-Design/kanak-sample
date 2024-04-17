import { useState, useEffect } from 'react';

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });
    useEffect(() => {
        const updateMousePosition = ev => {
            setMousePosition({ x: ev.clientX, y: ev.clientY });
        };
        window.addEventListener('pointermove', updateMousePosition);
        return () => {
            window.removeEventListener('pointermove', updateMousePosition);
        };
    }, []);
    return mousePosition;
};
export default useMousePosition;