import aboutData from "../../data/aboutData";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import SectionTitle from "../SectionTitle/SectionTitle";

import {
    CalendarIcon,
    CheckIcon,
} from "../../icons";

const AboutContent = () => {

    return (

        <div className="about__content">

            <SectionTitle 
                badge={aboutData.badge}
                title={aboutData.name}
                subtitle={aboutData.specialty}
            />


            {/* Story */}

            <div className="about__story">

                <div className="about__storyLine"></div>

                <p>

                    {aboutData.description}

                </p>

            </div>

            {/* Features */}

            <ul className="about__features">

                {

                    aboutData.features.map((feature) => (

                        <li
                            key={feature}
                            className="about__feature"
                        >

                            <span className="about__featureIcon">

                                <CheckIcon />

                            </span>

                            <span>

                                {feature}

                            </span>

                        </li>

                    ))

                }

            </ul>

            {/* Statistics */}

            <div className="about__stats">

                <div className="about__stat">

                    <strong>

                        {aboutData.experience}

                    </strong>

                    <span>

                        سال تجربه

                    </span>

                </div>

                <div className="about__stat">

                    <strong>

                        {aboutData.patients}

                    </strong>

                    <span>

                        عمل جراحی موفق

                    </span>

                </div>

                <div className="about__stat">

                    <strong>

                        {aboutData.satisfaction}

                    </strong>

                    <span>

                        رضایت بیماران

                    </span>

                </div>

            </div>

            {/* CTA */}
            <Link to="/appointment">
                <Button
                    size="lg"
                    startIcon={<CalendarIcon size={25} />}
                >

                    رزرو نوبت مشاوره

                </Button>
            </Link>
        </div>

    );

};

export default AboutContent;