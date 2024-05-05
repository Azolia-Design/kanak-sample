import { useRef, useEffect } from "react";
import SplitType from 'split-type';
import { animate, timeline, stagger, inView } from "motion";
import { cleanText } from "@utils/text";

function CaseItem({ ...props }) {
    const itemRef = useRef();

    useEffect(() => {
        if (!itemRef.current) return

        cleanText(itemRef.current.querySelector('.case-list-item-title'))
        const label = new SplitType(itemRef.current.querySelector('.case-list-item-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(itemRef.current.querySelector('.case-list-item-title'), { types: 'lines, words', lineClass: 'split-line' })
        const readmore = new SplitType(itemRef.current.querySelector('.case-list-item-link-txt'), { types: 'lines, words', lineClass: 'split-line' })

        animate(itemRef.current.querySelector('.line-bot'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })
        animate(itemRef.current.querySelector('.line-ver'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(readmore.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(itemRef.current.querySelector('.case-list-item-img-inner'), { opacity: 0, transform: 'scale(.4)', transformOrigin: "left bottom" }, { duration: 0 })
        animate(itemRef.current.querySelector('.case-list-item-link-ic svg'), { opacity: 0, transform: "translate(-100%, 100%)" }, { duration: 0 })

        const itemSequence = [
            [itemRef.current.querySelector('.line-bot'), { scaleX: 1 }, { duration: 1 }],
            [itemRef.current.querySelector('.line-ver'), { scaleY: 1 }, { duration: .8, at: .2 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.03), at: .2 }],
            [itemRef.current.querySelector('.case-list-item-img-inner'), { opacity: 1, transform: 'none' }, { duration: .6, at: .4 }],
            [readmore.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .5 }],
            [itemRef.current.querySelector('.case-list-item-link-ic svg'), { opacity: 1, transform: 'none' }, { duration: .6, at: .6 }]
        ]
        inView(itemRef.current, () => {
            timeline(itemSequence).finished.then(() => {
                if (!itemRef.current) return
                itemRef.current.querySelector('.line-bot').removeAttribute('style')
                itemRef.current.querySelector('.line-ver').removeAttribute('style')
                itemRef.current.querySelector('.case-list-item-img-inner').removeAttribute('style')
                itemRef.current.querySelector('.case-list-item-link-ic svg').removeAttribute('style')
                label.revert()
                title.revert()
                readmore.revert()
            })
        }, { margin: "-15% 0px -15% 0px" })
        return () => {
            if (!itemRef.current) return
        }
    }, [])

    return (
        <div className="case-list-item bg-light" ref={itemRef}>
            <a href={`/kase-studies/${props.data.category.toLowerCase().replaceAll(' ', '-')}`} className="txt txt-20 txt-bold case-list-item-label txt-link" data-cursor="txtLink">
                {props.data.category}
            </a>
            <a href={`/kase-studies/${props.uid}`} className="case-list-item-inner" data-cursor="ext">
                <h2 className="heading h3 txt-up txt-black case-list-item-title">
                    {props.data.title[0].text}
                </h2>
                <div className="case-list-item-bot">
                    <div className="case-list-item-img">
                        <div className="case-list-item-img-inner">
                            <img className='img img-h' src={props.data.images[0]?.image_item?.url} alt='' width={props.data.images[0]?.image_item?.dimensions.width} height={props.data.images[0]?.image_item?.dimensions.height} />
                        </div>
                    </div>
                    <div className="case-list-item-link">
                        <div className="txt txt-18 txt-bold case-list-item-link-txt">Read more</div>
                        <div className="ic ic-16 case-list-item-link-ic">
                            {props.icArrowExt}
                        </div>
                    </div>
                </div>
            </a>
            <div className="line line-bot"></div>
            <div className="line line-ver"></div>
        </div>
    )
}
export default CaseItem