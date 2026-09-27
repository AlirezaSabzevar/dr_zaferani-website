import doctorImage from "../../assets/images/doctor(2).png";

import aboutData from "../../data/aboutData";

import {
    TrophyIcon,
    ExperienceIcon
} from "../../icons";

const AboutImage = () => {

    return (

        <div className="about__imageWrapper">

            <div className="about__imageGlow"></div>

            <div className="about__imageCircle"></div>

            <div className="about__imageCard">

                <img
                    src={doctorImage}
                    alt={aboutData.name}
                />

            </div>

            {/* Floating Experience */}

            <div className="about__floatingCard">

                <ExperienceIcon />

                <div>

                    <strong>

                        {aboutData.experience}

                    </strong>

                    <span>

                        سال تجربه

                    </span>

                </div>

            </div>

            {/* Achievement */}

            <div className="about__awardCard">

                <TrophyIcon />

                <div>

                    <strong>

                        پزشک برگزیده

                    </strong>

                    <span>

                        خدمات تخصصی چشم

                    </span>

                </div>

            </div>

            {/* Signature */}

            <span className="about__signature">

                {aboutData.signature}

            </span>

        </div>

    );

};

export default AboutImage;