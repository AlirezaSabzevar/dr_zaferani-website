
import "./ArticleDetail.css";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";

import {
    CalendarIcon,
    ArrowLeftIcon,
} from "../../icons";

import articlesData from "../../data/articlesData";

import "./ArticleDetail.css";


const ArticleDetail = () => {

    const { slug } = useParams();


    const article = articlesData.find(
        (item) => item.slug === slug
    );


    useEffect(() => {

        window.scrollTo({
            top: 0,
            behavior: "auto",
        });

    }, [slug]);


    if (!article) {

        return (

            <main className="articleDetail articleDetail--notFound">

                <PageHeader
                    title="مقاله پیدا نشد"
                    subtitle="مقاله‌ای با این مشخصات وجود ندارد."
                    breadcrumbs={[
                        {
                            label: "صفحه اصلی",
                            href: "/",
                        },
                        {
                            label: "مقالات",
                            href: "/articles",
                        },
                        {
                            label: "مقاله",
                        },
                    ]}
                />


                <div className="container">

                    <div className="articleDetail__notFound">

                        <h1>
                            مقاله موردنظر پیدا نشد
                        </h1>

                        <p>
                            ممکن است لینک مقاله تغییر کرده باشد
                            یا مقاله حذف شده باشد.
                        </p>


                        <Button
                            as={Link}
                            to="/articles"
                            endIcon={<ArrowLeftIcon />}
                        >

                            بازگشت به مقالات

                        </Button>

                    </div>

                </div>

            </main>

        );

    }


    return (

        <main className="articleDetail">

            <PageHeader
                title={article.title}
                subtitle={article.excerpt}
                breadcrumbs={[
                    {
                        label: "صفحه اصلی",
                        href: "/",
                    },
                    {
                        label: "مقالات",
                        href: "/articles",
                    },
                    {
                        label: article.title,
                    },
                ]}
            />


            <section className="articleDetail__content">

                <div className="container">

                    <article className="articleDetail__article">


                        {/* Hero Image */}

                        <div className="articleDetail__image">

                            <img
                                src={article.image}
                                alt={article.title}
                            />

                        </div>


                        {/* Article Meta */}

                        <div className="articleDetail__meta">

                            <span className="articleDetail__category">

                                {article.category}

                            </span>


                            <span>

                                <CalendarIcon />

                                {article.date}

                            </span>


                            <span>

                                {article.readTime}

                            </span>

                        </div>


                        {/* Article Content */}

                        <div className="articleDetail__body">

                            <h1>

                                {article.title}

                            </h1>


                            <p className="articleDetail__lead">

                                {article.excerpt}

                            </p>


                            {article.content?.map((section, index) => {

                                if (section.type === "heading") {

                                    return (

                                        <h2 key={index}>

                                            {section.text}

                                        </h2>

                                    );

                                }


                                if (section.type === "paragraph") {

                                    return (

                                        <p key={index}>

                                            {section.text}

                                        </p>

                                    );

                                }


                                if (section.type === "list") {

                                    return (

                                        <ul key={index}>

                                            {section.items.map(
                                                (item, itemIndex) => (

                                                    <li key={itemIndex}>

                                                        {item}

                                                    </li>

                                                )
                                            )}

                                        </ul>

                                    );

                                }


                                return null;

                            })}

                        </div>


                        {/* Back To Articles */}

                        <div className="articleDetail__footer">

                            <Button
                                as={Link}
                                to="/articles"
                                variant="outline"
                                endIcon={<ArrowLeftIcon />}
                            >

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