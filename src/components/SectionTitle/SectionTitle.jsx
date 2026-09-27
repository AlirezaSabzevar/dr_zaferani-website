import "./SectionTitle.css";

const SectionTitle = ({
    badge,
    title,
    subtitle,
    description,
    center = true,
}) => {

    return (

        <div className={`sectionTitle ${center ? "sectionTitle--center" : ""}`}>

            {
                badge && (

                    <span className="sectionTitle__badge">

                        {badge}

                    </span>

                )
            }

            <h2 className="sectionTitle__title">

                {title}

            </h2>

            {
                subtitle && (

                    <p className="sectionTitle__subtitle">

                        {subtitle}

                    </p>

                )
            }

            {
                description && (

                    <p className="sectionTitle__description">

                        {description}

                    </p>

                )
            }

        </div>

    );

};

export default SectionTitle;