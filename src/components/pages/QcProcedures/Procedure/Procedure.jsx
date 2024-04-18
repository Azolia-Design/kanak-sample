import './Procedure.scss'
import { useEffect } from 'react';
import ArrowUpRight from "@components/globals/IcArrow/ArrowUpRight"

function ComplianceProcedure({ ...props }) {
    useEffect(() => {
    }, [])
    return (
        <section className='complian-proce'>
            <div className="line complian-proce-line"></div>
            <div className="container grid">
                <div className="heading h4 txt-black txt-up complian-proce-label">{props.label}</div>
                <h1 className="heading h0 txt-black txt-up complian-proce-title">{props.title[0].text}</h1>
                <div className="complian-proce-sub-wrap">
                    <p className="txt txt-18 txt-med complian-proce-sub">{props.newDes}</p>
                    <a href="/contact" className='txt txt-18 txt-bold complian-proce-link' data-cursor="txtLink" >
                        <div className="complian-proce-link-txt">{props.btn}</div>
                        <div className="ic ic-16"><ArrowUpRight /></div>
                    </a>
                </div>
                <div className="complian-proce-main">
                    {props.list.map((item, idx) => (
                        <div className="complian-proce-main-item bg-light" key={idx} style={
                            {
                                '--idx': idx + 1,
                                '--pd-bot': 5 - idx - 1,
                                '--mg-top': idx == 0 ? 0 : 5 - idx
                            }
                        }>
                            <div className="complian-proce-main-item-inner">
                                <div className="line line-top"></div>
                                <div className="complian-proce-main-item-content">
                                    <div className="complian-proce-main-item-title">
                                        <div className="complian-proce-main-item-title-dot"></div>
                                        <h3 className="heading h1 txt-up txt-black complian-proce-main-item-title-txt">
                                            {item.item_title[0].text}
                                        </h3>
                                    </div>
                                    <p className="txt txt-20 txt-med complian-proce-main-item-sub">
                                        {item.item_des}
                                    </p>
                                </div>
                                <div className="complian-proce-main-item-img">
                                    <div className="ic">
                                        <img src={item.item_image.url} alt={item.item_image.alt} width={item.item_image.dimensions.width} height={item.item_image.dimensions.height} className='img img-h' />
                                    </div>
                                </div>
                                {idx == 4 && (<div className="line line-bot"></div>)}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ComplianceProcedure