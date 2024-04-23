import './Join.scss';
import { useRef, useEffect } from "react";
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function AboutJoin({...props}) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    return (
        <section className="abt-join bg-dark">
            <div className="container grid">
                <div className="abt-join-title-wrap">
                    <div className="heading h4 txt-black txt-up abt-join-label">
                        Join our movement
                    </div>
                    <h2 className="heading h0 txt-black txt-up abt-join-title">
                        Our pledge For a <span className="txt-green">greener</span> <span className="txt-green">future</span>
                    </h2>
                </div>
                <div className="abt-join-main">
                    <div className="abt-join-main-item bg-dark" style={{"--idx":1,"--pd-bot":2,"--mg-top":0}}>
                        <div className="abt-join-main-item-inner">
                            <div className="line line-top"></div>
                            <div className="abt-join-main-item-content">
                                <div className="abt-join-main-item-title">
                                    <div className="abt-join-main-item-title-dot"></div>
                                    <h3 className="heading h1 txt-up txt-black abt-join-main-item-title-txt">
                                        Expertise
                                    </h3>
                                </div>
                                <p className="txt txt-20 txt-med abt-join-main-item-sub">
                                    With Kanak Naturals, you're signing up for more than sustainability. You're joining hands with a legacy championing responsibility and ingenuity for over 25 years.
                                </p>
                            </div>
                            <div className="abt-join-main-item-img">
                                {props.joinImg1}
                            </div>
                        </div>
                    </div>
                    <div className="abt-join-main-item bg-dark" style={{"--idx":2,"--pd-bot":1,"--mg-top":2}}>
                        <div className="abt-join-main-item-inner">
                            <div className="line line-top"></div>
                            <div className="abt-join-main-item-content">
                                <div className="abt-join-main-item-title">
                                    <div className="abt-join-main-item-title-dot"></div>
                                    <h3 className="heading h1 txt-up txt-black abt-join-main-item-title-txt">
                                        Impact
                                    </h3>
                                </div>
                                <p className="txt txt-20 txt-med abt-join-main-item-sub">
                                    We believe every choice counts, every action matters, and every product you pick is a step forward, paving the path towards a sustainable, thriving planet.
                                </p>
                            </div>
                            <div className="abt-join-main-item-img">
                                {props.joinImg2}
                            </div>
                        </div>
                    </div>
                    <div className="abt-join-main-item bg-dark" style={{"--idx":3,"--pd-bot":0,"--mg-top":1}}>
                        <div className="abt-join-main-item-inner">
                            <div className="line line-top"></div>
                            <div className="abt-join-main-item-content">
                                <div className="abt-join-main-item-title">
                                    <div className="abt-join-main-item-title-dot"></div>
                                    <h3 className="heading h1 txt-up txt-black abt-join-main-item-title-txt">
                                        Thought-Leadership
                                    </h3>
                                </div>
                                <p className="txt txt-20 txt-med abt-join-main-item-sub">
                                    By rallying behind bamboo and sugarcane, we're not just creating products; we're setting the precedent for a future where sustainability isn't an option—it's the norm.
                                </p>
                            </div>
                            <div className="abt-join-main-item-img">
                                {props.joinImg3}
                            </div>
                            <div className="line line-bot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AboutJoin;