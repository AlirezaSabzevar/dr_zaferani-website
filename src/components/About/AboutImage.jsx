
import {
    TrophyIcon,
    ExperienceIcon
} from "../../icons";

const AboutImage = ({ about }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    const doctorImage = about.doctor_image
        ? new URL(about.doctor_image, API_URL).href
        : "";

    return (
        <div className="about__imageWrapper">

            <div className="about__imageGlow"></div>
            <div className="about__imageCircle"></div>

            <div className="about__imageCard">

                {doctorImage && (
                    <img
                        src={doctorImage}
                        alt={about.doctor_name}
                    />
                )}

            </div>

            {/* Floating Experience */}
            <div className="about__floatingCard">

                <ExperienceIcon />

                <div>
                    <strong>
                        {about.experience_badge_value}
                    </strong>

                    <span>
                        {about.experience_badge_label}
                    </span>
                </div>

            </div>

            {/* Achievement */}
            <div className="about__awardCard">

                <TrophyIcon />

                <div>
                    <strong>
                        {about.award_title}
                    </strong>

                    <span>
                        {about.award_subtitle}
                    </span>
                </div>

            </div>

            {/* Signature */}
            <span className="about__signature">
                {about.doctor_name_en}
            </span>

        </div>
    );
};

export default AboutImage;
