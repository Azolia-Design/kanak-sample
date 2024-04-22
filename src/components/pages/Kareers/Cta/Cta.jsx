import './Cta.scss'
import { stagger, inView, animate, timeline } from "motion";
import SplitType from 'split-type';
import { useEffect } from 'react';

function KareersCta(props) {
    useEffect(() => {
        const title = new SplitType('.kareer-cta-title', { types: 'lines, words', lineClass: "split-line" });
        const subTitle = new SplitType('.kareer-cta-sub', { types: 'lines, words', lineClass: "split-line" });
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(subTitle.words, { opacity: 0, transform: 'translateY(12px)' }, { duration: 0 })
        animate('.kareer-cta-btn-wrap', { opacity: 0, transform: "translateY(10px)" }, { duration: 0 });
        const sequence = [
            [title.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05) }],
            [subTitle.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.02), at: '<' }],
            ['.kareer-cta-btn-wrap', { opacity: 1, transform: 'none' }, { duration: .8, at: '-.5' }]
        ]
        inView('.kareer-cta', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                subTitle.revert();
                document.querySelector('.kareer-cta-btn-wrap').removeAttribute('style');
            })
        }, { margin: "-30% 0px -30% 0px" });
    }, []);
    return (
        <section className="kareer-cta">
            <div className="container grid">
                <h2 className="heading h0 txt-up txt-black kareer-cta-title">
                    Discover Hip Openings Tailored for You
                </h2>
                <div className="kareer-cta-sub-wrap">
                    <p className="txt txt-20 txt-med kareer-cta-sub">
                        We are dedicated to fostering a dynamic and inclusive workplace where talent thrives, ideas flourish, and careers are built. If you are passionate about kanak and are seeking a rewarding and challenging career, consider becoming a part of our vibrant team.
                    </p>
                    <div className="kareer-cta-btn-wrap">
                        <a href="#" className="btn btn-lg" data-cursor="txtLink" data-cursor-txtlink="child">
                            <div className="txt txt-18 txt-up txt-med" data-cursor-txtlink-child>Views open positions</div>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default KareersCta