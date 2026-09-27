import { useState } from "react";

import SectionTitle from "../SectionTitle/SectionTitle";
import FAQItem from "./FAQItem";

import faqData from "../../data/faqData";

import "./FAQ.css";

const FAQ = () => {

    const [activeId, setActiveId] = useState(1);

    const handleToggle = (id) => {

        setActiveId((prev) => (prev === id ? null : id));

    };

    return (

        <section
            className="faq"
            id="faq"
        >

            <div className="container">

                <SectionTitle

                    badge="سوالات متداول"

                    title="پاسخ به سوالات پرتکرار"

                    subtitle="پیش از مراجعه، پاسخ رایج‌ترین سوالات بیماران را مطالعه کنید."

                    center

                />

                <div className="faq__list">

                    {

                        faqData.map((item) => (

                            <FAQItem

                                key={item.id}

                                faq={item}

                                isOpen={activeId === item.id}

                                onToggle={() => handleToggle(item.id)}

                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

};

export default FAQ;