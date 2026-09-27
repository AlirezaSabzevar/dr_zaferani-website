import SectionTitle from "../SectionTitle/SectionTitle";
import FeaturedArticle from "./FeaturedArticle";
import ArticleCard from "./ArticleCard";
import Button from "../Button/Button";
import { ArrowLeftIcon } from "../../icons";
import { Link } from "react-router-dom";

import articlesData from "../../data/articlesData";

import "./Articles.css";



const Articles = () => {

    const featuredArticle = articlesData.find(
        article => article.featured
    );

    const articles = articlesData
    .filter(article => !article.featured)
    .slice(0, 4);

    return (

        <section
            className="articles"
            id="articles"
        >

            <div className="container">

                

                <SectionTitle

                    badge="مقالات"

                    title="آخرین مطالب آموزشی"

                    subtitle="جدیدترین مقالات تخصصی در زمینه سلامت چشم، جراحی‌های نوین و مراقبت‌های بینایی را مطالعه کنید."

                    center

                />

                <FeaturedArticle
                    article={featuredArticle}
                />

                <div className="articles__grid">

                    {

                        articles.map(article => (

                            <ArticleCard

                                key={article.id}

                                article={article}

                            />

                        ))

                    }

                </div>
                    <div className="articles__more">

                        <Link to="/articles" className="articles__moreLink">

                            <Button
                                variant="outline"
                                endIcon={<ArrowLeftIcon />}
                            >

                                مشاهده همه مقالات

                            </Button>

                        </Link>

                    </div>

            </div>

        </section>

    );

};

export default Articles;