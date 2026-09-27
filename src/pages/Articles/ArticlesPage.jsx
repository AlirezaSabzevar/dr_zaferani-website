import "./ArticlesPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";

import ArticleCard from "../../components/Articles/ArticleCard";

import FeaturedArticle from "../../components/Articles/FeaturedArticle";

import articlesData from "../../data/articlesData";

const ArticlesPage = () => {

    const featuredArticle = articlesData.find(
        article => article.featured
    );

    const articles = articlesData.filter(
        article => !article.featured
    );

    return (

        <section className="articlesPage">

            <PageHeader

                title="مقالات آموزشی"

                subtitle="تمامی مقالات آموزشی و تخصصی چشم پزشکی"

                breadcrumbs={[

                    {
                        label:"صفحه اصلی",
                        href:"/"
                    },

                    {
                        label:"مقالات"
                    }

                ]}

            />

            <div className="container">

                {

                    featuredArticle &&

                    <FeaturedArticle
                        article={featuredArticle}
                    />

                }

                <div className="articlesPage__grid">

                    {

                        articles.map(article=>(

                            <ArticleCard

                                key={article.id}

                                article={article}

                            />

                        ))

                    }

                </div>

            </div>

        </section>

    );

};

export default ArticlesPage;