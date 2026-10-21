
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import "./Gallery.css";

import SectionTitle from "../SectionTitle/SectionTitle";
import GalleryGrid from "./GalleryGrid";
import Button from "../Button/Button";

import { ArrowLeftIcon } from "../../icons";
import { getGallery } from "../api";

const Gallery = () => {
    const [galleryData, setGalleryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;

        const fetchGallery = async () => {
            try {
                const data = await getGallery();

                if (active) {
                    setGalleryData(data);
                }
            } catch (err) {
                if (active) {
                    setError(err.message);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchGallery();

        return () => {
            active = false;
        };
    }, []);

    const settings = galleryData?.settings || {};
    const images = galleryData?.images || [];

    const galleryLink =
        settings.button_link?.startsWith("/") &&
        !settings.button_link.startsWith("//")
            ? settings.button_link
            : "/gallery";

    return (
        <section className="gallery" id="gallery">
            <div className="container">

                <SectionTitle
                    badge={settings.badge_text || "گالری تصاویر"}
                    title={settings.title || "گالری تصاویر"}
                    subtitle={
                        settings.description ||
                        "نمونه‌ای از تصاویر مطب، تجهیزات و خدمات درمانی"
                    }
                    center
                />

                {loading && (
                    <p role="status">
                        در حال دریافت تصاویر...
                    </p>
                )}

                {error && (
                    <p role="alert">{error}</p>
                )}

                {!loading && !error && (
                    <>
                        <GalleryGrid
                            images={images}
                            limit={4}
                        />

                        {images.length === 0 && (
                            <p>هنوز تصویری ثبت نشده است.</p>
                        )}

                        <div className="gallery__more">
                            <Link
                                to={galleryLink}
                                className="gallery__moreLink"
                            >
                                <Button
                                    variant="outline"
                                    endIcon={<ArrowLeftIcon />}
                                >
                                    {settings.button_text ||
                                        "مشاهده همه تصاویر"}
                                </Button>
                            </Link>
                        </div>
                    </>
                )}

            </div>
        </section>
    );
};

export default Gallery;
