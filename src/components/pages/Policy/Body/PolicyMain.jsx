import './PolicyMain.scss'
import React, { useEffect, useState } from 'react';


function PolicyMain() {

    useEffect(() => {
        // function changeHtml() {
        //     function changeDate() {
        //         let target = document.querySelector('.policy-update-txt')
        //         let updateTarget = document.querySelector('[data-custom-class="subtitle"]')
        //         console.log(target.textContent, updateTarget.textContent);

        //         target.textContent = updateTarget.textContent
        //     }
        //     changeDate()

        //     function changeToc() {
        //         let parent = document.querySelector('.policy-nav-list')
        //         let itemClone = parent.querySelector('.policy-nav-item')
        //         parent.innerHTML = ''
        //         console.log(itemClone);

        //         document.querySelectorAll('[data-custom-class="heading_1"]').forEach((el) => {
        //             if (el.textContent !== '') {
        //                 let html = itemClone.cloneNode(true)
        //                 html.querySelector('.policy-nav-item-link').textContent = el.textContent

        //                 let datanav = el.textContent.replace(/^\d+\.\s*/, '').replace(/\s+/g, '-').toLowerCase()
        //                 html.querySelector('.policy-nav-item-link').setAttribute('data-nav-scrollto', datanav)
        //                 el.setAttribute('data-scrollto', datanav)
        //                 parent.appendChild(html)
        //             }
        //         })

        //     }
        //     changeToc()
        // }
        // changeHtml()

        // function activeScroll() {
        //     document.querySelectorAll('.policy-nav-item-link').forEach((link) => {
        //         link.addEventListener("click", function(e) {
        //             e.preventDefault();
        //             let targetScroll = document.querySelector(`[data-scrollto="${link.getAttribute('data-nav-scrollto')}"]`).offsetTop
        //             window.scrollTo({
        //                 top: targetScroll,
        //                 behavior: 'smooth'
        //             });
        //         })
        //     })
        // }
        // activeScroll()
    })

    return (
        <section className="policy-main">
            <div className="container grid">
                <div className="policy-update">
                    <div className="txt txt-20 txt-med policy-update-txt">Last updated October 1st, 2023</div>
                    <div className="line"></div>
                </div>
                <div className="policy-navtitle">
                    <div className="txt txt-20 txt-black txt-up policy-navtitle-txt">Navigation</div>
                    <div className="line"></div>
                    <div className="line line-ver"></div>
                </div>
                <div className="policy-nav">
                    <ul className="policy-nav-list">
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="preamble">Preamble</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="definitions">Definitions and key terms</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="information">Information collection and use</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="logdata">Log data</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="cookies">Cookies</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="service">Service providers</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="tracking">Tracking technologies</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="changes">Changes to this privacy policy</a>
                        </li>
                        <li className="policy-nav-item">
                            <a href="#" className='txt txt-18 txt-med policy-nav-item-link' data-nav-scrollto="contact">Contact us</a>
                        </li>
                    </ul>
                    <div className="line"></div>
                    <div className="line line-ver"></div>
                </div>
                <div className="policy-body">
                    <div className="line"></div>
                    <div className="policy-body-main">
                        <div className="txt txt-20 txt-med policy-body-main-richtxt">
                            <h2 data-scrollto="preamble">Preamble</h2>
                            <p>This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service. We will not use or share your information with anyone except as described in this Privacy Policy.</p>
                            <p>We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy.</p>
                            <h2 data-scrollto="definitions">DEFINITIONS AND KEY TERMS</h2>
                            <p>To help explain things as clearly as possible in this Privacy Policy, every time any of these terms are referenced, are strictly defined as:</p>
                            <ul>
                                <li>Cookie: small amount of data generated by a website and saved by your web browser. It is used to identify your browser, provide analytics, remember information about you such as your language preference or login information.</li>
                                <li>Company: when this policy mentions “Company,” “we,” “us,” or “our,” it refers to Kanak Naturals, that is responsible for your information under this Privacy Policy.</li>
                                <li>Country: where Kanak Naturals or the owners/founders of Depo Studio are based, in this case is America</li>
                                <li>Customer: refers to the company, organization or person that signs up to use the Kanak Naturals Service to manage the relationships with your consumers or service users.</li>
                                <li>Device: any internet connected device such as a phone, tablet, computer or any other device that can be used to visit Kanak Naturals and use the services.</li>
                                <li>IP address: Every device connected to the Internet is assigned a number known as an Internet protocol (IP) address. These numbers are usually assigned in geographic blocks. An IP address can often be used to identify the location from which a device is connecting to the Internet.</li>
                                <li>Personnel: refers to those individuals who are employed by Kanak Naturals or are under contract to perform a service on behalf of one of the parties.</li>
                                <li>Personal Data: any information that directly, indirectly, or in connection with other information — including a personal identification number — allows for the identification or identifiability of a natural person.</li>
                                <li>Service: refers to the service provided by Kanak Naturals as described in the relative terms (if available) and on this platform.</li>
                                <li>Third-party service: refers to advertisers, contest sponsors, promotional and marketing partners, and others who provide our content or whose products or services we think may interest you.</li>
                            </ul>
                            <h2 data-scrollto="information">Information Collection And Use</h2>
                            <p>While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, name, phone number, postal address, other information (“Personal Information”).</p>
                            <p>We collect this information for the purpose of providing the Service, identifying and communicating with you, responding to your requests/inquiries, servicing your purchase orders, and improving our services.</p>
                            <h2 data-scrollto="logdata">Log Data</h2>
                            <p>We may also collect information that your browser sends whenever you visit our Service (“Log Data”). This Log Data may include information such as your computer’s Internet Protocol (“IP”) address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.</p>
                            <p>In addition, we may use third party services such as Google Analytics that collect, monitor and analyse this type of information in order to increase our Service’s functionality. These third party service providers have their own privacy policies addressing how they use such information.</p>
                            <h2 data-scrollto="cookies">Cookies</h2>
                            <p>Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and transferred to your device. We use cookies to collect information in order to improve our services for you.</p>
                            <h2 data-scrollto="service">Service Providers</h2>
                            <p>We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services and/or to assist us in analysing how our Service is used.</p>
                            <p>These third parties have access to your Personal Information only to perform specific tasks on our behalf and are obligated not to disclose or use your information for any other purpose.</p>
                            <h2 data-scrollto="security">Security</h2>
                            <p>The security of your Personal Information is important to us, and we strive to implement and maintain reasonable, commercially acceptable security procedures and practices appropriate to the nature of the information we store, in order to protect it from unauthorised access, destruction, use, modification, or disclosure.</p>
                            <p>However, please be aware that no method of transmission over the internet, or method of electronic storage is 100% secure and we are unable to guarantee the absolute security of the Personal Information we have collected from you.</p>
                            <h2 data-scrollto="tracking">TRACKING TECHNOLOGIES</h2>
                            <p>We use Cookies to enhance the performance and functionality of our website but are non-essential to their use. However, without these cookies, certain functionality like videos may become unavailable or you would be required to enter your login details every time you visit the website as we would not be able to remember that you had logged in previously.</p>
                            <h2 data-scrollto="changes">Changes To This Privacy Policy</h2>
                            <p>We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.</p>
                            <p>If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us or by placing a prominent notice on our website.</p>
                            <h2 data-scrollto="contact">Contact Us</h2>
                            <p>If you have any questions about this Privacy Policy, please contact us at @info.kanaknaturals</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default PolicyMain