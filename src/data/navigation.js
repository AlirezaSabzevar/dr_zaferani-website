import {
    HomeIcon,
    UserIcon,
    HeartIcon,
    ArticleIcon,
    GalleryIcon,
    PhoneIcon,
} from "../icons";


const navigation = [

    {
        id:1,
        title:"صفحه اصلی",
        href:"#home",
        icon:HomeIcon
    },

    {
        id:2,
        title:"درباره دکتر",
        href:"#about",
        icon:UserIcon
    },

    {
        id:3,
        title:"خدمات",
        href:"#services",
        icon: HeartIcon
    },

    {
        id:4,
        title:"مقالات",
        href:"#articles",
        icon:ArticleIcon,
        badge:"جدید"
    },

    {
        id:5,
        title:"گالری",
        href:"#gallery",
        icon:GalleryIcon
    },

    {
        id:6,
        title:"تماس",
        href:"#footer",
        icon:PhoneIcon
    }

];

export default navigation;