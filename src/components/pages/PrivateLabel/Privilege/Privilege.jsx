import './Privilege.scss'

function PrivatePrivilege({ ...props }) {
    return (
        <section className='private-privilege bg-dark'>
            <div className="container grid">
                <div className="private-privilege-head">
                    <h1 className="heading h0 txt-black txt-up private-privilege-title">All Perks, <span className='txt-green'>No Quirks</span></h1>
                    <div className="txt txt-18 txt-med private-privilege-sub"> We're not just selling plates and bowls; we're offering a partnership where your brand gets the VIP treatment it deserves.</div>
                </div>
                <div className="private-privilege-main">
                    {[...Array(3)].map((el, idx) => (
                        <div className="private-privilege-item" key={idx} style={{ '--idx': 2 - idx }}>
                            <div className="private-privilege-item-inner">
                                <h3 className="heading h5 txt-black txt-up private-privilege-item-title">Free Customization</h3>
                                <div className="private-privilege-item-sub-wrap">
                                    <div className="txt txt-18 txt-med private-privilege-item-sub"> Emboss it, print it, make it yours. And no, we're not charging extra for the cool factor.</div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PrivatePrivilege
