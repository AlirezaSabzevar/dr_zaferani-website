import "./Gallery.css";

const GalleryItem = ({ item }) => {

    return (

        <article className="galleryItem">

            <img
                src={item.image}
                alt={item.title}
                className="galleryItem__image"
            />

            <div className="galleryItem__overlay">

                <h3>

                    {item.title}

                </h3>

            </div>

        </article>

    );

};

export default GalleryItem;