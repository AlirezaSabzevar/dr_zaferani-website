import { ArrowLeftIcon } from "../../icons";
import "./Services.css";

const ServiceCard = ({
    id,
    icon,
    title,
    description,
}) => {

    const Icon = icon;

    return (

        <article className="serviceCard">

            <span className="serviceCard__number">

                {String(id).padStart(2, "0")}

            </span>

            <div className="serviceCard__iconWrapper">

                <div className="serviceCard__glow"></div>

                <div className="serviceCard__icon">

                    <Icon />

                </div>

            </div>

            <h3>

                {title}

            </h3>

            <p>

                {description}

            </p>

            <div className="serviceCard__footer">

                <span>

                   اطلاعات بیشتر به‌زودی

                </span>

                <ArrowLeftIcon className="serviceCard__arrow" />

            </div>

        </article>

    );

};

export default ServiceCard;