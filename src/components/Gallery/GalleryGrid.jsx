import galleryData from "../../data/galleryData";
import GalleryItem from "./GalleryItem";

const GalleryGrid = ({ limit }) => {

    const images = limit ? galleryData.slice(0, limit) : galleryData;

    return (

        <div className="gallery__grid">

            {

                images.map((item)=>(

                    <GalleryItem

                        key={item.id}

                        item={item}

                    />

                ))

            }

        </div>

    );

}

export default GalleryGrid;