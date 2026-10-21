import { useEffect, useState } from "react";
import Container from "../Container/Container";
import HeroImage from "./HeroImage";
import HeroContent from "./HeroContent";
import { getHome } from "../api";
import "./Hero.css";

const Hero = () => {
  const [home, setHome] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const loadHome = async () => {
      try {
        const data = await getHome();
        if (active) setHome(data);
      } catch (err) {
        if (active) setError(err.message || "خطا در دریافت اطلاعات صفحه اصلی.");
      } finally {
        if (active) setLoading(false);
      }
    };
    loadHome();
    return () => { active = false; };
  }, []);

  return (
    <section className="hero" id="home">
      <Container>
        {loading && <p role="status">در حال دریافت اطلاعات پزشک...</p>}
        {error && <p role="alert">{error}</p>}
        {!loading && !error && home && (
          <div className="hero__layout">
            <HeroContent home={home} />
            <HeroImage home={home} />
          </div>
        )}
      </Container>
    </section>
  );
};

export default Hero;
