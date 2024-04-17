import { useEffect } from "react"
import "./style.scss"

function GlobalExplore({ ...props }) {
    useEffect(() => {
        // console.log(props);
    }, [])
    return (
        <div className="global-explore bg-dark">
            <div className="container grid">
                <h2 className="heading h3 txt-black txt-up global-explore-title">Explore More</h2>
                <div className="global-explore-list">
                    {props.list.map(({ data }, idx) => (
                        <a href="#" className="global-explore-list-item" key={idx} data-cursor="ext">
                            <div className="global-explore-list-item-img">
                                <div className="global-explore-list-item-img-inner">
                                    <img src={data.thumbnail.url} alt={data.thumbnail.alt} width={data.thumbnail.dimensions.width} className="img img-fill" />
                                </div>
                            </div>
                            <h1 className="heading h2 txt-black txt-up global-explore-list-item-title">{data.name[0].text}</h1>
                            {idx % 2 == 0 && (
                                <div className="line line-ver line-mid"></div>
                            )}
                        </a>
                    ))}
                    <div className="line line-top"></div>
                </div>
            </div>
        </div>
    )
}


export default GlobalExplore
