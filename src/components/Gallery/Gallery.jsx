import "./Gallery.css";

import { Link } from "react-router-dom";

import SectionTitle from "../SectionTitle/SectionTitle";
import GalleryGrid from "./GalleryGrid";
import Button from "../Button/Button";

import { ArrowLeftIcon } from "../../icons";

const Gallery = () => {

    return (

        <section
            className="gallery"
            id="gallery"
        >

            <div className="container">

                <SectionTitle

                    badge="گالری تصاویر"

                    title="گالری تصاویر"

                    subtitle="نمونه‌ای از تصاویر مطب، تجهیزات و خدمات درمانی"

                    center

                />

                <GalleryGrid limit={6}/>

                <div className="gallery__more">

                    <Link
                        to="/gallery"
                        className="gallery__moreLink"
                    >

                        <Button

                            variant="outline"

                            endIcon={<ArrowLeftIcon/>}

                        >

                            مشاهده همه تصاویر

                        </Button>

                    </Link>

                </div>

            </div>

        </section>

    );

}

export default Gallery;