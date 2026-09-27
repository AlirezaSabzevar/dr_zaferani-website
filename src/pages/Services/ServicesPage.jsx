import "./ServicesPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import ServiceCard from "../../components/Services/ServiceCard";

import servicesData from "../../data/servicesData";

const ServicesPage = () => {

    return (

        <section className="servicesPage">

            <PageHeader

                title="خدمات تخصصی"

                subtitle="تمامی خدمات تخصصی چشم پزشکی ارائه شده توسط دکتر محمدمهدی زعفرانی"

                breadcrumbs={[

                    {

                        label:"صفحه اصلی",

                        href:"/"

                    },

                    {

                        label:"خدمات"

                    }

                ]}

            />

            <div className="container">

                <div className="servicesPage__grid">

                    {

                        servicesData.map((service)=>(

                            <ServiceCard

                                key={service.id}

                                {...service}

                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

}

export default ServicesPage;