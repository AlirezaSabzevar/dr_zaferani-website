import doctorImage from "../../assets/images/doctor.png";
import Card from "../Card/Card";
import heroData from "../../data/heroData";
import InfoCard from "../InfoCard/InfoCard";
import {ExperienceIcon, StarIcon} from "../../icons";

import "./Hero.css";

const HeroImage = () => {
    return (

        <div className="hero__imageWrapper">

            <div className="hero__imageBackground"></div>

            <div className="hero__circle"></div>

            <div className="hero__blur"></div>

            <Card className="hero__imageCard">

              <img
                src={doctorImage}
                alt={heroData.name}
              />

              <InfoCard
                className="hero__experience"
                value={heroData.experience.number}
                label={heroData.experience.text}
              />

            </Card>

        </div>

    );
};

export default HeroImage;