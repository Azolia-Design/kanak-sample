import { useEffect, useRef } from 'react';
import { parseRem } from '@/js/utils';
import './cursor.scss';

function CursorMain({...props}) {
    const cursor = useRef();
    const cursorInner = useRef();
    const lerp = (a,b,t = 0.08) => {
        return a + (b - a) * t;
    }
    let pointer = {
        x: 0,
        y: 0
    }
    function getCursor(e) {
        pointer.x = e.clientX;
        pointer.y = e.clientY;
        if (cursor.current.classList.contains('on-load')) {
            cursor.current.classList.remove('on-load')
        }
    }
    useEffect(() => {
        if (!cursor.current.classList.contains('on-load')) return;
        console.log('init cursor once')
        pointer = {x: window.innerWidth/2, y: window.innerHeight/2};
        window.addEventListener('pointermove', (e) => getCursor(e));
        let myReq;
        function moveCursor() {
            let cursorX = new DOMMatrixReadOnly(getComputedStyle(cursor.current).transform).m41
            let cursorY = new DOMMatrixReadOnly(getComputedStyle(cursor.current).transform).m42
            let targetX = pointer.x
            let targetY = pointer.y;
            let targetEl;
            if (document.querySelectorAll('[data-cursor]:hover').length == 1) {
                let type = document.querySelector('[data-cursor]:hover').getAttribute('data-cursor')
                switch(type) {
                    case 'ext':
                        cursorInner.current.classList.add('on-hover')
                        break;
                    case 'hide':
                        cursorInner.current.classList.add('on-hide')
                        break;
                    case 'txtLink': 
                        
                        cursorInner.current.classList.add('on-hover-sm')
                        targetEl = document.querySelector('[data-cursor]:hover')
                        targetX = targetEl.getBoundingClientRect().left - parseRem(14) - cursorInner.current.getBoundingClientRect().width / 2;;
                        targetY = targetEl.getBoundingClientRect().top + targetEl.getBoundingClientRect().height / 2;
                        break;
                    default: 
                        break;
                }
            } else {
                cursorInner.current.classList.remove('on-hover', 'on-hide', 'on-hover-sm')
            }
            
            cursor.current.style.transform = `translate(${lerp(cursorX, targetX)}px, ${lerp(cursorY, targetY)}px)`
            myReq = requestAnimationFrame(moveCursor)
        }
        myReq = requestAnimationFrame(moveCursor)
        return () => {
            console.log('unmount cursor')
            window.removeEventListener('pointermove', getCursor)
            cancelAnimationFrame(myReq)
        }
    }, [])
    return (
        <div className="cursor">
            <div className="cursor-main on-load" ref={cursor}>
                <div className="cursor-main-inner" ref={cursorInner}>
                    <div className="cursor-main-inner-dot"></div>
                    <div className="cursor-main-inner-ic ic ic-40">
                        {props.icExt}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default CursorMain