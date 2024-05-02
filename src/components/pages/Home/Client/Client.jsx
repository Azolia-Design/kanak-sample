import './Client.scss'
import { useEffect, useRef } from "react";
import { animate, timeline, stagger, inView } from "motion"
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';
function HomeClient(props) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);
    useEffect(() => {
        const title = new SplitType(q('.home-client-title [name="title"]'), { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType(q('.home-client-sub'), { types: 'lines, words', lineClass: "split-line" })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(subTitle.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05) }],
            [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: '<' }],
        ]
        inView('.home-client-title-wrap', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert()
            })
        }, { margin: "-30% 0px -30% 0px" });

        const allItems = document.querySelectorAll('.home-client-box:not(.home-client-map)')
        allItems.forEach((el, idx) => {
            animate(el, { opacity: 0 }, { duration: 0 })
            animate(el.querySelector('img'), { transform: 'scale(.8) translateY(10%)' }, { duration: 0 })
            const sequence = [
                [el, { opacity: 1 }, { duration: 1, delay: idx < 12 ? (idx % 3) * .08 : (idx % 6) * .08 }],
                [el.querySelector('img'), { transform: 'none' }, { duration: 1.2, at: '<' }]
            ]
            inView(el, () => {
                timeline(sequence).finished.then(() => {
                    el.removeAttribute('style')
                    el.querySelector('img').removeAttribute('style')
                })
            }, { margin: "-30% 0px -30% 0px" });
        });

        animate('.home-client-map', { opacity: 0 }, { duration: 0 })
        animate('.home-client-map img', { transform: 'translateY(5%) scale(.9)' }, { duration: 0 })
        const sequenceMap = [
            ['.home-client-map', { opacity: 1 }, { duration: 1.1 }],
            ['.home-client-map img', { transform: 'none' }, { duration: 1.2, at: '<' }],
        ]
        inView('.home-client-map', () => {
            timeline(sequenceMap).finished.then(() => {
                q('.home-client-map').removeAttribute('style')
                q('.home-client-map img').removeAttribute('style')
            })
        }, { margin: "-30% 0px -30% 0px" })
    }, [])
    return (
        <section className="home-client" ref={sectionRef}>
            <div className="container">
                <div className="grid">
                    <div className="home-client-title-wrap">
                        <h2 className="heading h0 txt-up txt-black home-client-title">
                            {props.title}
                        </h2>
                    </div>
                    <div className="home-client-sub-wrap">
                        <p className="heading h6 txt-up txt-black home-client-sub">
                            {props.subTitle}
                        </p>
                    </div>
                    <div className="grid-holder"></div>
                    <div className="home-client-map home-client-box">
                        {props.imgMap}
                    </div>
                    {props.listLogo}
                </div>
            </div>
        </section>
    )
}
export default HomeClient;