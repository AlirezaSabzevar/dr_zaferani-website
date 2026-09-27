import "./GalleryPage.css";

import PageHeader from "../../components/PageHeader/PageHeader";

import GalleryGrid from "../../components/Gallery/GalleryGrid";

const GalleryPage = () => {

    return (

        <section className="galleryPage">

            <PageHeader

                title="گالری تصاویر"

                subtitle="تمام تصاویر مطب، تجهیزات و فعالیت‌های پزشکی"

                breadcrumbs={[

                    {

                        label:"صفحه اصلی",

                        href:"/"

                    },

                    {

                        label:"گالری تصاویر"

                    }

                ]}

            />

            <div className="container">

                <GalleryGrid/>

            </div>

        </section>

    );

}

export default GalleryPage;