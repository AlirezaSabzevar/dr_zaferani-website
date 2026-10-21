import "./ArticleDetail.css";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import { CalendarIcon, ArrowLeftIcon } from "../../icons";
import { getArticleDetail } from "../api";

const ArticleDetail = () => {
    const { slug } = useParams();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        let active = true;

        window.scrollTo({ top: 0, behavior: "auto" });
        setArticle(null);
        setLoading(true);
        setError("");
        setNotFound(false);

        const fetchArticle = async () => {
            try {
                const data = await getArticleDetail(slug);
                if (active) setArticle(data);
            } catch (err) {
                if (!active) return;
                if (err.status === 404) {
                    setNotFound(true);
                } else {
                    setError(err.message || "خطا در دریافت مقاله.");
                }
            } finally {
                if (active) setLoading(false);
            }
        };

        fetchArticle();
        return () => { active = false; };
    }, [slug]);

    const breadcrumbs = [
        { label: "صفحه اصلی", href: "/" },
        { label: "مقالات", href: "/articles" },
        { label: article?.title || "مقاله" },
    ];

    if (loading) {
        return (
            <main className="articleDetail">
                <PageHeader title="مقالات" subtitle="در حال دریافت مقاله..." breadcrumbs={breadcrumbs} />
                <div className="container"><p role="status">در حال دریافت اطلاعات مقاله...</p></div>
            </main>
        );
    }

    if (notFound || !article || error) {
        return (
            <main className="articleDetail articleDetail--notFound">
                <PageHeader
                    title={notFound ? "مقاله پیدا نشد" : "خطا در دریافت مقاله"}
                    subtitle={notFound ? "مقاله‌ای با این مشخصات وجود ندارد." : "دریافت اطلاعات مقاله امکان‌پذیر نیست."}
                    breadcrumbs={breadcrumbs}
                />
                <div className="container">
                    <div className="articleDetail__notFound">
                        <h1>{notFound ? "مقاله موردنظر پیدا نشد" : "دریافت مقاله ناموفق بود"}</h1>
                        <p>{notFound ? "ممکن است لینک مقاله تغییر کرده باشد یا مقاله حذف شده باشد." : error}</p>
                        <Button as={Link} to="/articles" endIcon={<ArrowLeftIcon />}>
                            بازگشت به مقالات
                        </Button>
                    </div>
                </div>
            </main>
        );
    }

    const apiUrl = import.meta.env.VITE_API_URL;
    let imageUrl = "";
    if (article.image) {
        try {
            imageUrl = new URL(article.image, apiUrl).href;
        } catch {
            imageUrl = "";
        }
    }

    const content = Array.isArray(article.content) ? article.content : [];
    const sources = Array.isArray(article.sources) ? article.sources : [];

    return (
        <main className="articleDetail">
            <PageHeader title={article.title} subtitle={article.excerpt} breadcrumbs={breadcrumbs} />

            <section className="articleDetail__content">
                <div className="container">
                    <article className="articleDetail__article">
                        {imageUrl && (
                            <div className="articleDetail__image">
                                <img src={imageUrl} alt={article.title} />
                            </div>
                        )}

                        <div className="articleDetail__meta">
                            {article.category && (
                                <span className="articleDetail__category">{article.category}</span>
                            )}
                            {article.date && (
                                <span><CalendarIcon />{article.date}</span>
                            )}
                            {article.readTime && <span>{article.readTime}</span>}
                        </div>

                        <div className="articleDetail__body">
                            <h1>{article.title}</h1>
                            {article.excerpt && <p className="articleDetail__lead">{article.excerpt}</p>}

                            {content.map((section, index) => {
                                if (section.type === "heading") {
                                    return <h2 key={index}>{section.text}</h2>;
                                }
                                if (section.type === "paragraph") {
                                    return <p key={index}>{section.text}</p>;
                                }
                                if (section.type === "list" && Array.isArray(section.items)) {
                                    return (
                                        <ul key={index}>
                                            {section.items.map((item, itemIndex) => (
                                                <li key={itemIndex}>{item}</li>
                                            ))}
                                        </ul>
                                    );
                                }
                                return null;
                            })}

                            {content.length === 0 && <p>متن کامل این مقاله هنوز ثبت نشده است.</p>}

                            {sources.length > 0 && (
                                <div className="articleDetail__sources">
                                    <h2>منابع</h2>
                                    <ul>
                                        {sources.map((source, index) => (
                                            <li key={index}>
                                                {typeof source.url === "string" && /^https?:\/\//i.test(source.url) ? (
                                                    <a href={source.url} target="_blank" rel="noopener noreferrer">
                                                        {source.title || source.url}
                                                    </a>
                                                ) : (
                                                    source.title || "منبع"
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        <div className="articleDetail__footer">
                            <Button as={Link} to="/articles" variant="outline" endIcon={<ArrowLeftIcon />}>
                                بازگشت به مقالات
                            </Button>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    );
};

export default ArticleDetail;
