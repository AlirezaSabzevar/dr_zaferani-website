
import { useEffect, useState } from "react";

import AboutImage from "./AboutImage";
import AboutContent from "./AboutContent";
import { getAbout } from "../api";

import "./About.css";

const About = () => {

    const [about, setAbout] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchAbout = async () => {
            try {
                const data = await getAbout();

                if (active) {
                    setAbout(data);
                }
            } catch (err) {
                if (active) {
                    setError(err.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchAbout();

        return () => {
            active = false;
        };
    }, []);

    return (
        <section id="about" className="about">

            <div className="about__shape about__shape--one"></div>
            <div className="about__shape about__shape--two"></div>

            <div className="container">

                {loading && (
                    <p>در حال دریافت اطلاعات پزشک...</p>
                )}

                {error && (
                    <p role="alert">{error}</p>
                )}

                {!loading && !error && about && (
                    <div className="about__layout">
                        <AboutImage about={about} />
                        <AboutContent about={about} />
                    </div>
                )}

            </div>
        </section>
    );
};

export default About;
