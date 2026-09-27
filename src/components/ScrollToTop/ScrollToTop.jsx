import { useEffect, useState } from "react";
import { ArrowUpIcon } from "../../icons";

import "./ScrollToTop.css";

const ScrollToTop = () => {

    const [visible, setVisible] = useState(false);

    useEffect(() => {

        const handleScroll = () => {

            setVisible(window.scrollY > 500);

        };

        window.addEventListener("scroll", handleScroll);

        return () => {

            window.removeEventListener("scroll", handleScroll);

        };

    }, []);

    const scrollTop = () => {

        window.scrollTo({

            top:0,

            behavior:"smooth"

        });

    };

    return (

        <button

            type="button"

            onClick={scrollTop}

            className={`scrollTop ${visible ? "show" : ""}`}

            aria-label="بازگشت به بالای صفحه"

        >

            <ArrowUpIcon />

        </button>

    );

};

export default ScrollToTop;