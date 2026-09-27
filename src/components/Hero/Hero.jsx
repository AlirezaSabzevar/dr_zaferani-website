import "./Hero.css";

import Container from "../Container/Container";

import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";

const Hero = () => {
  return (
  <section className="hero">

    <Container>

        <div className="hero__layout">

          <HeroContent />

          <HeroImage />

        </div>

    </Container>

  </section>
  );
};

export default Hero;