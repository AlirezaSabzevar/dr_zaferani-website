import { Link } from "react-router-dom";
import "./PageHeader.css";
import logo from "../../assets/images/logo.png";
import heroData from "../../data/heroData";

import { ArrowRightIcon, ChevronLeftIcon } from "../../icons";

const PageHeader = ({title,subtitle,breadcrumbs = []}) => {

    return (

        <header className="pageHeader">

            <div className="container">

                <div className="pageHeader__top">

                    <Link
                        to="/"
                        className="pageHeader__back"
                    >

                        <ArrowRightIcon />

                        <span>

                            بازگشت به صفحه اصلی

                        </span>

                    </Link>

                    <Link
                        to="/"
                        className="pageHeader__brand"
                    >

                        <img
                            src={logo}
                            alt={heroData.name}
                        />

                        <div>

                            <h3>

                                {heroData.name}

                            </h3>

                            <span>

                                {heroData.specialty}

                            </span>

                        </div>

                    </Link>

                </div>


                {

                    breadcrumbs.length > 0 && (

                        <nav className="breadcrumb">

                            {

                                breadcrumbs.map((item,index)=>(

                                    <span
                                        key={index}
                                        className="breadcrumb__item"
                                    >

                                        {

                                            item.href ?

                                            (

                                                <Link to={item.href}>

                                                    {item.label}

                                                </Link>

                                            )

                                            :

                                            (

                                                <span>

                                                    {item.label}

                                                </span>

                                            )

                                        }

                                        {

                                            index !== breadcrumbs.length-1 &&

                                            <ChevronLeftIcon />

                                        }

                                    </span>

                                ))

                            }

                        </nav>

                    )

                }

                <div className="pageHeader__content">

                    <h1>

                        {title}

                    </h1>

                    {

                        subtitle && (

                            <p>

                                {subtitle}

                            </p>

                        )

                    }

                </div>

            </div>

        </header>

    );

};

export default PageHeader;