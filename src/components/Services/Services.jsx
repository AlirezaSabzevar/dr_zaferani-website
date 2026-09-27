import servicesData from "../../data/servicesData";
import SectionTitle from "../SectionTitle/SectionTitle";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

import { ArrowLeftIcon } from "../../icons";

import ServiceCard from "./ServiceCard";

import "./Services.css";

const Services = () => {

    // فقط ۴ خدمت منتخب
    const featuredServices = servicesData.slice(0, 4);

    return (

        <section
            className="services"
            id="services"
        >

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

                    {

                        featuredServices.map((service) => (

                            <ServiceCard
                                key={service.id}
                                {...service}
                            />

                        ))

                    }

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