import Button from "../Button/Button";
import {
    CalendarIcon,
    ArrowLeftIcon,
} from "../../icons";

const FeaturedArticle = ({ article }) => {

    return (

        <article className="featuredArticle">

            <div className="featuredArticle__image">

                <img
                    src={article.image}
                    alt={article.title}
                />

            </div>

            <div className="featuredArticle__content">

                <span className="featuredArticle__badge">

                    مقاله ویژه

                </span>

                <h2>

                    {article.title}

                </h2>

                <p>

                    {article.excerpt}

                </p>

                <div className="featuredArticle__meta">

                    <span>

                        <CalendarIcon />

                        {article.date}

                    </span>

                    <span>

                        {article.readTime}

                    </span>

                </div>

                <Button
                    endIcon={<ArrowLeftIcon />}
                >

                    مطالعه مقاله

                </Button>

            </div>

        </article>

    );

};

export default FeaturedArticle;