import Card from "../Card/Card";
import InfoCard from "../InfoCard/InfoCard";
import "./Hero.css";

const HeroImage = ({ home }) => {
  const baseURL = import.meta.env.VITE_API_URL;
  let imageURL = "";
  if (home.doctor_image && baseURL) {
    try {
      imageURL = new URL(home.doctor_image, baseURL).href;
    } catch {
      imageURL = "";
    }
  }

  return (
    <div className="hero__imageWrapper">
      <div className="hero__imageBackground"></div>
      <div className="hero__circle"></div>
      <div className="hero__blur"></div>
      <Card className="hero__imageCard">
        {imageURL && <img src={imageURL} alt={home.doctor_name || "تصویر پزشک"} />}
        <InfoCard
          className="hero__experience"
          value={home.experience_years != null ? String(home.experience_years) : ""}
          label={home.experience_label || "سال تجربه"}
        />
      </Card>
    </div>
  );
};

export default HeroImage;
