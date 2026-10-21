import { useEffect, useState } from "react";

import SectionTitle from "../SectionTitle/SectionTitle";
import Button from "../Button/Button";
import TestimonialCard from "./TestimonialCard";
import { getTestimonials, submitTestimonial } from "../api";
import {
  StarIcon,
  UserIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "../../icons";

import "./Testimonials.css";

const initialFormData = {
  name: "",
  service: "",
  rating: 5,
  message: "",
};

const Testimonials = () => {
  const [apiData, setApiData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  const [formData, setFormData] = useState(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    let active = true;

    const fetchTestimonials = async () => {
      try {
        const data = await getTestimonials();
        if (active) setApiData(data);
      } catch (err) {
        if (active) {
          setError(err.message || "خطا در دریافت نظرات بیماران.");
        }
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchTestimonials();

    return () => {
      active = false;
    };
  }, []);

  const settings = apiData?.settings || {};
  const allTestimonials = apiData?.testimonials || [];
  const subjects = apiData?.subjects || [];
  const displayedTestimonials = showAll
    ? allTestimonials
    : allTestimonials.slice(0, 4);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleRating = (rating) => {
    setFormData((previous) => ({ ...previous, rating }));
    setSubmitError("");
    setSubmitSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isSubmitting) return;

    setSubmitError("");
    setSubmitSuccess("");

    const name = formData.name.trim();
    const text = formData.message.trim();
    const subjectId = Number(formData.service);

    if (!name || !text || !formData.service || !Number.isInteger(subjectId)) {
      setSubmitError("لطفاً نام، موضوع و متن نظر خود را کامل وارد کنید.");
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await submitTestimonial({
        name,
        subject: subjectId,
        rating: Number(formData.rating),
        text,
      });

      setFormData({ ...initialFormData });
      setSubmitSuccess(
        result?.detail || "نظر شما با موفقیت ثبت شد و پس از تأیید نمایش داده می‌شود."
      );

      // نظرات منتشرشده را از سرور دوباره می‌خوانیم.
      // نظرات منتظر تأیید تا زمان انتشار در فهرست عمومی ظاهر نمی‌شوند.
      try {
        const updatedData = await getTestimonials();
        setApiData(updatedData);
      } catch (refreshError) {
        console.error("خطا در بروزرسانی فهرست نظرات:", refreshError);
      }
    } catch (err) {
      setSubmitError(err.message || "ثبت نظر انجام نشد. دوباره تلاش کنید.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="testimonials" id="testimonials">
      <div className="container">
        <SectionTitle
          badge={settings.badge_text || "نظرات بیماران"}
          title={settings.title || "تجربه بیماران از همراهی با ما"}
          subtitle={settings.description || ""}
          center
        />

        {loading && <p role="status">در حال دریافت نظرات بیماران...</p>}
        {error && <p role="alert">{error}</p>}

        {!loading && !error && (
          <>
            <div className="testimonials__grid" id="testimonials-list">
              {displayedTestimonials.map((testimonial) => (
                <TestimonialCard
                  key={testimonial.id}
                  testimonial={testimonial}
                />
              ))}
            </div>

            {allTestimonials.length === 0 && (
              <p>هنوز نظری منتشر نشده است.</p>
            )}

            {allTestimonials.length > 4 && (
              <div className="testimonials__more">
                <Button
                  variant="outline"
                  size="md"
                  endIcon={
                    showAll ? <ChevronUpIcon /> : <ChevronDownIcon />
                  }
                  onClick={() => setShowAll((previous) => !previous)}
                  aria-expanded={showAll}
                  aria-controls="testimonials-list"
                  className="testimonials__moreButton"
                >
                  {showAll
                    ? "نمایش کمتر"
                    : settings.button_text || "مشاهده همه نظرات"}
                </Button>
              </div>
            )}
          </>
        )}

        <div className="testimonials__feedback">
          <div className="testimonials__feedbackIntro">
            <span className="testimonials__feedbackBadge">
              {settings.form_badge_text || "نظر شما"}
            </span>

            <h3>
              {settings.form_title || "تجربه خود را با ما در میان بگذارید"}
            </h3>

            <p>
              {settings.form_description ||
                "اگر از خدمات و روند درمان خود تجربه‌ای دارید، خوشحال می‌شویم آن را با ما و سایر بیماران به اشتراک بگذارید."}
            </p>

            <div className="testimonials__feedbackNote">
              <UserIcon />
              <span>
                {settings.form_note ||
                  "ثبت نظر شما به بهبود کیفیت خدمات کمک می‌کند."}
              </span>
            </div>
          </div>

          <form className="testimonials__form" onSubmit={handleSubmit}>
            <div className="testimonials__field">
              <label htmlFor="testimonial-name">نام شما</label>
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
                disabled={isSubmitting}
              />
            </div>

            <div className="testimonials__field">
              <label htmlFor="testimonial-service">موضوع نظر</label>
              <select
                id="testimonial-service"
                name="service"
                value={formData.service}
                onChange={handleChange}
                required
                disabled={isSubmitting || loading || !!error}
              >
                <option value="" disabled>
                  موضوع نظر خود را انتخاب کنید
                </option>
                {subjects.map((subject) => (
                  <option key={subject.id} value={String(subject.id)}>
                    {subject.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="testimonials__field">
              <label>میزان رضایت شما</label>
              <div
                className="testimonials__rating"
                role="group"
                aria-label="امتیاز رضایت"
              >
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    type="button"
                    className={`testimonials__ratingButton ${
                      formData.rating >= rating ? "active" : ""
                    }`}
                    onClick={() => handleRating(rating)}
                    aria-label={`${rating} از 5`}
                    aria-pressed={formData.rating === rating}
                    disabled={isSubmitting}
                  >
                    <StarIcon />
                  </button>
                ))}
              </div>
            </div>

            <div className="testimonials__field">
              <label htmlFor="testimonial-message">متن نظر</label>
              <textarea
                id="testimonial-message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="نظر و تجربه خود را بنویسید..."
                rows={5}
                maxLength={500}
                required
                disabled={isSubmitting}
              />
              <span className="testimonials__counter">
                {formData.message.length}/500
              </span>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting || loading || !!error || subjects.length === 0}
            >
              {isSubmitting ? "در حال ثبت نظر..." : "ثبت نظر"}
            </Button>

            {submitError && (
              <p className="testimonials__error" role="alert">
                {submitError}
              </p>
            )}

            {submitSuccess && (
              <p className="testimonials__success" role="status">
                {submitSuccess}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
