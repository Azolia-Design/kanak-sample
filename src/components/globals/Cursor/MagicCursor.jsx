import { useState, useRef } from "react";
import usePrevious from '@hooks/usePrevious';
import useIsomorphicLayoutEffect from '@hooks/useIsomorphicLayoutEffect';
import cn from 'clsx';
import './MagicCursor.scss'

const MODE_CURSOR = {
    ARROW: 'ARROW',
    DRAG: 'DRAG',
    DEFAULT: 'DEFAULT',
};

function MagicCursor(props) {
    const dotRef = useRef();
    const [mode, setMode] = useState(MODE_CURSOR.DEFAULT);
    const [text, setText] = useState('');

    const previousText = usePrevious(text);
    const previousMode = usePrevious(mode);

    const dotClassName = cn("cursor-main", {
        "default": mode === MODE_CURSOR.DEFAULT,
        "drag": mode === MODE_CURSOR.DRAG,
        "arrow": mode === MODE_CURSOR.ARROW,
    });

    const onHoverDefault = () => {
        setMode(MODE_CURSOR.DEFAULT);
        setText('');
    };

    const onHoverArrow = () => {
        setMode(MODE_CURSOR.ARROW);
        setText('');
    };

    const onHoverDrag = () => {
        setMode(MODE_CURSOR.DRAG);
        setText('Drag');
    };

    useIsomorphicLayoutEffect(() => {
        window.CURSOR = {
            hoverArrow: onHoverArrow,
            hoverDrag: onHoverDrag,
            hoverDefault: onHoverDefault,
        };
    }, []);

    useIsomorphicLayoutEffect(() => {
        const dot = dotRef.current;
        const speed = 0.6;

        const onMove = (e) => {
            dot.animate({
                transform: `translate(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%))`
            }, { duration: 1200, fill: "forwards" })
        };
        window.addEventListener('pointermove', onMove);
        return () => window.removeEventListener('pointermove', onMove);
    }, [dotRef]);

    useIsomorphicLayoutEffect(() => {
        onHoverDefault();
    }, []);
    return (
        <div className="cursor">
            <div className={dotClassName} ref={dotRef}>
                <div className="cursor-main-inner">
                    <div className={cn("cursor-main-inner-detail", {'is-show': mode !== MODE_CURSOR.DEFAULT })}>
                        <div className="cursor-main-ic ic ic-40">
                            {props.icExt}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MagicCursor;