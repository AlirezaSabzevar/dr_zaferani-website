import Card from "../Card/Card";

import {

    StarIcon,

    CheckIcon

} from "../../icons";

const TestimonialCard = ({ testimonial }) => {

    return (

        <Card className="testimonialCard">

            <div className="testimonialCard__stars">

                {

                    [...Array(testimonial.rating)].map((_,index)=>(

                        <StarIcon key={index}/>

                    ))

                }

            </div>

            <p className="testimonialCard__comment">

                "{testimonial.comment}"

            </p>

            {

                testimonial.verified && (

                    <div className="testimonialCard__verified">

                        <CheckIcon/>

                        <span>

                            بیمار تأیید شده

                        </span>

                    </div>

                )

            }

            <div className="testimonialCard__footer">

                <div>

                    <h4>

                        {testimonial.name}

                    </h4>

                    <span>

                        {testimonial.service}

                    </span>

                </div>

                <small>

                    {testimonial.date}

                </small>

            </div>

        </Card>

    )

}

export default TestimonialCard;