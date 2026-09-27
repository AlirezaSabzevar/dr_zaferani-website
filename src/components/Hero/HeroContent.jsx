import Button from "../Button/Button";
import SectionTitle from "../SectionTitle/SectionTitle";
import {CalendarIcon,PhoneIcon} from "../../icons";
import heroData from "../../data/heroData";
import { Link } from "react-router-dom";


const HeroContent = () => {
  return (

    <div className="hero__content">

      <SectionTitle
        badge={heroData.badge}
        title={heroData.name}
        subtitle={heroData.specialty}
        description={heroData.description}
      />


      <div className="hero__buttons">

        <Link to="/appointment" className="hero__buttonLink">

          <Button size="lg" startIcon={<CalendarIcon size={25} />}>

          رزرو نوبت

          </Button>

        </Link>



        <a href="#footer" className="hero__buttonLink">

          <Button size="lg" variant="outline" startIcon={<PhoneIcon size={25} />}>

          دریافت مشاوره

          </Button>

        </a>

      </div>

    </div>

  );
};

export default HeroContent;