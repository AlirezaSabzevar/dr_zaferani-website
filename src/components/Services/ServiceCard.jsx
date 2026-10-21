
import {
  ArrowLeftIcon,
  HeartIcon,
  ShieldIcon,
  StarIcon,
  CheckIcon,
  EyeIcon,
  SearchIcon,
  SparklesIcon,
  ScanIcon,
  ServicesIcon,
} from "../../icons";

import "./Services.css";

// تبدیل نام آیکون دریافتی از Django
// به کامپوننت‌های موجود در پروژه
const iconMap = {
  heart: HeartIcon,
  shield: ShieldIcon,
  star: StarIcon,
  check: CheckIcon,
  eye: EyeIcon,
  search: SearchIcon,
  sparkles: SparklesIcon,
  scan: ScanIcon,
  services: ServicesIcon,
};

const ServiceCard = ({
  id,
  icon,
  title,
  description,
}) => {

  // انتخاب آیکون مناسب
  const Icon =
    iconMap[icon?.trim()?.toLowerCase()] || ServicesIcon;

  return (
    <article className="serviceCard">

      <span className="serviceCard__number">
        {String(id).padStart(2, "0")}
      </span>

      <div className="serviceCard__iconWrapper">

        <div className="serviceCard__glow"></div>

        <div className="serviceCard__icon">
          <Icon />
        </div>

      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <div className="serviceCard__footer">

        <span>اطلاعات بیشتر به‌زودی</span>

        <ArrowLeftIcon className="serviceCard__arrow" />

      </div>

    </article>
  );
};

export default ServiceCard;
