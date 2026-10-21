
import { useEffect, useState } from "react";

import "./GalleryPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";
import GalleryGrid from "../../components/Gallery/GalleryGrid";

import { getGallery } from "../../components/api";

const GalleryPage = () => {

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

    return (
        <section className="galleryPage">

            <PageHeader
                title={
                    settings.page_title ||
                    "گالری تصاویر"
                }
                subtitle={
                    settings.page_description ||
                    "تمام تصاویر مطب، تجهیزات و فعالیت‌های پزشکی"
                }
                breadcrumbs={[
                    {
                        label: "صفحه اصلی",
                        href: "/"
                    },
                    {
                        label: "گالری تصاویر"
                    }
                ]}
            />

            <div className="container">

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
                        <GalleryGrid images={images} />

                        {images.length === 0 && (
                            <p>
                                هنوز تصویری در گالری ثبت نشده است.
                            </p>
                        )}
                    </>
                )}

            </div>

        </section>
    );
};

export default GalleryPage;
