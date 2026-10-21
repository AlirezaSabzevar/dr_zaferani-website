
import { useEffect, useState } from "react";
import SectionTitle from "../SectionTitle/SectionTitle";
import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import Button from "../Button/Button";
import { ArrowLeftIcon } from "../../icons";
import { Link } from "react-router-dom";

import {
    getArticles,
    getArticlesSettings
} from "../api";

import "./Articles.css";

const Articles = () => {

    const [articles, setArticles] = useState([]);
    const [settings, setSettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchData = async () => {
            try {
                const [articlesData, settingsData] =
                    await Promise.all([
                        getArticles(),
                        getArticlesSettings()
                    ]);

                if (active) {
                    setArticles(articlesData);
                    setSettings(settingsData);
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

        fetchData();

        return () => {
            active = false;
        };

    }, []);

    const featuredArticle = articles.find(
        article => article.featured
    );

    const regularArticles = articles
        .filter(article => !article.featured)
        .slice(0, 4);

    return (
        <section className="articles" id="articles">
            <div className="container">

                <SectionTitle
                    badge="مقالات"
                    title={settings?.title || "آخرین مطالب آموزشی"}
                    subtitle={settings?.description || ""}
                    center
                />

                {loading && (
                    <p>در حال دریافت مقالات...</p>
                )}

                {error && (
                    <p role="alert">{error}</p>
                )}

                {!loading && !error && (
                    <>
                        {featuredArticle && (
                            <FeaturedArticle
                                article={featuredArticle}
                            />
                        )}

                        <div className="articles__grid">
                            {regularArticles.map(article => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}
                        </div>

                        {articles.length === 0 && (
                            <p>هنوز مقاله‌ای ثبت نشده است.</p>
                        )}

                        <div className="articles__more">
                            <Link
                                to="/articles"
                                className="articles__moreLink"
                            >
                                <Button
                                    variant="outline"
                                    endIcon={<ArrowLeftIcon />}
                                >
                                    مشاهده همه مقالات
                                </Button>
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default Articles;
