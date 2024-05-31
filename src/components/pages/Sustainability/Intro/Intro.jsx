import './Intro.scss';
import { useEffect } from 'react';
import { stagger, inView, timeline, animate, scroll } from "motion"
import SplitType from 'split-type';

function SustainIntro({ title }) {
    useEffect(() => {
        const text = new SplitType('.sustainable-intro-content', { types: 'lines, words, chars', lineClass: 'split-line'});
        const sequence = [
            [text.chars, { opacity: [.2, 1] }, {delay: stagger(.03), easing: 'linear'}]
        ];
        scroll(
            timeline(sequence),{
            target: document.querySelector('.sustainable-intro'),
            offset: ["start end", "end 45vh"]
        })

        animate(text.words, {opacity: 0}, {duration: 0})
        inView(".sustainable-intro", () => {
            animate(text.words, {opacity: 1, transform: ['translateY(100%)', 'none']}, {duration: .5, delay: stagger(.03)})
        }, { margin: "-30% 0px -30% 0px" });
    }, []);
    return(
        <section className="sustainable-intro">
            <div className="container">
                <h2 className="heading h3 txt-black txt-up sustainable-intro-content">{title}</h2>
            </div>
        </section>
    )
}
export default SustainIntro;