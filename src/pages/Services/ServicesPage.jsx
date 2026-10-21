
import { useEffect, useState } from "react";

import "./ServicesPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import ServiceCard from "../../components/Services/ServiceCard";
import { getServices } from "../../components/api";

const ServicesPage = () => {

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
                    const sortedServices = [...data].sort(
                        (a, b) => a.order - b.order
                    );

                    setServices(sortedServices);
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

    return (
        <section className="servicesPage">

            <PageHeader
                title="خدمات تخصصی"
                subtitle="تمامی خدمات تخصصی چشم پزشکی ارائه شده توسط دکتر محمدمهدی زعفرانی"
                breadcrumbs={[
                    {
                        label: "صفحه اصلی",
                        href: "/"
                    },
                    {
                        label: "خدمات"
                    }
                ]}
            />

            <div className="container">

                {loading && (
                    <p>در حال دریافت خدمات...</p>
                )}

                {error && (
                    <p role="alert">
                        خطا در دریافت خدمات: {error}
                    </p>
                )}

                {!loading && !error && services.length === 0 && (
                    <p>هنوز خدمتی ثبت نشده است.</p>
                )}

                {!loading && !error && services.length > 0 && (
                    <div className="servicesPage__grid">

                        {services.map((service) => (
                            <ServiceCard
                                key={service.id}
                                {...service}
                            />
                        ))}

                    </div>
                )}

            </div>

        </section>
    );
};

export default ServicesPage;
