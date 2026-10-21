
import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
import { ArrowLeftIcon } from "../../icons";
import ServiceCard from "./ServiceCard";
import { getServices } from "../api";

import "./Services.css";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    const fetchServices = async () => {
      try {
        const data = await getServices();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات خدمات نامعتبر است.");
        }

        if (active) {
          setServices(
            [...data].sort(
              (a, b) => a.order - b.order
            )
          );
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

    fetchServices();

    return () => {
      active = false;
    };
  }, []);

  const featuredServices = services.slice(0, 4);

  return (
    <section className="services" id="services">
      <div className="services__shape services__shape--one"></div>
      <div className="services__shape services__shape--two"></div>

      <div className="container">
        <SectionTitle
          badge="خدمات تخصصی"
          title="خدمات چشم پزشکی"
          description="ارائه خدمات تخصصی درمان و جراحی چشم با بهره‌گیری از تکنولوژی‌های روز دنیا."
          center
        />

        <div className="services__grid">
          {loading && <p>در حال دریافت خدمات...</p>}

          {error && <p role="alert">{error}</p>}

          {!loading && !error &&
            featuredServices.map((service) => (
              <ServiceCard
                key={service.id}
                {...service}
              />
            ))
          }

          {!loading && !error && services.length === 0 && (
            <p>هنوز خدمتی ثبت نشده است.</p>
          )}
        </div>

        <div className="services__more">
          <Link to="/services" className="services__moreLink">
            <Button
              variant="outline"
              endIcon={<ArrowLeftIcon />}
            >
              مشاهده همه خدمات
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
