import "./Hero.scss"
import KustomerHeroThree from "./HeroThree"
import { useState, useEffect, useMemo, useCallback } from 'react';
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';
import { isEmpty } from "@utils/text";

function KustomerHero(props) {
    const [currentIdx, setCurrentIdx] = useState(0);

    const handleSwipe = (direction) => {
        const newIndex = currentIdx + direction;
        if (newIndex >= 0 && newIndex < props.modelList.length) {
            setCurrentIdx(newIndex);
        }
    };

    const handleMouseDown = (e) => {
        const startX = e.clientX;
        const startY = e.clientY;

        const handleMouseMove = (e) => {
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            if (Math.abs(deltaX) > Math.abs(deltaY)) {
                handleSwipe(deltaX > 0 ? -1 : 1);
            }
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', handleMouseMove);
        }, { once: true });
    };

    useEffect(() => {
        const count = () => {
            setCurrentIdx(prevIndex => (prevIndex + 1) % props.modelList.length);
        };

        const timerId = setInterval(count, 2000);

        return () => clearInterval(timerId);
    }, [props.modelList]);

    // const handleOnDown = (e) => {
    //     setOnDrag(true);
    //     trackRef.current.dataset.mouseDownAt = e.clientX
    // }
    // const handleOnUp = (e) => {
    //     let track = trackRef.current;
    //     track.dataset.mouseDownAt = "0";
    //     track.dataset.prevPercentage = track.dataset.percentage;
    //     setOnDrag(false);
    // }

    // const handleOnMove = (e) => {
    //     let track = trackRef.current;
    //     if (track.dataset.mouseDownAt === "0") return;

    //     const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX;
    //     const maxDelta = window.innerWidth / 2;
    //     const percentage = (mouseDelta / maxDelta) * -100;
    //     const nextPercentageUnconstrained = parseFloat(track.dataset.prevPercentage) + percentage;
    //     const nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);
    //     track.dataset.percentage = nextPercentage;

    //     // setCurrentPos(nextPercentage / 100 * 2 || currentIdx);
    //     setCurrentIdx(-nextPercentage / 100 * 2 || currentIdx);
    // }

    // useEffect(() => {
    //     trackRef.current.onmousedown = (e) => handleOnDown(e);
    //     trackRef.current.ontouchstart = (e) => handleOnDown(e.touches[0]);

    //     trackRef.current.onmouseup = (e) => handleOnUp(e);
    //     trackRef.current.ontouchend = (e) => handleOnUp(e.touches[0]);

    //     trackRef.current.onmousemove = (e) => handleOnMove(e);
    //     trackRef.current.ontouchmove = (e) => handleOnMove(e.touches[0]);
    // }, [trackRef, currentIdx]);

    useEffect(() => {
        const title = new SplitType('.kustomer-hero-title', { types: "lines,words", lineClass: 'split-line' })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.04), at: .2 }],
        ]
        let subtitle
        if (!isEmpty(props.label)) {
            subtitle = new SplitType('.kustomer-hero-subtitle', { types: "lines,words", lineClass: 'split-line' })
            animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })

            sequence.push(
                [subtitle.words, { transform: 'none', opacity: 1 }, { duration: .6, delay: stagger(.01), at: 0 }],
            )
        }

        inView('.kustomer-hero', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                if (!isEmpty(props.label)) subtitle.revert()
            })
        })
    }, [])

    return (
        <section className="kustomer-hero bg-white">
            <div className="container grid">
                {props.label && (
                    <div className="heading h6 txt-black txt-up kustomer-hero-subtitle">{props.label}</div>
                )}
                <h1 className="heading h0 txt-black txt-up kustomer-hero-title">{props.title}</h1>
            </div>
            <div
                className="kustomer-hero-slide"
                // onMouseDown={handleMouseDown}
            >
                <KustomerHeroThree list={props.modelList} currentIdx={currentIdx} />
            </div>
        </section>
    )
}

export default KustomerHero