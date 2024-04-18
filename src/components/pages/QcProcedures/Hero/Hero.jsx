import { useEffect } from 'react'
import './Hero.scss'

function ComplianceHero({ ...props }) {

    // useEffect(() => {
    //     console.log(props);
    // }, [])
    return (
        <section className='complian-hero'>
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up complian-hero-title">{props.title[0].text}</h1>
                <div className="txt txt-20 txt-med complian-hero-sub">{props.sub}</div>
            </div>
            <div className="complian-hero-img">
                <div className="line"></div>
                <div className="complian-hero-img-inner">
                    <img src={props.img.url} alt={props.img.alt} width={props.img.dimensions.width} className='img img-fill' />
                </div>
            </div>
        </section>
    )
}

export default ComplianceHero