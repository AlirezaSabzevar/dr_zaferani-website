import { useEffect, useState } from "react";
import "./Appointment.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import { getAppointment } from "../../components/api";

import {
  PhoneIcon,
  CalendarIcon,
  LocationIcon,
  ClockIcon,
  WhatsAppIcon,
  TelegramIcon,
  UserIcon,
  CheckIcon,
} from "../../icons";

// نام آیکون از Django دریافت می‌شود؛ نیاز به فایل iconMap جداگانه نیست.
const icons = {
  phone: PhoneIcon,
  telephone: PhoneIcon,
  mobile: PhoneIcon,
  calendar: CalendarIcon,
  "calendar-days": CalendarIcon,
  location: LocationIcon,
  "map-pin": LocationIcon,
  clock: ClockIcon,
  whatsapp: WhatsAppIcon,
  telegram: TelegramIcon,
  user: UserIcon,
  check: CheckIcon,
  "circle-check": CheckIcon,
};

const getMethodIcon = (name) =>
  icons[typeof name === "string" ? name.trim().toLowerCase() : ""] || PhoneIcon;

// فقط پروتکل‌های مناسب لینک‌های عمومی را مجاز می‌دانیم.
const safeLink = (link) => {
  if (typeof link !== "string" || !link.trim()) return "";
  const value = link.trim();
  if (/^(https?:\/\/|tel:|mailto:|sms:)/i.test(value)) return value;
  return "";
};

const Appointment = () => {
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const loadAppointment = async () => {
      try {
        const data = await getAppointment();
        if (!Array.isArray(data.methods)) {
          throw new Error("ساختار اطلاعات نوبت‌دهی نامعتبر است.");
        }
        if (active) setAppointment(data);
      } catch (err) {
        if (active) setError(err.message || "دریافت اطلاعات نوبت‌دهی ناموفق بود.");
      } finally {
        if (active) setLoading(false);
      }
    };

    loadAppointment();
    return () => {
      active = false;
    };
  }, []);

  const settings = appointment?.settings || {};
  const methods = appointment?.methods || [];
  const phoneMethod = methods.find((item) => safeLink(item.link).startsWith("tel:"));
  const phoneLink = phoneMethod ? safeLink(phoneMethod.link) : "";

  return (
    <section className="appointment">
      <PageHeader
        title={settings.title || "رزرو نوبت"}
        subtitle={settings.description || "برای دریافت نوبت، از یکی از راه‌های ارتباطی زیر استفاده کنید."}
        breadcrumbs={[
          { label: "صفحه اصلی", href: "/" },
          { label: "رزرو نوبت" },
        ]}
      />

      <div className="container">
        {loading && <p role="status">در حال دریافت راه‌های رزرو نوبت...</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <>
            <div className="appointment__grid">
              {methods.map((item) => {
                const Icon = getMethodIcon(item.icon);
                const href = safeLink(item.link);
                const lines = Array.isArray(item.lines) && item.lines.length
                  ? item.lines
                  : String(item.value || "").split("\n");

                const content = (
                  <>
                    <Icon />
                    <h3>{item.title}</h3>
                    <p>
                      {lines.map((line, index) => (
                        <span key={index}>
                          {line}
                          {index < lines.length - 1 && <br />}
                        </span>
                      ))}
                    </p>
                  </>
                );

                return href ? (
                  <a
                    key={item.id}
                    href={href}
                    target={/^https?:\/\//i.test(href) ? "_blank" : undefined}
                    rel={/^https?:\/\//i.test(href) ? "noopener noreferrer" : undefined}
                    className="appointmentCard"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.id} className="appointmentCard">
                    {content}
                  </div>
                );
              })}
            </div>

            {methods.length === 0 && <p>هنوز راهی برای رزرو نوبت ثبت نشده است.</p>}

            {phoneLink && (
              <div className="appointment__footer">
                <a href={phoneLink} style={{ textDecoration: "none" }}>
                  <Button startIcon={<PhoneIcon />}>
                    تماس برای رزرو نوبت
                  </Button>
                </a>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default Appointment;
