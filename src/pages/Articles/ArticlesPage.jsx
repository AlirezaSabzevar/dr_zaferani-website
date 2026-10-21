
import { useEffect, useState } from "react";

import "./ArticlesPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import ArticleCard from "../../components/Articles/ArticleCard";
import FeaturedArticle from "../../components/Articles/FeaturedArticle";

import {
    getArticles,
    getArticlesSettings
} from "../../components/api";

const ArticlesPage = () => {

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

    const regularArticles = articles.filter(
        article => !article.featured
    );

    return (
        <section className="articlesPage">

            <PageHeader
                title={settings?.title || "مقالات آموزشی"}
                subtitle={
                    settings?.description ||
                    "تمامی مقالات آموزشی و تخصصی چشم پزشکی"
                }
                breadcrumbs={[
                    {
                        label: "صفحه اصلی",
                        href: "/"
                    },
                    {
                        label: "مقالات"
                    }
                ]}
            />

            <div className="container">

                {loading && (
                    <p>در حال دریافت مقالات...</p>
                )}

                {error && (
                    <p role="alert">
                        {error}
                    </p>
                )}

                {!loading && !error && (
                    <>
                        {featuredArticle && (
                            <FeaturedArticle
                                article={featuredArticle}
                            />
                        )}

                        <div className="articlesPage__grid">

                            {regularArticles.map(article => (
                                <ArticleCard
                                    key={article.id}
                                    article={article}
                                />
                            ))}

                        </div>

                        {articles.length === 0 && (
                            <p>
                                هنوز مقاله‌ای ثبت نشده است.
                            </p>
                        )}
                    </>
                )}

            </div>

        </section>
    );
};

export default ArticlesPage;
