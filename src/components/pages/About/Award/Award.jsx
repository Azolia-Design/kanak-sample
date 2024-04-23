import './Award.scss';
import { useEffect, useRef } from "react";
import { animate, inView, scroll, stagger, timeline } from "motion";
import SplitType from "split-type";
import useSelector from "@/components/hooks/useSelector";

function AboutAward({...props}) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    return (
        <section className="abt-award">
            <div className="container grid">
                <div className="abt-award-title-wrap">
                    <div className="heading h4 txt-black txt-up abt-award-label">
                        Awards & Endorsements
                    </div>
                    <h2 className="heading h0 txt-black txt-up abt-award-title">
                        Celebrating Impact Over <span className="txt-green">Accolades</span>
                    </h2>
                </div>
                <div className="abt-award-grp">
                    <div className="abt-award-grp-head">
                        <div className="dot"></div>
                        <h3 className="heading h4 txt-black txt-up abt-award-grp-head-title">
                            Awards
                        </h3>
                        <div className="line"></div>
                    </div>
                    <div className="abt-award-grp-body top">
                        <div className="abt-award-item">
                            <div className="abt-award-item-img-wrap">
                                {props.abtAwardTop}
                            </div>
                            <div className="abt-award-item-content">
                                <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                    PLMA 2022 Best Plate Award
                                </h3>
                                <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                    Our Sustainables® 9” Octi-Square Plate has clinched the <span className="txt-bold">PLMA 2022 Best Plate Award</span> in the Home & Household category, standing out among thousands with its innovative, eco-friendly design.
                                </p>
                                <a href="/kustomers/retail" className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink">
                                    <span>View Sustainables® Collection</span>
                                    <div className="ic ic-16">
                                        {props.icArrExt}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="abt-award-grp-head">
                        <div className="dot"></div>
                        <h3 className="heading h4 txt-black txt-up abt-award-grp-head-title">
                            Endorsements
                        </h3>
                        <div className="line"></div>
                    </div>
                    <div className="abt-award-grp-body bot">
                        <div className="abt-award-item">
                            <div className="abt-award-item-img-wrap">
                                {props.abtAwardBot1}
                            </div>
                            <div className="abt-award-item-content">
                                <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                    DEI Commitment with McDonalds
                                </h3>
                                <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                We pledge along with McDonald's to demonstrate a commitment to diversity, equity and inclusion in ways meaningful to our organization and that also accelerate change and innovation throughout our collective value chain.
                                </p>
                                <a href="#" className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink">
                                    <span>View pledge</span>
                                    <div className="ic ic-16">
                                        {props.icArrExt}
                                    </div>
                                </a>
                            </div>
                            <div className="line line-ver"></div>
                        </div>
                        <div className="abt-award-item">
                            <div className="abt-award-item-img-wrap">
                                {props.abtAwardBot2}
                            </div>
                            <div className="abt-award-item-content">
                                <h3 className="heading h2 txt-black txt-up abt-award-item-content-title">
                                    A “Smart” Retailer's Endorsement
                                </h3>
                                <p className="txt txt-18 txt-med abt-award-item-content-sub">
                                    Since my involvement with the Kanak Naturals team that started over 5 years, I have found Kanak company to be world class in many ways. The product quality is excellent, consistent and their delivery has been on time.
                                </p>
                                <a href="#" className="txt txt-18 txt-bold abt-award-item-content-link txt-link" data-cursor="txtLink">
                                    <span>View letter</span>
                                    <div className="ic ic-16">
                                        {props.icArrExt}
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default AboutAward