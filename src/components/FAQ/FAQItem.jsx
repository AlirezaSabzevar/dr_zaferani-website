import { ChevronDownIcon } from "../../icons";

const FAQItem = ({faq,isOpen,onToggle}) => {

    return (

        <div className={`faqItem ${isOpen ? "active" : ""}`}>

            <button

                type="button"

                className="faqItem__question"

                onClick={onToggle}

                aria-expanded={isOpen}

                aria-controls={`faq-answer-${faq.id}`}

            >

                <span>

                    {faq.question}

                </span>

                <ChevronDownIcon />

            </button>

            <div

                id={`faq-answer-${faq.id}`}

                className="faqItem__answer"

            >

                <p>

                    {faq.answer}

                </p>

            </div>

        </div>

    );

};

export default FAQItem;