import './Commit.scss';
import { useRef, useEffect } from "react";
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@hooks/useSelector';

function AboutCommit({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    useEffect(() => {
        const label = new SplitType(q('.abt-commit-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.abt-commit-title'), { types: 'lines, words', lineClass: 'split-line' })
        const linkTxt = new SplitType(q('.abt-commit-link span'), { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(q('.abt-commit-sub-rictxt'), { types: 'lines, words', lineClass: 'split-line' })

        animate(q('.line'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(linkTxt.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(q('.abt-commit-link svg'), { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

        if (window.innerWidth > 991) {
            animate(q('.abt-commit-img-wrap'), { opacity: 0, transform: "translateX(-4rem) scale(.9)" }, { duration: 0 })
        } else {
            animate(q('.abt-commit-img-wrap'), { opacity: 0, transform: "scale(.9)" }, { duration: 0 })
        }

        const sequence = [
            [q('.line'), { scaleX: 1 }, { duration: .8, at: 0 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.06), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
            [q('.abt-commit-img-wrap'), { transform: "none", opacity: 1 }, { duration: .6, at: .2 }],
            [linkTxt.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05), at: "-.4" }],
            [q('.abt-commit-link svg'), { opacity: 1, transform: 'translate(0,0)' }, { duration: .8, delay: stagger(.1), at: "-.6" }],
            [subtitle.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.005), at: .5 }]
        ]

        inView('.abt-commit', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                subtitle.revert()
                linkTxt.revert()
                q('.abt-commit-img-wrap').removeAttribute('style')
                q('.abt-commit-link svg').removeAttribute('style')
                q('.line').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })

    }, []);

    return (
        <section className="abt-commit" ref={sectionRef}>
            <div className="line"></div>
            <div className="container grid">
                <div className="abt-commit-title-wrap">
                    <div className="heading h4 txt-black txt-up abt-commit-label">{props.label}</div>
                    <h2 className="heading h0 txt-up txt-black abt-commit-title">{props.title}</h2>
                </div>
                <div className="abt-commit-img-wrap">{props.thumbnail}</div>
                <div className="abt-commit-sub-wrap">
                    <div className="txt txt-18 txt-med abt-commit-sub-rictxt">{props.subtitle}</div>
                    <a href="/sustainability" className="txt txt-18 txt-bold txt-link abt-commit-link" data-cursor="txtLink">
                        <span>Read more</span>
                        <div className="ic ic-16">{props.icArrExt}</div>
                    </a>
                </div>
            </div>
        </section>
    )
}
export default AboutCommit;