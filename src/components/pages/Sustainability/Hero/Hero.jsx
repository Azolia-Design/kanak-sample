import './Hero.scss';
import { animate, stagger, inView } from "motion";
import { useEffect  } from 'react';
import SplitType from 'split-type';

function SustainHero(props) {
    useEffect(() => {
        const title = new SplitType('.sustainable-hero-title', { types: 'lines, words', lineClass: 'split-line' })
        animate(title.words, {opacity: 0, transform: 'translateY(100%)'}, {duration: 0})

        inView('.sustainable-hero', () => {
            animate(title.words, { opacity: 1, transform: ['translateY(100%)', 'none'] }, { duration: .8, delay: stagger(.04) }).finished.then(() => {
                title.revert();
            });
        })
    }, []);

    return(
        <section className="sustainable-hero">
            <div className="container">
                <h1 className="heading h0 txt-black txt-up sustainable-hero-title">
                    <span>Pioneering</span> <span className="txt-180">Responsibly</span>
                    <span className="txt-180">Sourced</span> <span>Products</span>
                </h1>
            </div>
        </section>
    )
}
export default SustainHero;
