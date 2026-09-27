import navigation from "../../data/navigation";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { CloseIcon,CalendarIcon} from "../../icons";
import "./MobileMenu.css";
import logo from "../../assets/images/logo.png";
import heroData from "../../data/heroData";



const MobileMenu=({isOpen,onClose})=>{

    return(

        <aside className={`mobileMenu ${isOpen ? "open" : ""}`}>

        <div className="mobileMenu__header">


            <div className="mobileMenu__brand">

                <img
                    src={logo}
                    alt={heroData.name}
                />

            </div>

            <button
                type="button"
                className="mobileMenu__close"
                onClick={onClose}
                aria-label="بستن منو"
            >
                <CloseIcon />
            </button>

        </div>

            <div className="mobileMenu__divider"></div>


            <nav className="mobileMenu__nav">

                {

                    navigation.map((item)=>{

                        const Icon = item.icon;
                        
                        return(
                        

                        <a key={item.id} href={item.href} onClick={onClose} className="mobileMenu__link">

                            <Icon className="mobileMenu__icon" />

                            <span>{item.title}</span>

                            {item.badge && (

                                <span className="mobileMenu__badge">

                                    {item.badge}

                                </span>

                            )}

                        </a>

                    )})

                }

            </nav>

            <div className="mobileMenu__divider"></div>

            <Link
                to="/appointment"
                className="mobileMenu__appointment"
                onClick={onClose}
            >

                <Button
                    fullWidth
                    startIcon={<CalendarIcon />}
                >

                    رزرو نوبت

                </Button>

            </Link>

        </aside>

    )

    }

export default MobileMenu;