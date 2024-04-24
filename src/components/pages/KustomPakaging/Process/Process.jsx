import { Mouse } from "@/components/core/mouse";
import { parseRem } from "@/js/utils";
import { useEffect, useState } from "react";
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import './Process.scss'

function KustomPackagingSolution({ ...props }) {

    const lerp = (a, b, t = 0.08) => {
        return a + (b - a) * t;
    }

    useEffect(() => {
        // Handle Anim Active
        const parent = document.querySelector('.kuspack-process-main');
        const allItems = parent.querySelectorAll('.kuspack-process-item');
        const allThumbs = parent.querySelectorAll('.kuspack-process-thumb-img');

        const addActive = (el, idx) => () => {
            allThumbs.forEach(item => item.classList.remove('active'));
            allThumbs[idx].classList.add('active');
            el.classList.add('active');
        };

        const removeActive = () => () => {
            allThumbs.forEach(item => item.classList.remove('active'));
            allItems.forEach(item => item.classList.remove('active'))
        };

        const addListeners = () => {
            allItems.forEach((el, idx) => {
                el.addEventListener('mouseenter', addActive(el, idx));
                el.addEventListener('mouseleave', removeActive());
            });
        };

        const removeListeners = () => {
            allItems.forEach((el, idx) => {
                el.removeEventListener('mouseenter', addActive(el, idx));
                el.removeEventListener('mouseleave', removeActive());
            });
        };
        // Handle MouseMove
        const thumb = document.querySelector('.kuspack-process-thumb-inner')
        let thumbReq;
        let targetX = 0
        let targetY = 0

        function thumbMove() {
            let curX = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m41
            let curY = new DOMMatrixReadOnly(getComputedStyle(thumb).transform).m42
            let wrapTop = document.querySelector(".kuspack-process-thumb").getBoundingClientRect().top
            let wrapLeft = document.querySelector(".kuspack-process-thumb").getBoundingClientRect().left

            let cursorX = Mouse().x
            let cursorY = Mouse().y

            if (document.querySelector('.kuspack-process-main:hover')) {
                targetX = parseRem(300) - thumb.offsetWidth / 2 + ((cursorX - wrapLeft) / (document.querySelector(".kuspack-process-thumb").offsetWidth) - .5) * parseRem(300)
                targetY = cursorY - wrapTop - document.querySelector(".kuspack-process-thumb").offsetHeight / 2
            }
            thumb.style.transform = `translate(${lerp(curX, targetX, .03)}px, ${lerp(curY, targetY, .03)}px)`
            thumbReq = requestAnimationFrame(thumbMove)
        }

        if (window.innerWidth > 991) {
            addListeners();
            inView('.kuspack-process', () => {
                thumbReq = requestAnimationFrame(thumbMove)
            })
        }

        // Animation
        const title = new SplitType(".kuspack-process-title", { types: 'lines, words', lineClass: 'split-line' })
        const sub = new SplitType('.kuspack-process-sub', { types: "lines, words", lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
            [sub.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.007), at: .1 }],
        ]

        inView('.kuspack-process', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                sub.revert()
            })
        }, { margin: "-20% 0px -20% 0px" })

        allItems.forEach((item, idx) => {
            const step = new SplitType(item.querySelector(".kuspack-process-item-count"), { types: 'lines, words', lineClass: 'split-line' })
            const title = new SplitType(item.querySelector(".kuspack-process-item-title"), { types: 'lines, words', lineClass: 'split-line' })
            const sub = new SplitType(item.querySelector(".kuspack-process-item-sub"), { types: 'lines, words', lineClass: 'split-line' })

            animate(step.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(sub.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(item.querySelector('.line-top'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
            animate(item.querySelector('.kuspack-process-item-img img'), { scale: .8, opacity: 0, transformOrigin: 'top left' }, { duration: 0 })
            idx === allItems.length - 1 && animate(item.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

            const itemSequence = [
                [item.querySelector('.line-top'), { scaleX: 1 }, { duration: .8, at: 0 }],
                [step.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: 0 }],
                [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.04), at: .1 }],
                [sub.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.007), at: .2 }],
                [item.querySelector('.kuspack-process-item-img img'), { scale: 1, opacity: 1 }, { duration: .6, at: .2 }],
                [idx === allItems.length - 1 && item.querySelector('.line-bot'), { scaleX: 1 }, { duration: .8, at: .1 }],
            ]

            inView(item, () => {
                timeline(itemSequence).finished.then(() => {
                    title.revert()
                    sub.revert()
                    item.querySelectorAll('.line').forEach(item => item.removeAttribute('style'))
                })
            }, { margin: "-20% 0px -20% 0px" })
        })



        return () => {
            removeListeners();
            cancelAnimationFrame(thumbReq)
        };
    }, []);

    return (
        <section className="kuspack-process">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up kuspack-process-title">{props.newTitle}</h1>
                <div className="txt txt-18 txt-med kuspack-process-sub">{props.sub}</div>
                <div className="kuspack-process-main">
                    <div className="kuspack-process-list">
                        {props.renderList}
                    </div>
                    <div className="kuspack-process-thumb">
                        <div className="kuspack-process-thumb-inner">{props.renderThumb}</div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default KustomPackagingSolution
