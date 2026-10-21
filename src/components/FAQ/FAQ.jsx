
import { useEffect, useState } from "react";

import SectionTitle from "../SectionTitle/SectionTitle";
import FAQItem from "./FAQItem";

import { getFAQ } from "../api";

import "./FAQ.css";

const FAQ = () => {

    const [faqData, setFaqData] = useState(null);
    const [activeId, setActiveId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchFAQ = async () => {
            try {
                const data = await getFAQ();

                if (active) {
                    setFaqData(data);

                    // باز بودن اولین سوال به صورت پیش‌فرض
                    if (data.faqs.length > 0) {
                        setActiveId(data.faqs[0].id);
                    }
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

        fetchFAQ();

        return () => {
            active = false;
        };

    }, []);

    const settings = faqData?.settings || {};
    const faqs = faqData?.faqs || [];

    const handleToggle = (id) => {
        setActiveId((previous) =>
            previous === id ? null : id
        );
    };

    return (
        <section className="faq" id="faq">

            <div className="container">

                <SectionTitle
                    badge={
                        settings.badge_text ||
                        "سوالات متداول"
                    }
                    title={
                        settings.title ||
                        "پاسخ به سوالات پرتکرار"
                    }
                    subtitle={
                        settings.description ||
                        "پیش از مراجعه، پاسخ رایج‌ترین سوالات بیماران را مطالعه کنید."
                    }
                    center
                />

                {loading && (
                    <p role="status">
                        در حال دریافت سوالات متداول...
                    </p>
                )}

                {error && (
                    <p role="alert">{error}</p>
                )}

                {!loading && !error && (
                    <div className="faq__list">

                        {faqs.map((item) => (
                            <FAQItem
                                key={item.id}
                                faq={item}
                                isOpen={activeId === item.id}
                                onToggle={() =>
                                    handleToggle(item.id)
                                }
                            />
                        ))}

                        {faqs.length === 0 && (
                            <p>
                                هنوز سوالی ثبت نشده است.
                            </p>
                        )}

                    </div>
                )}

            </div>

        </section>
    );
};

export default FAQ;
