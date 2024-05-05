import ArrowUpRight from '@components/globals/IcArrow/ArrowUpRight';


function HomeValueItem({ ...props }) {
    return (
        <div className="home-val-main-item bg-dark">
            <div className="home-val-main-item-head">
                <div className="heading txt-up txt-black home-val-main-item-num">
                    {props.idx + 1 + '.'}
                </div>
                <div className="home-val-main-item-ic">
                    {props.ic}
                </div>
            </div>
            <div className="home-val-main-item-body">
                <h3 className="heading h1 txt-up txt-black home-val-main-item-title">
                    {props.title}
                </h3>
                <p className="txt txt-18 txt-med home-val-main-item-sub">
                    {props.sub_title}
                </p>
                <a href="#" className="txt-orange home-val-main-item-link txt-link" data-cursor="txtLink">
                    <div className="txt txt-18 txt-med">Learn more</div>
                    <div className="ic"><ArrowUpRight /></div>
                </a>
            </div>
            {props.idx != 0 && <div className="line line-left"></div>}
        </div>
    )
}
export default HomeValueItem