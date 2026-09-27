import "./Footer.css";

import logo from "../../assets/images/logo.png";

import footerData from "../../data/footerData";

import {

    InstagramIcon,

    TelegramIcon,

    WhatsAppIcon,

    PhoneIcon,

    MailIcon,

    LocationIcon

} from "../../icons";

const Footer = () => {

    return (

        <footer className="footer" id="footer">

            <div className="container">

                <div className="footer__grid">

                    {/* Doctor */}

                    <div className="footer__column__sec1">

                        <img

                            src={logo}

                            alt={footerData.doctor.name}

                            className="footer__logo"

                        />

                        <h3>

                            {footerData.doctor.name}

                        </h3>

                        <p>

                            {footerData.doctor.specialty}

                        </p>

                        <span>

                            {footerData.doctor.slogan}

                        </span>

                        <div className="footer__socials">

                            <a href={footerData.socials.instagram}>

                                <InstagramIcon/>

                            </a>

                            <a href={footerData.socials.telegram}>

                                <TelegramIcon/>

                            </a>

                            <a href={footerData.socials.whatsapp}>

                                <WhatsAppIcon/>

                            </a>

                        </div>

                    </div>

                    {/* Quick Links */}

                    <div className="footer__column__sec2">

                        <h4>

                            دسترسی سریع

                        </h4>

                        <ul>

                            {

                                footerData.quickLinks.map((item)=>(

                                    <li key={item.title}>

                                        <a href={item.href}>

                                            {item.title}

                                        </a>

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                    {/* Services */}

                    <div className="footer__column__sec3">

                        <h4>

                            خدمات

                        </h4>

                        <ul>

                            {

                                footerData.services.map((item)=>(

                                    <li key={item}>

                                        {item}

                                    </li>

                                ))

                            }

                        </ul>

                    </div>

                    {/* Contact */}

                    <div className="footer__column__sec4">

                        <h4>

                            اطلاعات تماس

                        </h4>

                        <ul className="footer__contact">

                            <li>

                                <PhoneIcon/>

                                <span>

                                    {footerData.contact.phone}

                                </span>

                            </li>

                            <li>

                                <PhoneIcon/>

                                <span>

                                    {footerData.contact.mobile}

                                </span>

                            </li>

                            <li>

                                <MailIcon/>

                                <span>

                                    {footerData.contact.email}

                                </span>

                            </li>

                            <li>

                                <LocationIcon/>

                                <span>

                                    {footerData.contact.address}

                                </span>

                            </li>

                        </ul>

                    </div>

                </div>

                <div className="footer__bottom">

                    <p>

                       © کلیه حقوق این وب‌سایت محفوظ و متعلق به دکتر محمد‌مهدی زعفرانی می‌باشد. ۱۴۰۵

                    </p>

                </div>

            </div>

        </footer>

    )

}

export default Footer;