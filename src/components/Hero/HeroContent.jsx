
import { useNavigate, useLocation } from "react-router-dom";

import Button from "../Button/Button";
import SectionTitle from "../SectionTitle/SectionTitle";

import {
  CalendarIcon,
  PhoneIcon
} from "../../icons";

const buttonIcons = {
  calendar: CalendarIcon,
  "calendar-days": CalendarIcon,
  phone: PhoneIcon,
};

const getButtonIcon = (name, fallback) => {
  const key =
    typeof name === "string"
      ? name.trim().toLowerCase()
      : "";

  return buttonIcons[key] || fallback;
};

const safeDestination = (value, fallback) => {
  if (typeof value !== "string") return fallback;

  const link = value.trim();

  if (link.startsWith("/") && !link.startsWith("//")) {
    return link;
  }

  if (/^https?:\/\//i.test(link)) return link;

  if (/^(tel:|mailto:)/i.test(link)) return link;

  return fallback;
};

const HeroContent = ({ home }) => {

  const navigate = useNavigate();
  const location = useLocation();

  const BookingIcon = getButtonIcon(
    home.booking_button_icon,
    CalendarIcon
  );

  const ConsultIcon = getButtonIcon(
    home.consult_button_icon,
    PhoneIcon
  );

  const bookingLink = safeDestination(
    home.booking_button_link,
    "/appointment"
  );

  const consultLink = safeDestination(
    home.consult_button_link,
    "/#footer"
  );

  const handleNavigation = (destination) => {

    // لینک‌های خارجی، تماس و ایمیل
    if (/^(https?:\/\/|tel:|mailto:)/i.test(destination)) {
      if (/^https?:\/\//i.test(destination)) {
        window.open(destination, "_blank", "noopener,noreferrer");
      } else {
        window.location.href = destination;
      }

      return;
    }

    const [pathname, hash] = destination.split("#");

    const targetPath = pathname || "/";

    // اگر مقصد بخشی از صفحه اصلی باشد
    if (hash) {

      if (location.pathname !== targetPath) {
        navigate(destination);
        return;
      }

      navigate(destination);

      const targetElement = document.getElementById(hash);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }

      return;
    }

    navigate(destination);
  };

  return (
    <div className="hero__content">

      <SectionTitle
        badge={home.badge_text || ""}
        title={home.doctor_name || ""}
        subtitle={home.subtitle || ""}
        description={home.biography || ""}
      />

      <div className="hero__buttons">

        {/* Booking Button */}
        <div className="hero__buttonLink">

          <Button
            size="lg"
            startIcon={<BookingIcon size={25} />}
            onClick={() => handleNavigation(bookingLink)}
          >
            {home.booking_button_text || "رزرو نوبت"}
          </Button>

        </div>

        {/* Consultation Button */}
        <div className="hero__buttonLink">

          <Button
            size="lg"
            variant="outline"
            startIcon={<ConsultIcon size={25} />}
            onClick={() => handleNavigation(consultLink)}
          >
            {home.consult_button_text || "دریافت مشاوره"}
          </Button>

        </div>

      </div>
    </div>
  );
};

export default HeroContent;
