import { useRef, useEffect } from 'react';
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";
import { cleanText } from "@utils/text";

function SubsidiaryItem({ ...props }) {
    const ref = useRef();

    useEffect(() => {
        if (!ref.current) return
        cleanText(ref.current.querySelector('.fulfill-subsidiary-item-title'))
        const label = new SplitType(ref.current.querySelector('.fulfill-subsidiary-item-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(ref.current.querySelector('.fulfill-subsidiary-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const readMore = new SplitType(ref.current.querySelector('.fulfill-subsidiary-item-link-txt'), { types: 'lines, words', lineClass: 'split-line' })

        animate(ref.current.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(ref.current.querySelector('.line-top'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(ref.current.querySelector('.line-ver'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(readMore.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(ref.current.querySelector('.fulfill-subsidiary-item-img-inner'), { opacity: 0, transform: 'scale(.4)', transformOrigin: "left bottom" }, { duration: 0 })
        animate(ref.current.querySelector('.fulfill-subsidiary-item-link-ic svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

        const itemSequence = [
            [ref.current.querySelector('.line-top'), { scaleX: 1 }, { duration: 1 }],
            [ref.current.querySelector('.line-bot'), { scaleX: 1 }, { duration: 1, at: 0 }],
            [ref.current.querySelector('.line-ver'), { scaleY: 1 }, { duration: .8, at: .2 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.03), at: .2 }],
            [ref.current.querySelector('.fulfill-subsidiary-item-img-inner'), { opacity: 1, transform: 'none' }, { duration: .6, at: .4 }],
            [readMore.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .5 }],
            [ref.current.querySelector('.fulfill-subsidiary-item-link-ic svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: .6 }]
        ]
        inView(ref.current, () => {
            timeline(itemSequence).finished.then(() => {
                if (!ref.current) return
                ref.current.querySelector('.line-bot').removeAttribute('style');
                ref.current.querySelector('.line-top').removeAttribute('style');
                ref.current.querySelector('.line-ver').removeAttribute('style');
                ref.current.querySelector('.fulfill-subsidiary-item-img-inner').removeAttribute('style');
                ref.current.querySelector('.fulfill-subsidiary-item-link-ic svg').removeAttribute('style');
                label.revert();
                title.revert();
                readMore.revert();
            })
        }, { margin: "-15% 0px -15% 0px" })
        return () => {
            if (!ref.current) return
        }
    }, []);
    return (
        <div className="fulfill-subsidiary-item bg-light" ref={ref}>
            <a href={props.link.url} className="txt txt-20 txt-bold txt-link fulfill-subsidiary-item-label" data-cursor="txtLink" target="_blank">{props.name}</a>
            <a href={props.link.url} className="fulfill-subsidiary-item-inner" data-cursor="ext" target="_blank">
                <h3 className="heading h3 txt-up txt-black fulfill-subsidiary-item-title">{props.title}</h3>
                <div className="fulfill-subsidiary-item-bot">
                    <div className="fulfill-subsidiary-item-img">
                        <div className="fulfill-subsidiary-item-img-inner">
                            <img src={props.image.url} alt="Parkway" className="img img-fill" />
                        </div>
                    </div>
                    <div className="fulfill-subsidiary-item-link">
                        <div className="txt txt-18 txt-bold fulfill-subsidiary-item-link-txt">Learn more</div>
                        <div className="ic ic-16 fulfill-subsidiary-item-link-ic">
                            {props.icArrowExt}
                        </div>
                    </div>
                </div>
            </a>
            <div className="line line-top"></div>
            <div className="line line-bot"></div>
            <div className="line line-ver line-right"></div>
            <div className="line line-ver line-left"></div>
        </div>
    )
}
export default SubsidiaryItem;