
import GalleryItem from "./GalleryItem";

const GalleryGrid = ({ images = [], limit }) => {

    const displayedImages =
        typeof limit === "number"
            ? images.slice(0, limit)
            : images;

    return (
        <div className="gallery__grid">

            {displayedImages.map((item) => (
                <GalleryItem
                    key={item.id}
                    item={item}
                />
            ))}

        </div>
    );
};

export default GalleryGrid;
