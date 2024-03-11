import gsap from 'gsap';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SplitType from 'split-type';
import { useGSAP } from '@gsap/react';
import './HeroProduct.scss'
import { useRef } from 'react';
import useSelector from '@hooks/useSelector';

function HomeHeroProduct({ ...props }) {
    const ref = useRef();
    const q = useSelector(ref);

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const text = new SplitType('.home-hero-prod-title', { types: 'words, chars'});
        gsap.from(text.chars, {
            scrollTrigger: {
                trigger: q('.home-hero-prod-title-wrap'),
                start: 'top top+=65%',
                end: 'bottom top+=45%',
                scrub: true
            },
            opacity: .2, stagger: .06, ease: 'linear'
        })
    }, { scope: ref })
    return (
        <section className="home-hero-prod" ref={ref}>
            <div className="container grid">
                <div className="home-hero-prod-title-wrap">
                    <h2 className="heading h1 txt-up txt-black home-hero-prod-title">
                        {props.prod_sub_title}
                    </h2>
                </div>
            </div>
        </section>
    )
}
export default HomeHeroProduct