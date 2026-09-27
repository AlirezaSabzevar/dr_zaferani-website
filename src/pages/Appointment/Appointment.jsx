import "./Appointment.css";
import PageHeader from "../../components/PageHeader/PageHeader";
import Button from "../../components/Button/Button";
import { Link } from "react-router-dom";
import appointmentData from "../../data/appointmentData";

import {
    PhoneIcon,
    CalendarIcon,
    LocationIcon,
    ClockIcon,
    WhatsAppIcon,
    TelegramIcon,
} from "../../icons";

const Appointment = () => {

    return (

        <section className="appointment">

            <PageHeader

                title="رزرو نوبت"

                subtitle="برای دریافت نوبت، از یکی از راه‌های ارتباطی زیر استفاده کنید."

                breadcrumbs={[

                    {

                        label:"صفحه اصلی",

                        href:"/"

                    },

                    {

                        label:"رزرو نوبت"

                    }

                ]}

            />

            <div className="container">

            <div className="appointment__grid">

                {

                    appointmentData.cards.map((item) => {

                        const Icon = item.icon;

                        const CardContent = (

                            <>

                                <Icon />

                                <h3>

                                    {item.title}

                                </h3>

                                <p>

                                    {

                                        item.value.split("\n").map((line, index) => (

                                            <span key={index}>

                                                {line}

                                                <br />

                                            </span>

                                        ))

                                    }

                                </p>

                            </>

                        );

                        return item.href ? (

                            <a

                                key={item.id}

                                href={item.href}
                                target={item.href.startsWith("http") ? "_blank" : undefined}
                                rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                className="appointmentCard"

                            >

                                {CardContent}

                            </a>

                        ) : (

                            <div
                                key={item.id}
                                className="appointmentCard"
                            >

                                {CardContent}

                            </div>

                        );

                    })

                }

            </div>
            

                <div className="appointment__footer">

                    <Button
                        startIcon={<CalendarIcon />}
                    >

                        تماس برای رزرو نوبت

                    </Button>

                </div>

            </div>

        </section>

    );

};

export default Appointment;