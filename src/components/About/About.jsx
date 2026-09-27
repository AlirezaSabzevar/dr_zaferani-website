import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";

import "./About.css";

const About = () => {

    return (

        <section id="about" className="about">

            <div className="about__shape about__shape--one"></div>

            <div className="about__shape about__shape--two"></div>

            <div className="container">

                <div className="about__layout">

                    <AboutImage />

                    <AboutContent />

                </div>

            </div>

        </section>

    );

};

export default About;