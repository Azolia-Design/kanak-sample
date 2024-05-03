import Lenis from '@studio-freight/lenis';
import { parseRem } from '@/js/utils';

let lenis;

function initLenis() {
    console.log('init lenis')
    lenis = new Lenis()

    function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)

    if (window.location.hash) {
        if (document.querySelectorAll(window.location.hash).length >= 1) {
            lenis.scrollTo('#' + window.location.hash.slice(1), {offset: -parseRem(200)})
            setTimeout(() => {
                lenis.scrollTo('#' + window.location.hash.slice(1), {offset: -parseRem(200)})
            }, 400);
            setTimeout(() => {
                lenis.scrollTo('#' + window.location.hash.slice(1), {offset: -parseRem(200)})
            }, 800);
        }
    }
}

function getLenis() {
    if (!lenis) {
        initLenis ()
    }
    return lenis;
}

export {initLenis, getLenis}