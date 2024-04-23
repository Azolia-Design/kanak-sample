import './Commit.scss';
import { useRef, useEffect } from "react";
import { animate, timeline, stagger, inView, scroll } from "motion";
import SplitType from 'split-type';
import useSelector from '@/components/hooks/useSelector';

function AboutCommit({...props}) {
    const sectionRef = useRef();
    const q = useSelector(sectionRef);

    return (
        <section className="abt-commit">
            <div className="line"></div>
            <div className="container grid">
                <div className="abt-commit-title-wrap">
                    <div className="heading h4 txt-black txt-up abt-commit-label">
                        DEI commitment
                    </div>
                    <h2 className="heading h0 txt-up txt-black abt-commit-title">
                        Walking the Talk
                    </h2>
                </div>
                <div className="abt-commit-img-wrap">
                    {props.abtCommitImg}
                </div>
                <div className="abt-commit-sub-wrap">
                    <div className="abt-commit-sub-rictxt">
                        <p className="txt txt-18 txt-med abt-commit-sub">
                            We don't just support diversity, equity, and inclusion; we embody it. Teaming up with giants like McDonald's, we're not just changing the narrative; we're rewriting it.
                        </p>
                        <p className="txt txt-18 txt-med abt-commit-sub">
                        Kanak Naturals is more than a brand - it's a testament to inclusivity and progression.
                        </p>
                    </div>
                    <a href="#" className="txt txt-18 txt-bold txt-link abt-commit-link" data-cursor="txtLink">
                        <span>Read more</span>
                        <div className="ic ic-16">
                            {props.icArrExt}
                        </div>
                    </a>

                </div>
            </div>
        </section>
    )
}
export default AboutCommit;