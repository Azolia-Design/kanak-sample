import { Mouse } from "@/components/core/mouse";
import { useEffect } from "react";
import "./Innovation.scss";


function KustomPackagingInnovation({ ...props }) {

    useEffect(() => {
    }, [])
    return (
        <section className="kuspack-innova">
            <div className="container grid">
                <div className="kuspack-innova-title-wrap">
                    <div className="heading h5 txt-black txt-up kuspack-innova-label">From the First Sketch to Final Delivery</div>
                    <h1 className="heading h0 txt-black txt-up kuspack-innova-title">Your Partner in <span className="txt-green">Packaging Innovation</span></h1>
                </div>
                <div className="txt txt-18 txt-med kuspack-innova-sub">At Kanak Naturals, we not only face packaging challenges head-on but turn them into groundbreaking opportunities for innovation. Our team becomes the architects of your vision, translating ideas into blueprints of sustainable, cost-efficient packaging solutions that wow your customers and protect our planet.</div>
                <div className="kuspack-innova-main">
                    {[...Array(3)].map((el, idx) => (
                        <div className="kuspack-innova-item" key={idx}>
                            <div className="kuspack-innova-item-icon"></div>
                            <h3 className="heading h4 txt-black txt-up kuspack-innova-item-title">Understanding and Innovation</h3>
                            <div className="txt txt-18 txt-med kuspack-innova-item-sub">We meticulously immerse ourselves in your operations to pinpoint your needs and deploy tailor-made innovations.</div>
                            <div className="line line-top"></div>
                            {idx == 2 && (
                                <div className="line line-bot"></div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default KustomPackagingInnovation