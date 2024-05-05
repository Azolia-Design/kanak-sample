import './Partner.scss';
import { useRef, useEffect } from "react";
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function PakwayPartner({ ...props }) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    useEffect(() => {
        const label = new SplitType(q('.pak-partner-label'), { types: 'lines, words', lineClass: 'split-line' })
        const title = new SplitType(q('.pak-partner-title'), { types: 'lines, words', lineClass: 'split-line' })
        const linkTxt = new SplitType(q('.pak-partner-link span'), { types: 'lines, words', lineClass: 'split-line' })

        animate(q('.line'), { scaleX: 0, transformOrigin: "left" }, { duration: 0 })
        animate(label.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(title.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(linkTxt.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })
        animate(q('.pak-partner-link svg'), { opacity: 0, transform: 'translate(-100%, 100%)' }, { duration: 0 })

        if (window.innerWidth > 991) {
            animate(q('.pak-partner-img-wrap'), { opacity: 0, transform: "translateX(-4rem) scale(.9)" }, { duration: 0 })
        } else {
            animate(q('.pak-partner-img-wrap'), { opacity: 0, transform: "scale(.9)" }, { duration: 0 })
        }

        const sequence = [
            [q('.line'), { scaleX: 1 }, { duration: .8, at: 0 }],
            [label.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.06), at: 0 }],
            [title.words, { opacity: 1, transform: 'none' }, { duration: .6, delay: stagger(.04), at: .1 }],
            [q('.pak-partner-img-wrap'), { transform: "none", opacity: 1 }, { duration: .6, at: .2 }],
            [linkTxt.words, { opacity: 1, transform: 'none' }, { duration: .8, delay: stagger(.05), at: "-.4" }],
            [q('.pak-partner-link svg'), { opacity: 1, transform: 'translate(0,0)' }, { duration: .8, delay: stagger(.1), at: "-.6" }],
        ]
        const spliTxt = []
        document.querySelectorAll('.pak-partner-sub').forEach((el, idx) => {
            const txt = new SplitType(el, { types: 'lines, words', lineClass: 'split-line' })
            animate(txt.words, { opacity: 0, transform: 'translateY(100%)' }, { duration: 0 })

            sequence.push(
                [txt.words, { opacity: 1, transform: 'none' }, { duration: .4, delay: stagger(.005), at: .2 + idx * .1 }]
            )
            spliTxt.push(txt)
        })

        inView('.pak-partner', () => {
            timeline(sequence).finished.then(() => {
                title.revert()
                label.revert()
                linkTxt.revert()
                spliTxt.forEach(item => item.revert())
                q('.pak-partner-img-wrap').removeAttribute('style')
                q('.pak-partner-link svg').removeAttribute('style')
                q('.line').removeAttribute('style')
            })
        }, { margin: "-20% 0px -20% 0px" })

    }, []);

    return (
        <section className="pak-partner" ref={sectionRef}>
            <div className="line"></div>
            <div className="container grid">
                <div className="pak-partner-title-wrap">
                    <div className="heading h4 txt-black txt-up pak-partner-label">
                        Pakway and Kanak Partnership
                    </div>
                    <h2 className="heading h0 txt-up txt-black pak-partner-title">
                        United For A <span className='txt-green'>Greener Future</span>
                    </h2>
                </div>
                <div className="pak-partner-img-wrap">
                    {props.pakImg}
                </div>
                <div className="pak-partner-sub-wrap">
                    <div className="pak-partner-sub-rictxt">
                        <p className="txt txt-18 txt-med pak-partner-sub">
                        The partnership between Pakway and Kanak Naturals enhances our ability to produce eco-friendly packaging that contributes positively to the environment. Together, we leverage Pakway's expertise in rPET technology and Kanak's innovative sustainable material use, driving our shared vision of reducing plastic waste. 
                        </p>
                        <p className="txt txt-18 txt-med pak-partner-sub">
                        Each year, less than 0.5% of the plastic produced enters the oceans, yet this amounts to over 1 million metric tons. Our collaborative efforts aim to significantly decrease this figure by promoting a circular economy where plastic reuse is prioritized.
                        </p>
                    </div>
                    <a href="#" className="txt txt-18 txt-bold txt-link pak-partner-link hidden" data-cursor="txtLink">
                        <span>Our Sustainability Kommitment</span>
                        <div className="ic ic-16">
                            {props.icArrExt}
                        </div>
                    </a>
                </div>
            </div>
        </section>
    )
}
export default PakwayPartner;