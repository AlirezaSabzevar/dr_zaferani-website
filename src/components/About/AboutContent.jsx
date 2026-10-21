
import { Link } from "react-router-dom";

import Button from "../Button/Button";
import SectionTitle from "../SectionTitle/SectionTitle";

import {
    CalendarIcon,
    CheckIcon,
} from "../../icons";

const AboutContent = ({ about }) => {

    const specialties = [...(about.specialties || [])]
        .sort((a, b) => a.order - b.order);

    const stats = [...(about.stats || [])]
        .sort((a, b) => a.order - b.order);

    const bookingLink = about.booking_button_link || "/appointment";

    const isInternalLink = bookingLink.startsWith("/");

    const BookingButton = (
        <Button
            size="lg"
            startIcon={<CalendarIcon size={25} />}
        >
            {about.booking_button_text || "رزرو نوبت مشاوره"}
        </Button>
    );

    return (
        <div className="about__content">

            <SectionTitle
                badge={about.badge_text}
                title={about.doctor_name}
                subtitle={about.short_bio}
            />

            {/* Biography */}
            <div className="about__story">

                <div className="about__storyLine"></div>

                <p>{about.long_bio}</p>

            </div>

            {/* Specialties */}
            <ul className="about__features">

                {specialties.map((specialty) => (
                    <li
                        key={specialty.id}
                        className="about__feature"
                    >
                        <span className="about__featureIcon">
                            <CheckIcon />
                        </span>

                        <span>{specialty.title}</span>
                    </li>
                ))}

            </ul>

            {/* Statistics */}
            <div className="about__stats">

                {stats.map((stat) => (
                    <div
                        className="about__stat"
                        key={stat.id}
                    >
                        <strong>{stat.value}</strong>
                        <span>{stat.label}</span>
                    </div>
                ))}

            </div>

            {/* Booking Button */}
            {isInternalLink ? (
                <Link to={bookingLink}>
                    {BookingButton}
                </Link>
            ) : (
                <a
                    href={bookingLink}
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {BookingButton}
                </a>
            )}

        </div>
    );
};

export default AboutContent;
