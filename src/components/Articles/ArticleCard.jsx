import { Link } from "react-router-dom";

import Card from "../Card/Card";
import Button from "../Button/Button";

import {
    CalendarIcon,
    ArrowLeftIcon,
} from "../../icons";


const ArticleCard = ({ article }) => {

    return (

        <Card className="articleCard">

            <div className="articleCard__image">

                <img
                    src={article.image}
                    alt={article.title}
                />

                <span className="articleCard__category">

                    {article.category}

                </span>

            </div>


            <div className="articleCard__content">

                <div className="articleCard__meta">

                    <span>

                        <CalendarIcon />

                        {article.date}

                    </span>

                    <span>

                        {article.readTime}

                    </span>

                </div>


                <h3>

                    {article.title}

                </h3>


                <p>

                    {article.excerpt}

                </p>


                <Button
                    as={Link}
                    to={`/articles/${article.slug}`}
                    variant="ghost"
                    endIcon={<ArrowLeftIcon />}
                    className="articleCard__readMore"
                >

                    ادامه مطلب

                </Button>

            </div>

        </Card>

    );

};


export default ArticleCard;