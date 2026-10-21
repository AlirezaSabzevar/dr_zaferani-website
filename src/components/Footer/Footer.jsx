import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

import fallbackLogo from "../../assets/images/logo.png";
import {
  InstagramIcon,
  TelegramIcon,
  WhatsAppIcon,
  PhoneIcon,
  MailIcon,
  LocationIcon,
  GlobeIcon,
} from "../../icons";
import { getContact } from "../api";

const socialIconMap = {
  instagram: InstagramIcon,
  telegram: TelegramIcon,
  whatsapp: WhatsAppIcon,
};

const isSafeExternalUrl = (url) => {
  if (typeof url !== "string") return false;
  try {
    return ["https:", "http:"].includes(new URL(url).protocol);
  } catch {
    return false;
  }
};

const getSafeLink = (value) => {
  if (typeof value !== "string") return null;
  const link = value.trim();
  if (!link || link === "#" || link.startsWith("//")) return null;
  if (link.startsWith("/")) return link;
  if (link.startsWith("#")) return `/${link}`;
  return isSafeExternalUrl(link) ? link : null;
};

const FooterLink = ({ href, children }) => {
  const link = getSafeLink(href);
  if (!link) return <span>{children}</span>;
  if (link.startsWith("/")) return <Link to={link}>{children}</Link>;
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};

const Footer = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadFooter = async () => {
      try {
        const result = await getContact();
        if (active) setData(result);
      } catch (err) {
        if (active) setError(err.message || "خطا در دریافت اطلاعات فوتر");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadFooter();
    return () => { active = false; };
  }, []);

  const info = data?.info || {};
  const socials = Array.isArray(data?.social_links) ? data.social_links : [];
  const quickLinks = Array.isArray(data?.quick_links) ? data.quick_links : [];
  const servicesLinks = Array.isArray(data?.services_links) ? data.services_links : [];

  const logoUrl = info.logo
    ? new URL(info.logo, import.meta.env.VITE_API_URL).href
    : fallbackLogo;

  const clinicPhone = info.clinic_phone?.trim();
  const mobilePhone = info.mobile_phone?.trim();
  const email = info.email?.trim();
  const makeTel = (phone) => `tel:${phone.replace(/[^\d+]/g, "")}`;
  const emailLink = email ? `mailto:${email}` : null;

  return (
    <footer className="footer" id="footer">
      <div className="container">
        {loading && <p role="status">در حال دریافت اطلاعات تماس...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && (
          <>
            <div className="footer__grid">
              <div className="footer__column__sec1">
                <img src={logoUrl} alt={info.title || "لوگوی پزشک"} className="footer__logo" />
                <h3>{info.title || ""}</h3>
                <p>{info.subtitle || ""}</p>
                <span>{info.description || ""}</span>
                <div className="footer__socials">
                  {socials.map((social) => {
                    const safeUrl = getSafeLink(social.url);
                    if (!safeUrl) return null;
                    const SocialIcon = socialIconMap[social.icon?.trim().toLowerCase()] || GlobeIcon;
                    return (
                      <a
                        key={social.id}
                        href={safeUrl}
                        aria-label={social.title || social.icon || "شبکه اجتماعی"}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <SocialIcon />
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="footer__column__sec2">
                <h4>{info.quick_links_title || "دسترسی سریع"}</h4>
                <ul>
                  {quickLinks.map((item) => (
                    <li key={item.id}>
                      <FooterLink href={item.link}>{item.title}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__column__sec3">
                <h4>{info.services_links_title || "خدمات"}</h4>
                <ul>
                  {servicesLinks.map((item) => (
                    <li key={item.id}>
                      <FooterLink href={item.link}>{item.title}</FooterLink>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="footer__column__sec4">
                <h4>{info.contact_title || "اطلاعات تماس"}</h4>
                <ul className="footer__contact">
                  {clinicPhone && (
                    <li><PhoneIcon /><a href={makeTel(clinicPhone)}>{clinicPhone}</a></li>
                  )}
                  {mobilePhone && (
                    <li><PhoneIcon /><a href={makeTel(mobilePhone)}>{mobilePhone}</a></li>
                  )}
                  {email && (
                    <li><MailIcon /><a href={emailLink}>{email}</a></li>
                  )}
                  {info.address && (
                    <li>
                      <LocationIcon />
                      {isSafeExternalUrl(info.map_url) ? (
                        <a href={info.map_url} target="_blank" rel="noopener noreferrer">{info.address}</a>
                      ) : (
                        <span>{info.address}</span>
                      )}
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="footer__bottom">
              <p>{info.copyright_text || `© کلیه حقوق این وب‌سایت محفوظ است.`}</p>
            </div>
          </>
        )}
      </div>
    </footer>
  );
};

export default Footer;
