import './Privilege.scss'
import { animate, timeline, stagger, inView } from "motion";
import { useEffect } from 'react';
import SplitType from 'split-type';

function PrivatePrivilege({ ...props }) {
    useEffect(() => {
        // Anim Title
        const title = new SplitType(".private-privilege-title", { types: 'lines, words', lineClass: 'split-line' })
        const subtitle = new SplitType(".private-privilege-sub", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(subtitle.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.035), at: 0 }],
            [subtitle.words, { opacity: 1, transform: "none" }, { duration: .5, delay: stagger(.005), at: .3 }],
        ]
        inView('.private-privilege', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subtitle.revert()
            })
        }, { margin: "-10% 0px -10% 0px" })

        // Anim Item
        const Items = document.querySelectorAll('.private-privilege-item-wrap')

        Items.forEach((el, idx) => {
            const itemSequence = []
            if (window.innerWidth > 767) {
                animate(el, { opacity: 0, scale: .9 }, { duration: 0 })

                itemSequence.push(
                    [el, { opacity: 1, scale: 1 }, { duration: .6, at: idx * .1 }]
                )
            } else {
                animate(el, { opacity: 0, transform: "translateY(2rem)" }, { duration: 0 })
                itemSequence.push(
                    [el, { opacity: 1, transform: "none" }, { duration: .8, at: idx * .1 }]
                )
            }

            inView(el, () => {
                timeline(itemSequence).finished.then(() => {
                    el.removeAttribute('style')
                })
            }, { margin: "-10% 0px -10% 0px" })
        })
    }, [])
    return (
        <section className='private-privilege bg-dark'>
            <div className="container grid">
                <div className="private-privilege-head">
                    <h1 className="heading h0 txt-black txt-up private-privilege-title">{props.newTitle}</h1>
                    <div className="txt txt-18 txt-med private-privilege-sub">{props.sub[0].text}</div>
                </div>
                <div className="private-privilege-main">
                    {props.list.map((el, idx) => (
                        <div className="private-privilege-item-wrap" key={idx}>
                            <div className="private-privilege-item" style={{ '--idx': props.list.length - 1 - idx }}>
                                <div className="private-privilege-item-inner">
                                    <h3 className="heading h5 txt-black txt-up private-privilege-item-title">{el.item_title[0].text}</h3>
                                    <div className="private-privilege-item-sub-wrap">
                                        <div className="txt txt-18 txt-med private-privilege-item-sub">{el.item_subtitle[0].text}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PrivatePrivilege
