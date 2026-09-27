import Card from "../Card/Card";

import {GalleryIcon} from "../../icons";

const GalleryCard = ({gallery})=>{

    return(

        <Card className="galleryCard">

            <div className="galleryCard__image">

                <img

                    src={gallery.image}

                    alt={gallery.title}

                />

                <div className="galleryCard__overlay">

                    <GalleryIcon/>

                </div>

            </div>

            <div className="galleryCard__content">

                <h3>

                    {gallery.title}

                </h3>

            </div>

        </Card>

    )

}

export default GalleryCard;