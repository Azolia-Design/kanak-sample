import "./style.scss"
import { useEffect } from "react"
import { animate, timeline, stagger, inView } from "motion";
import SplitType from 'split-type';

function GlobalExplore({ ...props }) {
    useEffect(() => {
        // Anim Title
        const title = new SplitType(".global-explore-title", { types: 'lines, words', lineClass: 'split-line' })

        animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
        animate(document.querySelector('.global-explore-list .line-top'), { scaleX: 0, transformOrigin: 'left' }, { duration: 0 })

        const sequence = [
            [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.03), at: 0 }],
            [document.querySelector('.global-explore-list .line-top'), { scaleX: 1 }, { duration: .6, at: .1 }],
        ]
        inView('.global-explore', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                document.querySelector('.global-explore-list .line-top').removeAttribute('style')
            })
        }, { margin: "-10% 0px -10% 0px" })

        // Anim Item
        document.querySelectorAll('.global-explore-list .global-explore-list-item').forEach((el, idx) => {
            const title = new SplitType(el.querySelector('.global-explore-list-item-title'), { types: 'lines, words', lineClass: 'split-line' })

            animate(el.querySelector('.global-explore-list-item-img-inner img'), { scale: 1.1, opacity: 0 }, { duration: 0 })
            animate(title.words, { opacity: 0, transform: "translateY(100%)" }, { duration: 0 })
            animate(el.querySelector('.global-explore-list-item-line'), { scaleY: 0, transformOrigin: 'top' }, { duration: 0 })

            let itemSequence = [
                [el.querySelector('.global-explore-list-item-img-inner img'), { scale: 1, opacity: 1 }, { duration: .8, at: .1 }],
                [title.words, { opacity: 1, transform: "none" }, { duration: .6, delay: stagger(.03), at: .2 }],
                [el.querySelector('.global-explore-list-item-line'), { scaleY: 1 }, { duration: 1, at: 0 }],
            ]

            inView(el, () => {
                timeline(itemSequence).finished.then(() => {
                    title.revert()
                    el.querySelector('.global-explore-list-item-img-inner img').removeAttribute('style')
                    el.querySelector('.global-explore-list-item-line').removeAttribute('style')
                })
            }, { margin: "-20% 0px -20% 0px" })
        })
    }, [])
    return (
        <div className="global-explore bg-dark">
            <div className="container grid">
                <h2 className="heading h3 txt-black txt-up global-explore-title">Explore More</h2>
                <div className="global-explore-list">
                    {props.list.map((item, idx) => (
                        <a href={`/${item.link}`} className="global-explore-list-item" key={idx} data-cursor="ext">
                            <div className="global-explore-list-item-img">
                                <div className="global-explore-list-item-img-inner">
                                    <img src={item.data.thumbnail.url} alt={item.data.thumbnail.alt} width={item.data.thumbnail.dimensions.width} className="img img-fill" />
                                </div>
                            </div>
                            <h1 className="heading h2 txt-black txt-up global-explore-list-item-title">{item.data.name[0].text}</h1>
                            <div className="line global-explore-list-item-line"></div>
                        </a>
                    ))}
                    <div className="line line-top"></div>
                </div>
            </div>
        </div>
    )
}


export default GlobalExplore
