import './Client.scss'
import { useEffect, useRef } from "react";
import { animate, timeline, stagger, inView } from "motion"
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function KustomPackagingClients({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.kuspack-client-title [name="title"]'), { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType(q('.kuspack-client-sub'), { types: 'lines, words', lineClass: "split-line" })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(subTitle.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05) }],
            [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: '<' }],
        ]
        inView('.kuspack-client-title-wrap', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert()
            })
        }, { margin: "-30% 0px -30% 0px" });

        const allItems = document.querySelectorAll('.kuspack-client-box:not(.kuspack-client-map)')
        allItems.forEach((el, idx) => {
            animate(el, { opacity: 0 }, { duration: 0 })
            animate(el.querySelector('img'), { transform: 'scale(.8) translateY(10%)' }, { duraion: 0 })
            const sequence = [
                [el, { opacity: 1 }, { duraion: 1, delay: idx < 12 ? (idx % 3) * .08 : (idx % 6) * .08 }],
                [el.querySelector('img'), { transform: 'none' }, { duraion: 1.2, at: '<' }]
            ]
            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    el.removeAttribute('style')
                    el.querySelector('img').removeAttribute('style')
                })
            }, { margin: "-30% 0px -30% 0px" });
        });

        animate('.kuspack-client-map', { opacity: 0 }, { duration: 0 })
        animate('.kuspack-client-map img', { transform: 'translateY(5%) scale(.9)' }, { duration: 0 })
        const sequenceMap = [
            ['.kuspack-client-map', { opacity: 1 }, { duration: 1.1 }],
            ['.kuspack-client-map img', { transform: 'none' }, { duration: 1.2, at: '<' }],
        ]
        inView('.kuspack-client-map', () => {
            timeline(sequenceMap).finished.then(() => {
                q('.kuspack-client-map').removeAttribute('style')
                q('.kuspack-client-map img').removeAttribute('style')
            })
        }, { margin: "-30% 0px -30% 0px" })
    }, [])
    return (
        <section className="kuspack-client" ref={sectionRef}>
            <div className="container">
                <div className="grid">
                    <div className="kuspack-client-title-wrap">
                        <h2 className="heading h0 txt-up txt-black kuspack-client-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="kuspack-client-sub-wrap">
                        <p className="heading h6 txt-up txt-black kuspack-client-sub">
                            {props.subTitle}
                        </p>
                    </div>
                    <div className="grid-holder"></div>
                    <div className="kuspack-client-map kuspack-client-box">
                        {props.imgMap}
                    </div>
                    {props.listLogo}
                </div>
            </div>
        </section>
    )
}
export default KustomPackagingClients;