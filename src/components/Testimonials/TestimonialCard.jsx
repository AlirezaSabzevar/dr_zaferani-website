
import Card from "../Card/Card";

import {
    StarIcon,
    CheckIcon
} from "../../icons";

// تبدیل تاریخ میلادی به شمسی
const formatPersianDate = (dateString) => {
    if (!dateString) return "";

    const date = new Date(
        /^\d{4}-\d{2}-\d{2}$/.test(dateString)
            ? `${dateString}T12:00:00Z`
            : dateString
    );

    if (Number.isNaN(date.getTime())) {
        return dateString;
    }

    return new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        timeZone: "Asia/Tehran"
    }).format(date);
};

const TestimonialCard = ({ testimonial }) => {

    const rating = Math.min(
        5,
        Math.max(
            0,
            Math.floor(Number(testimonial.rating) || 0)
        )
    );

    return (
        <Card className="testimonialCard">

            <div className="testimonialCard__stars">
                {Array.from({ length: rating }, (_, index) => (
                    <StarIcon key={index} />
                ))}
            </div>

            <p className="testimonialCard__comment">
                "{testimonial.text}"
            </p>

            {testimonial.is_verified && (
                <div className="testimonialCard__verified">
                    <CheckIcon />
                    <span>بیمار تأیید شده</span>
                </div>
            )}

            <div className="testimonialCard__footer">

                <div>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.subject}</span>
                </div>

                <small dir="ltr">
                    {formatPersianDate(testimonial.date)}
                </small>

            </div>

        </Card>
    );
};

export default TestimonialCard;
