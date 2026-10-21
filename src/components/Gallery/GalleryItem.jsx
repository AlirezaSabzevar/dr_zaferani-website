
import "./Gallery.css";

const GalleryItem = ({ item }) => {

    const API_URL = import.meta.env.VITE_API_URL;

    const imageUrl = item.image
        ? new URL(item.image, API_URL).href
        : "";

    const imageTitle = item.alt_text || "تصویر گالری";

    return (
        <article className="galleryItem">

            {imageUrl && (
                <img
                    src={imageUrl}
                    alt={imageTitle}
                    className="galleryItem__image"
                    loading="lazy"
                />
            )}

            <div className="galleryItem__overlay">

                <h3>{imageTitle}</h3>

            </div>

        </article>
    );
};

export default GalleryItem;
