import { useEffect } from 'react'
import './Service.scss'


function ComplianceService({ ...props }) {

    useEffect(() => { console.log(props); }, [])
    return (
        <section className="complian-ser">
            <div className="container grid">
                <h1 className="heading h0 txt-black txt-up complian-ser-title">{props.newTitle}</h1>
                <div className="txt txt-18 txt-med complian-ser-sub">{props.sub}</div>
                <div className="complian-ser-main">
                    {props.list.map((item, idx) => (
                        <div className="complian-ser-main-item" key={idx}>
                            <div className="complian-ser-main-item-ic">
                                <div className="ic ic-80">
                                    <img src={item.item_icon.url} alt={item.item_icon.alt} width={item.item_icon.dimensions.width} />
                                </div>
                            </div>
                            <h3 className="heading h5 txt-black txt-up complian-ser-main-item-title">{item.item_title[0].text}</h3>
                            {idx % 2 == 0 && (<div className="line line-ver line-mid"></div>)}
                            <div className="line line-bot"></div>
                        </div>
                    ))}
                    <div className="line line-top"></div>
                    <div className="line line-ver line-left"></div>
                    <div className="line line-ver line-right"></div>
                </div>
            </div>
        </section>
    )
}

export default ComplianceService
