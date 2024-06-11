import './ProductTitle.scss'
import SplitType from 'split-type';
import { stagger, inView, timeline, animate, scroll } from "motion"
import { useEffect } from 'react';

function HomeProductTitle(props) {
    useEffect(() => {
        const text = new SplitType('.home-prod-title', { types: 'lines, words, chars', lineClass: 'split-line'});

        const sequence = [
            [text.chars, { opacity: [.2, 1] }, {delay: stagger(.03), easing: 'linear'}]
        ];
        scroll(
            timeline(sequence),{
            target: document.querySelector('.home-prod-title-wrap'),
            offset: ["start end", "end 45vh"]
        })

        animate(text.words, {opacity: 0}, {duration: 0})
        inView(".home-prod-title-wrap", () => {
            animate(text.words, {opacity: 1, transform: ['translateY(100%)', 'none']}, {duration: .5, delay: stagger(.03)})
          }, { margin: "-40% 0px -40% 0px" });
    }, [])
    return (
        <div className="home-prod-title-wrap">
            <h2 className="heading h1 txt-up txt-black home-prod-title">
                {props.prod_sub_title}
            </h2>
        </div>
    )
}
export default HomeProductTitle