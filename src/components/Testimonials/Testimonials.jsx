import { useEffect, useState } from "react";

import SectionTitle from "../SectionTitle/SectionTitle";
import Button from "../Button/Button";
import TestimonialCard from "./TestimonialCard";

import testimonialsData from "../../data/testimonialsData";
import servicesData from "../../data/servicesData";

import {
    StarIcon,
    UserIcon,
    CheckIcon,
    ChevronDownIcon,
    ChevronUpIcon,
} from "../../icons";

import "./Testimonials.css";


const STORAGE_KEY = "doctor-feedback";


const getServiceOptions = () => {

    const fixedServices = [

        "جراحی آب مروارید",

        "لیزیک",

        "معاینه تخصصی",

        "جراحی قوز قرنیه",

    ];

    const dataServices = servicesData.map(
        (service) => service.title
    );

    return [

        ...new Set([

            ...fixedServices,

            ...dataServices,

            "سایر خدمات",

        ]),

    ];

};


const Testimonials = () => {

    const [feedbacks, setFeedbacks] = useState([]);

    const [formData, setFormData] = useState({

        name: "",

        service: "",

        rating: 5,

        message: "",

    });

    const [showAll, setShowAll] = useState(false);

    const [submitted, setSubmitted] = useState(false);


    const serviceOptions = getServiceOptions();


    useEffect(() => {

        try {

            const savedFeedbacks =
                localStorage.getItem(STORAGE_KEY);

            if (!savedFeedbacks) {

                return;

            }

            const parsedFeedbacks =
                JSON.parse(savedFeedbacks);

            if (Array.isArray(parsedFeedbacks)) {

                setFeedbacks(parsedFeedbacks);

            }

        } catch (error) {

            console.error(
                "خطا در بارگذاری نظرات:",
                error
            );

        }

    }, []);


    const allTestimonials = [

        ...feedbacks,

        ...testimonialsData,

    ];

    const displayedTestimonials = showAll ? allTestimonials : allTestimonials.slice(0, 4);


    const handleChange = (event) => {

        const { name, value } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value,

        }));

    };


    const handleRating = (rating) => {

        setFormData((previous) => ({

            ...previous,

            rating,

        }));

    };


    const handleSubmit = (event) => {

        event.preventDefault();


        const name = formData.name.trim();

        const message = formData.message.trim();

        const service = formData.service.trim();


        if (!name || !service || !message) {

            return;

        }


        const newFeedback = {

            id: Date.now(),

            name,

            service,

            rating: Number(formData.rating),

            comment: message,

            date: new Intl.DateTimeFormat(
                "fa-IR"
            ).format(new Date()),

            verified: false,

        };


        const updatedFeedbacks = [

            newFeedback,

            ...feedbacks,

        ];


        setFeedbacks(updatedFeedbacks);


        try {

            localStorage.setItem(

                STORAGE_KEY,

                JSON.stringify(updatedFeedbacks)

            );

        } catch (error) {

            console.error(
                "خطا در ذخیره نظر:",
                error
            );

        }


        setFormData({

            name: "",

            service: "",

            rating: 5,

            message: "",

        });


        setSubmitted(true);


        window.setTimeout(() => {

            setSubmitted(false);

        }, 3000);

    };


    return (

        <section
            className="testimonials"
            id="testimonials"
        >

            <div className="container">

                <SectionTitle

                    badge="نظرات بیماران"

                    title="تجربه بیماران از همراهی با ما"

                    subtitle="تجربه و نظر بیماران می‌تواند دید بهتری از کیفیت خدمات و روند درمان در اختیار شما قرار دهد."

                    center

                />


                {/* =================================
                    Existing + New Testimonials
                ================================= */}

                <div className="testimonials__grid" id="testimonials-list">

                    {

                        displayedTestimonials.map(
                            (testimonial) => (

                                <TestimonialCard

                                    key={testimonial.id}

                                    testimonial={testimonial}

                                />

                            )
                        )

                    }

                </div>

                {allTestimonials.length > 4 && (
                <div className="testimonials__more">

                    <Button
                        variant="outline"
                        size="md"
                        endIcon={
                            showAll
                                ? <ChevronUpIcon />
                                : <ChevronDownIcon />
                        }
                        onClick={() => setShowAll((prev) => !prev)}
                        aria-expanded={showAll}
                        aria-controls="testimonials-list"
                        className="testimonials__moreButton"
                    >
                        {showAll
                            ? "نمایش کمتر"
                            : "مشاهده همه نظرات"}
                    </Button>

                </div>
                )}


                {/* =================================
                    Feedback Form
                ================================= */}

                <div className="testimonials__feedback">

                    <div className="testimonials__feedbackIntro">

                        <span className="testimonials__feedbackBadge">

                            نظر شما

                        </span>

                        <h3>

                            تجربه خود را با ما در میان بگذارید

                        </h3>

                        <p>

                            اگر از خدمات و روند درمان خود تجربه‌ای دارید،
                            خوشحال می‌شویم آن را با ما و سایر بیماران به اشتراک بگذارید.

                        </p>

                        <div className="testimonials__feedbackNote">

                            <UserIcon />

                            <span>

                                ثبت نظر شما به بهبود کیفیت خدمات کمک می‌کند.

                            </span>

                        </div>

                    </div>


                    <form
                        className="testimonials__form"
                        onSubmit={handleSubmit}
                    >

                        {/* Name */}

                        <div className="testimonials__field">

                            <label htmlFor="testimonial-name">

                                نام شما

                            </label>

                            <input

                                id="testimonial-name"

                                name="name"

                                type="text"

                                value={formData.name}

                                onChange={handleChange}

                                placeholder="نام"

                                maxLength={60}

                                autoComplete="name"

                                required

                            />

                        </div>


                        {/* Service */}

                        <div className="testimonials__field">

                            <label htmlFor="testimonial-service">

                                موضوع نظر

                            </label>

                            <select

                                id="testimonial-service"

                                name="service"

                                value={formData.service}

                                onChange={handleChange}

                                required

                            >

                                <option
                                    value=""
                                    disabled
                                >

                                    موضوع نظر خود را انتخاب کنید

                                </option>


                                {

                                    serviceOptions.map(
                                        (service) => (

                                            <option
                                                key={service}
                                                value={service}
                                            >

                                                {service}

                                            </option>

                                        )
                                    )

                                }

                            </select>

                        </div>


                        {/* Rating */}

                        <div className="testimonials__field">

                            <label>

                                میزان رضایت شما

                            </label>

                            <div
                                className="testimonials__rating"
                                role="radiogroup"
                                aria-label="امتیاز رضایت"
                            >

                                {

                                    [1, 2, 3, 4, 5].map(
                                        (rating) => (

                                            <button

                                                key={rating}

                                                type="button"

                                                className={

                                                    `testimonials__ratingButton ${
                                                        formData.rating >= rating
                                                            ? "active"
                                                            : ""
                                                    }`

                                                }

                                                onClick={() =>
                                                    handleRating(rating)
                                                }

                                                aria-label={`${rating} از 5`}

                                                aria-pressed={
                                                    formData.rating === rating
                                                }

                                            >

                                                <StarIcon />

                                            </button>

                                        )
                                    )

                                }

                            </div>

                        </div>


                        {/* Message */}

                        <div className="testimonials__field">

                            <label htmlFor="testimonial-message">

                                متن نظر

                            </label>

                            <textarea

                                id="testimonial-message"

                                name="message"

                                value={formData.message}

                                onChange={handleChange}

                                placeholder="نظر و تجربه خود را بنویسید..."

                                rows="5"

                                maxLength={500}

                                required

                            />

                            <span className="testimonials__counter">

                                {formData.message.length}/500

                            </span>

                        </div>


                        <Button
                            type="submit"
                            size="lg"
                        >

                            ثبت نظر

                        </Button>


                        {

                            submitted && (

                                <p
                                    className="testimonials__success"
                                    role="status"
                                >

                                    نظر شما با موفقیت ثبت شد و در لیست نظرات نمایش داده شد.

                                </p>

                            )

                        }

                    </form>

                </div>

            </div>

        </section>

    );

};


export default Testimonials;