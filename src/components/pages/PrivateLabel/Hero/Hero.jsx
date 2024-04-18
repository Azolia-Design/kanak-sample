import './Hero.scss'


function PrivateHero({ ...props }) {
    return (
        <section className="private-hero">
            <div className="container grid">
                <h1 className="heading txt-180 txt-black txt-up private-hero-title">{props.title}</h1>
                <div className="private-hero-content">
                    <h3 className="heading h4 txt-black txt-up private-hero-content-smtitle">{props.smallTitle}</h3>
                    <p className="txt txt-18 txt-med private-hero-content-sub">{props.sub}</p>
                </div>
            </div>
        </section>
    )
}


export default PrivateHero
