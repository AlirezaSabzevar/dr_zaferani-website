import "./InfoCard.css";

const InfoCard = ({
    value,
    label,
    icon,
    className = ""
}) => {

    return (

        <div className={`infoCard ${className}`}>

            {icon &&

                <div className="infoCard__icon">

                    {icon}

                </div>

            }

            <h4>{value}</h4>

            <p>{label}</p>

        </div>

    );

};

export default InfoCard;